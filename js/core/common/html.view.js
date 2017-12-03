"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let HtmlView = (props) => {
    let { style, html } = props;
    return React.createElement("div", { style: style, dangerouslySetInnerHTML: { __html: html } });
};
exports.default = HtmlView;
