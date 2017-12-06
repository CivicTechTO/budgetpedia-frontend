'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const html_view_1 = require("./html.view");
let mdit = require('markdown-it');
let mda = require('markdown-it-attrs');
let md = new mdit({ html: true });
md.use(mda);
const MarkupLine = ({ markup, style }) => (React.createElement(html_view_1.default, { style: Object.assign({ display: 'inline-block' }, style), html: md.renderInline(markup) }));
exports.default = MarkupLine;
