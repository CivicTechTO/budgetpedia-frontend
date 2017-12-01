"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let HtmlView = ({ html }) => {
    return React.createElement("div", { dangerouslySetInnerHTML: { __html: html } });
};
exports.default = HtmlView;
