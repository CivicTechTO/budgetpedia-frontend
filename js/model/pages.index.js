"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pages = {
    home: {
        type: 'page',
        index: 'home',
        fields: {
            browser: {
                title: 'Budgetpedia',
                description: 'supporting informed debate about the Toronto budget'
            }
        },
        components: [
            {
                type: 'section',
                index: 'header',
                description: 'header for main page of website',
                fields: {
                    title: null,
                    description: null,
                },
                compononents: [
                    {
                        repo: 'cards',
                        type: 'card',
                        index: 'mainpageheader',
                    }
                ]
            },
            {
                type: 'section',
                index: 'nuggets',
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
                        index: 'abouttoronto',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        index: 'torontofinances',
                    },
                    {
                        type: 'nuggetlist',
                        repo: 'nuggetlists',
                        index: 'torontotrends',
                    },
                ]
            },
            {
                type: 'section',
                index: 'twitterfeed',
                description: 'twitter feed for budgetpedia',
                fields: {
                    tag: 'Twitter',
                },
                components: [
                    {
                        type: 'twitterfeed',
                        repo: 'twitterfeeds',
                        index: 'budgetpedia',
                    },
                ]
            },
            {
                type: 'section',
                index: 'tiles',
                description: 'navigation tiles to the site main pages',
                components: [
                    {
                        type: 'tilelist',
                        index: 'mainpages',
                        repo: 'tilelists',
                    },
                ]
            },
            {
                type: 'section',
                index: 'footer',
                description: 'footer for the main page',
                components: [
                    {
                        type: 'card',
                        repo: 'cards',
                        index: 'mainpagefooter',
                    }
                ]
            },
        ],
    }
};
exports.default = pages;
