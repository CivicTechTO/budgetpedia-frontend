'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
class LinkView extends React.Component {
    render() {
        let { props } = this;
        let defaultImageStyle = { height: '18px', verticalAlign: 'middle' };
        return (React.createElement("li", null,
            props.prompt,
            "\u00A0",
            React.createElement("span", { style: { whiteSpace: 'pre' } },
                React.createElement("img", { style: Object.assign({}, defaultImageStyle, props.imageStyle), src: props.icon }),
                "\u00A0",
                props.external
                    ? React.createElement("a", { href: props.target, target: "_blank" }, props.targetText)
                    : React.createElement(react_router_dom_1.Link, { to: props.target }, props.targetText),
                ' ',
                props.suffix),
            props.description ? React.createElement("p", { style: { fontStyle: 'italic', margin: '0' } }, props.description) : null));
    }
}
exports.default = LinkView;
