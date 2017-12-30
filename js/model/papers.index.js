"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let insiderview = {
    controller: 'paper',
    index: 'insiderview',
    description: 'describe insider details of budget process',
    type: 'paper',
    properties: {
        zDepth: 3,
    },
    children: [
        {
            controller: 'paper',
            type: 'markupblock',
            index: 'introduction',
            description: 'introduction of insider data',
            properties: {
                markup: `## test`,
            }
        },
        {
            controller: 'list',
            type: 'markuplist',
            index: 'insiderlist',
            description: 'first',
            properties: {
                headermarkup: `This is an item list header`,
                items: [
                    {
                        content: `first item`
                    }
                ]
            },
        },
    ],
};
let papers = {
    insiderview,
};
exports.default = papers;
