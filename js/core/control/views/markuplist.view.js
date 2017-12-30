"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
let MarkupListView = ({ headermarkup, items }) => {
    console.log('headermarkup, items', headermarkup, items);
    let headercontent = () => {
        return React.createElement(markupblock_view_1.default, { markup: headermarkup });
    };
    let itemcontent = items => {
        let itemlist = items.map((item, index) => {
            return React.createElement("li", null,
                React.createElement(markupblock_view_1.default, { markup: item.content }));
        });
        return (React.createElement("ul", null, itemlist));
    };
    return React.createElement("div", null,
        headercontent(),
        itemcontent(items));
};
exports.default = MarkupListView;
