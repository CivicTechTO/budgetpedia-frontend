"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const ReactCSSTransitionGroup = require("react-addons-css-transition-group");
class App extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(ReactCSSTransitionGroup, { component: "div", transitionName: "mainpage", transitionEnterTimeout: 300, transitionLeave: false }, React.cloneElement(this.props.children, {
                key: this.props.location.pathname
            }))));
    }
}
exports.default = App;
