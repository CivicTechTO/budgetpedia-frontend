"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_toastr_1 = require("react-redux-toastr");
const globalbar_controller_1 = require("../containers/globalbar.controller");
const routes_controller_1 = require("./routes.controller");
const MainView = ({ globalmessage, history }) => (React.createElement("div", null,
    React.createElement(globalbar_controller_1.default, null),
    React.createElement("div", { style: { height: "64px" } }, " "),
    globalmessage,
    React.createElement(routes_controller_1.Routes, { history: history }),
    React.createElement(react_redux_toastr_1.default, { timeOut: 4000, newestOnTop: false, position: "top-left" })));
exports.default = MainView;
