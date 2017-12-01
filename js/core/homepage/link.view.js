'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class LinkView extends React.Component {
    render() {
        let { props } = this;
        return (React.createElement("li", null,
            props.prompt,
            React.createElement("span", { style: { whiteSpace: 'pre' } },
                React.createElement("img", { style: { height: '18px', verticalAlign: 'middle' }, src: props.icon }),
                props.external
                    ? React.createElement("a", { href: props.target, target: "_blank" }, props.targetText)
                    : React.createElement(react_router_dom_1.Link, { to: props.target }, props.targetText))));
    }
}
exports.default = LinkView;
