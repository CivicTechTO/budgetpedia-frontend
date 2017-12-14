'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
class SectionView extends React.Component {
    render() {
        let { title, description, children } = this.props;
        return React.createElement("div", null,
            title ?
                React.createElement("div", { style: { backgroundColor: "#d9d9d9", padding: "8px", borderTop: "4px solid silver" } },
                    React.createElement(markupblock_view_1.default, { markup: title }),
                    description ?
                        React.createElement(markupblock_view_1.default, { markup: description }) : null) : null,
            children);
    }
}
exports.default = SectionView;
