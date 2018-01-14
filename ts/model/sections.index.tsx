// sections.index.tsx

let budgets = {
    header: {
        controller:'section',
        index:'budgets.header',
        anchor:'header',
        description:'header for budgets page',
        type:'section',
        tag:'Top:Budgets',
        properties:{
            title:"Information About Budgets",
            description: 
`This page is about how the Toronto budget is structured, and _could_ be structured, every year.
`,
        },
        followup: {
            'card:budgetssummary':
`This page is about the structure of Toronto budgets. For information about the budget process,
see our [roadmap](/roadmap) page.`,
        },
        children:[
            {
                repo:'cards',
                index:'budgetssummary',
            },
            {
                controller: 'section',
                type:'toc',
                index:'tableofcontents',
                description:'page table of contents',
            },
        ],
    },
    resources: {
        controller:'section',
        index:'budgets.resources',
        anchor:'resources',
        description:'resources for budgets page',
        type:'section',
        tag:'Resources',
        properties:{
            title:"Resources",
            description: 
`This section lists the main documents made available by Toronto about the annual budgets.

budget resources
- budget source documents
   - budget presentations
   - analyst notes
   - briefing notes and reports
   - wrapup notes
   - corporate reports
   - open data portal
- terminology
- standard analyst notes format
- open data portal budget details

`,
        },
    },
    instances: {
        controller:'section',
        index:'budgets.instances',
        anchor:'instances',
        description:'instances for budgets page',
        type:'section',
        tag:'Instances',
        properties:{
            title:"Budget Instances",
            description: 
`Read about specific budgets here.

budget instances
- specific budget notes and links
   - 2018
   - 2017
- participatory budgeting

`,
        },
    },
    perspectives: {
        controller:'section',
        index:'budgets.perspectives',
        anchor:'perspectives',
        description:'perspectives for budgets page',
        type:'section',
        tag:'Perspectives',
        properties:{
            title:"Perspectives",
            description: 
`Here are some perspectives taken from our experience with the budget systems.

budget perspectives
- budgets as theatre
- getting from budgets to variance reports to audited statements
- some unconventional practices
- two hierarchies

`,
        },
    },
    systems: {
        controller:'section',
        index:'budgets.systems',
        anchor:'systems',
        description:'systems for budgets page',
        type:'section',
        tag:'Systems',
        properties:{
            title:"Systems",
            description: 
`This is a look at some of the systems related to the budget system.

financial systems
- Toronto's [vision](https://docs.google.com/presentation/d/1jmDAeN2rsG2XQwlAmycqxTmhunfONc1z9zlLZHmEctk)
- FPARS ([SPIRIT](https://drive.google.com/file/d/0B208oCU9D8OuMG4yaVJpaW16VGc/view))
- Variance reports
- Audited statements
`,
        },
    },
}

