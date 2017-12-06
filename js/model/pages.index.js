"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pages = {
    home: {
        type: 'page',
        key: 'home',
        fields: {
            browser: {
                title: 'Budgetpedia',
                description: 'supporting informed debate about the Toronto budget'
            }
        },
        components: [
            {
                type: 'section',
                key: 'header',
                description: 'header for main page of website',
                fields: {
                    title: null,
                    description: null,
                },
                compononents: [
                    {
                        repo: 'cards',
                        type: 'card',
                        key: 'mainpageheader',
                    }
                ]
            },
            {
                type: 'section',
                key: 'nuggets',
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
                        key: 'abouttoronto',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        key: 'torontofinances',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        key: 'torontotrends',
                    },
                ]
            },
            {
                type: 'section',
                key: 'twitterfeed',
                description: 'twitter feed for budgetpedia',
                fields: {
                    tag: 'Twitter',
                },
                components: [
                    {
                        type: 'twitterfeed',
                        repo: 'twitterfeeds',
                        key: 'budgetpedia',
                    },
                ]
            },
            {
                type: 'section',
                key: 'tiles',
                description: 'navigation tiles to the site main pages',
                components: [
                    {
                        type: 'tilelist',
                        key: 'mainpages',
                        repo: 'tilelists',
                    },
                ]
            },
            {
                type: 'section',
                key: 'footer',
                description: 'footer for the main page',
                components: [
                    {
                        type: 'card',
                        repo: 'cards',
                        key: 'mainpagefooter',
                    }
                ]
            },
        ],
    }
};
exports.default = pages;
