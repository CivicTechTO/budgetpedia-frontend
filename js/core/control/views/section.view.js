'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
const hashanchorheader_view_1 = require("./hashanchorheader.view");
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
                React.createElement("header", { style: { backgroundColor: "#d9d9d9", padding: "0px 16px 1px", borderTop: "4px solid silver" } },
                    React.createElement(hashanchorheader_view_1.default, { tag: 'h1', title: title }),
                    description ? React.createElement(markupblock_view_1.default, { markup: description }) : null) : null,
            React.createElement("main", null, children));
    }
}
exports.default = SectionView;
