"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let budgetpediatwitter = {
    controller: 'media',
    index: 'budgetpediatwitter',
    description: 'budgetpedia twitter feed',
    type: 'timeline',
    properties: {
        dataSource: {
            sourceType: 'url',
            url: 'https://twitter.com/budgetpedia'
        },
        options: {
            username: 'Budgetpedia',
            height: '400'
        },
    },
    wrapper: {
        type: 'div',
        properties: {
            style: {
                maxWidth: '600px',
                margin: '0 auto'
            },
        },
        wrapper: {
            type: 'div',
            properties: {
                style: {
                    padding: '32px',
                    backgroundColor: 'silver',
                },
            },
        },
    },
};
let media = {
    budgetpediatwitter,
};
exports.default = media;
