const string = require('string');
const slugify = s => string(s).slugify().toString();
const position = {
    false: 'push',
    true: 'unshift'
};
const hasProp = ({}).hasOwnProperty;
const permalinkHref = slug => `#${slug}`;
const renderPermalink = (slug, opts, state, idx) => {
    const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' });
    const linkTokens = [
        Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
                ['class', opts.permalinkClass],
                ['href', opts.permalinkHref(slug, state)],
                ['aria-hidden', 'true']
            ]
        }),
        Object.assign(new state.Token('html_block', '', 0), { content: opts.permalinkSymbol }),
        new state.Token('link_close', 'a', -1)
    ];
    linkTokens[position[(!opts.permalinkBefore).toString()]](space());
    state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens);
};
const renderTargetlink = (slug, opts, state, idx, text, tag) => {
    const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' });
    const linkTokens = [
        Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
                ['class', opts.targetlinkClass],
                ['id', slug],
                ['data-text', text],
                ['data-level', tag],
                ['aria-hidden', 'true']
            ]
        }),
        Object.assign(new state.Token('html_block', '', 0), { content: '' }),
        new state.Token('link_close', 'a', -1)
    ];
    linkTokens[position[(!opts.permalinkBefore).toString()]](space());
    state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens);
};
const uniqueSlug = (slug, slugs) => {
    slugs[slug] = (hasProp.call(slugs, slug) ? slugs[slug] : 0) + 1;
    if (slugs[slug] === 1) {
        return slug;
    }
    return slug + '-' + slugs[slug];
};
const isLevelSelectedNumber = selection => level => level >= selection;
const isLevelSelectedArray = selection => level => selection.includes(level);
const anchor = (md, opts) => {
    opts = Object.assign({}, defaults, opts);
    md.core.ruler.push('anchor', state => {
        const slugs = {};
        const tokens = state.tokens;
        const isLevelSelected = Array.isArray(opts.level)
            ? isLevelSelectedArray(opts.level)
            : isLevelSelectedNumber(opts.level);
        tokens
            .filter(token => token.type === 'heading_open')
            .filter(token => isLevelSelected(Number(token.tag.substr(1))))
            .forEach(token => {
            const title = tokens[tokens.indexOf(token) + 1].children
                .filter(token => token.type === 'text' || token.type === 'code_inline')
                .reduce((acc, t) => acc + t.content, '');
            let slug = token.attrGet('id');
            if (slug == null) {
                slug = uniqueSlug(opts.slugify(title), slugs);
                token.attrPush(['class', opts.headerClassName]);
                token.attrPush(['style', 'position:relative;padding-left:16px;margin-left:-16px;']);
                if (opts.useTargetlink) {
                    opts.renderTargetlink(slug, opts, state, tokens.indexOf(token), title, token.tag);
                }
                else {
                    token.attrPush(['id', slug]);
                }
            }
            if (opts.permalink) {
                opts.renderPermalink(slug, opts, state, tokens.indexOf(token));
            }
            if (opts.callback) {
                opts.callback(token, { slug, title, tag: token.tag });
            }
        });
    });
};
let defaults = {
    level: 1,
    slugify,
    permalink: false,
    renderPermalink,
    permalinkClass: 'header-anchor markup-anchor',
    permalinkSymbol: '¶',
    permalinkBefore: false,
    permalinkHref,
    useTargetlink: false,
    renderTargetlink,
    targetlinkClass: 'target-anchor',
    headerClassName: 'content-header',
};
module.exports = anchor;
