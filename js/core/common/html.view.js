"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let HtmlView = ({ style, html }) => (React.createElement("div", { style: style, dangerouslySetInnerHTML: { __html: html } }));
exports.default = HtmlView;
