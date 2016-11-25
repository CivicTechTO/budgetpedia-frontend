// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

/*
    - get settings file; read reference year, from
        db/repositories/<repository>/datasets/<version>/settings.json
    - get files to process <year>.<aspect>.csv, from 
        db/repositories/<repository>/datasets/<version>/intake/*.csv
    for each file
    - extract metadata __META_START__ to __META_END__
    - lookup code for each <category> name, from
        db/repositories/<repository>/datasets/<version>/maps_names/<year>.<category>.name_to_code.csv        
    - insert code if found in previous column, else insert null
    - add newly found name to lookup, with warning to operator
    - write successfully completed file to preprocessed, with a successfully
        processed file to intake/latest and intake/history
    - abandon unsuccessfully processed file
    - write revised maps file to maps, with original to maps_names/replaced
*/

'use strict'

let utilities = require('./utilities')
let common = require('./common')
let constants = require('./constants')

let header = constants.mapheader

const preprocess = context => {
    // get settings
    common.collectIntakeBaseData(context)

    let intakefiles = context.intakefiles

    if (intakefiles.length == 0) {
        throw Error('no intake files to process.')
    }
    for (let filename of intakefiles) {
        processIntakeFile(filename,context)
    }

}

module.exports = preprocess

/*
    process an individual intake file from the intake directory
    - successful files will be written to /latest dir
    - failed files will be left in place
    - <year> files for process file year in /maps_names dir can be effected
    - when successful, modified data files will be written to /preprocessed
*/
const processIntakeFile = (filename,context) => {
    console.log('processing intake file ', filename)

    let intakefilespec = context.intakepath + filename
    let csv = utilities.readFileCsv(intakefilespec)

    if (csv.length == 0) {
        throw Error('intake file not found:' + filename)
    }

    let components = common.decomposeCsv(csv, filename) // {meta, data}

    let columndata = common.getCategoryMeta(components, filename) // according to COLUMNS_CATEGORIES

    let columns = columndata.columns
    // process backwards to allow columnindex to be used for column reference
    // in file processing, as processing inserts a column
    let success = true
    for (let columnindex = columns.length -1; columnindex >=0; columnindex--) {

        let column = columndata.columns[columnindex]
        // console.log('processing column',column)
        if (column.type == constants.NAME) { // codes are looked up separately, if present

            let retval = processFileCategory(columndata,columnindex,filename, components, context)

            if (!retval) success = false
        }

    }

    if (success) { // write out target files, otherwise not

        // save result to preprocessed directory
        utilities.log('file processed successfully. Saving to preprocessed directory.')

        // 1. first save original to subdirectory
        let datetimefilename = utilities.infixDateTime(filename)
        utilities.writeFileCsv(context.intakepath + 'history/' + datetimefilename, csv)

        // 2. then save copy of original for re-processing
        utilities.writeFileCsv(context.intakepath + 'latest/' + filename, csv)

        // prepare to save processed file
        let preprocessed_path = context.dbroot + 
            `${context.repository}/datasets/${context.version}/preprocessed/`

        // 3. save exsiting processed file to 'replaced' subdirecotry
        if (utilities.fileExists(preprocessed_path + filename)) {
            let datetimefilename = utilities.infixDateTime(filename)
            utilities.moveFile(preprocessed_path + filename, preprocessed_path + 
                'replaced/' + datetimefilename)
        }

        // -------------[ detour: update metadata for preprocess target file ]--------------

        // assign datetime to components.meta.INTAKE_DATETIME
        let datetimerow = utilities.getMetaRow(constants.INTAKE_DATETIME,components.meta)
        if (datetimerow) {
            datetimerow[1] = utilities.getDateTime()
        }

        // calculate the total amount for reconciliation purposes
        let columnslist = utilities.getMetaRow(constants.COLUMNS_CATEGORIES,components.meta)
        columnslist = columnslist[1].split(',')
        let amountindex = columnslist.length
        let total_amount_row = utilities.getMetaRow(constants.TOTAL_AMOUNT, components.meta)
        let total = components.data.reduce((aggregate, amountrow) => {
            let amount = amountrow[amountindex]
            if (!amount) return aggregate
            if (!Number.isNaN(amount)) {
                amount = Number(amount)
            }
            if (isNaN(amount)) {
                utilities.log('Not a number ' + amountrow.join(','))
                return aggregate
            }
            return aggregate + amount
        },0)
        total_amount_row[1] = total

        // 4. save new file to preprocessed

        // meta and data sections must have the same number of columns
        utilities.equalizeLineLengths(components.data, components.meta)

        let newdata = [...components.meta, ...components.data]
        let filespec = preprocessed_path + filename
        utilities.writeFileCsv(filespec, newdata)

        // 5. finally delete the original intake file
        utilities.deleteFile(intakefilespec)

    } else {

        utilities.log('some lookups need updating')

    }
}

