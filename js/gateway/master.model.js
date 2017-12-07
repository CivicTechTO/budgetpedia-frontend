"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pages_index_1 = require("../repos/pages.index");
const routes_index_1 = require("../gateway/routes.index");
const repos_index_1 = require("../repos/repos.index");
const getPageIndex = path => {
    return routes_index_1.default[path];
};
const getPageModel = index => {
    return pages_index_1.default[index];
};
const getDocument = (repo, index) => {
    return repos_index_1.default.getDocument(repo, index);
};
const isPromise = object => {
    return !!object.then;
};
let master = {
    isPromise,
    getPageIndex,
    getPageModel,
    getDocument,
};
exports.default = master;
