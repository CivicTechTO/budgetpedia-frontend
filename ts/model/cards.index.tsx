// cards.index.tsx

let roadmapsummary = {
    controller: 'card',
    type:'card',
    index:'summary',
    description:'summary of roadmap',
    properties: {
        style: {
            margin:"16px 16px 32px 16px",
            border:"2px solid silver",
            borderRadius:"8px",
            boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        }
    },
    children: [
        {
            controller: 'card',
            type:'cardtitle',
            index:'tableofcontents',
            description:'summary title',
            properties:{
                title: 'Summary'
            }
        },
        {
            controller: 'card',
            type:'cardtext',
            index:'summary',
            description:'summary of roadmap',
            properties:{
                style:{
                    padding:'0 16px',
                }
            },
            children: [
                {
                    controller: 'card',
                    type:'markupblock',
                    index:'tableofcontents',
                    description:'page table of contents',
                    properties:{
                        markup:
`test`,
                    }
                },
            ],
        },
    ],
}


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
                title:"This is _Budgetpedia_",
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
                    index:'toplinklist',
                    repo:'linklists',
                },
                {
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
                    index:'thirdlinklist',
                    repo:'linklists',
                },
            ],
        },
    ],
}

let cards = {
    roadmapsummary,
    mainpageheader,
    mainpagefooter,
}

export default cards