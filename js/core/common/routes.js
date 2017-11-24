'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_router_redux_1 = require("react-router-redux");
let ReactGA = require('react-ga');
ReactGA.initialize('UA-4105209-11');
const hometiles_1 = require("../containers/hometiles");
const nomatch_1 = require("../containers/nomatch");
const approutes_1 = require("../../addins/approutes");
let logPageView = (location) => {
    if (window.location.hostname == 'budgetpedia.ca') {
        ReactGA.pageview(location.pathname + location.search);
    }
};
let routedata = [
    { path: "*", component: nomatch_1.default },
];
let coreroutes = routedata.map((item, index) => (React.createElement(react_router_dom_1.Route, { key: 'coreroute' + index, path: item.path, component: item.component })));
let home = React.createElement(react_router_dom_1.Route, { key: 'home', exact: true, path: "/", component: hometiles_1.default });
let routes = [home, ...approutes_1.default, ...coreroutes];
logPageView(window.location);
let Routes = ({ history }) => {
    history.listen(location => {
        window.scrollTo(0, 0);
        logPageView(location);
    });
    return React.createElement(react_router_redux_1.ConnectedRouter, { history: history },
        React.createElement(react_router_dom_1.Switch, null, routes));
};
exports.Routes = Routes;
