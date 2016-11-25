// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// utilities.js

'use strict'

let fs = require('fs')
let jsonfile = require('jsonfile')
jsonfile.spaces = 4
let parse = require('csv-parse/lib/sync')
let stringify = require('csv-stringify/lib/sync')
let moment = require('moment')


let constants = require('./constants')

exports.equalizeLineLengths = (fixed, variable) => {

    let firstlength = fixed[0].length
    for (let line of variable) {
        let secondlength = line.length
        let lengthdiff = firstlength - secondlength
        for (let i = 0; i < lengthdiff; i++) {
            line.push(null)
        }
    }
}

exports.normalizeHeaderRow = (localheader) => {
    let length = localheader[1].split(',').length
    let diff = length - localheader.length
    for (let i = 0; i < diff; i++) {
        localheader.push(null)        
    }
}

// exports.equalizeHeaderToMapLinelengths =(map, localheader) => {
//     if (map.length == 0) {
//         exports.log('empty map sent to equalize')
//         return
//     }
//     let localtestlist = [localheader]
//     exports.equalizeLineLengths(map,localtestlist)
//     // localheader = localtestlist[0]    
// }

exports.getMetaRow = (rowname,metadata) => {
    let filtered = metadata.filter(item => {
        return (item[0] == rowname)?true: false
    })
    if (filtered.length > 0)
        return filtered[0]
    else return null
}

exports.getDirContents = dirspec => {
    return fs.readdirSync(dirspec)
}

exports.readFileText = filespec => {
    return fs.readFileSync(filespec,'utf8')
}

exports.writeFileText = (filespec, content) => {
    fs.writeFileSync(filespec,content,'utf8')
}

exports.readFileJson = filespec => {
    return jsonfile.readFileSync(filespec)
}

exports.writeFileJson = (filespec, content) => {

    jsonfile.writeFile(filespec, content)

}

exports.readFileCsv = filespec => {
    try {
        let filetext = exports.readFileText(filespec)
        return parse(filetext, {auto_parse:true})
    } catch (e) {
        // throw Error('csv file not found' + filespec + 'returning empty array')
        return []
    }
}

exports.writeFileCsv = (filespec, csv) => {
    let output = stringify(csv)
        // TODO: if (err)...
    exports.writeFileText(filespec, output)
}

exports.fileExists = filespec => {
    try {
      fs.accessSync(filespec)
      return true
    } catch (e) {
        return false
    }
}

exports.deleteFile = filespec => {
    fs.unlinkSync(filespec)
}

exports.copyFile = (sourcespec, targetspec) => {
    let content = exports.readFileText(sourcespec)
    exports.writeFileText(targetspec, content)
}

exports.moveFile = (sourcespec, targetspec) => {
    fs.renameSync(sourcespec, targetspec)
    // exports.copyFile(sourcespec, targetspec)
    // exports.deleteFile(sourcespec)
}

exports.log = message => {
    console.log(message)
    // TODO: save to log file    
}

exports.getDateTime = () => {
    return moment().format('YYYY-MM-DD-HH-mm-ss')
}

exports.prefixDateTime = filename => {
    let datetimestring = exports.getDateTime()
    return datetimestring + filename
}

exports.infixDateTime = filename => {
    let datetimestring = exports.getDateTime()
    let parts = filename.split('.')
    parts.splice(parts.length - 1,0,datetimestring) // insert before file extension
    return parts.join('.')
}
