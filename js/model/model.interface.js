"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_index_1 = require("./cards.index");
const pages_index_1 = require("./pages.index");
const routes_index_1 = require("./routes.index");
const styles_index_1 = require("./styles.index");
const html_index_1 = require("./data/html.index");
const linklists_index_1 = require("./linklists.index");
let repositories = {
    cards: cards_index_1.default,
    pages: pages_index_1.default,
    routes: routes_index_1.default,
    styles: styles_index_1.default,
    html: html_index_1.default,
    linklists: linklists_index_1.default,
};
const getDocument = (repo, index) => {
    console.log('requested document(repo, index)', repo, index);
    if (!repositories[repo] || !repositories[repo][index])
        return {};
    return repositories[repo][index];
};
let model = {
    getDocument,
};
exports.default = model;
