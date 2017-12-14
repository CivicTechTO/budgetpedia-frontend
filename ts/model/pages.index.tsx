// pages.index.tsx

let pages = {
    home:{
        controller: 'page',
        index: 'home',
        type:'page',
        properties: {
            title:'Budgetpedia',
            description: 'supporting informed debate about the Toronto budget',
        },
        children: [
            {
                controller:'section',
                index:'header',
                description:'header for main page of website',
                type:'section',
                properties:{
                    title:null,
                    description: null,
                },
                children:[
                    {
                        controller: 'card',
                        repo:'cards',
                        index:'mainpageheader',
                    }
                ]
            },
            {
                controller:'section',
                index:'nuggets',
                description:'sets of introductory nugget lists',
                type:'section',
                properties: {
                    title:'Quick Statistics',
                    description:
`
Here are some quick statistics about Toronto and its finances. We've highlighted a few. Each row scrolls left and right.
`,
                    tag:'Quick Stats',
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
                ]

            },
            {
                controller:'section',
                index:'basics',
                description:'basic help text and links',
                type:'section',
                properties: {
                    title:'The Basics',
                    description:
`
What the City does, and how the budget process works.
`,
                    tag:'The Basics',
                    style:{
                        marginBottom: '12px'
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
                ]
            },
            {
                controller:'section',
                index:'concerns',
                description:'links to issues',
                type:'section',
                properties: {
                    title:'Our Concerns',
                    description:
`
Some basic issues we think should be addressed.
`,
                    tag:'Our Concerns',
                    style:{
                        marginBottom: '12px'
                    },
                },
                children: [
                    {
                        controller: 'sheet',
                        repo:'sheets',
                        index:'concerns',
                    },
                ]
            },
            {
                controller:'section',
                index:'tiles',
                description:'navigation tiles to the site main pages',
                type:'section',
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
                ]
            },
            {
                controller:'section',
                index:'twitterfeed',
                description:'twitter feed for budgetpedia',
                type:'section',
                properties: {
                    tag:'Twitter',
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
                ]
            },
            {
                controller:'section',
                index:'footer',
                description:'footer for the main page',
                type:'section',
                children:[
                    {
                        controller: 'card',
                        repo:'cards',
                        index:'mainpagefooter',
                    }
                ]
            },
        ],
    }
}

export default pages