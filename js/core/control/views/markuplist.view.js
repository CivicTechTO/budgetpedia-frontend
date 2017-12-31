"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
const markupline_view_1 = require("./markupline.view");
let Fields = ({ fields }) => {
    let fieldlist = [];
    for (let index in fields) {
        let field = fields[index];
        let { name, content } = field;
        fieldlist.push(React.createElement("div", { key: index },
            React.createElement("span", { style: { fontStyle: 'italic' } },
                name,
                ": "),
            React.createElement(markupline_view_1.default, { markup: content })));
    }
    if (!fieldlist.length)
        return null;
    return React.createElement("div", null, fieldlist);
};
let MarkupListView = ({ headermarkup, items }) => {
    let headercontent = () => {
        return React.createElement(markupblock_view_1.default, { markup: headermarkup });
    };
    let itemcontent = items => {
        let itemlist = items.map((item, index) => {
            return React.createElement("li", { key: index },
                item.content ? React.createElement(markupblock_view_1.default, { markup: item.content }) : null,
                item.fields ? React.createElement(Fields, { fields: item.fields }) : null,
                item.suffix ? React.createElement(markupblock_view_1.default, { markup: item.suffix }) : null);
        });
        return (React.createElement("ul", null, itemlist));
    };
    return React.createElement("div", null,
        headercontent(),
        itemcontent(items));
};
exports.default = MarkupListView;
