'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Card_1 = require("material-ui/Card");
const markupline_view_1 = require("./markupline.view");
const removeMd = require('remove-markdown');
var stringUtils = require('string');
let CardTitleView = (props) => {
    let localprops = Object.assign({}, props);
    let { title, subtitle } = localprops;
    let titletext = null;
    let slug = null;
    let tag = 'h2';
    if (title) {
        titletext = removeMd(title);
        title = React.createElement(markupline_view_1.default, { markup: title });
        localprops.title = title;
        slug = stringUtils(titletext).slugify().s;
    }
    if (subtitle) {
        subtitle = React.createElement(markupline_view_1.default, { markup: subtitle });
        localprops.subtitle = subtitle;
    }
    let cardtitle = React.createElement(Card_1.CardTitle, localprops);
    return React.createElement("div", { className: 'content-header', style: { position: 'relative' } },
        cardtitle,
        React.createElement("a", { className: "header-anchor cardtitle-anchor", href: "#" + slug, "aria-hidden": "true" }, "\uD83D\uDD17"),
        React.createElement("a", { className: "cardtitle-target-anchor hash-anchor", id: slug, "data-text": titletext, "data-level": tag, "aria-hidden": "true" }));
};
exports.default = CardTitleView;
