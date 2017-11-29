'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Radium = require("radium");
let { StyleRoot } = Radium;
class TaglineView extends React.Component {
    render() {
        let defaultstyle = {
            fontSize: "12px",
            color: "gold",
            padding: "3px",
        };
        return (React.createElement(StyleRoot, null,
            React.createElement("div", { style: [defaultstyle, this.props.style] }, this.props.text)));
    }
}
exports.default = TaglineView;