let home = {

    header: {
        controller:'section',
        index:'home.header',
        anchor:'header',
        description:'header for main page of website',
        type:'section',
        tag:'Top:Home',
        properties:{
            title:"Welcome",
            description: "We're an independent, non-profit, volunteer organization based in Toronto, Canada.",
        },
        children:[
            {
                repo:'cards',
                index:'mainpageheader',
            },
            {
                controller: 'section',
                type:'toc',
                index:'tableofcontents',
                description:'page table of contents',
            },
        ],
    },

    nuggets: {
        controller:'section',
        index:'home.nuggets',
        anchor:'statistics',
        description:'sets of introductory nugget lists',
        type:'section',
        tag:'Quick Statistics',
        narrative: {

            "list:abouttoronto":
`Check out the third item from the right, "Visible minorities" (you have to scroll to the right). 
If you think about it, this means that for most of Toronto,
these so-called minorities are actually collectively in the majority. 
We're cosmopolitan.`,

            "list:torontofinances":
`We've found that audited financial statements are more reliable than budgets as the
basis for a narrative about Toronto. Scroll to the right and you'll see that cash is 
flowing into capital.`,

            "list:torontotrends":
`For a highlight, scroll right to the "Changes in net worth". Toronto has had a large increase in 
net worth (assets less liabilities) over the past few years. The short story: 
money is flowing into tangible asset improvements and purchases.`,

        },
        properties: {
            title:'Quick Statistics',
            description: "Here are some quick statistics about Toronto and its finances. We've highlighted a few. Each row scrolls left and right.",
        },
        children: [
            {
                repo:'nuggetlists',
                index:'abouttoronto',
            },
            {
                repo:'nuggetlists',
                index:'torontofinances',
            },
            {
                repo:'nuggetlists',
                index:'torontotrends',
            },
        ],

    },

    basics: {
        controller:'section',
        index:'home.basics',
        anchor:'basics',
        description:'basic help text and links',
        type:'section',
        tag:'The Basics',
        narrative: {

            'paper:citybasics':
`At a general level it's not that complicated. Outside City Hall, front line staff
take care of city-wide daily services (general services), and help many of us 
directly (resident support services).`,

            'paper:cityprocess':
`Although budgeting is a lengthy process, very little of it is public.`,
        },
        followup: {

            'paper:citybasics':
`For detailed budget information, see our budget [explorer](/explorer).`,

            'paper:cityprocess':
`For more information on the City of Toronto Budget Process, see the City of Toronto 
[website](https://www.toronto.ca/city-government/budget-finances/city-budget/), 
and our [Budget Roadmap](/roadmap) page.`,
        },
        properties: {
            title:'The Basics',
            description: 'What the City of Toronto does, and how the budget process works.',
        },
        children: [
            {
                repo:'sheets',
                index:'citybasics',
            },
            {
                repo:'sheets',
                index:'cityprocess',
            },
        ],
    },

    concerns: {
        controller:'section',
        index:'home.concerns',
        anchor:'challenges',
        description:'links to issues',
        type:'section',
        tag:'Challenges',
        narrative: {

            'paper:opportunities':
`There really are huge opportunities for improvement! Changes by design,
to make everyone's life better.`,

            'paper:concerns':
`We know many City staff don't like to hear this, and we're sorry. But we
think these are issues that need to be discussed. They've been going on for decades,
and it's time to resolve them. Any feedback on how best to go about this is very welcome.`,

        },
        properties: {
            title:'Challenges to Work On',
            description:'Some basic opportunites and issues we think should be addressed.',
            style:{
                marginBottom: '12px',
                backgroundColor: '#d9d9d9',
            },
        },
        children: [
            {
                repo:'sheets',
                index:'opportunities',
            },
            {
                repo:'sheets',
                index:'concerns',
            },
        ],
    },

    stories: {
        controller:'section',
        index:'home.stories',
        anchor:'stories',
        description:'introduction to stories',
        type:'section',
        tag:'Stories',
        narrative: {

            'paper:stories':
`The challenge is to tell all these stories, and be useful about it!
If you have suggestions for stories, or if you want to help, let us know.`,

        },
        properties: {
            title:'Stories to Create',
            description:"We're organizing around data stories.",
        },
        children: [
            {
                repo:'sheets',
                index:'stories',
            },
        ],
    },

    twitterfeed: {
        controller:'section',
        index:'home.twitterfeed',
        anchor:'twitter',
        description:'twitter feed for budgetpedia',
        type:'section',
        tag:'Twitter Feed',
        properties: {
            title: 'Our Twitter Feed',
            description:'Jump into the conversation [here](http://twitter.com/budgetpedia).',
            style:{
                marginBottom: '12px'
            },
        },
        children:[
            {
                repo:'media',
                index:'budgetpediatwitter',
            },
        ],
    },

    tiles: {
        controller:'section',
        index:'home.tiles',
        anchor:'website',
        description:'navigation tiles to the site main pages',
        type:'section',
        tag:'More...',
        properties: {
            title: 'Our Website',
            description: 'The main pages of our website. The tiles scroll left and right.',
            style:{
                marginBottom: '12px'
            },
        },
        children:[
            {
                index:'mainpages',
                repo:'tilelists',
            },
            {
                repo:'cards',
                index:'mainpagefooter',
            },
        ],
    },
} 

