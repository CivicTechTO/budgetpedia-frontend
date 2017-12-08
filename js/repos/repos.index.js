"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cards_index_1 = require("./data/cards.index");
let repositories = {
    cards: cards_index_1.default,
};
const getDocument = (repo, index) => {
    console.log('requested document(repo, index)', repo, index);
    return repositories[repo][index] || {};
};
let repos = {
    getDocument,
};
exports.default = repos;
