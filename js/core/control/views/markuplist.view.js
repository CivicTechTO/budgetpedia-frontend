"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
const markupline_view_1 = require("./markupline.view");
let moment = require('moment');
let Fields = ({ fields, fieldproperties, fieldmeta }) => {
    let fieldlist = [];
    for (let index in fields) {
        let field = fields[index];
        let name;
        let content;
        if (!fieldproperties.commonstructure) {
            name = field.name;
            content = field.content;
        }
        else {
            name = fieldmeta[index].name;
            content = field;
        }
        if (fieldmeta[index].type == 'date') {
            content = moment(content, fieldmeta[index].layout).format(fieldmeta[index].format);
        }
        fieldlist.push(React.createElement("div", { key: index, style: {
                display: 'inline',
                borderRight: '1px solid silver',
                paddingRight: '8px',
                marginRight: '8px',
            } },
            React.createElement("div", { style: { fontStyle: 'italic', display: 'inline' } },
                name,
                ": "),
            React.createElement(markupline_view_1.default, { markup: content, style: { display: 'inline' } })));
    }
    if (!fieldlist.length)
        return null;
    return React.createElement("div", { style: { marginBottom: '8px' } }, fieldlist);
};
let MarkupListView = ({ fieldproperties, fieldmeta, headermarkup, items }) => {
    console.log('fieldproperties,fieldmeta,headermarkup,items', fieldproperties, fieldmeta, headermarkup, items);
    let headercontent = () => {
        return React.createElement(markupblock_view_1.default, { markup: headermarkup });
    };
    let itemcontent = items => {
        let itemlist = items.map((item, index) => {
            return React.createElement("li", { key: index },
                item.content ? React.createElement(markupblock_view_1.default, { markup: item.content }) : null,
                item.fields ? React.createElement(Fields, { fields: item.fields, fieldproperties: fieldproperties, fieldmeta: fieldmeta }) : null,
                item.suffix ? React.createElement(markupblock_view_1.default, { markup: item.suffix }) : null);
        });
        return (React.createElement("ul", null, itemlist));
    };
    return React.createElement("div", null,
        headercontent(),
        itemcontent(items));
};
exports.default = MarkupListView;
