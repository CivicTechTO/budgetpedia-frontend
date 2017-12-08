"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repos_interface_1 = require("../repos/repos.interface");
const getPageIndex = path => {
    return repos_interface_1.default.getDocument('routes', path);
};
const getPageModel = index => {
    return repos_interface_1.default.getDocument('pages', index);
};
const getDocument = (repo, index) => {
    return repos_interface_1.default.getDocument(repo, index);
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
