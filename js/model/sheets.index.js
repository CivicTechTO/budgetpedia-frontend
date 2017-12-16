"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let citybasics = {
    controller: 'sheet',
    index: 'citybasics',
    description: 'describe the basics of what the city does',
    lookups: {
        draftdata: {
            repo: 'draft',
            index: 'citybasics',
        },
    },
    type: 'sheet',
    properties: {},
};
let cityprocess = {
    controller: 'sheet',
    index: 'cityprocess',
    description: 'describe the process of basic budgeting',
    lookups: {
        draftdata: {
            repo: 'draft',
            index: 'cityprocess',
        },
    },
    type: 'sheet',
    properties: {},
};
let concerns = {
    controller: 'sheet',
    index: 'concerns',
    description: 'the concerns of budgetpedia relating to the City of Toronto budget',
    lookups: {
        draftdata: {
            repo: 'draft',
            index: 'concerns',
        }
    },
    type: 'sheet',
    properties: {},
};
let sheets = {
    citybasics,
    cityprocess,
    concerns,
};
exports.default = sheets;
