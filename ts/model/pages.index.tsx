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
Here are some quick statistics about Toronto and its finances. Each row scrolls left and right.
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
                index:'twitterfeed',
                description:'twitter feed for budgetpedia',
                type:'section',
                properties: {
                    tag:'Twitter',
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
                index:'tiles',
                description:'navigation tiles to the site main pages',
                type:'section',
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