"use strict";
const React = require('react');
const MuiThemeProvider_1 = require('material-ui/styles/MuiThemeProvider');
const getMuiTheme_1 = require('material-ui/styles/getMuiTheme');
const react_redux_toastr_1 = require('react-redux-toastr');
const react_redux_1 = require('react-redux');
const mainbar_1 = require('../containers/mainbar');
const routes_1 = require('./routes');
const Root = ({ store, globalmessage }) => (React.createElement(MuiThemeProvider_1.default, {muiTheme: getMuiTheme_1.default()}, 
    React.createElement(react_redux_1.Provider, {store: store}, 
        React.createElement("div", null, 
            React.createElement(mainbar_1.default, null), 
            React.createElement("div", {style: { height: "64px" }}, " "), 
            globalmessage, 
            routes_1.default, 
            React.createElement(react_redux_toastr_1.default, {timeOut: 4000, newestOnTop: false, position: "top-left"}))
    )
));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
