"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pages = {
    home: {
        controller: 'page',
        index: 'home',
        type: 'page',
        properties: {
            title: 'Budgetpedia',
            description: 'supporting informed debate about the Toronto budget',
        },
        children: [
            {
                controller: 'section',
                index: 'header',
                anchor: 'header',
                description: 'header for main page of website',
                type: 'section',
                tag: 'Welcome',
                properties: {
                    title: "Welcome",
                    description: "We're an independent, non-profit, volunteer organization based in Toronto, Canada.",
                },
                children: [
                    {
                        controller: 'card',
                        repo: 'cards',
                        index: 'mainpageheader',
                    }
                ],
            },
            {
                controller: 'section',
                index: 'nuggets',
                anchor: 'statistics',
                description: 'sets of introductory nugget lists',
                type: 'section',
                tag: 'Quick Statistics',
                properties: {
                    title: 'Quick Statistics',
                    description: "Here are some quick statistics about Toronto and its finances. We've highlighted a few. Each row scrolls left and right.",
                },
                children: [
                    {
                        controller: 'list',
                        repo: 'nuggetlists',
                        index: 'abouttoronto',
                    },
                    {
                        controller: 'list',
                        repo: 'nuggetlists',
                        index: 'torontofinances',
                    },
                    {
                        controller: 'list',
                        repo: 'nuggetlists',
                        index: 'torontotrends',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'basics',
                anchor: 'basics',
                description: 'basic help text and links',
                type: 'section',
                tag: 'The Basics',
                properties: {
                    title: 'The Basics',
                    description: 'What the City of Toronto does, and how the budget process works.',
                    style: {
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo: 'sheets',
                        index: 'citybasics',
                    },
                    {
                        controller: 'sheet',
                        repo: 'sheets',
                        index: 'cityprocess',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'concerns',
                anchor: 'challenges',
                description: 'links to issues',
                type: 'section',
                tag: 'The Challenges',
                properties: {
                    title: 'The Challenges',
                    description: 'Some basic opportunites and issues we think should be addressed.',
                    style: {
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo: 'sheets',
                        index: 'opportunities',
                    },
                    {
                        controller: 'sheet',
                        repo: 'sheets',
                        index: 'concerns',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'stories',
                anchor: 'stories',
                description: 'introduction to stories',
                type: 'section',
                tag: 'The Stories',
                properties: {
                    title: 'The Stories',
                    description: "We're organizing around stories.",
                    style: {
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo: 'sheets',
                        index: 'stories',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'twitterfeed',
                anchor: 'twitter',
                description: 'twitter feed for budgetpedia',
                type: 'section',
                tag: 'Twitter Feed',
                properties: {
                    title: 'Our Twitter Feed',
                    description: 'Jump into the conversation [here](http://twitter.com/budgetpedia){target=_blank}.',
                    style: {
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'media',
                        repo: 'media',
                        index: 'budgetpediatwitter',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'tiles',
                anchor: 'website',
                description: 'navigation tiles to the site main pages',
                type: 'section',
                tag: 'More...',
                properties: {
                    title: 'Our Website',
                    description: 'The main pages of our website. The tiles scroll left and right.',
                    style: {
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'list',
                        index: 'mainpages',
                        repo: 'tilelists',
                    },
                ],
            },
            {
                controller: 'section',
                index: 'footer',
                anchor: 'footer',
                description: 'footer for the main page',
                type: 'section',
                children: [
                    {
                        controller: 'card',
                        repo: 'cards',
                        index: 'mainpagefooter',
                    }
                ],
            },
        ],
    }
};
exports.default = pages;
