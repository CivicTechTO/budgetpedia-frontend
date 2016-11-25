// preprocess.js
'use strict'
var jsonfile = require('jsonfile')
var budgetroot = require('./2016_data/budgetroot.json')
var departments = require('./2016_data/departments.json')
var categories = require('./2016_data/categories.json')
var divisions = require('./2016_data/programs.json')
var expenditures = require('./2016_data/expenditures.json')
var expenditurenames = require('./2016_data/expenditurenames.json')

let expenditurebudget = expenditures.map( item => {
    let expenditurenameitem = expenditurenames.filter(nameitem => {
        return (nameitem.Expenditure == item.Expenditure)? true: false
    })
    expenditurenameitem = expenditurenameitem[0]
    item.Amount = parseInt(item.Amount)
    item.Expenditure = expenditurenameitem.Name + ' (' + item.Expenditure + ')'
    return item
})

let divisionbudget = divisions.map( division => {
    let expenditureitems = expenditurebudget.filter (expenditureitem => {
        return (expenditureitem.Division == division.Division)? true: false
    })
    expenditureitems = expenditureitems.map( item => {
        delete item.Division
        return item
    })
    division.Expenditures = expenditureitems
    return division
})

let categorybudget = categories.map( category => {
    let divisionitems = divisionbudget.filter ( divisionitem => {
        return (divisionitem.Group == category.Group)? true: false
    })
    divisionitems = divisionitems.map( item => {
        delete item.Group
        return item
    })
    let total = divisionitems.reduce((previousvalue, currentitem) => {
        return previousvalue + currentitem.Amount
    },0)
    category.Divisions = divisionitems
    category.Amount = total
    return category
})

let departmentbudget = departments.map( department => {
    let categoryitems = categorybudget.filter ( categoryitem => {
        return (categoryitem.Type == department.Type)? true: false
    })
    categoryitems = categoryitems.map( item => {
        delete item.Type
        return item
    })
    let total = categoryitems.reduce((previousvalue, currentitem) => {
        return previousvalue + currentitem.Amount
    },0)
    department.Groups = categoryitems
    department.Amount = total
    return department
})

let budgettotal = departmentbudget.reduce((previousvalue, currentitem) => {
    return previousvalue + currentitem.Amount
},0)

budgetroot.Types = departmentbudget
budgetroot.Amount = budgettotal

let series = [budgetroot]

jsonfile.spaces = 4

jsonfile.writeFile('./budget.json', series)
