// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// map-codes.js

/*
    TODO: overwrite old name options with new ones
*/

/*
    run this, then manually review names of all map files 
    substitute preferred name from alternatenames where appropriate
*/

'use strict'

let utilities = require('./utilities')
let constants = require('./constants')
let common = require('./common')

let header = ['_COLUMNS_','Category:CODE,Category:NAME,AlternateNames:LIST,Notes:LIST']

const mapCodes = context => {

    common.collectMapCodesData(context)

    let mapsfiles = context.mapsfiles

    for (let filename of mapsfiles) {
        mapFileCodes(filename, context)
    }

}

const mapFileCodes = (filename, context) => {

    utilities.log('mapping file codes for ' + filename)

    // get existing file, if it exists
    let path = context.mapscodespath
    let fileparts = filename.split('.')
    let mapcodefilename = [fileparts[0],fileparts[1],'code_to_name',fileparts[3]].join('.')
    let existingcodemap = utilities.readFileCsv(path + mapcodefilename)
    if (existingcodemap.length > 0) { // file must exist
        let targetfilename = utilities.infixDateTime(mapcodefilename)
        utilities.moveFile(path + mapcodefilename, path + 'history/' + targetfilename)
    }

    // populate codemap with existing items
    let codemap = {}
    for (let line of existingcodemap) {
        let code = line[0]
        let name = line[1]
        let alternatenames = line[2]
        codemap[code] = {name:name}
        if (alternatenames) {
            codemap[code].alternatenames = alternatenames
        }
    }

    // read input file of name to code map
    let map = utilities.readFileCsv(context.mapspath + filename)
    common.stripMapHeader(map)
    // collect data from name to code map
    for (let line of map) {
        let code = line[1]
        let name = line[0]
        let note = line[2] || null
        let item = codemap[code] || {name:name}
        item.mark = true // later identify unmarked items to leave them out of file write
        if (item.name != name) {
            let names = item.alternatenames || item.name + ';#' + name
            let namelist = names.split(';#')
            if (namelist.indexOf(name) == -1) {
                namelist.push(name)
            }
            item.alternatenames = namelist.join(';#')
        }
        if (note) {
            let notes = item.notes || null
            if (notes) {
                notes += (';#' + note)
            } else {
                notes = note
            }
            item.notes = notes
        }
        if (!codemap[code]) codemap[code] = item
    }
    // sort by code for convenience
    let csv = []
    let codes = Object.keys(codemap)
    codes.sort()
    for (let itemindex of codes) {
        let item = codemap[itemindex]
        if (!item.mark) continue // code imported from old file no longer in source; abandoned
        let alternatenames = item.alternatenames || null
        let notes = item.notes || null
        let line = [itemindex,item.name,alternatenames,notes]
        csv.push(line)
    }

    // write file
    // write <year>.<category>.code_to_name.csv
    let localheader = [...header]
    // first line is used by writer to normalize remaining records
    utilities.normalizeHeaderRow(localheader)
    utilities.equalizeLineLengths([localheader],csv)
    // utilities.equalizeHeaderToMapLinelengths(namelookups,localheader)
    csv.splice(0,0,localheader)

    utilities.writeFileCsv(path + mapcodefilename, csv)

}

module.exports = mapCodes
