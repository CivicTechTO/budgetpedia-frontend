// 2015_preprocess.js
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

var records = parse(filetext, {auto_parse:true})

var budgetstaffing = budgetroot.DataSeries.BudgetStaffing.Items

for (var line of records) {
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
// ----------------------------[ IMPORT EXPENSE DATA ]-------------------------

var filetext = fs.readFileSync('./2015_data/2015.expenses.expenditures.csv','utf8')

var records = parse(filetext, {auto_parse:true})

var budgetexpenses = budgetroot.DataSeries.BudgetExpenses.Items

for (var line of records) {
    let program = line[0],
        expenditure = line[2],
        amount = line[5]

    if (amount === '') amount = null

    let item = budgetexpenses[program]
    if (!item) {
        console.log('expense program code not found: ', program)
    } else {
        // decompose
        let nominaldata = item.Nominal || {years:{}, Categories:{}}
        let adjusteddata = item.Adjusted || {years:{}, Categories:{}}

        // ------------------[ ITEM ]----------------
        let nominalyears = nominaldata.years
        if (!nominalyears[year]) nominalyears[year] = 0
        nominalyears[year] += amount

        let adjustedyears = adjusteddata.years
        if (!adjustedyears[year]) adjustedyears[year] = 0
        adjustedyears[year] += amount

        // -------------------[ CATEGORIES ]------------------

        let nominalcategories = nominaldata.Categories
        let nominalcompexp = nominalcategories[expenditure] || {years:{}}
        let nominalyearaccount = nominalcompexp.years[year]
        if (nominalyearaccount) {
            nominalyearaccount += amount
        } else {
            nominalyearaccount = amount
        }
        nominalcompexp.years[year] = nominalyearaccount
        nominalcategories[expenditure] = nominalcompexp

        let adjustedcategories = adjusteddata.Categories
        let adjustedcompexp = adjustedcategories[expenditure] || {years:{}}
        let adjustedyearaccount = adjustedcompexp.years[year]
        if (adjustedyearaccount) {
            adjustedyearaccount += amount
        } else {
            adjustedyearaccount = amount
        }
        adjustedcompexp.years[year] = adjustedyearaccount
        adjustedcategories[expenditure] = adjustedcompexp

        item.Nominal = nominaldata
        item.Adjusted = adjusteddata
    }
}

// =============================================================================
// ----------------------------[ IMPORT REVENUE DATA ]-------------------------

var filetext = fs.readFileSync('./2015_data/2015.revenues.expenditures.csv','utf8')

var records = parse(filetext, {auto_parse:true})

var budgetrevenues = budgetroot.DataSeries.BudgetRevenues.Items

for (var line of records) {
    let program = line[0],
        expenditure = line[2],
        amount = line[5]

    if (amount === '') 
        amount = null
    else 
        amount = -amount // normalize

    let item = budgetrevenues[program]
    if (!item) {
        console.log('revenue program code not found: ', program)
    } else {
        // decompose
        let nominaldata = item.Nominal || {years:{}, Categories:{}}
        let adjusteddata = item.Adjusted || {years:{}, Categories:{}}

        // ------------------[ ITEM ]----------------

        // update nominaldata.years

        // nominal...
        let nominalyears = nominaldata.years
        if (!nominalyears[year]) nominalyears[year] = 0
        nominalyears[year] += amount

        // updaet adjusteddata.years

        // adjusted...
        let adjustedyears = adjusteddata.years
        if (!adjustedyears[year]) adjustedyears[year] = 0
        adjustedyears[year] += amount

        // -------------------[ CATEGORIES ]------------------

        // update nominaldata.Categories

        // nominal: decompose...
        let nominalcategories = nominaldata.Categories
        let nominalcompyears = nominalcategories[expenditure] || {years:{}}
        let nominalyearaccount = nominalcompyears.years[year]
        if (nominalyearaccount) {
            nominalyearaccount += amount
        } else {
            nominalyearaccount = amount
        }
        // nominal: re-assemble...
        nominalcompyears.years[year] = nominalyearaccount
        nominalcategories[expenditure] = nominalcompyears

        // update adjusteddata.Categories

        // adjusted: decompose
        let adjustedcategories = adjusteddata.Categories
        let adjustedcompyears = adjustedcategories[expenditure] || {years:{}}
        let adjustedyearaccount = adjustedcompyears.years[year]
        if (adjustedyearaccount) {
            adjustedyearaccount += amount
        } else {
            adjustedyearaccount = amount
        }
        // adjusted: re-assemble
        adjustedcompyears.years[year] = adjustedyearaccount
        adjustedcategories[expenditure] = adjustedcompyears

        // re-assemble
        item.Nominal = nominaldata
        item.Adjusted = adjusteddata
    }
}

// ======================================================================
// -------------------------[ SAVE OUTPUT JSON FILE ]--------------------

jsonfile.spaces = 4

jsonfile.writeFile('./2015budget.json', budgetroot)
