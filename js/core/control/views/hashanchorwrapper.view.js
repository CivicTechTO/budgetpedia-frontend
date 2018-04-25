// hashanchorwrapper.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import MarkupLine from './markupline.view';
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
    let titlenode = React.createElement(MarkupLine, { key: "title", markup: title });
    let permalink = React.createElement("a", { key: "permalink", className: "header-anchor markup-anchor", href: "#" + slug, "aria-hidden": "true" }, "\uD83D\uDD17");
    let hashtarget = React.createElement("a", { key: "hashtarget", className: "target-anchor hash-anchor", id: slug, "data-text": titletext, "data-level": tag, "aria-hidden": "true" });
    return React.createElement("div", { className: 'content-header', style: Object.assign({}, wrapperstyle, style) },
        titlenode,
        permalink,
        hashtarget);
};
export default HashAnchorWrapper;
