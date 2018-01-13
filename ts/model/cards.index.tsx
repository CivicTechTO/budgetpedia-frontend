// cards.index.tsx

let budgetssummary = {
    type:'card',
    controller: 'card',
    index:'summary',
    description:'summary of budgets',
    properties: {
        style: {
            margin:"16px",
            border:"2px solid silver",
            borderRadius:"8px",
            boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        }
    },
    children: [
        {
            type:'cardtitle',
            controller: 'card',
            index:'tableofcontents',
            description:'summary title',
            properties:{
                title: 'Summary',
                titleStyle: {
                    fontSize:'20px',
                    fontWeight:'bold',
                },
                style:{
                    padding:"16px 16px 0 16px",
                },
            },
        },
        {
            type:'cardtext',
            controller: 'card',
            index:'summary',
            description:'summary of budgets',
            properties:{
                style:{
                    padding:'0 16px',
                    fontSize:'16px',
                },
            },
            children: [
                {
                    type:'markupblock',
                    controller: 'card',
                    index:'tableofcontents',
                    description:'page table of contents',
                    properties:{
                        markup:
`### Budget structure

Like most budgets, the City or Toronto budget consists of an _operating budget_ and a _capital budget_.

At its core, an operating budget is an estimation of future (annual) operating staffing costs, and consumable
goods and services purchased for the purpose of supporting those staff in performing their day to day 
tasks. 

A capital budget consists of money to purchase or improve capital assets, which are the assets that
are used on an ongoing basis to provide (operating) services. These include tangible assets (like 
buildings and vehicles) and other investments. 

_State of good repair_ budgets are a gray area, and their treatment varies. If they _improve_ the assets 
to which they are applied, they are considered capital costs. If they simply prevent excessive deterioration 
of an asset, they are considered operating costs. Toronto budgets treat state of good repair as capital costs.

### Budget purpose

The clear purpose of budgets is to provide measurable criteria for evaluating performance, and therefore
provide a basis for creating improvements in management. In addition, municipal budgets are intended to inform
the public. For both reasons, they must be clear and unambiguous.

### Interpreting the Toronto Budget

It is important to understand that Toronto uses unconventional methods with its budgeting, together with 
conflations and even errors, to the point of being idiosyncratic. In addition there are signs that the 
underlying accounting systems continue to have serious deficiencies (a full generation after amalgamation), and 
therefore questions about accuracy. Finally, although a substantial amount of information is released, 
granular information is not, leaving much of the data to be untestable. All of this, taken together, makes 
it difficult if not impossible to rely on budgetary information for detailed analytics. In other words 
Toronto budgets are neither clear nor unambiguous. Moreover they do not easily compare to audited statements, 
for evaluating outcomes.

Instead, we urge readers to use budget information for general information, with caution, and rely more on 
audited statements for meaningful trends.
`,
                    },
                },
            ],
        },
    ],
}


let roadmapsummary = {
    type:'card',
    controller: 'card',
    index:'summary',
    description:'summary of roadmap',
    properties: {
        style: {
            margin:"16px",
            border:"2px solid silver",
            borderRadius:"8px",
            boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        }
    },
    children: [
        {
            type:'cardtitle',
            controller: 'card',
            index:'tableofcontents',
            description:'summary title',
            properties:{
                title: 'Summary',
                titleStyle: {
                    fontSize:'20px',
                    fontWeight:'bold',
                },
                style:{
                    padding:"16px 16px 0 16px",
                },
            },
        },
        {
            type:'cardtext',
            controller: 'card',
            index:'summary',
            description:'summary of roadmap',
            properties:{
                style:{
                    padding:'0 16px',
                    fontSize:'16px',
                },
            },
            children: [
                {
                    type:'markupblock',
                    controller: 'card',
                    index:'tableofcontents',
                    description:'page table of contents',
                    properties:{
                        markup:
`### Budget scope

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
process the Budget Committee receives high level (divisoin and agency level) variance reports from the Financial Planning Division on a quarterly
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
}


let mainpageheader = {
    controller:'card',
    index:'mainpageheader',
    description:'header for the main page',
    lookups:{
        style: {
            repo:'styles',
            index:'headercardstyle',
        },
    },
    wrapper:{
        type:'div',
        properties: {
            style:{ 
                margin:"8px", 
            },
        },
    },
    type:'card',
    properties:{},
    children:[
        {
            controller:'card',
            index:'htmlview',
            description:'images at right of header',
            lookups: {
                html: {
                    index:'headerimages',
                    repo:'html',
                },
            },
            type:'htmlview',
        },
        {
            controller:'card',
            index:'cardtitle',
            type:'cardtitle',
            properties: {
                title:"This is _Budgetpedia_",
                subtitle:"Supporting informed debate about the Toronto budget",
                style:{
                    padding:"16px 16px 0 16px",
                },
                titleStyle: {
                    fontSize:'20px',
                    fontWeight:'bold'
                },
            },
        },
        {
            controller:'card',
            index:'cardtext',
            type:'cardtext',
            properties: {
                style: {
                    fontSize:'16px',
                },
            },
            children:[
                {
                    index:'toplinklist',
                    repo:'linklists',
                },
                {
                    index:'secondlinklist',
                    repo:'linklists',
                },
            ],
        },
    ],
}

let mainpagefooter = {
    controller:'card',
    index:'mainpagefooter',
    description:'footer for the main page',
    lookups:{
        style: {
            repo:'styles',
            index:'footercardstyle',
        },
    },
    wrapper: {
        type:'div',
        properties:{
            style: { 
                padding:"8px", 
            },
        },
    },
    type:'card',
    properties:{},
    children:[
        {
            controller:'card',
            index:'cardtext',
            type:'cardtext',
            properties: {
            },
            children:[
                {
                    index:'thirdlinklist',
                    repo:'linklists',
                },
            ],
        },
    ],
}

let cards = {
    budgetssummary,
    roadmapsummary,
    mainpageheader,
    mainpagefooter,
}

export default cards