"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_toastr_1 = require("react-redux-toastr");
const mainbar_1 = require("../containers/mainbar");
const routes_controller_1 = require("./routes.controller");
const App = ({ globalmessage, history }) => (React.createElement("div", null,
    React.createElement(mainbar_1.default, null),
    React.createElement("div", { style: { height: "64px" } }, " "),
    globalmessage,
    React.createElement(routes_controller_1.Routes, { history: history }),
    React.createElement(react_redux_toastr_1.default, { timeOut: 4000, newestOnTop: false, position: "top-left" })));
exports.default = App;
