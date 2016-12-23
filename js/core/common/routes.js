'use strict';
const React = require("react");
const react_router_1 = require("react-router");
let ReactGA = require('react-ga');
ReactGA.initialize('UA-4105209-11');
const app_1 = require("./app");
const hometiles_1 = require("../containers/hometiles");
const resetpassword_1 = require("../containers/resetpassword");
const register_1 = require("../containers/register");
const registerpending_1 = require("../containers/registerpending");
const registerconfirm_1 = require("../containers/registerconfirm");
const userprofile_1 = require("../containers/userprofile");
const nomatch_1 = require("../containers/nomatch");
const approutes_1 = require("../../addins/approutes");
let logPageView = () => {
    if (window.location.hostname == 'budgetpedia.ca') {
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }
};
let routedata = [
    { path: "resetpassword", component: resetpassword_1.default },
    { path: "register", component: register_1.default },
    { path: "register/pending", component: registerpending_1.default },
    { path: "register/confirm", component: registerconfirm_1.default },
    { path: "userprofile", component: userprofile_1.default },
    { path: "*", component: nomatch_1.default },
];
let coreroutes = routedata.map((item, index) => (React.createElement(react_router_1.Route, { key: 'coreroute' + index, path: item.path, component: item.component })));
let routes = (React.createElement(react_router_1.Router, { onUpdate: () => {
        window.scrollTo(0, 0);
        logPageView();
    }, history: react_router_1.browserHistory },
    React.createElement(react_router_1.Route, { path: "/", component: app_1.default },
        React.createElement(react_router_1.IndexRoute, { component: hometiles_1.default }),
        approutes_1.default,
        coreroutes)));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = routes;
