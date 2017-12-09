"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let cards = {
    mainpageheader: {
        type: 'card',
        controller: 'card',
        index: 'mainpageheader',
        description: 'header for the main page',
        fields: {},
        components: [
            {
                type: 'htmlview',
                controller: 'card',
                index: 'htmlview',
                description: 'images at right of header',
                properties: {
                    htmlindex: 'headerimages',
                    htmlrepo: 'html',
                },
            },
            {
                type: 'cardtitle',
                controller: 'card',
                index: 'cardtitle',
                properties: {
                    Title: "Welcome to Budgetpedia",
                    Subtitle: "Supporting informed debate about the Toronto budget",
                }
            }
        ],
    },
    mainpagefooter: {
        controller: 'card',
        type: 'card',
        index: 'mainpagefooter',
        description: 'footer for the main page',
        fields: {},
        components: [],
    }
};
exports.default = cards;