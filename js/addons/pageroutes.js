'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const page_controller_1 = require("../core/control/page.controller");
const about_1 = require("./pages/about");
const deputations_1 = require("./pages/deputations");
const explorer_1 = require("./explorer/explorer");
const communities_1 = require("./pages/communities");
const socialmedia_1 = require("./pages/socialmedia");
const newsletter_1 = require("./pages/newsletter");
const resources_1 = require("./pages/resources");
const teams_1 = require("./pages/teams");
const stories_1 = require("./pages/stories");
const announcements_1 = require("./pages/announcements");
const pathways_1 = require("./pages/pathways");
let routedata = [
    { path: "/about", component: about_1.default },
    { path: "/overview", component: page_controller_1.default },
    { path: "/budgets", component: page_controller_1.default },
    { path: "/roadmap", component: page_controller_1.default },
    { path: "/deputations", component: deputations_1.default },
    { path: "/explorer", component: explorer_1.default },
    { path: "/communities", component: communities_1.default },
    { path: "/socialmedia", component: socialmedia_1.default },
    { path: "/newsletter", component: newsletter_1.default },
    { path: "/resources", component: resources_1.default },
    { path: "/teams", component: teams_1.default },
    { path: "/stories", component: stories_1.default },
    { path: "/announcements", component: announcements_1.default },
    { path: "/pathways", component: pathways_1.default },
];
const pageroutes = routedata.map((item, index) => (React.createElement(react_router_dom_1.Route, { key: 'pageroute' + index, path: item.path, component: item.component })));
exports.default = pageroutes;
