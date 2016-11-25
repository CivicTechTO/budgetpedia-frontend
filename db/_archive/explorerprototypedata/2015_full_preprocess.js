// 2015_preprocess.js

// TODO: avoid creating service when named identically to the program!!
'use strict'
var jsonfile = require('jsonfile')
var fs = require('fs')
// var csv = require('csv')
var parse = require('csv-parse/lib/sync')
var budgetroot = require('./2015_data/budgetroot.json')

let year = 2015

// =============================================================================
// ----------------------------[ IMPORT STAFFING DATA ]-------------------------

var filetext = fs.readFileSync('./2015_data/2015.staffing.programs.csv','utf8')

var staffingrecords = parse(filetext, {auto_parse:true})

var budgetstaffing = budgetroot.DataSeries.BudgetStaffing.Items

for (var line of staffingrecords) {
    let code = line[0],
        perm = line[2],
        temp = line[3],
        total = line[4]

    if (perm === '') perm = null
    if (temp === '') temp = null
    if (total === '') total = null

    let item = budgetstaffing[code]
    if (!item) {
        console.log('code not found: ', code)
    } else {
        // decompose
        let years = item.years || {}
        years[year] = total
        let categories = item.Categories || {
            FULL:{years:{}},
            PART:{years:{}},
        }
        categories.FULL.years[year]=perm
        categories.PART.years[year]=temp
        // re-assemble
        item.years = years
        item.Categories = categories
    }
}

// =============================================================================
// ----------------------------[ IMPORT FINANCIAL DATA ]-------------------------
// and split into revenue and expense data

var programcodes = require('./2015_data/programcodes.json')

var filetext = fs.readFileSync('./2015_data/2015.approved.csv','utf8')

var financialrecords = parse(filetext, {auto_parse:true})

var PROGRAM = 0,
    SERVICE = 1,
    ACTIVITY = 2,
    CATNAME = 3,
    CATCODE = 4,
    REVEXP = 5,
    AMOUNT = 6,
    PROGCODE = 7

let filterForProgCode = program => {
    let progitem = programcodes.filter(item => {
        if (item[1] == program) {
            return true
        } else {
            return false
        }
    })
    return progitem
}

// containers for records filtered below
let expenserecords = []
let revenuerecords = []

// clean records; isolate expenses from revenues
for (var record of financialrecords) {
    let amount = record[AMOUNT]
    if (amount == '') {
        amount = null
        record[AMOUNT] = amount
    } else {
        if ((typeof amount) == 'string') {
            amount = amount.replace('(','-')
            amount = amount.replace(')','')
            amount = amount.replace(/,/g,'')
            amount = Number(amount)
            if (isNaN(amount)) {
                throw new Error('NaN: ' + record)
            }
            if (record[REVEXP] == 'Revenues') {
                amount = -amount
            }
            record[AMOUNT] = amount
        }
    } // else must be a number; leave it alone
    let progcode = filterForProgCode(record[PROGRAM])
    progcode = progcode[0]
    if (!progcode || !progcode[0]) {
        throw new Error('progcode not found for ',record)
    }
    record[PROGCODE] = progcode[0]
    if (record[REVEXP] == 'Revenues') {
        revenuerecords.push(record)
    } else {
        expenserecords.push(record)
    }
}


// utilities for imporing expense and revenue records into json structure
class Component {
    constructor() {
        this.years = {}
        this.Categories = {}
    }
}

