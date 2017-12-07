// pages.index.tsx

let pages = {
    home:{
        controller: 'page',
        index: 'home',
        fields: {
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
                fields:{
                    title:null,
                    description: null,
                },
                components:[
                    {
                        controller: 'cards',
                        repo:'cards',
                        index:'mainpageheader',
                    }
                ]
            },
            {
                controller:'section',
                index:'nuggets',
                description:'sets of introductory nugget lists',
                fields: {
                    title:'Quick Stats',
                    description:
`
Here are some quick statistics about Toronto and its finances
`,
                    tag:'Quick Stats',
                },
                components: [
                    {
                        controller: 'lists',
                        repo:'nuggetlists',
                        index:'abouttoronto',
                    },
                    {
                        controller: 'lists',
                        repo:'nuggetlists',
                        index:'torontofinances',
                    },
                    {
                        controller: 'lists',
                        repo:'nuggetlists',
                        index:'torontotrends',
                    },
                ]

            },
            {
                controller:'section',
                index:'twitterfeed',
                description:'twitter feed for budgetpedia',
                fields: {
                    tag:'Twitter',
                },
                components:[
                    {
                        controller: 'embeds',
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
                        controller: 'lists',
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
                        controller: 'cards',
                        repo:'cards',
                        index:'mainpagefooter',
                    }
                ]
            },
        ],
        // composition: [],
    }
}

export default pages