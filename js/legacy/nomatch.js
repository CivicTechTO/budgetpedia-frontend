"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
class NoMatch extends Component {
    render() {
        return React.createElement("div", { style: { color: 'cornsilk' } }, "Sorry... we don't have a page that matches that url");
    }
}
exports.default = NoMatch;
