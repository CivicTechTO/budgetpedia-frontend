'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const nugget_view_1 = require("./nugget.view");
const html_view_1 = require("./html.view");
let mdit = require('markdown-it');
let mda = require('markdown-it-attrs');
let md = new mdit({ html: true });
md.use(mda);
class NuggetList extends React.Component {
    render() {
        let { nuggets: nuggetdata, image, title, style, contrast } = this.props;
        let defaultstyle = {
            position: 'relative',
            backgroundColor: image ? 'none' : 'green',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: image ? 'cover' : 'auto',
            marginBottom: '30px',
        };
        let defaultScrollBlockstyle = {
            padding: "16px",
            display: 'block',
            overflowX: 'scroll',
        };
        let nuggets = nuggetdata.map(function (data, index) {
            return (React.createElement(nugget_view_1.default, { key: index, image: data.image, style: data.style, prefix: data.prefix, infix: data.infix, suffix: data.suffix, contrast: data.contrast }));
        });
        return (React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    padding: '8px 3px',
                    zIndex: 2,
                } },
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'white',
                        verticalAlign: 'top',
                    } }, React.createElement(html_view_1.default, { html: md.renderInline(title) })),
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'silver',
                        marginLeft: '32px',
                        verticalAlign: 'top',
                    } },
                    React.createElement("span", { className: 'material-icons' }, "arrow_back"),
                    React.createElement("span", { className: 'material-icons' }, "arrow_forward"))),
            React.createElement("div", { style: defaultScrollBlockstyle },
                React.createElement("div", { style: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        marginTop: '20px',
                    } }, nuggets))));
    }
}
exports.default = NuggetList;
