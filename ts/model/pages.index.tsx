// pages.index.tsx

let pages = {
    home:{
        controller: 'page',
        index: 'home',
        properties: {
            browser: {
                title:'Budgetpedia',
                description: 'supporting informed debate about the Toronto budget'
            }
        },
        components: [
            {
                controller:'section',
                index:'header',
                description:'header for main page of website',
                properties:{
                    title:null,
                    description: null,
                },
                components:[
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
                properties: {
                    title:'Quick Statistics',
                    description:
`
Here are some quick statistics about Toronto and its finances
`,
                    tag:'Quick Stats',
                },
                components: [
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
                properties: {
                    tag:'Twitter',
                },
                components:[
                    {
                        controller: 'media',
                        repo:'twitterfeeds',
                        index:'budgetpedia',
                    },
                ]
            },
            {
                controller:'section',
                index:'tiles',
                description:'navigation tiles to the site main pages',
                components:[
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
                components:[
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