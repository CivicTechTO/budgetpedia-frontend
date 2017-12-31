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
            },
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
                        content: `first item`,
                        fields: {
                            first: {
                                name: 'First Field',
                                content: '**something**'
                            },
                            second: {
                                name: 'Second Field',
                                content: '**something else**'
                            },
                        },
                        suffix: `## something`,
                    },
                    {
                        content: `second item`,
                        fields: {
                            first: {
                                name: 'First Field',
                                content: '**in second something**'
                            },
                            second: {
                                name: 'Second Field',
                                content: '**in second something else**'
                            },
                        },
                        suffix: `## second something`,
                    },
                ],
            },
        },
    ],
};
let papers = {
    insiderview,
};
exports.default = papers;
