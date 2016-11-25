// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// continuity.js

/*
    TODO: Add note column for explanation of discontinue choice
*/

/*
    if a code is marked as discontinued, but no discontinuedTo code is added in the file
    then the code will be forwarded to all future years, albeit with no value data
*/
'use strict'

let utilities = require('./utilities')
let constants = require('./constants')
let common = require('./common')

let header = ['_COLUMNS_','Category:CODE,Category:NAME,Start:VALUE,End:Value,AllocateTo:CODE,AllocateTo:NAME,Note:DESCRIPTION']

const continuity = context => {

    common.collectContinuityData(context)

    let mapsfiles = context.mapscodesfiles

    // group files by category
    let groups = {}
    for (let filename of mapsfiles) {
        let parts = filename.split('.')
        let category = parts[1]
        if (!groups[category]) {
            groups[category] = []
        }
        groups[category].push(filename)
    }

    // get all in year order
    for (let groupname in groups) {
        groups[groupname].sort()
    }

    // process groups = categories one at a time
    for (let groupname in groups) {
        let group = groups[groupname]
        updateContinuityGroup(groupname, group, context)
    }

}

module.exports = continuity

// groups are pre-sorted arrays of files
const updateContinuityGroup = (groupname, group, context) => {

    // collect previous continuity file, to save discontinutTo info
    let continuityfilename = `${groupname}.continuity.csv`
    utilities.log(continuityfilename)
    let path = context.continuitypath
    let filespec = path + continuityfilename
    let continuity = {}
    let previouscsv = utilities.readFileCsv(filespec)
    // move the file to history subdir
    if (previouscsv.length > 0) { // file must exist
        let targetfilename = utilities.infixDateTime(continuityfilename)
        utilities.moveFile(path + continuityfilename, path + 'history/' + targetfilename)
    }
    // strip header in anticiparion of line processing
    common.stripMapHeader(previouscsv) 

    // save previous data to object for later comparison and forwarding
    let previouscontinuity = {}
    for (let line of previouscsv) {
        let code = line[0]
        let name = line[1]
        let start = line[2]
        let end = line[3]
        let tocode = line[4]
        let toname = line[5]
        let note = line[6]
        previouscontinuity[code] = {
            name:name,
            start:start,
            end:end,
            tocode:tocode,
            toname:toname,
            note:note
        }
    }

    // update continuity from all files for greoup
    for (let filename of group) {
        updateContinuityFromFile(groupname, continuity, filename, context)
    }

    // add back previous continuity discontinueTo data, if end year matches
    for (let code in continuity) {
        if (previouscontinuity[code]) {
            let previousitem = previouscontinuity[code]
            let item = continuity[code]
            if (item.end == previousitem.end) {
                if (previousitem.tocode) {
                    item.tocode = previousitem.tocode
                }
                if (previousitem.toname) {
                    item.toname = previousitem.toname
                }
                if (previousitem.note) {
                    item.note = previousitem.note
                }
            }
        }
    }

    // convert data to csv format
    let csv = []
    let keys = Object.keys(continuity)
    keys.sort()
    for (let code of keys) {
        let item = continuity[code]
        let line = [code, item.name, item.start, item.end]
        if (item.tocode) {
            line.push(item.tocode)
            if (item.toname) {
                line.push(item.toname)
            } else {
                line.push(null)
            }
            if (item.note) {
                line.push(item.note)
            }
        }
        csv.push(line)
    }

    // save to file
    let localheader = [...header]
    utilities.normalizeHeaderRow(localheader)
    utilities.equalizeLineLengths([localheader],csv)
    csv.splice(0,0,localheader)
    utilities.writeFileCsv(filespec, csv)
}

const updateContinuityFromFile = (groupname, continuity, filename, context) => {
    let parts = filename.split('.')
    let year = parseInt(parts[0])

    let filespec = context.mapscodespath + filename
    let map = utilities.readFileCsv(filespec)
    common.stripMapHeader(map)

    // for each line of this year, update continuity record of code
    for (let line of map) {
        let code = line[0]
        let name = line[1]
        if (!continuity[code]) {
            continuity[code] = {start:year}
        }
        let codeitem = continuity[code]
        codeitem.name = name 
        codeitem.mark = true
        codeitem.end = null
    }

    /*    
        identify items for which no code exists for this year,
        and mark it as discontinued, by adding end year to end field
        if the item resurfaces in subsequent years, the end year will
        be unset above
    */    
    for (let code in continuity) {
        let item = continuity[code]
        if (item.mark) {
            delete item.mark
        } else {
            if (!item.end) {
                item.end = year - 1
            }
        }
    }

}



