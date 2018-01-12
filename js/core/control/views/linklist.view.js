'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const link_view_1 = require("./link.view");
let LinkListView = ({ header, items, upperDivider, lowerDivider }) => {
    let localitems = items.map((item, index) => {
        return React.createElement(link_view_1.default, { external: item.external, key: index, prompt: item.prompt, icon: item.icon, target: item.target, targetText: item.targetText, description: item.description ? item.description : null, suffix: item.suffix ? item.suffix : null, imageStyle: item.imageStyle });
    });
    let upperelements = [];
    let lowerelements = [];
    if (upperDivider)
        upperelements.push(React.createElement("hr", { key: "upper" }));
    if (lowerDivider)
        lowerelements.push(React.createElement("hr", { key: "lower" }));
    return (React.createElement("div", null, [...upperelements,
        React.createElement("p", { key: "header", style: { margin: 0, padding: 0 } }, header),
        React.createElement("ul", { key: "list" }, localitems),
        ...lowerelements,
    ]));
};
exports.default = LinkListView;
