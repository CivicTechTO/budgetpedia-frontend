"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let MarkupListView = ({ headermarkup, items }) => {
    let headercontent = () => {
        return React.createElement("div", null);
    };
    let itemcontent = items => {
        let itemlist = [];
        return (React.createElement("ul", null, itemlist));
    };
    return React.createElement("div", null,
        headercontent(),
        itemcontent(items));
};
exports.default = MarkupListView;
