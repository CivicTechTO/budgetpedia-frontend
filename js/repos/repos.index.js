"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDocument = (repo, index) => {
    console.log('requested document(repo, index)', repo, index);
    return {};
};
let repos = {
    getDocument,
};
exports.default = repos;
