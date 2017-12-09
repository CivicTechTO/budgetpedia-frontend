"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let toplinklist = {
    header: 'Browse our site:',
    items: [
        {
            prompt: 'Explore the Toronto budget with our',
            icon: '/public/icons/ic_explore_48px.svg',
            target: '/explorer',
            targetText: 'Budget Explorer',
        },
        {
            prompt: "See information about Toronto's budget decision schedule at our",
            icon: '/public/icons/ic_map_48px.svg',
            target: '/roadmap',
            targetText: 'Budget Roadmap',
        },
        {
            prompt: 'Find related',
            icon: '/public/icons/ic_library_books_48px.svg',
            target: '/resources',
            targetText: 'Resources',
        },
    ],
};
let secondlinklist = {
    header: 'Follow us:',
    items: [
        {
            external: true,
            prompt: 'For news check out our',
            icon: '/public/icons/twitter.png',
            target: 'http://twitter.com/budgetpedia',
            targetText: 'Twitter account',
            description: '... or see the twitter feed below',
            imageStyle: { height: '14px' }
        },
        {
            external: true,
            prompt: 'For in-depth articles see our',
            icon: '/public/icons/medium.png',
            target: 'http://medium.com/budgetpedia',
            targetText: 'Medium publication',
        },
    ],
};
let linklists = {
    toplinklist,
    secondlinklist,
};
exports.default = linklists;
