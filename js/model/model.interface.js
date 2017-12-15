"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_index_1 = require("./cards.index");
const pages_index_1 = require("./pages.index");
const routes_index_1 = require("./routes.index");
const styles_index_1 = require("./styles.index");
const html_index_1 = require("./data/html.index");
const linklists_index_1 = require("./linklists.index");
const nuggetlists_index_1 = require("./nuggetlists.index");
const tilelists_index_1 = require("./tilelists.index");
const media_index_1 = require("./media.index");
const sheets_index_1 = require("./sheets.index");
let repositories = {
    cards: cards_index_1.default,
    pages: pages_index_1.default,
    routes: routes_index_1.default,
    styles: styles_index_1.default,
    html: html_index_1.default,
    linklists: linklists_index_1.default,
    nuggetlists: nuggetlists_index_1.default,
    tilelists: tilelists_index_1.default,
    media: media_index_1.default,
    sheets: sheets_index_1.default,
};
const getDocument = (repo, index) => {
    let output;
    if (!repositories[repo] || !repositories[repo][index]) {
        output = {};
    }
    else {
        output = repositories[repo][index];
    }
    console.log('requested document(repo, index)', repo, index);
    return output;
};
let model = {
    getDocument,
};
exports.default = model;
