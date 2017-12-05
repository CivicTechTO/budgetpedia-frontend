"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pages = {
    'home': {
        type: 'page',
        id: 'home',
        fields: {
            browser: {
                title: 'Budgetpedia',
                description: 'supporting informed debate about the Toronto budget'
            }
        },
        components: [
            {
                type: 'section',
                id: 'header',
                description: 'header for main page of website',
                fields: {
                    title: null,
                    description: null,
                },
                compononents: [
                    {
                        repo: 'cards',
                        type: 'card',
                        id: 'mainpageheader',
                    }
                ]
            },
            {
                type: 'section',
                id: 'nuggets',
                description: 'sets of introductory nugget lists',
                fields: {
                    title: 'Quick Stats',
                    description: `
Here are some quick statistics about Toronto and its finances
`,
                    tag: 'Quick Stats',
                },
                components: [
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        id: 'abouttoronto',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        id: 'torontofinances',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        id: 'torontotrends',
                    },
                ]
            },
            {
                type: 'section',
                id: 'twitterfeed',
                description: 'twitter feed for budgetpedia',
                fields: {
                    tag: 'Twitter',
                },
                components: [
                    {
                        type: 'twitterfeed',
                        repo: 'twitterfeeds',
                        id: 'budgetpedia',
                    },
                ]
            },
            {
                type: 'section',
                id: 'tiles',
                description: 'navigation tiles to the site main pages',
                components: [
                    {
                        type: 'tilelist',
                        id: 'mainpages',
                        repo: 'tilelists',
                    },
                ]
            },
            {
                type: 'section',
                id: 'footer',
                description: 'footer for the main page',
                components: [
                    {
                        type: 'card',
                        repo: 'cards',
                        id: 'mainpagefooter',
                    }
                ]
            },
        ],
    }
};
exports.default = pages;
