"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pages_index_1 = require("../model/pages.index");
const routes_index_1 = require("../model/routes.index");
const getPageIndex = path => {
    return routes_index_1.default[path];
};
const getPageModel = index => {
    return pages_index_1.default[index];
};
let master = {
    getPageIndex,
    getPageModel,
};
exports.default = master;
