"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let torontonuggettitle = 'About Toronto <span style="font-size:smaller">(source: [StatsCan](http://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/page.cfm?Lang=E&Geo1=CSD&Code1=3520005&Geo2=PR&Code2=01&Data=Count&SearchText=Toronto&SearchType=Begins&SearchPR=01&TABID=1&B1=All){target="_blank" style="color:white"})</span>';
let torontonuggetlist = [
    {
        prefix: 'Population',
        infix: '<span style=color:lightgreen>2.73M</span>',
        suffix: 'for 2016, including <span style="color:gold">~400K</span> 14 or under',
        contrast: true,
    },
    {
        prefix: 'Households',
        infix: '1.11M',
        suffix: 'for 2016, including <span style="color:gold">693K</span> for 1 or 2 persons;<br><span style="color:gold">587K</span> owned',
        contrast: true,
    },
    {
        prefix: 'Married',
        infix: '1.18M',
        suffix: 'for 2016, or living common law',
        contrast: true,
    },
    {
        prefix: 'Families',
        infix: '719K',
        suffix: 'for 2016; two or more related people in a household',
        contrast: true,
    },
    {
        prefix: 'Non-official language speakers',
        infix: '702K',
        suffix: 'people speaking non-official languages<br>at home',
        contrast: true,
    },
    {
        prefix: 'Income',
        infix: '$30K',
        suffix: 'for 2015, individual, median, for <span style="color:gold">2.19M</span><br>earners (work<br>or not)',
        contrast: true,
    },
    {
        prefix: 'Low income people',
        infix: '543K',
        suffix: 'for 2015; living in low-income households (poverty)',
        contrast: true,
    },
    {
        prefix: 'Immigrants',
        infix: '1.27M',
        suffix: 'including <span style="color:gold">354K</span> since 2006',
        contrast: true,
    },
    {
        prefix: 'Visible minorities',
        infix: '1.39M',
        suffix: 'people',
        contrast: true,
    },
    {
        prefix: 'Post secondary',
        infix: '1.07M',
        suffix: 'people with post-secondary certificate, diploma or degree',
        contrast: true,
    },
    {
        prefix: 'Full time workers',
        infix: '751K',
        suffix: 'plus <span style="color:gold">752K</span> worked part year or part time',
        contrast: true,
    },
];
let financenuggettitle = 'About Toronto Finances <span style="font-size:smaller">(source: [audited statements](https://drive.google.com/open?id=0B208oCU9D8OuZW9OVU5sUVZtVDg){target="_blank" style="color:white"})</span>';
let financenuggetlist = [
    {
        prefix: 'Revenue',
        infix: '$12.2B',
        suffix: 'for 2016, <span style="color:gold">$109M</span> under budget',
        contrast: true,
    },
    {
        prefix: 'Expenses',
        infix: '$10.95B',
        suffix: 'for 2016, <span style="color:gold">$950M</span> under budget',
        contrast: true,
    },
    {
        prefix: 'Surplus',
        infix: '<span style=color:lightgreen>$1.25B</span>',
        suffix: 'for 2016, <span style="color:gold">$840M</span> over budget',
        contrast: true,
    },
    {
        prefix: 'Financial Assets',
        infix: '$9.3B',
        suffix: 'for 2016, <span style="color:gold">~$3,400</span> per person',
        contrast: true,
    },
    {
        prefix: 'Libilities',
        infix: '$15.8B',
        suffix: 'for 2016, <span style="color:gold">~$5,850</span> per person',
        contrast: true,
    },
    {
        prefix: 'Net debt',
        infix: '$6.5B',
        suffix: 'for 2016, (financial assets less liabilities)<span style="color:gold">~$2,380</span> per person',
        contrast: true,
    },
    {
        prefix: 'Tangible Assets',
        infix: '$29B',
        suffix: '(including inventories and prepaids) for 2016, <span style="color:gold">~$10,600</span> per person',
        contrast: true,
    },
    {
        prefix: 'Accumulated Surplus',
        infix: '$22.5B',
        suffix: '(like "net equity") for 2016, <span style="color:gold">~$8,220</span> per<br>person',
        contrast: true,
    },
    {
        prefix: 'Cash provided by operating activities',
        infix: '$2.53B',
        suffix: 'for 2016',
        contrast: true,
    },
    {
        prefix: 'Cash applied to<br>capital activities',
        infix: '$2.57B',
        suffix: 'for 2016',
        contrast: true,
    },
    {
        prefix: 'Net increase in cash during the year',
        infix: '<span style=color:lightgreen>$1.24B</span>',
        suffix: 'for 2016, including ops, financing, investing,<br>& capital',
        contrast: true,
    },
];
let financechangestitle = 'Toronto Finance *Trends*';
let financechangeslist = [
    {
        prefix: 'something',
        infix: '1000',
        suffix: 'else',
        contrast: true,
    }
];
let headercardstyle = {
    backgroundImage: "url(/public/icons/WebsiteBanner.png)",
    backgroundSize: "cover",
    margin: "8px",
    border: "2px solid silver",
    borderRadius: "8px",
};
let headertitle = "Welcome to Budgetpedia";
let headersubtitle = "Supporting informed debate about the Toronto budget";
let tileliststyle = {
    padding: "36px 16px 16px",
    display: 'block',
    backgroundColor: '#749261',
    overflowX: 'scroll',
};
let tilelisttitle = 'Main website pages';
let footercardstyle = {
    backgroundImage: "url(/public/icons/WebsiteBanner.png)",
    backgroundSize: "cover",
    margin: "8px",
    border: "2px solid silver",
    borderRadius: "8px",
};
let toplinklistheader = 'Browse our site:';
let toplinklistitems = [
    {
        prompt: 'Explore the Toronto budget with our',
        icon: '/public/icons/ic_explore_48px.svg',
        target: '/explorer',
        targetText: 'Budget Explorer',
    },
    {
        prompt: "See information about Toronto's budget decision schedule at our",
        icon: '/public/icons/ic_map_48px.svg',
        target: '/roadmap',
        targetText: 'Budget Roadmap',
    },
    {
        prompt: 'Find related',
        icon: '/public/icons/ic_library_books_48px.svg',
        target: '/resources',
        targetText: 'Resources',
    },
];
let secondlinklistheader = 'Follow us:';
let secondlinklistitems = [
    {
        external: true,
        prompt: 'For news check out our',
        icon: '/public/icons/twitter.png',
        target: 'http://twitter.com/budgetpedia',
        targetText: 'Twitter account',
        description: '... or see the twitter feed below',
        imageStyle: { height: '14px' }
    },
    {
        external: true,
        prompt: 'For in-depth articles see our',
        icon: '/public/icons/medium.png',
        target: 'http://medium.com/budgetpedia',
        targetText: 'Medium publication',
    },
];
let thirdlinklistheader = 'More media (experimental):';
let thirdlinklistitems = [
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
];
let model = {
    torontonuggettitle,
    torontonuggetlist,
    financenuggettitle,
    financenuggetlist,
    financechangestitle,
    financechangeslist,
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
};
exports.default = model;
