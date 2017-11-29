'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const lightBaseTheme_1 = require("material-ui/styles/baseThemes/lightBaseTheme");
const colors = require("material-ui/styles/colors");
let globalbar = {
    title: 'Budgetpedia v0.1.3',
    contactAddress: 'mailto:mail@budgetpedia.ca',
    contactPrompt: 'mail@budgetpedia.ca',
    tagLine: "We're all about government budgets",
    username: 'anonymous',
    accountoptions: [],
    menuoptions: [],
};
let system = {
    ischrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
};
let homecols = 2;
let homepadding = 20;
let pagetargets = [
    {
        id: 9,
        content: {
            title: `Budget Explorer`,
            subtitle: `Interactive tools`,
            image: '../../public/icons/ic_explore_48px.svg',
            category: 'tools',
            cols: 2,
        },
        index: 0,
        tier: 'primary',
        route: '/explorer',
    },
    {
        id: 7,
        content: {
            title: `Budget Roadmap`,
            subtitle: `About budget decisions`,
            image: '../../public/icons/ic_map_48px.svg',
            category: 'tools',
            cols: 2,
        },
        index: 1,
        tier: 'primary',
        route: '/roadmap',
    },
    {
        id: 15,
        content: {
            title: `Resources`,
            subtitle: `External websites`,
            image: '../../public/icons/ic_library_books_48px.svg',
            category: 'support',
        },
        index: 2,
        tier: 'primary',
        route: '/resources',
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
        route: '/about',
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
    },
    {
        id: 13,
        content: {
            title: `Get a Demo`,
            subtitle: `Resources & training`,
            image: '../../public/icons/ic_record_voice_over_48px.svg',
            category: 'get involved',
        },
        index: 6,
        tier: 'secondary',
        route: '/demos',
    },
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
    },
];
let workingmessagestate = false;
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
    },
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
var initialstate = {
    pagetargets,
    homecols,
    homepadding,
    globalbar,
    theme: lightBaseTheme_1.default,
    colors,
    system,
    explorer,
    workingmessagestate,
};
exports.default = initialstate;
