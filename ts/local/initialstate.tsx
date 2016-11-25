// initialstate.tsx
/*
    TODO: purge system of navitiles - old wordy tiles = maintiles
*/

'use strict'

// https://design.google.com/icons/

/* ================= theme details: ==================== */

// let budgetdata = {} // require('../../explorerprototypedata/2015budgetA.json')

import theme from 'material-ui/styles/baseThemes/lightBaseTheme'

import {BranchSettings} from '../addins/explorer/modules/interfaces'

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

import * as colors from 'material-ui/styles/colors'

let appnavbar = {
	title: 'Budgetpedia v0.1',
	username: 'anonymous',
	accountoptions: [],
	menuoptions: [],
}

// let toolsnavbar = {

// }

// TODO: no longer needed with switch away from flipcards
// for more detail: https://www.npmjs.com/package/snifferjs
let system = {
	ischrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

let homecols: number = 2 // default
let homepadding: number = 20

let hometiles: [Object] = [
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
        tier:'primary',
        route: 'explorer',
    },
    {
        id: 7,
        content: {
            title: `Budget Roadmap`,
            subtitle: `About budget decisions`,
            image: '../../public/icons/ic_map_48px.svg',
            category: 'tools',
            cols:2,
        },
        index: 1,
        tier:'primary',
        route: 'roadmap',
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
        tier:'primary',
        route: 'resources',
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
        tier:'primary',
        route: 'pathways',
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
        tier:'secondary',
        route: 'about',
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
        tier:'secondary',
        route: 'announcements',
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
        tier:'secondary',
        route: 'demos',
    },
    {
        id: 10,
        content: {
            title: `Join Us!`,
            subtitle: `Join one of our teams`,
            image: '../../public/icons/ic_group_48px.svg',
            category: 'get involved',
        },
        index: 7,
        tier:'secondary',
        route: 'joinus',
    },
/*    {
        id: 1,
        content: {
            title: `Deputation Helper`,
            subtitle: `Have your say`,
            image: '../../public/icons/ic_insert_emoticon_48px.svg',
            category: 'tools',
        },
        index: 2,
        route: 'deputations',
    },
    {
        id: 2,
        content: {
            title: `Communities`,
            subtitle: `Find birds of a feather`,
            image: '../../public/icons/ic_local_library_48px.svg',
            category: 'support',
        },
        index: 5,
        route: 'communities',
    },
    {
        id: 8,
        content: {
            title: `Social Media`,
            subtitle: `Public forums`,
            image: '../../public/icons/ic_thumb_up_48px.svg',
            category: 'support',
        },
        index: 6,
        route: 'socialmedia',
    },
    {
        id: 11,
        content: {
            title: `Newsletter`,
            subtitle: `News and notices`,
            image: '../../public/icons/ic_markunread_mailbox_48px.svg',
            category: 'support',
        },
        index: 7,
        route: 'newsletter',
    },
    {
        id: 12,
        content: {
            title: `Tell your story`,
            subtitle: `Write for us`,
            image: '../../public/icons/ic_keyboard_48px.svg',
            category: 'get involved',
        },
        index: 10,
        route: 'stories',
    },
*/]

let workingmessagestate = false

let branchDefaults:BranchSettings = {
    repository: "Toronto",
    viewpoint: "FUNCTIONAL",
    version: 'SUMMARY',
    aspect: "Expenses",
    branchDataGeneration:0,
    defaultVersions:{ // viewpoint versions
        'FUNCTIONAL':'SUMMARY',
        'STRUCTURAL':'SUMMARY',
        'ACTUALEXPENSES':'ACTUALEXPENSES',
        'ACTUALREVENUES':'ACTUALREVENUES',
        'EXPENDITURES':'EXPENDITURES',
    },
    defaultAspects:{ // version aspects
        'SUMMARY':'Expenses',
        'PBFT':'Expenses',
        'ACTUALEXPENSES':'Expenses',
        'ACTUALREVENUES':'Revenues',
        'EXPENDITURES':'Expenditure',
    },
    // chartType: "ColumnChart",
    inflationAdjusted: true,
    nodeList:[],
    showOptions: false,
    prorata:'OFF',
}

let explorer = {
    defaults: {
        branch: branchDefaults,
        node: {
            cellIndex:0,
            cellList:null,
            yearSelections:{ leftYear: 1998, rightYear: 2016 },
        },
        cell: {
            chartConfigs:{
                'OneYear':{
                    explorerChartCode: "ColumnChart",
                },
                'TwoYears':{
                    explorerChartCode: "DiffColumnChart",
                },
                'AllYears':{
                    explorerChartCode: "TimeLine",
                },
            },
            chartSelection: null,
            yearScope:"OneYear",
        }
    }
}

var initialstate = {
    hometiles,
    homecols,
    homepadding,
    appnavbar,
	// toolsnavbar,
	theme,
	colors,
	system,
    explorer,
    // budgetdata,
    workingmessagestate,
}

export default initialstate
