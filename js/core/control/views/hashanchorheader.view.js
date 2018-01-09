'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupline_view_1 = require("./markupline.view");
const removeMd = require('remove-markdown');
var stringUtils = require('string');
let HashAnchorHeader = ({ tag, title }) => {
    let props = {
        className: 'content-header',
        style: {
            position: 'relative',
            paddingLeft: '16px',
            marginLeft: '-16px',
        },
    };
    let titletext = removeMd(title);
    let slug = stringUtils(titletext).slugify().s;
    let titlenode = React.createElement(markupline_view_1.default, { key: "title", markup: title });
    let permalink = React.createElement("a", { key: "permalink", className: "header-anchor markup-anchor", href: "#" + slug, "aria-hidden": "true" }, "\uD83D\uDD17");
    let hashtarget = React.createElement("a", { key: "hashtarget", className: "target-anchor", id: slug, "data-text": titletext, "data-level": tag, "aria-hidden": "true" });
    let children = [titlenode, permalink, hashtarget];
    return React.createElement(tag, props, children);
};
exports.default = HashAnchorHeader;
