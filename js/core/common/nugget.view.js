'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const html_view_1 = require("./html.view");
let mdit = require('markdown-it');
let mda = require('markdown-it-attrs');
let md = new mdit({ html: true });
md.use(mda);
class Nugget extends React.Component {
    render() {
        let { image, style, contrast, prefix, infix, suffix } = this.props;
        let defaultstyle = {
            display: 'inline-block',
            textAlign: 'center',
            borderRadius: '50%',
            backgroundColor: 'rgba(77,77,77,0.6)',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: image ? 'cover' : 'auto',
            color: contrast ? 'white' : null,
            width: '180px',
            height: '180px',
            marginRight: '16px',
            marginTop: '16px',
            overflow: 'clip',
            position: 'relative',
            fontWeight: '300',
            whiteSpace: 'normal',
        };
        let defaultinfixstyle = {
            fontSize: '2.5em',
            color: '#f1c40f'
        };
        return React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
            React.createElement("div", { style: { marginTop: '30px', minWidth: '20px' } }, React.createElement(html_view_1.default, { html: md.renderInline(prefix) })),
            React.createElement("div", { style: defaultinfixstyle }, React.createElement(html_view_1.default, { html: md.renderInline(infix) })),
            React.createElement("div", null, React.createElement(html_view_1.default, { html: md.renderInline(suffix) })));
    }
}
exports.default = Nugget;
