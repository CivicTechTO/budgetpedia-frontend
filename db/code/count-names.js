// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// count-names.js

/*
    TODO: scan and report on blank count items after running
*/

'use strict'

let utilities = require('./utilities')
let constants = require('./constants')
let common = require('./common')
let countindex = 3

let header = ['_COLUMNS_','Category:NAME,Category:CODE,Note:DESCRIPTION,Count:VALUE']

const countNames = context => {

    common.collectPreprocessedData(context)

    initializeMaps(context)

    let preprocessedfiles = context.preprocessedfiles

    if (preprocessedfiles.length == 0) {
        throw Error('no intake files to process.')
    }

    for (let filename of preprocessedfiles) {
        processPreprocessedFile(filename,context)
    }

    let mapsfiles = context.mapsfiles
    for (let filename of mapsfiles) {
        showNoCount(filename, context)
    }

}

module.exports = countNames

const showNoCount = (filename, context) => {
    let filespec = context.mapspath + filename
    let csv = utilities.readFileCsv(filespec)
    common.stripMapHeader(csv)
    let count = 0
    utilities.log('Not used for ' + filename + ':')
    for (let line of csv) {
        if (!line[countindex]) {
            utilities.log(line.join(','))
            count++
        }
    }
    if (!count) {
        utilities.log('all lines used.')
    }
}

const initializeMaps = context => {

    let maps = context.mapsfiles
    let headertemplate = [header[1].split(',')]
    for (let filename of maps) {
        utilities.log('initializing ' + filename)
        let namelookups = utilities.readFileCsv(context.mapspath + filename)
        common.stripMapHeader(namelookups)
        utilities.equalizeLineLengths(headertemplate,namelookups)
        for (let line of namelookups) {
            line[countindex] = null
        }
        let localheader = [...header]
        // first line is used by writer to normalize remaining records
        utilities.normalizeHeaderRow(localheader)
        utilities.equalizeLineLengths([localheader],namelookups)
        // utilities.equalizeHeaderToMapLinelengths(namelookups,localheader)
        namelookups.splice(0,0,localheader)
        utilities.writeFileCsv(context.mapspath + filename, namelookups)        
    }

}

const processPreprocessedFile = (filename, context) => {
    utilities.log('processing preprocessed file for category counts ' + filename)

    let preprocessedfilespec = context.preprocessedpath + filename
    let csv = utilities.readFileCsv(preprocessedfilespec)
    if (csv.length == 0) {
        throw Error('preprocessed file not found:' + filename)
    }

    let components = common.decomposeCsv(csv, filename) // {meta, data}

    let columndata = common.getCategoryMeta(components, filename) // according to COLUMNS_CATEGORIES

    let columns = columndata.columns
    // process backwards to allow columnindex to be used for column reference
    // in file processing, as processing inserts a column
    let success = true
    for (let columnindex = columns.length -1; columnindex >=0; columnindex--) {

        let column = columndata.columns[columnindex]
        if (column.type == constants.NAME) { // codes are looked up separately, if present

            let retval = countFileCategory(columndata,columnindex,filename, components, context)

            if (!retval) success = false

        }

    }
}

const countFileCategory = (columndata,columnindex,filename, components, context) => {
    let colindex = columnindex
    let column = columndata.columns[colindex]
    let column_name = column.name

    let columnlist = utilities.getMetaRow(constants.COLUMNS_CATEGORIES,components.meta)

    // process column
    let columnref = column.name.toLowerCase()
    // console.log(columnref, colindex)
    let fileparts = filename.split('.')
    let fileyear = fileparts[0]
    let namelookups_path = `${context.dbroot}${context.repository}/datasets/${context.version}/maps_names/`
    let namelookups_filename = `${fileyear}.${columnref}.name_to_code.csv`
    let namelookups_filespec = namelookups_path + namelookups_filename

    let namelookups = utilities.readFileCsv(namelookups_filespec)
    let timestampedfilename = utilities.infixDateTime(namelookups_filename)
    utilities.writeFileCsv(namelookups_path + 'replaced/' + timestampedfilename, namelookups)

    common.stripMapHeader(namelookups)

    let lineitems = components.data

    for (let line of lineitems) {
        let name = line[colindex]
        // console.log('searching ', name, line)
        if (!name) {
            continue
        }
        let filtered = namelookups.filter(item => {
            return (item[0] == name) // tries to match name
        })
        // if (colindex == 1 && name[0] == 'A') {
        //     console.log(name, filtered)
        // }
        if (filtered.length == 0) {
            utilities.log('name not found!! ' + name)
        } else {
            let count = filtered[0][countindex]
            filtered[0][countindex] = count?++count:1
        }
    }

    let localheader = [...header]
    // first line is used by writer to normalize remaining records
    utilities.normalizeHeaderRow(localheader)
    utilities.equalizeLineLengths([localheader],namelookups)
    // utilities.equalizeHeaderToMapLinelengths(namelookups,localheader)
    namelookups.splice(0,0,localheader)

    utilities.writeFileCsv(namelookups_filespec, namelookups)

}