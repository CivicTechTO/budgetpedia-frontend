"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_repo_1 = require("./cards.repo");
const pages_repo_1 = require("./pages.repo");
const routes_repo_1 = require("./routes.repo");
let repositories = {
    cards: cards_repo_1.default,
    pages: pages_repo_1.default,
    routes: routes_repo_1.default,
};
const getDocument = (repo, index) => {
    console.log('requested document(repo, index)', repo, index);
    return repositories[repo][index] || {};
};
let repos = {
    getDocument,
};
exports.default = repos;
