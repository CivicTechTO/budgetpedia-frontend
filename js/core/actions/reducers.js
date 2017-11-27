'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const react_router_redux_1 = require("react-router-redux");
const react_redux_toastr_1 = require("react-redux-toastr");
const initialstate_1 = require("../../settings/initialstate");
const reducers_1 = require("../../addins/explorer/reducers");
let theme = (state = initialstate_1.default.theme) => {
    return state;
};
let system = (state = initialstate_1.default.system) => {
    return state;
};
let colors = (state = initialstate_1.default.colors) => {
    return state;
};
let resources = redux_1.combineReducers({
    theme,
    system,
    colors,
});
let globalbar = (state = initialstate_1.default.globalbar, action) => {
    return state;
};
let ui = redux_1.combineReducers({
    globalbar,
});
let homepadding = (state = initialstate_1.default.homepadding, action) => {
    return state;
};
let hometiles = (state = initialstate_1.default.hometiles, action) => {
    return state;
};
let homegrid = redux_1.combineReducers({
    homepadding,
    hometiles,
});
let mainReducerCore = {
    explorer: reducers_1.default,
    resources,
    router: react_router_redux_1.routerReducer,
    homegrid,
    toastr: react_redux_toastr_1.reducer,
    ui,
};
exports.default = mainReducerCore;
