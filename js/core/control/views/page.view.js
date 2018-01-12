'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_helmet_1 = require("react-helmet");
let PageView = props => {
    return (React.createElement("div", null,
        props.title ? React.createElement(react_helmet_1.default, null,
            React.createElement("title", null, props.title),
            props.description ? React.createElement("meta", { name: "description", content: props.description }) : null) : null,
        props.children));
};
exports.default = PageView;
