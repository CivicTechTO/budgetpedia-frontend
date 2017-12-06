"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pages_index_1 = require("../model/pages.index");
const routes_index_1 = require("../model/routes.index");
const repos_index_1 = require("../model/repos.index");
const core_styles_1 = require("../core/styles/core.styles");
let master = {
    pages: pages_index_1.default,
    routes: routes_index_1.default,
    repos: repos_index_1.default,
    styles: core_styles_1.default,
};
exports.default = master;
