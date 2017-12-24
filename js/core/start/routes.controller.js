'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let { Component } = React;
const react_router_redux_1 = require("react-router-redux");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const react_transition_group_1 = require("react-transition-group");
let ReactGA = require('react-ga');
ReactGA.initialize('UA-4105209-11');
const page_controller_1 = require("../control/page.controller");
const nomatch_1 = require("../../legacy/nomatch");
const pageroutes_1 = require("../../addons/pageroutes");
let logPageView = (location) => {
    if (window.location.hostname == 'budgetpedia.ca') {
        ReactGA.pageview(location.pathname + location.search);
    }
};
let routedata = [
    { path: "*", component: nomatch_1.default },
];
let coreroutes = routedata.map((item, index) => (React.createElement(react_router_dom_1.Route, { key: 'coreroute' + index, path: item.path, component: item.component })));
let home = React.createElement(react_router_dom_1.Route, { key: 'home', exact: true, path: "/", component: page_controller_1.default });
let routes = [home, ...pageroutes_1.default, ...coreroutes];
logPageView(window.location);
let RoutesController = class extends Component {
    constructor() {
        super(...arguments);
        this.historyListener = (location, action) => {
            logPageView(location);
        };
    }
    compoinentWillMount() {
        this.props.history.listen(this.historyListener);
    }
    render() {
        let location = this.props.router.location || {};
        return (React.createElement(react_router_redux_1.ConnectedRouter, { history: this.props.history },
            React.createElement(react_transition_group_1.TransitionGroup, null,
                React.createElement(react_transition_group_1.CSSTransition, { key: location.key, classNames: "fade", timeout: 2000, appear: true, exit: false, onEnter: () => {
                        window.scrollTo(0, 0);
                    } },
                    React.createElement(react_router_dom_1.Switch, { location: location }, routes)))));
    }
};
exports.RoutesController = RoutesController;
let mapStateToProps = state => {
    let { router } = state;
    return {
        router,
    };
};
exports.RoutesController = RoutesController = react_redux_1.connect(mapStateToProps)(RoutesController);