/*
    each category column is handled individually
    if the category has a preceding :CODE column, category names and codes are collected
        to the category /map file (collectCategoryCodes(...))
    if the category has no preceding :CODE column, then a /map file will be used to lookup
        codes, and additional entries made in the map file for newly discovered category names
        (insertCategoryCodes(...))
*/
const processFileCategory = ( columndata, columnindex, filename, components, context ) => {

    utilities.log('processing column ' + columndata.columns[columnindex].name)

    let column = columndata.columns[columnindex]
    let column_name = column.name
    if (columndata.codes[column_name]) {

        return collectCategoryCodes( columndata, columnindex, filename, components, context )

    } else {

        return insertCategoryCodes( columndata, columnindex, filename, components, context )

    }

}

const collectCategoryCodes = ( columndata, columnindex, filename, components, context ) => {

    let column = columndata.columns[columnindex]
    let column_name = column.name

    let columnlist = utilities.getMetaRow(constants.COLUMNS_CATEGORIES,components.meta)

    // process column
    let columnref = column.name.toLowerCase()
    let fileparts = filename.split('.')
    let fileyear = fileparts[0]
    let namelookups_path = `${context.dbroot}${context.repository}/datasets/${context.version}/maps_names/`
    let namelookups_filename = `${fileyear}.${columnref}.name_to_code.csv`
    let namelookups_filespec = namelookups_path + namelookups_filename
        
    let namelookups = utilities.readFileCsv(namelookups_filespec)
    common.stripMapHeader(namelookups)

    let lineitems = components.data
    let newnames = {} // use properties to filter out duplicates
    let newcodes = {}

    for (let line of lineitems) {
        let name = line[columnindex]
        let trimmedname = name.trim()
        if (trimmedname != name) {
            line[columnindex] = trimmedname
            name = trimmedname
        }
        let code = line[columnindex -1]
        if (!name && !code) { // this category does not exist for this line item
            continue            
        }
        let filtered = namelookups.filter(item => {
            return (item[0] == name && item[1] == code) // tries to match name/code pair
        })

        if (filtered.length == 0) {
            utilities.log('new name or code ' + name + ':' + code)
            newnames[name] = code // using an object filters out duplicates
            newcodes[code] = name // some names may have more than one code
        }

    }
    
    // reconcile name/code pairs
    // create two arrays based on name-first and code-first, for comparison
    // array of [name,code] arrays
    let newnamesbynamelist = Object.keys(newnames)
    newnamesbynamelist = newnamesbynamelist.map(nameitem =>{
        return [nameitem,newnames[nameitem]]
    })
    let newcodesbynamelist = Object.keys(newcodes)
    newcodesbynamelist = newcodesbynamelist.map(codeitem => {
        return [newcodes[codeitem],codeitem]
    })

    // collect any code-based items that don't already exist in name-based items
    let newitems = []
    for (let codeitem of newcodesbynamelist) { // for each code based item
        // console.log('codeitem',codeitem)
        let filtered = newnamesbynamelist.filter(nameitem => { // see if there's a match in name based
            return (codeitem[0] == nameitem[0] && codeitem[1] == nameitem[1])
        })
        if (filtered.length == 0) { // code/name pair is unique
            utilities.log('duplicate name, different code: ' + codeitem.join(':'))
            newitems.push(codeitem)
        }
    }

    let newentries = [...newnamesbynamelist, ...newitems]

    let newlookupslist = null
    if (newentries.length > 0) {
        newlookupslist = [...namelookups, ...newentries]
    }

    if (newlookupslist) { // still null if no new items

        // sort
        let sorted = newlookupslist.sort((a,b)=>{
            if (a[0] < b[0])
                return -1
            else if (a[0] > b[0]) 
                return 1
            else 
                return 0
        })
        newlookupslist = sorted

        let timestampedfilename = utilities.infixDateTime(namelookups_filename)
        utilities.writeFileCsv(namelookups_path + 'replaced/' + timestampedfilename, namelookups)

        let normalline = header[1].split(',')
        utilities.equalizeLineLengths([normalline],newlookupslist)
        let localheader = [...header]
        // first line is used by writer to normalize remaining records
        utilities.normalizeHeaderRow(localheader)
        utilities.equalizeLineLengths([localheader],newlookupslist)
        // utilities.equalizeHeaderToMapLinelengths(newlookupslist,localheader)
        newlookupslist.splice(0,0,localheader)

        utilities.writeFileCsv(namelookups_filespec, newlookupslist)
        utilities.log('new lookups found for ' + 
            namelookups_filename + 
            '. Review new entries and rerun if necessary.'
        )

        return false

    } else {

        components.data = lineitems

        utilities.log('no anomalies found')

        return true
        
    }
}

