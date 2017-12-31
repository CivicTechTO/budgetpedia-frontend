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
                fieldproperties: {
                    horizontal: true,
                    commonstructure: true,
                },
                fieldmeta: {
                    date: {
                        type: 'date',
                        layout: 'YYYY-MM-DD',
                        format: 'LL',
                        name: 'Date',
                    },
                    budget_type: {
                        name: 'Budget Type',
                    },
                    budget_event: {
                        name: 'Event',
                    },
                    public: {
                        name: 'Public',
                    },
                },
                headermarkup: `
### Preparation

#### Analyst meetings and preliminary budget creation at the program level

The first phase of budget production begins with analyst meetings, and continues with creation of preliminary budgets.
`,
                items: [
                    {
                        fields: {
                            date: "2015-5-19",
                            budget_type: "Capital",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program pesonnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-5-19",
                            budget_type: "Operating",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program personnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-5-29",
                            budget_type: "Rate",
                            budget_event: "**Financial Planning Division Analyst** Meetings with **Program personnel** to identify and resolve issues",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-5",
                            budget_type: "Rate",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-5",
                            budget_type: "Operating",
                            budget_event: "Operating Budget (Pre-Submission Shared Stage)",
                            public: "No",
                        },
                    },
                    {
                        fields: {
                            date: "2015-6-15",
                            budget_type: "All",
                            budget_event: "Preliminary Budget Submission Deadline",
                            public: "No",
                        },
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
