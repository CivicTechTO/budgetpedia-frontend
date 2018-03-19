"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let toplinklist = {
    controller: 'list',
    index: 'toplinklist',
    type: 'linklist',
    properties: {
        upperDivider: true,
        header: 'Browse our site:',
        items: [
            {
                prompt: "See information about Toronto's budget decision cycle at our",
                icon: '/public/icons/ic_map_48px.svg',
                target: '/roadmap/',
                targetText: 'Budget Roadmap',
                suffix: 'page',
            },
            {
                prompt: 'See budget details on our',
                icon: '/public/icons/ic_attach_money_48px.svg',
                target: '/budgets',
                targetText: 'Budgets',
                suffix: 'page',
            },
            {
                prompt: 'Explore the Toronto budget with our',
                icon: '/public/icons/ic_explore_48px.svg',
                target: '/explorer',
                targetText: 'Budget Explorer',
            },
            {
                prompt: 'Find related',
                icon: '/public/icons/ic_library_books_48px.svg',
                target: '/resources',
                targetText: 'Resources',
            },
            {
                prompt: 'See our Toronto budgeting overview',
                icon: '/public/icons/ic_wb_sunny_black_48px.svg',
                target: '/overview',
                targetText: 'Overview',
            },
            {
                prompt: 'See our publications on our subsite',
                icon: '/public/icons/ic_wb_sunny_black_48px.svg',
                target: 'http://pubs.budgetpedia.ca',
                targetText: 'pubs.budgetpedia.ca',
                external: true,
            },
        ],
    }
};
let secondlinklist = {
    controller: 'list',
    index: 'secondlinklist',
    type: 'linklist',
    properties: {
        upperDivider: true,
        header: 'Follow us:',
        items: [
            {
                external: true,
                prompt: 'For news check out our',
                icon: '/public/icons/twitter.png',
                target: 'http://twitter.com/budgetpedia',
                targetText: 'Twitter account',
                imageStyle: {
                    height: '14px'
                }
            },
            {
                external: true,
                prompt: 'For in-depth articles see our',
                icon: '/public/icons/medium.png',
                target: 'http://medium.com/budgetpedia',
                targetText: 'Medium publication',
            },
        ],
    },
};
let thirdlinklist = {
    controller: 'list',
    index: 'thirdlinklist',
    type: 'linklist',
    properties: {
        header: 'More media (experimental):',
        items: [
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/budgetpedia',
                targetText: 'our Facebook page',
            },
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/groups/budgetpedia',
                targetText: 'our Facebook group',
            },
            {
                external: true,
                prompt: 'For technical discussions:',
                icon: '/public/icons/g-logo.png',
                target: 'http://groups.google.com/d/forum/budgetpedia',
                targetText: 'our Google forum',
            },
            {
                external: true,
                prompt: 'Videos:',
                icon: '/public/icons/YouTube-icon-full_color.png',
                target: 'https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig',
                targetText: 'YouTube',
            },
            {
                external: true,
                prompt: 'Blog:',
                icon: '/public/icons/blogspot.jpeg',
                target: 'http://budgetpedia.blogspot.ca/',
                targetText: 'Blogspot',
            },
        ]
    }
};
let linklists = {
    toplinklist,
    secondlinklist,
    thirdlinklist,
};
exports.default = linklists;