const insertCategoryCodes = ( columndata, columnindex, filename, components, context ) => {

    let column = columndata.columns[columnindex]
    let column_name = column.name

    let columnlist = utilities.getMetaRow(constants.COLUMNS_CATEGORIES,components.meta)

    // insert new column name for added code in columns list
    let columnarray = columnlist[1].split(',')
    columnarray.splice(columnindex,0,column_name + ':' + constants.CODE)
    columnlist[1] = columnarray.join(',')

    // process column
    let columnref = column.name.toLowerCase()
    let fileparts = filename.split('.')
    let fileyear = fileparts[0]
    let namelookups_path = `${context.dbroot}${context.repository}/datasets/${context.version}/maps_names/`
    let namelookups_filename = `${fileyear}.${columnref}.name_to_code.csv`
    let namelookups_filespec = namelookups_path + namelookups_filename
        
    let namelookups = utilities.readFileCsv(namelookups_filespec)
    common.stripMapHeader(namelookups)

    let lineitems = components.data
    let newnames = {} // use properties to filter out duplicates
    let missedcodecount = 0

    for (let line of lineitems) {
        let name = line[columnindex]
        if (!name) { // this category does not exist for this line item
            line.splice(columnindex,0,null)
            continue            
        }
        let trimmedname = name.trim()
        if (trimmedname != name) {
            line[columnindex] = trimmedname
            name = trimmedname
        }
        let filtered = namelookups.filter(item => {
            return (item[0] == name)
        })
        if (filtered.length > 0 && filtered[0][1]) {
            line.splice(columnindex,0,filtered[0][1])
        } else {
            missedcodecount++
            line.splice(columnindex,0,null)
            if (filtered.length == 0) {
                utilities.log('new name ' + name)
                newnames[name] = null // using an object filters out duplicates
            } else {
                utilities.log('missed code ' + filtered[0].join(','))
            }
        }
    }

    newnames = Object.keys(newnames)
    newnames = newnames.map(item =>{
        return [item,null]
    })

    let newlookupslist = null
    if (newnames.length > 0) {
        newlookupslist = [...namelookups, ...newnames]
    }

    if (newlookupslist) { // still null if no new items

        // sort
        let sorted = newlookupslist.sort((a,b)=>{
            if (a[0] < b[0])
                return -1
            else if (a[0] > b[0]) 
                return 1
            else 
                return 0
        })
        newlookupslist = sorted

        let timestampedfilename = utilities.infixDateTime(namelookups_filename)
        utilities.writeFileCsv(namelookups_path + 'replaced/' + timestampedfilename, namelookups)

        let localheader = [...header]
        // first line is used by writer to normalize remaining records
        utilities.normalizeHeaderRow(localheader)
        utilities.equalizeLineLengths([localheader],newlookupslist)

        newlookupslist.splice(0,0,localheader)
        utilities.writeFileCsv(namelookups_filespec, newlookupslist)
        utilities.log('new lookups found for ' + 
            namelookups_filename + 
            '. Fix new entries and rerun.'
        )

        return false

    } else {

        if (missedcodecount > 0) {

            utilities.log('no new lookup terms, but some missed codes: ' + 
                missedcodecount +
                ' fill in blank codes in lookup ' + 
                namelookups_filename
            )

            return false

        } else {

            components.data = lineitems

            utilities.log('no anomalies found')

            return true
            
        }
    }
}
