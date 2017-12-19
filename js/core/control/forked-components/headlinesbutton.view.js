'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const headlinespicker_view_1 = require("./headlinespicker.view");
class HeadlinesButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => this.props.onOverrideContent(headlinespicker_view_1.default);
    }
    render() {
        return (React.createElement("div", { className: "headlineButtonWrapper" },
            React.createElement("button", { onClick: this.onClick, className: "headlineButton" }, "H")));
    }
}
exports.default = HeadlinesButton;
