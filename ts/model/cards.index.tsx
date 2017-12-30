// cards.index.tsx

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
                backgroundColor:"#404244", 
                padding:"8px", 
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
                }
            },
            type:'htmlview',
            properties:{},
        },
        {
            controller:'card',
            index:'cardtitle',
            type:'cardtitle',
            properties: {
                title:"This is Budgetpedia",
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
                    controller:'list',
                    index:'toplinklist',
                    repo:'linklists',
                },
                {
                    controller:'list',
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
                backgroundColor:"#404244", 
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
                    controller:'list',
                    index:'thirdlinklist',
                    repo:'linklists',
                },
            ],
        },
    ],
}

let cards = {
    mainpageheader,
    mainpagefooter,
}

export default cards