'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_helmet_1 = require("react-helmet");
class PageView extends React.Component {
    render() {
        return (React.createElement("div", null,
            this.props.title ? React.createElement(react_helmet_1.default, null,
                React.createElement("title", null, this.props.title),
                this.props.description ? React.createElement("meta", { name: "description", content: this.props.description }) : null) : null,
            this.props.children));
    }
}
exports.default = PageView;
