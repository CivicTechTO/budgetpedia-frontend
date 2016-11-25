// clear_repeating_names.js

/*
    - this is a stand-alone utility
    clears same-line repeated category names
    place csv file in './temp', change name below and do
    node clear_repeating_names
*/

/*
    TODO consider reporting sub categories that are single subs to super categories
*/

'use strict'

utilities = require('./utilities')

let filespec = './temp/2016.expenses.csv'

let csv = utilities.readFileCsv(filespec)

for (line of csv) {
    for (let index = 2; index > 0; index--) {
        if (line[index] == line[index-1]) {
            line[index] = null
        }
    }
}

utilities.writeFileCsv(filespec,csv)