"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let citybasics = require('./draft/citybasics.json');
let cityprocess = require('./draft/cityprocess.json');
let concerns = require('./draft/concerns.json');
let opportunities = require('./draft/opportunities.json');
let stories = require('./draft/stories.json');
let councilservices = require('./draft/councilservices.json');
let draft = {
    councilservices,
    citybasics,
    cityprocess,
    concerns,
    opportunities,
    stories,
};
exports.default = draft;
