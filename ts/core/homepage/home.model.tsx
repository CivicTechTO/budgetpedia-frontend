// home.model.tsx

let headercardstyle = 
    {
        backgroundImage:"url(/public/icons/WebsiteBanner.png)",
        backgroundSize:"cover",
        margin:"8px",
        border:"2px solid silver",
        borderRadius:"8px",
    }

let headertitle = "Welcome to Budgetpedia"

let headersubtitle = "Supporting informed debate about the Toronto budget"

let tileliststyle = 
    {
        padding:"16px",
        display: 'block',
        backgroundColor: '#749261',               
        overflowX: 'scroll', 
    }

let tilelisttitle = 'Main pages (scroll <-->)'

let footercardstyle =
    {
        backgroundImage:"url(/public/icons/WebsiteBanner.png)",
        backgroundSize:"cover",
        margin:"8px",
        border:"2px solid silver",
        borderRadius:"8px",
    }

let toplinklistheader = 'Browse our site:'

let toplinklistitems = [
    {
        prompt:'Explore the Toronto budget with our',
        icon:'/public/icons/ic_explore_48px.svg',
        target:'/explorer',
        targetText:'Budget Explorer',
    },
    {
        prompt:"See information about Toronto's budget decision schedule at our",
        icon:'/public/icons/ic_map_48px.svg',
        target:'/roadmap',
        targetText:'Budget Roadmap',
    },
    {
        prompt:'Find related',
        icon:'/public/icons/ic_library_books_48px.svg',
        target:'/resources',
        targetText:'Resources',
    },
]

let secondlinklistheader = 'Follow us:'

let secondlinklistitems = [
    {
        external:true,
        prompt:'For news check out our',
        icon:'/public/icons/twitter.png',
        target:'http://twitter.com/budgetpedia',
        targetText:'Twitter account',
        description:'... or see the twitter feed below',
        imageStyle:{height:'14px'}
    },
    {
        external:true,
        prompt:'For in-depth articles see our',
        icon:'/public/icons/medium.png',
        target:'http://medium.com/budgetpedia',
        targetText:'Medium publication',
    },
]

let thirdlinklistheader = 'More media (experimental):'

let thirdlinklistitems = [
    {
        external:true,
        icon:'/public/icons/facebook.png',
        target:'http://facebook.com/budgetpedia',
        targetText:'our Facebook page',
    },
    {
        external:true,
        icon:'/public/icons/facebook.png',
        target:'http://facebook.com/groups/budgetpedia',
        targetText:'our Facebook group',
    },
    {
        external:true,
        prompt:'For technical discussions:',
        icon:'/public/icons/g-logo.png',
        target:'http://groups.google.com/d/forum/budgetpedia',
        targetText:'our Google forum',
    },
    {
        external:true,
        prompt:'Videos:',
        icon:'/public/icons/YouTube-icon-full_color.png',
        target:'https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig',
        targetText:'YouTube',
    },
    {
        external:true,
        prompt:'Blog:',
        icon:'/public/icons/blogspot.jpeg',
        target:'http://budgetpedia.blogspot.ca/',
        targetText:'Blogspot',
    },
]

let model = {
    headercardstyle,
    headertitle,
    headersubtitle,
    tileliststyle,
    tilelisttitle,
    footercardstyle,
    toplinklistheader,
    toplinklistitems,
    secondlinklistheader,
    secondlinklistitems,
    thirdlinklistheader,
    thirdlinklistitems,
}

export default model