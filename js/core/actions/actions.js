"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_redux_1 = require("react-router-redux");
exports.pushHistory = route => {
    return dispatch => {
        dispatch(react_router_redux_1.push(route));
    };
};
