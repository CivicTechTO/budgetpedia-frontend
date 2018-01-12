"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let roadmapsummary = {
    type: 'card',
    controller: 'card',
    index: 'summary',
    description: 'summary of roadmap',
    properties: {
        style: {
            margin: "16px 16px 32px 16px",
            border: "2px solid silver",
            borderRadius: "8px",
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        }
    },
    children: [
        {
            type: 'cardtitle',
            controller: 'card',
            index: 'tableofcontents',
            description: 'summary title',
            properties: {
                title: 'Summary',
                titleStyle: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                },
                style: {
                    padding: "16px 16px 0 16px",
                },
            },
        },
        {
            type: 'cardtext',
            controller: 'card',
            index: 'summary',
            description: 'summary of roadmap',
            properties: {
                style: {
                    padding: '0 16px',
                    fontSize: '16px',
                },
            },
            children: [
                {
                    type: 'markupblock',
                    controller: 'card',
                    index: 'tableofcontents',
                    description: 'page table of contents',
                    properties: {
                        markup: `### Budget scope

The City of Toronto has about 60 divisions (directly managed by the City Manager) and agencies 
(managed at arms length). Collectively called _programs_, these organizations are staffed by
about 55,000 people. The operating budget for all this activity is around $12B.

### Budget creation process 

We are informed through Freedom of Information requests that budgeting is begun at the _cost-centre_ level 
(there are about 13,000 of these),
and rolled up from there both for an organizational view (roughly through units, sections, and programs), 
and a services view (roughly sub-activities, activiites, services and programs).

The results are assembled by Financial Planning Division (FPD) Analysts, and reviewed and negotiated with the 
FPD Executive Director. It then goes through iterations involving the Chief Financial Officer, Deputy City Managers,
and the City Manager. Subsequently it goes through iterations involving the Budget Committee, the Executive Committee,
and City Council. Public deputations (typically with 5 minute limitations) are invited by the Budget Committee
a couple of months before the budget is approved by City Council.

### Strategy and evaluation

Prior to this process senior City staff and politicians develop a general strategy and priorities. Subsequent to this
process the Budget Committee receives variance reports from the Financial Planning Division on a quarterly
basis, to review actual expenditures against the budgets.

Finally an audited statement for the budget year is issued about half a year after the budget year is over, and
some 27 months after the process begins.

### Improvements

Although much material is published throughout this long cycle, we think that given the size and importance
of the budget, more delegation, inclusiveness and collaborarion at all levels around
the budget process would very likely lead to better outcomes for all.

`,
                    },
                },
            ],
        },
    ],
};
let mainpageheader = {
    controller: 'card',
    index: 'mainpageheader',
    description: 'header for the main page',
    lookups: {
        style: {
            repo: 'styles',
            index: 'headercardstyle',
        },
    },
    wrapper: {
        type: 'div',
        properties: {
            style: {
                padding: "8px",
            },
        },
    },
    type: 'card',
    properties: {},
    children: [
        {
            controller: 'card',
            index: 'htmlview',
            description: 'images at right of header',
            lookups: {
                html: {
                    index: 'headerimages',
                    repo: 'html',
                },
            },
            type: 'htmlview',
        },
        {
            controller: 'card',
            index: 'cardtitle',
            type: 'cardtitle',
            properties: {
                title: "This is _Budgetpedia_",
                subtitle: "Supporting informed debate about the Toronto budget",
                style: {
                    padding: "16px 16px 0 16px",
                },
                titleStyle: {
                    fontSize: '20px',
                    fontWeight: 'bold'
                },
            },
        },
        {
            controller: 'card',
            index: 'cardtext',
            type: 'cardtext',
            properties: {
                style: {
                    fontSize: '16px',
                },
            },
            children: [
                {
                    index: 'toplinklist',
                    repo: 'linklists',
                },
                {
                    index: 'secondlinklist',
                    repo: 'linklists',
                },
            ],
        },
    ],
};
let mainpagefooter = {
    controller: 'card',
    index: 'mainpagefooter',
    description: 'footer for the main page',
    lookups: {
        style: {
            repo: 'styles',
            index: 'footercardstyle',
        },
    },
    wrapper: {
        type: 'div',
        properties: {
            style: {
                padding: "8px",
            },
        },
    },
    type: 'card',
    properties: {},
    children: [
        {
            controller: 'card',
            index: 'cardtext',
            type: 'cardtext',
            properties: {},
            children: [
                {
                    index: 'thirdlinklist',
                    repo: 'linklists',
                },
            ],
        },
    ],
};
let cards = {
    roadmapsummary,
    mainpageheader,
    mainpagefooter,
};
exports.default = cards;
