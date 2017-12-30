'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const link_view_1 = require("./link.view");
class LinkListView extends React.Component {
    render() {
        let { props } = this;
        let items = props.items.map((item, index) => {
            return React.createElement(link_view_1.default, { external: item.external, key: index, prompt: item.prompt, icon: item.icon, target: item.target, targetText: item.targetText, description: item.description ? item.description : null, suffix: item.suffix ? item.suffix : null, imageStyle: item.imageStyle });
        });
        let upperelements = [];
        let lowerelements = [];
        if (props.upperDivider)
            upperelements.push(React.createElement("hr", { key: "upper" }));
        if (props.lowerDivider)
            lowerelements.push(React.createElement("hr", { key: "lower" }));
        return ([...upperelements,
            React.createElement("p", { key: "header", style: { margin: 0, padding: 0 } }, props.header),
            React.createElement("ul", { key: "list" }, items),
            ...lowerelements,
        ]);
    }
}
exports.default = LinkListView;
