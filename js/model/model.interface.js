"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_index_1 = require("./cards.index");
const pages_index_1 = require("./pages.index");
const routes_index_1 = require("./routes.index");
const styles_index_1 = require("./styles.index");
const linklists_index_1 = require("./linklists.index");
const nuggetlists_index_1 = require("./nuggetlists.index");
const tilelists_index_1 = require("./tilelists.index");
const media_index_1 = require("./media.index");
const sheets_index_1 = require("./sheets.index");
const html_index_1 = require("./data/html.index");
const draft_index_1 = require("./data/draft.index");
const papers_index_1 = require("./papers.index");
const sections_index_1 = require("./sections.index");
let repositories = {
    cards: cards_index_1.default,
    pages: pages_index_1.default,
    routes: routes_index_1.default,
    styles: styles_index_1.default,
    linklists: linklists_index_1.default,
    nuggetlists: nuggetlists_index_1.default,
    tilelists: tilelists_index_1.default,
    media: media_index_1.default,
    sheets: sheets_index_1.default,
    html: html_index_1.default,
    draft: draft_index_1.default,
    papers: papers_index_1.default,
    sections: sections_index_1.default,
};
const getDocument = (repo, index) => {
    let indexes = index.split('.');
    let node = repositories[repo];
    if (!node)
        return {};
    for (let n = 0; n < indexes.length; n++) {
        node = node[indexes[n]];
        if (!node)
            return {};
    }
    return node;
};
let model = {
    getDocument,
};
exports.default = model;