let roadmap = {
    header: {
        controller:'section',
        index:'roadmap.header',
        anchor:'header',
        description:'header for roadmap page',
        type:'section',
        tag:'Top:Roadmap',
        narrative: {

            'paper:cityprocess':
`Here is a rough outline of how the process is currently set up.`,

        },
        followup: {

            "paper:cityprocess":
`For information on specific City budgets, see our [Budgets](/budgets) page.
`
        },
        properties:{
            title:"Budget Roadmap",
            description: 
`This page is about how the Toronto budget is created, and _could_ be created, every year.
`,
        },
        children:[
            {
                repo:'cards',
                index:'roadmapsummary',
            },
            {
                controller: 'section',
                type:'toc',
                index:'tableofcontents',
                description:'page table of contents',
            },
        ],
    },

    notes: {
        controller:'section',
        index:'roadmap.notes',
        anchor:'notes',
        description:'description of notes',
        type:'section',
        tag:'The Process',
        narrative: {

            "paper:insiderview":
`This list of events is worth scanning, in spite of its length, to get a sense of the players involved, and the nature
of the process.

We see very little collaboration in this process, beyond the professional elite and senior managers listed here.
However we are told that budget entries are made for the 13,000 or so City cost centers. We hope this means at 
least some collaboration with front-line staff, or at least front-line managers.
`
        },
        followup: {
            
            "paper:insiderview":
`For the City of Toronto's information about the budget, see the City's [budget website](https://www.toronto.ca/city-government/budget-finances/city-budget/                
).
`
        },
        properties:{
            title:"The Process",
            description: `The entire process, from strategizing to getting audited results, covers about 27 months. 
            The budget creation process itself is about 8 months`,
        },
        children: [
            {
                repo:'sheets',
                index:'cityprocess',
            },
            {
                repo:'papers',
                index:'insiderview',
            },
        ],
    },

    council: {
        controller:'section',
        index:'roadmap.council',
        anchor:'councils',
        description:'description of council musings',
        type:'section',
        tag:'Council',
        properties:{
            title:"Council's Role",
            description: "Councillors seemed to be going in a different, better, direction at one time.",
        },
        children: [
            {
                repo:'papers',
                index:'councilprocess',
            },
            {
                repo:'sheets',
                index:'councilservices',
            },
        ],
    },

    civilsociety: {
        controller:'section',
        index:'roadmap.civilsociety',
        anchor:'civilsociety',
        description:'Civil society involvement',
        type:'section',
        tag:'Civil Society',
        properties:{
            title:"Civil Society",
            description: "Civil society tries to do its part, to fill the vacuum.",
        },
        children: [
            {
                repo:'sheets',
                index:'civilsociety',
            },
        ]
    },

    elsewhere: {
        controller:'section',
        index:'roadmap.elsewhere',
        anchor:'elsewhere',
        description:'New York does things differently',
        type:'section',
        tag:'Elsewhere',
        properties:{
            title:"Elsewhere",
            description: "New York as an example does things differently, with spiralling consultations taking almost a year.",
        },
        children: [
            {
                repo:'sheets',
                index:'elsewhere',
            },
        ]
    },
    
    possibilities: {
        controller:'section',
        index:'roadmap.possibilities',
        anchor:'possibilities',
        description:'The way things could be',
        type:'section',
        tag:'Possibilities',
        properties:{
            title:"Possibilities",
            description: "There are many possible ways to conduct budget cycles. Here are some ways we think would make improvements.",
        },
        children: [
            {
                repo:'sheets',
                index:'opportunities',
            },
        ],
    },
}

let sections = {
    budgets,
    roadmap,
    home,
}

export default sections