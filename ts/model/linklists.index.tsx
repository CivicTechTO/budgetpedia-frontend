// linklists.index.tsx
let toplinklist = {
    type:'linklist',
    properties: {
        upperDivider:true,
        header:'Browse our site:',
        items: [
            {
                type:'link',
                properties:{
                    prompt:'Explore the Toronto budget with our',
                    icon:'/public/icons/ic_explore_48px.svg',
                    target:'/explorer',
                    targetText:'Budget Explorer',
                },
            },
            {
                type:'link',
                properties: {
                    prompt:"See information about Toronto's budget decision schedule at our",
                    icon:'/public/icons/ic_map_48px.svg',
                    target:'/roadmap',
                    targetText:'Budget Roadmap',
                },
            },
            {
                type:'link',
                properties:{
                    prompt:'Find related',
                    icon:'/public/icons/ic_library_books_48px.svg',
                    target:'/resources',
                    targetText:'Resources',
                },
            },
        ],
    }
}

let secondlinklist = {
    type:'linklist',
    properties: {
        upperDivider:true,
        header:'Follow us:',
        items: [
            {
                type:'link',
                properties: {
                    external:true,
                    prompt:'For news check out our',
                    icon:'/public/icons/twitter.png',
                    target:'http://twitter.com/budgetpedia',
                    targetText:'Twitter account',
                    description:'... or see the twitter feed below',
                    imageStyle:{
                        height:'14px'
                    }
                },
            },
            {
                type:'link',
                properties: {
                    external:true,
                    prompt:'For in-depth articles see our',
                    icon:'/public/icons/medium.png',
                    target:'http://medium.com/budgetpedia',
                    targetText:'Medium publication',
                },
            },
        ],
    },
}

let linklists = {
    toplinklist,
    secondlinklist,
}

export default linklists
