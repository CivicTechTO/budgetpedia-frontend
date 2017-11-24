"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const createBrowserHistory_1 = require("history/createBrowserHistory");
const react_router_redux_1 = require("react-router-redux");
const redux_thunk_1 = require("redux-thunk");
const reducers_1 = require("../reducers/reducers");
const history = createBrowserHistory_1.default();
exports.history = history;
const reduxRouterMiddleware = react_router_redux_1.routerMiddleware(history);
const middlewares = redux_1.applyMiddleware(reduxRouterMiddleware, redux_thunk_1.default);
const store = redux_1.createStore(redux_1.combineReducers(Object.assign({}, reducers_1.default, { router: react_router_redux_1.routerReducer })), middlewares);
const configureStore = () => store;
exports.configureStore = configureStore;
