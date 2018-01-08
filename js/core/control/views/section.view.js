'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupline_view_1 = require("./markupline.view");
const markupblock_view_1 = require("./markupblock.view");
class SectionView extends React.Component {
    render() {
        let { title, description, children, style, id } = this.props;
        let defaultstyle = {
            maxWidth: '800px',
            paddingBottom: '8px',
            margin: '0 auto 12px auto',
            paddingBotton: '1px',
            backgroundColor: '#d9d9d9',
        };
        return React.createElement("section", { id: id, style: Object.assign({}, defaultstyle, style) },
            title ?
                React.createElement("div", { style: { backgroundColor: "#d9d9d9", padding: "8px", borderTop: "4px solid silver" } },
                    React.createElement("h1", null,
                        React.createElement(markupline_view_1.default, { markup: title })),
                    description ?
                        React.createElement(markupblock_view_1.default, { markup: description }) : null) : null,
            children);
    }
}
exports.default = SectionView;
