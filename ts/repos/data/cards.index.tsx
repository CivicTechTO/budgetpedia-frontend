// cards.index.tsx

let headerimages = require('../../legacy/homepage/html/headerimages.html')

let cards = {
    mainpageheader: {
        type:'card',
        controller:'card',
        index:'mainpageheader',
        description:'header for the main page',
        fields:{},
        components:[
            {
                type:'htmlview',
                controller:'card',
                index:'htmlview',
                description:'images at right of header',
                properties:{
                    html:headerimages,
                },
            },
            {
                type:'cardtitle',
                controller:'card',
                index:'cardtitle',
                properties: {
                    headertitle:"Welcome to Budgetpedia",
                    headersubtitle:"Supporting informed debate about the Toronto budget",
                }
            }
        ],
        composition:[],
    },
    mainpagefooter: {
        controller:'card',
        type:'card',
        index:'mainpagefooter',
        description:'footer for the main page',
        fields:{},
        components:[],
        composition:[],
    }
}

export default cards