// home.model.tsx
let torontonuggettitle = 'About Toronto <span style="font-size:smaller">(source: [StatsCan Census](http://www12.statcan.gc.ca/census-recensement/2016/dp-pd/prof/details/page.cfm?Lang=E&Geo1=CSD&Code1=3520005&Geo2=PR&Code2=01&Data=Count&SearchText=Toronto&SearchType=Begins&SearchPR=01&TABID=1&B1=All){target="_blank" style="color:white"})</span>';
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
        suffix: 'for 2016, including <span style="color:gold">693K</span> for 1 or 2 persons;<br><span style="color:gold">~53%</span> owned; <span style="color:gold">~47%</span> rented',
        contrast: true,
    },
    {
        prefix: 'Married',
        infix: '1.18M',
        suffix: 'for 2016, or living common law',
        contrast: true,
    },
    {
        prefix: 'Family units',
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
        suffix: 'for 2016, <span style="color:gold">~$3,400</span> per resident',
        contrast: true,
    },
    {
        prefix: 'Liabilities',
        infix: '$15.8B',
        suffix: 'for 2016, <span style="color:gold">~$5,850</span> per resident',
        contrast: true,
    },
    {
        prefix: 'Net debt',
        infix: '<span style=color:red>$6.5B</span>',
        suffix: 'for 2016, (financial assets less liabilities)<span style="color:gold">~$2,380</span> per resident',
        contrast: true,
    },
    {
        prefix: 'Tangible assets',
        infix: '$29B',
        suffix: '(including inventories and prepaids) for 2016, <span style="color:gold">~$10,600</span> per resident',
        contrast: true,
    },
    {
        prefix: 'Net worth',
        infix: '<span style=color:lightgreen>$22.5B</span>',
        suffix: 'Accumulated Surplus for 2016, <span style="color:gold">~$8,220</span> per<br>resident',
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
        prefix: 'Cash provided by investing activities',
        infix: '$1.02B',
        suffix: 'for 2016',
        contrast: true,
    },
    {
        prefix: 'Cash provided by financing activities',
        infix: '$271K',
        suffix: 'for 2016',
        contrast: true,
    },
    {
        prefix: 'Net increase in cash during the year',
        infix: '<span style=color:lightgreen>$1.24B</span>',
        suffix: 'for 2016',
        contrast: true,
    },
];
let financechangestitle = 'Toronto Finance Trends <span style=font-size:smaller>(source: audited statements on [Budgetpedia](http://budgetpedia.ca/explorer){target=_blank style=color:white})</span> <span style=font-size:x-small;white-space:nowrap>*adjusted for inflation to 2017$*</span>';
let financechangeslist = [
    {
        prefix: '2010:2016<br>Population (for comparison)',
        infix: '<span style=color:lightgreen>6.2%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>166K</span> to <span style=color:gold>2.84M</span><span style=color:gold>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Overall revenues',
        infix: '<span style=color:red>1.9%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$237M</span> to <span style=color:gold>$12.5B</span><span style=color:gold>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Government transfers',
        infix: '<span style=color:red>23.3%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$847M</span> to <span style=color:gold>$2.9B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>User fees',
        infix: '<span style=color:lightgreen>8.4%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$245M</span> to <span style=color:gold>$3.1B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>General revenues',
        infix: '<span style=color:lightgreen>8.0%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$127M</span> to <span style=color:gold>$1.7B</span><br>(like development charges)',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Property taxes',
        infix: '<span style=color:red>9.2%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$410M</span> to <span style=color:gold>$4B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Overall costs',
        infix: '<span style=color:red>7.6%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$919M</span> to <span style=color:gold>$11.2B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Staffing costs',
        infix: '<span style=color:lightgreen>3.5%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$194M</span> to <span style=color:gold>$5.7B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Transfer payments to persons',
        infix: '<span style=color:red>34.7%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$651M</span> to <span style=color:gold>$1.3B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>All other costs',
        infix: '<span style=color:red>9.9%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_downward</span></span>',
        suffix: 'Down by <span style=color:gold>$546M</span> to <span style=color:gold>$4.2B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Changes in net worth',
        infix: '<span style=color:lightgreen>29.2%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$5.2B</span> to <span style=color:gold>$23B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Changes in net debt',
        infix: '<span style=color:red>31.8%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$1.6B</span> to <span style=color:gold>$6.6B</span>',
        contrast: true,
    },
    {
        prefix: '2010:2016<br>Changes in tangible assets',
        infix: '<span style=color:lightgreen>29.7%<span class=material-icons style=font-size:1.1em;vertical-align:top>arrow_upward</span></span>',
        suffix: 'Up by <span style=color:gold>$6.7B</span> to <span style=color:gold>$29.5B</span>',
        contrast: true,
    },
];
let headertitle = "Welcome to Budgetpedia";
let headersubtitle = "Supporting informed debate about the Toronto budget";
let tilelisttitle = 'Main website pages';
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
        target: '/roadmap/',
        targetText: 'Budget Process',
    },
    {
        prompt: 'Find related',
        icon: '/public/icons/ic_library_books_48px.svg',
        target: '/resources',
        targetText: 'Budget Resources',
    },
    {
        prompt: 'Toronto context',
        icon: '/public/icons/ic_wb_sunny_black_48px.svg',
        target: '/context',
        targetText: 'Budget Context',
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
    headertitle,
    headersubtitle,
    tilelisttitle,
    toplinklistheader,
    toplinklistitems,
    secondlinklistheader,
    secondlinklistitems,
    thirdlinklistheader,
    thirdlinklistitems,
};
export default model;
