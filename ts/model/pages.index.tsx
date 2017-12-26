// pages.index.tsx

let pages = {
    home:{
        controller: 'page',
        index: 'home',
        type:'page',
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
If you think about it, this means that in most parts of Toronto 
these so-called minorities are collectively in the majority. 
We're cosmopolitan.
`,
                    "list:torontofinances":
`
We've found the audited financial statements to be the most reliable 
basis for a narrative about Toronto.
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
At a general level there's not much to this. Outside City Hall, front line staff
take care of city-wide daily services (general services), and help boost or 
protect a bunch of us (resident support services).
`,
                    'sheet:cityprocess':
`
Although this is a lengthy process, very little of it is public.
`,
                },
                properties: {
                    title:'The Basics',
                    description: 'What the City of Toronto does, and how the budget process works.',
                    style:{
                        marginBottom: '12px',
                        backgroundColor: '#d9d9d9',
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
There really are incredible opportunities for improvement! Changes by design,
to make everyone's life better.
`,
                    'sheet:concerns':
`
We know many City staff don't like to hear this stuff, and we're sorry. But we
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
                tag:'The Stories',
                narrative: {
                    'sheet:stories':
`
The challenge is to tell all these stories, and be useful about it!
If you have suggestions for stories, or if you want to help, let us know.
`,
                },
                properties: {
                    title:'The Stories',
                    description:"We're organizing around stories.",
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
                index:'twitterfeed',
                anchor:'twitter',
                description:'twitter feed for budgetpedia',
                type:'section',
                tag:'Twitter Feed',
                properties: {
                    title: 'Our Twitter Feed',
                    description:'Jump into the conversation [here](http://twitter.com/budgetpedia){target=_blank}.',
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