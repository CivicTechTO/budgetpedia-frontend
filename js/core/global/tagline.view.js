'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TaglineView extends React.Component {
    render() {
        let defaultstyle = {
            fontSize: "12px",
            color: "gold",
            padding: "3px",
        };
        return (React.createElement("div", { style: Object.assign({}, defaultstyle, this.props.style) }, this.props.text));
    }
}
exports.default = TaglineView;
