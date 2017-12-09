"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let mainpageheader = {
    type: 'card',
    controller: 'card',
    index: 'mainpageheader',
    description: 'header for the main page',
    lookups: {
        style: {
            repo: 'styles',
            index: 'headercardstyle',
        },
    },
    properties: {},
    components: [
        {
            type: 'htmlview',
            controller: 'card',
            index: 'htmlview',
            description: 'images at right of header',
            lookups: {
                html: {
                    index: 'headerimages',
                    repo: 'html',
                }
            },
            properties: {},
        },
        {
            type: 'cardtitle',
            controller: 'card',
            index: 'cardtitle',
            properties: {
                title: "Welcome to Budgetpedia",
                subtitle: "Supporting informed debate about the Toronto budget",
                style: {
                    padding: "16px 16px 0 16px",
                },
                titleStyle: {
                    fontSize: '20px',
                    fontWeight: 'bold'
                },
            },
        },
        {
            type: 'cardtext',
            controller: 'card',
            index: 'cardtext',
            properties: {
                style: {
                    fontSize: '16px',
                },
            },
            components: [
                {
                    controller: 'list',
                    index: 'toplinklist',
                    repo: 'linklists',
                },
                {
                    controller: 'list',
                    index: 'secondlinklist',
                    repo: 'linklists',
                },
            ],
        },
    ],
};
let mainpagefooter = {
    controller: 'card',
    type: 'card',
    index: 'mainpagefooter',
    description: 'footer for the main page',
    properties: {},
    components: [],
};
let cards = {
    mainpageheader,
    mainpagefooter,
};
exports.default = cards;