var assignrecords = (budgetrecords,records) => {

    for (var record of records) {
        let program = record[PROGCODE],
            programname = record[PROGRAM],
            service = record[SERVICE],
            activity = record[ACTIVITY],
            expenditure = record[CATCODE],
            amount = record[AMOUNT]

        let item = budgetrecords[program]
        if (!item) {
            console.log('expense program code not found: ', program)
        } else {
            // assert Adjusted object
            let adjusteddata = item.Adjusted || new Component()
            // assert Adjusted summary year value
            if (!adjusteddata.years[year])
                adjusteddata.years[year] = 0
            // increment adjusted year value
            adjusteddata.years[year] += amount
            // assert Adjusted category object
            if (!adjusteddata.Categories[expenditure]) {
                adjusteddata.Categories[expenditure] = {
                    years:{}
                }
            }
            // assert adjusted Categories year value
            if (!adjusteddata.Categories[expenditure].years[year])
                adjusteddata.Categories[expenditure].years[year] = 0
            // increment adjusted Categories year value
            adjusteddata.Categories[expenditure].years[year] += amount

            if (programname != activity) {
                // assert adjusted Components object
                if (!adjusteddata.Components)
                    adjusteddata.Components = {}
                if (!adjusteddata.Components[service])
                    adjusteddata.Components[service] = new Component()

                let servicecomponent = adjusteddata.Components[service]
                // assert servicecomponent.years[year]
                if (!servicecomponent.years[year])
                    servicecomponent.years[year] = 0
                servicecomponent.years[year]+= amount
                // assert servicecomponent Category
                if (!servicecomponent.Categories[expenditure])
                    servicecomponent.Categories[expenditure] = {years:{}}
                if (!servicecomponent.Categories[expenditure].years[year])
                    servicecomponent.Categories[expenditure].years[year] = 0
                servicecomponent.Categories[expenditure].years[year] += amount

                if (activity != service) {
                    // assert adjusted Components object
                    if (!servicecomponent.Components)
                        servicecomponent.Components = {}
                    if (!servicecomponent.Components[activity])
                        servicecomponent.Components[activity] = new Component()
                    let activitycomponent = servicecomponent.Components[activity]
                    // assert activitycomponent.years[year]
                    if (!activitycomponent.years[year])
                        activitycomponent.years[year] = 0
                    activitycomponent.years[year]+= amount
                    // assert servicecomponent Category
                    if (!activitycomponent.Categories[expenditure])
                        activitycomponent.Categories[expenditure] = {years:{}}
                    if (!activitycomponent.Categories[expenditure].years[year])
                        activitycomponent.Categories[expenditure].years[year] = 0
                    activitycomponent.Categories[expenditure].years[year] += amount
                }
            }

            item.Adjusted = adjusteddata
        }
    }
}

// =============================================================================
// ----------------------------[ IMPORT EXPENSE DATA ]-------------------------

var budgetexpenses = budgetroot.DataSeries.BudgetExpenses.Items

var records = expenserecords

assignrecords(budgetexpenses, records)

// =============================================================================
// ----------------------------[ IMPORT REVENUE DATA ]-------------------------

var budgetrevenues = budgetroot.DataSeries.BudgetRevenues.Items

var records = revenuerecords

assignrecords(budgetrevenues, records)

// =============================================================================
// ----------------------------[ ADD SORTED STRUCTURES ]-------------------------

// expenses
var dataseries = budgetroot.DataSeries['BudgetExpenses']
var items = budgetexpenses

var category = dataseries.Categories
var lookups = budgetroot.Lookups[category]

for (let item in items) {
    let node = items[item].Adjusted
    if (node)
        addSortedLists(node,lookups,0)
}

// revenues
var dataseries = budgetroot.DataSeries['BudgetRevenues']
var items = budgetrevenues

var category = dataseries.Categories
var lookups = budgetroot.Lookups[category]

for (let item in items) {
    let node = items[item].Adjusted
    if (node)
        addSortedLists(node,lookups,0)
}

// recursive
function addSortedLists(node,lookups, depth) {
    if (node.Categories) {
        node.SortedCategories = getNameSortedComponents(node.Categories,lookups)
    }
    if (node.Components) {
        node.SortedComponents = getNameSortedComponents(node.Components)
        if (depth == 0) 
            node.Contents = 'SERVICES'
        else node.Contents = 'ACTIVITIES'
        for (let subnode in node.Components) {
            depth ++
            addSortedLists(node.Components[subnode],lookups)
            depth --
        }
    }
}

// utility used later
function getNameSortedComponents(items, lookups) {
    let sorted = []
    for (let itemname in items) {
        let component = items[itemname]

        let name, item
        if (lookups) {
            name = lookups[itemname]
        } else {
            name = itemname
        }
        item = {
            Code: itemname,
            Name: name || 'unknown name'
        }
        sorted.push(item)
    }
    sorted.sort((a, b) => {
        let value
        if (a.Name < b.Name)
            value = -1
        else if (a.Name > b.Name)
            value = 1
        else
            value = 0
        return value
    })

    return sorted

}

// ======================================================================
// -------------------------[ SAVE OUTPUT JSON FILE ]--------------------

jsonfile.spaces = 4

jsonfile.writeFile('./2015budgetA.json', budgetroot)
