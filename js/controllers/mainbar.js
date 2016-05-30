'use strict';
const React = require('react');
var { Component, PropTypes } = React;
const AppBar = require('material-ui/lib/app-bar');
class MainBarClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountsidebaropen: false,
            menusidebaropen: false,
            elements: {},
            errors: { password: false, email: false },
        };
    }
    render() {
        return (React.createElement(AppBar, {onTitleTouchTap: e => { }, titleStyle: { cursor: 'pointer' }, style: { position: "fixed" }, title: React.createElement("span", null, "Toronto Budgetpedia")}));
    }
}
var MainBar = MainBarClass;
exports.MainBar = MainBar;
