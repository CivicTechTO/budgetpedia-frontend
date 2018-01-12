// markdown-it-anchor.tsx
// forked from https://github.com/valeriangalliat/markdown-it-anchor/blob/master/index.js
// changed by Henrik Bechmann (HB)
const string = require('string')

const slugify = s =>
  string(s).slugify().toString()

const position = {
  false: 'push',
  true: 'unshift'
}

const hasProp = ({}).hasOwnProperty

const permalinkHref = slug => `#${slug}`

const renderPermalink = (slug, opts, state, idx) => {
  const space = () =>
    Object.assign(new state.Token('text', '', 0), { content: ' ' })

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
  ]

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  linkTokens[position[(!opts.permalinkBefore).toString()]](space())
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

// added by HB, copied and modified renderPermalink
const renderTargetlink = (slug, opts, state, idx, text, tag) => {
  const space = () =>
    Object.assign(new state.Token('text', '', 0), { content: ' ' })

  const linkTokens = [
    Object.assign(new state.Token('link_open', 'a', 1), {
      attrs: [
        ['class', opts.targetlinkClass],
        ['id', slug],
        ['data-text',text],
        ['data-level',tag],
        ['aria-hidden', 'true']
      ]
    }),
    Object.assign(new state.Token('html_block', '', 0), { content: '' }),
    new state.Token('link_close', 'a', -1)
  ]

  // `push` or `unshift` according to position option.
  // Space is at the opposite side.
  linkTokens[position[(!opts.permalinkBefore).toString()]](space())
  state.tokens[idx + 1].children[position[opts.permalinkBefore]](...linkTokens)
}

const uniqueSlug = (slug, slugs) => {
  // Mark this slug as used in the environment.
  slugs[slug] = (hasProp.call(slugs, slug) ? slugs[slug] : 0) + 1

  // First slug, return as is.
  if (slugs[slug] === 1) {
    return slug
  }

  // Duplicate slug, add a `-2`, `-3`, etc. to keep ID unique.
  return slug + '-' + slugs[slug]
}

const isLevelSelectedNumber = selection => level => level >= selection
const isLevelSelectedArray = selection => level => selection.includes(level)

const anchor = (md, opts) => {
  opts = Object.assign({}, defaults, opts)

  md.core.ruler.push('anchor', state => {
    const slugs = {}
    const tokens = state.tokens

    const isLevelSelected = Array.isArray(opts.level)
      ? isLevelSelectedArray(opts.level)
      : isLevelSelectedNumber(opts.level)

    tokens
      .filter(token => token.type === 'heading_open')
      .filter(token => isLevelSelected(Number(token.tag.substr(1))))
      .forEach(token => {
        // Aggregate the next token children text.
        const title = tokens[tokens.indexOf(token) + 1].children
          .filter(token => token.type === 'text' || token.type === 'code_inline')
          .reduce((acc, t) => acc + t.content, '')

        let slug = token.attrGet('id')

        if (slug == null) {
          // this section re-organized by HB; mostly added conditional of useTargetLink
          slug = uniqueSlug(opts.slugify(title), slugs)
          token.attrPush(['class',opts.headerClassName])
          token.attrPush(['style','position:relative;padding-left:16px;margin-left:-16px;'])
          if (opts.useTargetlink) {
            opts.renderTargetlink(slug, opts, state, tokens.indexOf(token),title,token.tag)
          } else {
            token.attrPush(['id', slug])
          }
        }

        if (opts.permalink) {
          opts.renderPermalink(slug, opts, state, tokens.indexOf(token))
        }

        if (opts.callback) {
          // HB added tag prop
          opts.callback(token, { slug, title, tag:token.tag })
        }
      })
  })
}

let defaults = {
  level: 1,
  slugify,
  permalink: false,
  renderPermalink,
  permalinkClass: 'header-anchor markup-anchor',
  permalinkSymbol: '¶',
  permalinkBefore: false,
  permalinkHref,
  // added by HB
  useTargetlink:false,
  renderTargetlink,
  targetlinkClass: 'target-anchor hash-anchor',
  headerClassName:'content-header',
}

module.exports = anchor
