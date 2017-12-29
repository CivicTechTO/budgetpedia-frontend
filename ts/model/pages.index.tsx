// pages.index.tsx

let pages = {
    pathway: {
        controller: 'page',
        index: 'pathway',
        type:'page',
        properties: {
            title:'Toronto budget roadmap',
            description: 'Summary of Toronto budget processes over the years',
        },
        children: [
            {
                controller:'section',
                index:'header',
                anchor:'header',
                description:'header for pathway page',
                type:'section',
                tag:'Overview',
                properties:{
                    title:"Overviiew",
                    description: "Here are details about Toronto budgets.",
                },
                children:[
                    {
                        controller: 'card',
                        repo:'cards',
                        index:'pathwayheader',
                    }
                ],
            },
        ],
    },
    home:{
        controller: 'page',
        index: 'home',
        type:'page',
        attribution: {
            custodian: 'Henrik Bechmann',
            custodianlink: 'mailto:henrik@budgetpedia.ca',
            contact:'mail@budgetpedia.ca',
            contactlink:'mailto:mail@budgetpedia.ca',
            creationdate: '22-12-2017',
            updatedate: '28-12-2017',
        },
        properties: {
            title:'Budgetpedia Welcome',
            description: 'supporting informed debate about the Toronto budget',
        },
        children: [
            {
                controller:'section',
                index:'header',
                anchor:'header',
                description:'header for main page of website',
                type:'section',
                tag:'Welcome',
                properties:{
                    title:"Welcome",
                    description: "We're an independent, non-profit, volunteer organization based in Toronto, Canada.",
                },
                children:[
                    {
                        controller: 'card',
                        repo:'cards',
                        index:'mainpageheader',
                    }
                ],
            },
            {
                controller:'section',
                index:'nuggets',
                anchor:'statistics',
                description:'sets of introductory nugget lists',
                type:'section',
                tag:'Quick Statistics',
                narrative: {
                    "list:abouttoronto":
`
Check out the third item from the right, "Visible minorities" (you have to scroll to the right). 
If you think about it, this means that for most of Toronto,
these so-called minorities are actually collectively in the majority. 
We're cosmopolitan.
`,
                    "list:torontofinances":
`
We've found that audited financial statements are more reliable than budgets as the
basis for a narrative about Toronto. Scroll to the right and you'll see that cash is flowing into capital.
`,
                    "list:torontotrends":
`
For a highlight, scroll right to the "Changes in net worth". Toronto has had a large increase in 
net worth (assets less liabilities) over the past few years. The short story: 
money is flowing into tangible asset improvements and purchases.
`
                },
                properties: {
                    title:'Quick Statistics',
                    description: "Here are some quick statistics about Toronto and its finances. We've highlighted a few. Each row scrolls left and right.",
                },
                children: [
                    {
                        controller: 'list',
                        repo:'nuggetlists',
                        index:'abouttoronto',
                    },
                    {
                        controller: 'list',
                        repo:'nuggetlists',
                        index:'torontofinances',
                    },
                    {
                        controller: 'list',
                        repo:'nuggetlists',
                        index:'torontotrends',
                    },
                ],

            },
            {
                controller:'section',
                index:'basics',
                anchor:'basics',
                description:'basic help text and links',
                type:'section',
                tag:'The Basics',
                narrative: {
                    'sheet:citybasics':
`
At a general level it's not that complicated. Outside City Hall, front line staff
take care of city-wide daily services (general services), and help many of us 
directly (resident support services).
`,
                    'sheet:cityprocess':
`
Although budgeting is a lengthy process, very little of it is public.
`,
                },
                followup: {
                    'sheet:citybasics':
`
For detailed budget information, see our budget [explorer](/explorer). 
`,
                    'sheet:cityprocess':
`
For more information on the City of Toronto Budget Process, see the City of Toronto 
[website](https://www.toronto.ca/city-government/budget-finances/city-budget/), 
and our [Budget Roadmap](/roadmap) page.
`,
                },
                properties: {
                    title:'The Basics',
                    description: 'What the City of Toronto does, and how the budget process works.',
                    style:{
                        marginBottom: '12px',
                        backgroundColor: '#d9d9d9',
                        paddingBottom: '1px',
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'citybasics',
                    },
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'cityprocess',
                    },
                ],
            },
            {
                controller:'section',
                index:'concerns',
                anchor:'challenges',
                description:'links to issues',
                type:'section',
                tag:'The Challenges',
                narrative: {
                    'sheet:opportunities':
`
There really are huge opportunities for improvement! Changes by design,
to make everyone's life better.
`,
                    'sheet:concerns':
`
We know many City staff don't like to hear this, and we're sorry. But we
think these are issues that need to be discussed. They've been going on for decades,
and it's time to resolve them. Any feedback on how best to go about this is very welcome.
`,
                },
                properties: {
                    title:'The Challenges',
                    description:'Some basic opportunites and issues we think should be addressed.',
                    style:{
                        marginBottom: '12px',
                        backgroundColor: '#d9d9d9',
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'opportunities',
                    },
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'concerns',
                    },
                ],
            },
            {
                controller:'section',
                index:'stories',
                anchor:'stories',
                description:'introduction to stories',
                type:'section',
                tag:'Stories',
                narrative: {
                    'sheet:stories':
`
The challenge is to tell all these stories, and be useful about it!
If you have suggestions for stories, or if you want to help, let us know.
`,
                },
                properties: {
                    title:'Stories',
                    description:"We're organizing around data stories.",
                    style:{
                        marginBottom: '12px',
                        backgroundColor: '#d9d9d9',
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'stories',
                    },
                ],
            },
            {
                controller:'section',
                disabled:true,
                index:'twitterfeed',
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
                        controller: 'media',
                        repo:'media',
                        index:'budgetpediatwitter',
                    },
                ],
            },
            {
                controller:'section',
                index:'tiles',
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
                        controller: 'list',
                        index:'mainpages',
                        repo:'tilelists',
                    },
                ],
            },
            {
                controller:'section',
                index:'footer',
                anchor:'footer',
                description:'footer for the main page',
                type:'section',
                children:[
                    {
                        controller: 'card',
                        repo:'cards',
                        index:'mainpagefooter',
                    }
                ],
            },
        ],
    }
}

export default pages