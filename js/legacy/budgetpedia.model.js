// master.model.tsx
/*
    TODO: purge system of navitiles - old wordy tiles = maintiles
    TODO: break file into backend config bundle and frontend package bundle components; merge in index.tsx?
*/
'use strict';
// https://design.google.com/icons/
/* ================= theme details: ==================== */
// let budgetdata = {} // require('../../explorerprototypedata/2015budgetA.json')
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import database, {CurrencyDataset,ItemDataset} from '../addins/classes/databaseapi'
// fontFamily: "Roboto, sans-serif"
// palette: Object
// 	accent1Color: "#ff4081"
// 	accent2Color: "#f5f5f5"
// 	accent3Color: "#9e9e9e"
// 	alternateTextColor: "#ffffff"
// 	borderColor: "#e0e0e0"
// 	canvasColor: "#ffffff"
// 	clockCircleColor: "rgba(0,0,0,0.07)"
// 	disabledColor: "rgba(0,0,0,0.3)"
// 	pickerHeaderColor: "#00bcd4"
// 	primary1Color: "#00bcd4"
// 	primary2Color: "#0097a7"
// 	primary3Color: "#bdbdbd"
// 	textColor: "rgba(0, 0, 0, 0.87)"
// spacing: Object
// 	desktopDropDownMenuFontSize: 15
// 	desktopDropDownMenuItemHeight: 32
// 	desktopGutter: 24
// 	desktopGutterLess: 16
// 	desktopGutterMini: 8
// 	desktopGutterMore: 32
// 	desktopKeylineIncrement: 64
// 	desktopLeftNavMenuItemHeight: 48
// 	desktopSubheaderHeight: 48
// 	desktopToolbarHeight: 56
// 	iconSize: 24
/* ======================================== */
import * as colors from 'material-ui/styles/colors';
let globalbar = {
    title: 'Budgetpedia v0.1.6',
    contactAddress: 'mailto:mail@budgetpedia.ca',
    contactPrompt: 'mail@budgetpedia.ca',
    tagLine: 'Only about Toronto for now',
    username: 'anonymous',
    accountoptions: [],
    menuoptions: [],
};
// let toolsnavbar = {
// }
// TODO: no longer needed with switch away from flipcards
// for more detail: https://www.npmjs.com/package/snifferjs
// let system = {
// 	ischrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
// }
let homepage = {
    id: 0,
    content: {
        title: "Budgetpedia Home",
        // subtitle:"we're all about government budgets",
        image: '../../public/icons/budgetpedia-logo.png',
        category: 'master',
    },
    index: 0,
    tier: 'master',
    route: '/',
    tag: 'home',
    parent: null,
};
// review apporpriateness of the following typescript type notation
let pagetargets = [
    {
        id: 8,
        content: {
            title: `Budget Design`,
            subtitle: `About specific budgets`,
            image: '../../public/icons/ic_attach_money_48px.svg',
            category: 'tools',
        },
        index: 1,
        tier: 'primary',
        route: '/design',
        tag: 'budgets',
        parent: 'home',
    },
    {
        id: 7,
        content: {
            title: `Budget Process`,
            subtitle: `About budget decisions`,
            image: '../../public/icons/ic_map_48px.svg',
            category: 'tools',
        },
        index: 1,
        tier: 'primary',
        route: '/roadmap/',
        tag: 'roadmap',
        parent: 'home',
    },
    {
        id: 9,
        content: {
            title: `Budget Explorer`,
            subtitle: `Interactive tools`,
            image: '../../public/icons/ic_explore_48px.svg',
            category: 'tools',
        },
        index: 0,
        tier: 'primary',
        route: '/explorer',
        tag: 'explorer',
        parent: 'home',
    },
    {
        id: 100,
        content: {
            title: `Budget Context`,
            subtitle: `Toronto Overview`,
            image: '../../public/icons/ic_wb_sunny_black_48px.svg',
            category: 'support',
        },
        index: 2,
        tier: 'primary',
        route: '/overview',
        tag: 'overview',
        parent: 'home',
    },
    {
        id: 15,
        content: {
            title: `Budget Resources`,
            subtitle: `External websites`,
            image: '../../public/icons/ic_library_books_48px.svg',
            category: 'support',
        },
        index: 2,
        tier: 'primary',
        route: '/resources',
        tag: 'resources',
        parent: 'home',
    },
    {
        id: 14,
        content: {
            title: `Activist Pathways`,
            subtitle: `How to make change`,
            image: '../../public/icons/ic_directions_walk_48px.svg',
            category: 'support',
        },
        index: 3,
        tier: 'primary',
        route: '/pathways',
        tag: 'pathways',
        parent: 'home',
    },
    {
        id: 6,
        content: {
            title: `About Budgetpedia`,
            subtitle: `History, people, resources`,
            image: '../../public/icons/ic_info_48px.svg',
            category: 'information',
        },
        index: 4,
        tier: 'secondary',
        route: 'about',
        tag: 'about',
        parent: 'home',
    },
    {
        id: 16,
        content: {
            title: `Announcements`,
            subtitle: `Budgetpedia Plans and News`,
            image: '../../public/icons/ic_announcement_black_48px.svg',
            category: 'information',
        },
        index: 5,
        tier: 'secondary',
        route: '/announcements',
        tag: 'announcements',
        parent: 'home',
    },
    // {
    //     id: 13,
    //     content: {
    //         title: `Get a Demo`,
    //         subtitle: `Resources & training`,
    //         image: '../../public/icons/ic_record_voice_over_48px.svg',
    //         category: 'get involved',
    //     },
    //     index: 6,
    //     tier:'secondary',
    //     route: '/demos',
    //     tag:'demos',
    //     parent:'home',
    // },
    {
        id: 10,
        content: {
            title: `Our Teams`,
            subtitle: `Join us!`,
            image: '../../public/icons/ic_group_48px.svg',
            category: 'get involved',
        },
        index: 7,
        tier: 'secondary',
        route: '/teams',
        tag: 'teams',
        parent: 'home',
    },
];
let branchDefaults = {
    repository: "Toronto",
    viewpoint: "FUNCTIONAL",
    version: 'SUMMARY',
    aspect: "Expenses",
    branchDataGeneration: 0,
    defaultVersions: {
        'FUNCTIONAL': 'SUMMARY',
        'STRUCTURAL': 'SUMMARY',
        'ACTUALEXPENSES': 'ACTUALEXPENSES',
        'ACTUALREVENUES': 'ACTUALREVENUES',
        'EXPENDITURES': 'EXPENDITURES',
        'FINANCIALASSETS': 'FINANCIALASSETS',
        'NONFINANCIALASSETS': 'NONFINANCIALASSETS',
        'LIABILITIES': 'LIABILITIES',
        'RESERVES': 'RESERVES',
    },
    defaultAspects: {
        'SUMMARY': 'Expenses',
        'PBFT': 'Expenses',
        'ACTUALEXPENSES': 'Expenses',
        'ACTUALREVENUES': 'Revenues',
        'EXPENDITURES': 'Expenditure',
        'FINANCIALASSETS': 'Assets',
        'NONFINANCIALASSETS': 'TangibleAssets',
        'LIABILITIES': 'Liabilities',
        'RESERVES': 'Reserves',
    },
    // chartType: "ColumnChart",
    inflationAdjusted: true,
    nodeList: [],
    showOptions: true,
    prorata: 'OFF',
};
let explorer = {
    defaults: {
        branch: branchDefaults,
        node: {
            cellIndex: 0,
            cellList: null,
            yearSelections: { leftYear: 1998, rightYear: 2017 },
        },
        cell: {
            chartConfigs: {
                'OneYear': {
                    explorerChartCode: "ColumnChart",
                },
                'TwoYears': {
                    explorerChartCode: "DiffColumnChart",
                },
                'AllYears': {
                    explorerChartCode: "TimeLine",
                },
            },
            chartSelection: null,
            yearScope: "OneYear",
        }
    }
};
var masterModel = {
    homepage,
    pagetargets,
    globalbar,
    // toolsnavbar,
    theme,
    colors,
    explorer,
};
export default masterModel;
