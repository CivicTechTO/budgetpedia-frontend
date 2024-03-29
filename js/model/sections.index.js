// sections.index.tsx
let contents = {
    controller: 'section',
    index: 'contents',
    anchor: 'contents',
    description: 'generic contents section',
    type: 'section',
    tag: 'Contents',
    properties: {
    // title:"Page Contents",
    },
    children: [
        {
            controller: 'section',
            type: 'toc',
            index: 'tableofcontents',
            description: 'page table of contents',
        },
    ],
};
let basicsheader = {
    controller: 'section',
    index: 'contents',
    anchor: 'contents',
    description: 'basics header',
    type: 'section',
    tag: 'Top: Basics',
    properties: {
        title: "Budget Basics",
        description: `
Basics about budgeting. A good place to get started.

Taking a tour? 
[next page](/design)
<span style= "vertical-align:middle" class="material-icons">navigate_next</span>
`,
    },
    children: [
        {
            controller: 'section',
            type: 'toc',
            index: 'tableofcontents',
            description: 'page table of contents',
        },
    ],
};
let trackerheader = {
    controller: 'section',
    index: 'contents',
    anchor: 'contents',
    description: 'tracker header',
    type: 'section',
    tag: 'Top: Tracker',
    properties: {
        title: "Budget Tracker",
        description: `
Tracking budget information, events, and links

Taking a tour?
[next page](/explorer)
<span style= "vertical-align:middle" class="material-icons">navigate_next</span><span style= "vertical-align:middle" class="material-icons">navigate_before</span>
[previous page](/process)
<span style= "vertical-align:middle" class="material-icons">first_page</span>
[start](/basics)
`,
    },
    children: [
        {
            controller: 'section',
            type: 'toc',
            index: 'tableofcontents',
            description: 'page table of contents',
        },
    ],
};
let budgettypes = {
    controller: 'section',
    index: 'budgettypes',
    anchor: 'budgettypes',
    description: 'types of budgets',
    type: 'section',
    tag: 'Types',
    properties: {
        title: "Budget Types",
        description: `Read about budget types here.

`,
    },
    children: [
        {
            repo: 'papers',
            index: 'basicbudgettypes',
        },
    ],
};
let budgetflows = {
    controller: 'section',
    index: 'budgetflows',
    anchor: 'budgetflows',
    description: 'budget flows',
    type: 'section',
    tag: 'Flows',
    properties: {
        title: "Budget Flows",
        description: `This section is about budget flows and reporting categories.

`,
    },
    children: [
        {
            repo: 'papers',
            index: 'basicbudgetflows',
        },
    ],
};
let budgetuses = {
    controller: 'section',
    index: 'budgetuses',
    anchor: 'budgetuses',
    description: 'budget uses',
    type: 'section',
    tag: 'Uses',
    properties: {
        title: "Budget Uses",
        description: `But why? Answer: to plan, control, and communicate. Ultimately budgeting is a 
discipline to implement improvements for everyone.

`,
    },
    children: [
        {
            repo: 'papers',
            index: 'basicbudgetuses',
        },
    ],
};
let budgetvariations = {
    controller: 'section',
    index: 'budgetvariaions',
    anchor: 'budgetvariations',
    description: 'variations of budgets',
    type: 'section',
    tag: 'Variations',
    properties: {
        title: "Budget Variations",
        description: `This is where things start to get tricky. If you're only interested in budget basics,
feel free to stop reading here. If you're interested in the City of Toronto budget, keep
reading.

`,
    },
    children: [
        {
            repo: 'papers',
            index: 'basicbudgetvariations',
        },
    ],
};
let instances = {
    controller: 'section',
    index: 'instances',
    anchor: 'instances',
    description: 'instances for budgets page',
    type: 'section',
    tag: 'Instances',
    properties: {
        title: "Budget Instances",
        description: `Read about specific budgets and variants here.

`,
    },
    children: [
        {
            repo: 'papers',
            index: 'budget2018',
        },
        {
            repo: 'papers',
            index: 'budget2017',
        },
        {
            repo: 'papers',
            index: 'participatory',
        },
        {
            repo: 'papers',
            index: 'investinginto',
        },
    ],
};
let torontobudget = {
    controller: 'section',
    index: 'torontobudget',
    anchor: 'torontobudget',
    description: 'header for overview page',
    type: 'section',
    tag: 'A Management Budget',
    properties: {
        title: "An Ancillary Toronto Operating _Management_ Budget",
        description: `
Here is what we think is a more accessible view of the Toronto budget.
`,
    },
    children: [
        {
            repo: 'papers',
            index: 'torontobudget',
        },
    ]
};
let aboutbudgetpedia = {
    controller: 'section',
    index: 'aboutbudgetpedia',
    anchor: 'aboutbudgetpedia',
    description: 'about budgetpedia',
    type: 'section',
    tag: 'About Budgetpedia',
    properties: {
        title: "About Budgetpedia",
        description: `
We want to help make the Toronto budget, and budget debate, better.
`,
    },
    children: [
        {
            repo: 'papers',
            index: 'aboutbudgetpedia',
        },
    ]
};
let overview = {
    controller: 'section',
    index: 'overview',
    anchor: 'overview',
    description: 'header for overview page',
    type: 'section',
    tag: 'Top:Context',
    properties: {
        title: "Our Toronto Budgeting Context",
        description: `
This page gives a general overview of Toronto, and its budget design and process.

Taking a tour?
<span style= "vertical-align:middle" class="material-icons">navigate_before</span>
[previous page](/explorer)
<span style= "vertical-align:middle" class="material-icons">first_page</span>
[start](/basics)

`,
    },
    children: [
        {
            controller: 'section',
            type: 'toc',
            index: 'tableofcontents',
            description: 'page table of contents',
        },
    ],
};
let budgets = {
    header: {
        controller: 'section',
        index: 'budgets.header',
        anchor: 'header',
        description: 'header for budgets page',
        type: 'section',
        tag: 'Top:Design',
        properties: {
            title: "Toronto Budget Design",
            description: `
<div style = "padding:16px;background-color:orange;text-align:center;border:3px ridge silver;border-radius:8px">
This page is under construction.
</div>

This page is about how the Toronto budget is structured, and _could_ be structured, every year.

Taking a tour? 
[next page](/process)
<span style= "vertical-align:middle" class="material-icons">navigate_next</span><span style= "vertical-align:middle" class="material-icons">navigate_before</span>
[previous page](/basics)
<span style= "vertical-align:middle" class="material-icons">first_page</span>
[start](/basics)

`,
        },
        followup: {
            'card:budgetssummary': `This page is about the structure of Toronto budgets. For information about the budget process,
see our [Budget Process](/process) page.`,
        },
        children: [
            {
                repo: 'cards',
                index: 'budgetssummary',
            },
            {
                controller: 'section',
                type: 'toc',
                index: 'tableofcontents',
                description: 'page table of contents',
            },
        ],
    },
    resources: {
        controller: 'section',
        index: 'budgets.resources',
        anchor: 'resources',
        description: 'resources for budgets page',
        type: 'section',
        tag: 'Resources',
        properties: {
            title: "Budget Resources",
            description: `This section lists the main documents made available by Toronto about the annual budgets.
`,
        },
        children: [
            {
                repo: 'papers',
                index: 'sourcedocuments',
            },
            {
                repo: 'papers',
                index: 'terminology',
            },
        ],
    },
    systems: {
        controller: 'section',
        index: 'budgets.systems',
        anchor: 'systems',
        description: 'systems for budgets page',
        type: 'section',
        tag: 'Systems',
        properties: {
            title: "Systems",
            description: `This is a look at some of the systems related to the budget system.
`,
        },
        children: [
            {
                repo: 'papers',
                index: 'fpars',
            },
            {
                repo: 'papers',
                index: 'variancereports',
            },
            {
                repo: 'papers',
                index: 'auditedstatements',
            },
            {
                repo: 'papers',
                index: 'cityvision',
            },
        ],
    },
    perspectives: {
        controller: 'section',
        index: 'budgets.perspectives',
        anchor: 'perspectives',
        description: 'perspectives for budgets page',
        type: 'section',
        tag: 'Perspectives',
        properties: {
            title: "Perspectives",
            description: `Here are some perspectives taken from our experience with the budget systems.
`,
        },
        children: [
            {
                repo: 'sheets',
                index: 'citybasics',
            },
            {
                repo: 'papers',
                index: 'staffing',
            },
            {
                repo: 'papers',
                index: 'currentconventions',
            },
            {
                repo: 'papers',
                index: 'betterconventions',
            },
            {
                repo: 'papers',
                index: 'budgetvsaudit',
            },
            {
                repo: 'papers',
                index: 'hierarchies',
            },
            {
                repo: 'papers',
                index: 'budgetsastheatre',
            },
        ],
    },
};
let home = {
    header: {
        controller: 'section',
        index: 'home.header',
        anchor: 'header',
        description: 'header for main page of website',
        type: 'section',
        tag: 'Top:Home',
        properties: {
            title: "Welcome",
            description: `
<div style = "float:right;width:200px;padding:3px;line-height:1;text-align:center;margin-top:-60px;max-width:40%">
<img style="width:100%" src="/public/images/Makerspace-4.jpg" />
<span style="font-size:x-small;font-style:italic;">Innovative public service: a Toronto Library Makerspace program</span>
</div>
We're an independent, non-profit, volunteer organization based in Toronto, Canada.

New to budgeting? See our [Budget Basics](/basics) page.
`,
        },
        children: [
            {
                repo: 'papers',
                index: 'budgetpediapremise',
            },
            {
                repo: 'papers',
                index: 'budgetpediaoverview',
            },
            {
                repo: 'cards',
                index: 'mainpageheader',
            },
            {
                repo: 'papers',
                index: 'electionopinion',
            },
            {
                controller: 'section',
                type: 'toc',
                index: 'tableofcontents',
                description: 'page table of contents',
            },
        ],
    },
    nuggets: {
        controller: 'section',
        index: 'home.nuggets',
        anchor: 'statistics',
        description: 'sets of introductory nugget lists',
        type: 'section',
        tag: 'Quick Statistics',
        narrative: {
            "list:abouttoronto": `Check out the third item from the right, "Visible minorities" (you have to scroll to the right). 
If you think about it, this means that for most of Toronto,
these so-called minorities are actually collectively in the majority. 
We're cosmopolitan.`,
            "list:torontofinances": `We've found that audited financial statements are more reliable than budgets as the
basis for a narrative about Toronto. Scroll to the right and you'll see that cash is 
flowing into capital.`,
            "list:torontotrends": `For a highlight, scroll right to the "Changes in net worth". Toronto has had a large increase in 
net worth (assets less liabilities) over the past few years. The short story: 
money is flowing into tangible asset improvements and purchases.`,
        },
        properties: {
            title: 'Quick Statistics',
            description: "Here are some quick statistics about Toronto and its finances. We've highlighted a few. Each row scrolls left and right.",
        },
        children: [
            {
                repo: 'nuggetlists',
                index: 'abouttoronto',
            },
            {
                repo: 'nuggetlists',
                index: 'torontofinances',
            },
            {
                repo: 'nuggetlists',
                index: 'torontotrends',
            },
        ],
    },
    basics: {
        controller: 'section',
        index: 'home.basics',
        anchor: 'basics',
        description: 'basic help text and links',
        type: 'section',
        tag: 'The Basics',
        narrative: {
            'paper:citybasics': `At a general level it's not that complicated. Outside City Hall, front line staff
take care of city-wide daily services (general services), and help many of us 
directly (resident support services).`,
            'paper:cityprocess': `Although budgeting is a lengthy process, very little of it is public.`,
        },
        followup: {
            'paper:citybasics': `For detailed budget information, see our budget [explorer](/explorer).`,
            'paper:cityprocess': `For more information on the City of Toronto Budget Process, see the City of Toronto 
[website](https://www.toronto.ca/city-government/budget-finances/city-budget/), 
and our [Budget Process](/process) page.`,
        },
        properties: {
            title: 'The Basics',
            description: 'What the City of Toronto does, and how the budget process works.',
        },
        children: [
            {
                repo: 'sheets',
                index: 'citybasics',
            },
            {
                repo: 'sheets',
                index: 'cityprocess',
            },
        ],
    },
    concerns: {
        controller: 'section',
        index: 'home.concerns',
        anchor: 'challenges',
        description: 'links to issues',
        type: 'section',
        tag: 'Challenges',
        narrative: {
            'paper:opportunities': `There really are huge opportunities for improvement! Changes by design,
to make everyone's life better.`,
            'paper:concerns': `We know many City staff don't like to hear this, and we're sorry. But we
think these are issues that need to be discussed. They've been going on for decades,
and it's time to resolve them. Any feedback on how best to go about this is very welcome.`,
        },
        properties: {
            title: 'Challenges to Work On',
            description: 'Some basic opportunites and issues we think should be addressed.',
            style: {
                marginBottom: '12px',
                backgroundColor: '#d9d9d9',
            },
        },
        children: [
            {
                repo: 'sheets',
                index: 'opportunities',
            },
            {
                repo: 'sheets',
                index: 'concerns',
            },
        ],
    },
    stories: {
        controller: 'section',
        index: 'home.stories',
        anchor: 'stories',
        description: 'introduction to stories',
        type: 'section',
        tag: 'Stories',
        narrative: {
            'paper:stories': `The challenge is to tell all these stories, and be useful about it!
If you have suggestions for stories, or if you want to help, let us know.`,
        },
        properties: {
            title: 'Stories to Create',
            description: "We're organizing around data stories.",
        },
        children: [
            {
                repo: 'sheets',
                index: 'stories',
            },
        ],
    },
    twitterfeed: {
        controller: 'section',
        index: 'home.twitterfeed',
        anchor: 'twitter',
        description: 'twitter feed for budgetpedia',
        type: 'section',
        tag: 'Twitter Feed',
        properties: {
            title: 'Our Twitter Feed',
            description: 'Jump into the conversation [here](http://twitter.com/budgetpedia).',
            style: {
                marginBottom: '12px'
            },
        },
        children: [
            {
                repo: 'media',
                index: 'budgetpediatwitter',
            },
        ],
    },
    tiles: {
        controller: 'section',
        index: 'home.tiles',
        anchor: 'website',
        description: 'navigation tiles to the site main pages',
        type: 'section',
        tag: 'Our Website',
        properties: {
            title: 'Our Website',
            description: 'The main pages of our website. The tiles scroll left and right.',
            style: {
                marginBottom: '12px'
            },
        },
        children: [
            {
                index: 'mainpages',
                repo: 'tilelists',
            },
            {
                repo: 'cards',
                index: 'mainpagefooter',
            },
        ],
    },
};
let roadmap = {
    header: {
        controller: 'section',
        index: 'roadmap.header',
        anchor: 'header',
        description: 'header for roadmap page',
        type: 'section',
        tag: 'Top:Process',
        narrative: {
            'paper:cityprocess': `Here is a rough outline of how the process is currently set up.`,
        },
        followup: {
            "paper:cityprocess": `For information on specific City budgets, see our [Budgets](/design) page.
`,
            'card:roadmapsummary': `This page is about the creation process of Toronto budgets. For information about the budget structure,
see our [budgets](/design) page.`,
        },
        properties: {
            title: "Budget Process",
            description: `This page is about how the Toronto budget is created, and _could_ be created, every year.

Taking a tour?
[next page](/tracker)
<span style= "vertical-align:middle" class="material-icons">navigate_next</span><span style= "vertical-align:middle" class="material-icons">navigate_before</span>
[previous page](/design)
<span style= "vertical-align:middle" class="material-icons">first_page</span>
[start](/basics)

`,
        },
        children: [
            {
                repo: 'cards',
                index: 'roadmapsummary',
            },
            {
                controller: 'section',
                type: 'toc',
                index: 'tableofcontents',
                description: 'page table of contents',
            },
        ],
    },
    notes: {
        controller: 'section',
        index: 'roadmap.notes',
        anchor: 'notes',
        description: 'description of notes',
        type: 'section',
        tag: 'The Process',
        narrative: {
            "paper:insiderview": `This list of events is worth scanning, in spite of its length, to get a sense of the players involved, and the nature
of the process.

We see very little collaboration in this process, beyond the professional elite and senior managers listed here.
However we are told that budget entries are made for the 13,000 or so City cost centers. We hope this means at 
least some collaboration with front-line staff, or at least front-line managers.
`
        },
        followup: {
            "paper:insiderview": `For the City of Toronto's information about the budget, see the City's [budget website](https://www.toronto.ca/city-government/budget-finances/city-budget/                
).
`
        },
        properties: {
            title: "The Process",
            description: `The entire process, from strategizing to getting audited results, covers about 27 months. 
            The budget creation process itself is about 8 months`,
        },
        children: [
            {
                repo: 'sheets',
                index: 'cityprocess',
            },
            {
                repo: 'papers',
                index: 'insiderview',
            },
        ],
    },
    council: {
        controller: 'section',
        index: 'roadmap.council',
        anchor: 'councils',
        description: 'description of council musings',
        type: 'section',
        tag: 'Council',
        properties: {
            title: "Council's Role",
            description: "Councillors seemed to be going in a different, better, direction at one time.",
        },
        children: [
            {
                repo: 'papers',
                index: 'councilprocess',
            },
            {
                repo: 'sheets',
                index: 'councilservices',
            },
        ],
    },
    civilsociety: {
        controller: 'section',
        index: 'roadmap.civilsociety',
        anchor: 'civilsociety',
        description: 'Civil society involvement',
        type: 'section',
        tag: 'Civil Society',
        properties: {
            title: "Civil Society",
            description: "Civil society tries to do its part, to fill the vacuum.",
        },
        children: [
            {
                repo: 'sheets',
                index: 'civilsociety',
            },
        ]
    },
    elsewhere: {
        controller: 'section',
        index: 'roadmap.elsewhere',
        anchor: 'elsewhere',
        description: 'New York does things differently',
        type: 'section',
        tag: 'Elsewhere',
        properties: {
            title: "Elsewhere",
            description: "New York as an example does things differently, with spiralling consultations taking almost a year.",
        },
        children: [
            {
                repo: 'sheets',
                index: 'elsewhere',
            },
        ]
    },
    possibilities: {
        controller: 'section',
        index: 'roadmap.possibilities',
        anchor: 'possibilities',
        description: 'The way things could be',
        type: 'section',
        tag: 'Possibilities',
        properties: {
            title: "Possibilities",
            description: "There are many possible ways to conduct budget cycles. Here are some ways we think would make improvements.",
        },
        children: [
            {
                repo: 'sheets',
                index: 'opportunities',
            },
        ],
    },
};
let sections = {
    budgetvariations,
    budgetuses,
    instances,
    basicsheader,
    budgettypes,
    budgetflows,
    trackerheader,
    contents,
    aboutbudgetpedia,
    torontobudget,
    overview,
    budgets,
    roadmap,
    home,
};
export default sections;
