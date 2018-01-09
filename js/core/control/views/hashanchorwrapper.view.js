'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupline_view_1 = require("./markupline.view");
const removeMd = require('remove-markdown');
var stringUtils = require('string');
let HashAnchorWrapper = ({ tag, title, style }) => {
    let wrapperstyle = {
        position: 'relative',
        paddingLeft: '16px',
        marginLeft: '-16px',
    };
    let titletext = removeMd(title);
    let slug = stringUtils(titletext).slugify().s;
    let titlenode = React.createElement(markupline_view_1.default, { key: "title", markup: title });
    let permalink = React.createElement("a", { key: "permalink", className: "header-anchor markup-anchor", href: "#" + slug, "aria-hidden": "true" }, "\uD83D\uDD17");
    let hashtarget = React.createElement("a", { key: "hashtarget", className: "target-anchor", id: slug, "data-text": titletext, "data-level": tag, "aria-hidden": "true" });
    return React.createElement("div", { className: 'content-header', style: Object.assign({}, wrapperstyle, style) },
        titlenode,
        permalink,
        hashtarget);
};
exports.default = HashAnchorWrapper;
