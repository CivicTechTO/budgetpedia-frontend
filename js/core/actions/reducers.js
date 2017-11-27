'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_actions_1 = require("redux-actions");
const react_router_redux_1 = require("react-router-redux");
const react_redux_toastr_1 = require("react-redux-toastr");
const Actions = require("./actions");
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
let appnavbar = (state = initialstate_1.default.appnavbar, action) => {
    return state;
};
let ui = redux_1.combineReducers({
    appnavbar,
});
let homepadding = (state = initialstate_1.default.homepadding, action) => {
    return state;
};
let hometiles = (state = initialstate_1.default.hometiles, action) => {
    return state;
};
let homecolsreducer = (state = initialstate_1.default.homecols, action) => {
    switch (action.type) {
        case Actions.SET_HOMETILECOLS: {
            let mainElement = document.getElementById('main');
            let elementwidth = mainElement.getBoundingClientRect().width;
            let columns;
            if (elementwidth > 760) {
                columns = 4;
            }
            else if (elementwidth > 480) {
                columns = 2;
            }
            else {
                columns = 1;
            }
            return columns;
        }
        default:
            return state;
    }
};
let homecols = redux_actions_1.handleActions({
    [Actions.SET_HOMETILECOLS]: homecolsreducer,
}, initialstate_1.default.homecols);
let homegrid = redux_1.combineReducers({
    homepadding,
    hometiles,
    homecols,
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
