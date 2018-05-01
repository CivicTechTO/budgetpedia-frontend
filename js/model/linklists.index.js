// linklists.index.tsx
let toplinklist = {
    controller: 'list',
    index: 'toplinklist',
    type: 'linklist',
    properties: {
        upperDivider: true,
        header: 'Browse our site:',
        items: [
            {
                prompt: 'See budget details on our',
                icon: '/public/icons/ic_attach_money_48px.svg',
                target: '/design',
                targetText: 'Budget Design',
                suffix: 'page',
            },
            {
                prompt: "See information about Toronto's budget decision cycle at our",
                icon: '/public/icons/ic_map_48px.svg',
                target: '/process/',
                targetText: 'Budget Process',
                suffix: 'page',
            },
            {
                prompt: 'Explore the Toronto budget with our',
                icon: '/public/icons/ic_explore_48px.svg',
                target: '/explorer',
                targetText: 'Budget Explorer',
            },
            {
                prompt: 'See our Toronto budgeting context notes',
                icon: '/public/icons/ic_wb_sunny_black_48px.svg',
                target: '/context',
                targetText: 'Budget Context',
            },
            {
                prompt: 'See our publications on our subsite',
                icon: '/public/icons/ic_wb_sunny_black_48px.svg',
                target: 'http://pubs.budgetpedia.ca',
                targetText: 'pubs.budgetpedia.ca',
                external: true,
            },
            {
                prompt: 'Find related',
                icon: '/public/icons/ic_library_books_48px.svg',
                target: '/resources',
                targetText: 'Budget Resources',
            },
        ],
    }
};
let secondlinklist = {
    controller: 'list',
    index: 'secondlinklist',
    type: 'linklist',
    properties: {
        upperDivider: true,
        header: 'Follow us:',
        items: [
            {
                external: true,
                prompt: 'For news check out our',
                icon: '/public/icons/twitter.png',
                target: 'http://twitter.com/budgetpedia',
                targetText: 'Twitter account',
                // description:'... or see the twitter feed below',
                imageStyle: {
                    height: '14px'
                }
            },
            {
                external: true,
                prompt: 'For in-depth articles see our',
                icon: '/public/icons/medium.png',
                target: 'http://medium.com/budgetpedia',
                targetText: 'Medium publication',
            },
        ],
    },
};
// let thirdlinklistheader = 'More media (experimental):'
// let thirdlinklistitems = [
let thirdlinklist = {
    controller: 'list',
    index: 'thirdlinklist',
    type: 'linklist',
    properties: {
        header: 'More media (experimental):',
        items: [
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/budgetpedia',
                targetText: 'our Facebook page',
            },
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/groups/budgetpedia',
                targetText: 'our Facebook group',
            },
            {
                external: true,
                prompt: 'For technical discussions:',
                icon: '/public/icons/g-logo.png',
                target: 'http://groups.google.com/d/forum/budgetpedia',
                targetText: 'our Google forum',
            },
            {
                external: true,
                prompt: 'Videos:',
                icon: '/public/icons/YouTube-icon-full_color.png',
                target: 'https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig',
                targetText: 'YouTube',
            },
            {
                external: true,
                prompt: 'Blog:',
                icon: '/public/icons/blogspot.jpeg',
                target: 'http://budgetpedia.blogspot.ca/',
                targetText: 'Blogspot',
            },
        ]
    }
};
let linklists = {
    toplinklist,
    secondlinklist,
    thirdlinklist,
};
export default linklists;
