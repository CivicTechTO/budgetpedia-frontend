"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
class App extends Component {
    render() {
        return (React.createElement("div", null, React.cloneElement(this.props.children, {
            key: this.props.location.pathname
        })));
    }
}
exports.default = App;
