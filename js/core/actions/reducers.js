'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const react_router_redux_1 = require("react-router-redux");
const react_redux_toastr_1 = require("react-redux-toastr");
const master_model_1 = require("../../settings/master.model");
const reducers_1 = require("../../addins/explorer/reducers");
let theme = (state = master_model_1.default.theme) => {
    return state;
};
let system = (state = master_model_1.default.system) => {
    return state;
};
let colors = (state = master_model_1.default.colors) => {
    return state;
};
let resources = redux_1.combineReducers({
    theme,
    system,
    colors,
});
let globalbar = (state = master_model_1.default.globalbar, action) => {
    return state;
};
let global = redux_1.combineReducers({
    globalbar,
});
let homepage = (state = master_model_1.default.homepage, action) => {
    return state;
};
let pagetargets = (state = master_model_1.default.pagetargets, action) => {
    return state;
};
let pages = redux_1.combineReducers({
    homepage,
    pagetargets,
});
let mainReducerCore = {
    explorer: reducers_1.default,
    resources,
    router: react_router_redux_1.routerReducer,
    pages,
    toastr: react_redux_toastr_1.reducer,
    global,
};
exports.default = mainReducerCore;
