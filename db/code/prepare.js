// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// prepare.js

/*
    TODO: create notes lists per code like allocations list per code
        - trace not accumulation given new proportional allocation
*/

'use strict'

let utilities = require('./utilities')
let constants = require('./constants')
let common = require('./common')

let discontinueToIndex = 4
let codeIndex = 0

const prepare = context => {

    common.collectPrepareData(context)

    let preprocessedfiles = context.preprocessedfiles

    if (preprocessedfiles.length == 0) {
        throw Error('no preprocessed files to prepare.')
    }
    
    let continuity = {}
    let continuityfiles = context.continuityfiles
    let continuitypath = context.continuitypath
    for (let filename of continuityfiles) {
        let filespec = continuitypath + filename
        let csv = utilities.readFileCsv(filespec)
        if (csv.length == 0) {
            throw Error('continuity file not found: ' + filename)
        }
        common.stripMapHeader(csv)
        let parts = filename.split('.')
        let category = parts[0]
        continuity[category] = csv
    }

    for (let filename of preprocessedfiles) {
        prepareFile(filename, continuity, context)
    }
}

module.exports = prepare

const prepareFile = (filename, continuity, context) => {
    utilities.log('preparing ' + filename)

    // load preprocess file
    let sourcefilespec = context.preprocessedpath + filename
    let csv = utilities.readFileCsv(sourcefilespec)
    if (csv.length == 0) {
        throw Error('preprocessed file not found ' + filename)
    }

    let originalcsv = [...csv] // for save original later

    let components = common.decomposeCsv(csv, filename) // {meta, data}

    // add allocations column
    let attributelist = utilities.getMetaRow(constants.COLUMNS_ATTRIBUTES,components.meta)
    let columnarray = attributelist[1].split(',')
    columnarray.push('Allocations' + ':' + constants.DESCRIPTION)
    attributelist[1] = columnarray.join(',')

    // collect control data
    let categorymeta = common.getCategoryMeta(components, filename) // names, codes, columns, per _COLUMNS_CATEGORIES_

    let attributemeta = common.getAttributeMeta(components, filename) // names, codes, columns, per _COLUMNS_ATTRIBUTES_

    // impose file continuity; allocations to current codes; apply current names
    let allocationsfound = imposeFileContinuity(components, categorymeta, attributemeta, continuity, filename)

    if (allocationsfound) { // reduce resulting lines
        utilities.log('reducing')
        let reduction = reduceList(components, categorymeta, attributemeta)

        let newList = reconstituteList(reduction, categorymeta, attributemeta)

        // replace modified list with reduced list
        components.data = newList

    }

    // for preprocessed file, save latest; save processed
    // move previous prepared file to replaced

    utilities.equalizeLineLengths(components.data, components.meta)

    let newcsv = [...components.meta, ...components.data]
    
    // move previous prepared file to 'replaced/' dir
    let targetfilespec = context.preparedpath + filename
    if (utilities.fileExists(targetfilespec)) {
        let targetdatedspec = utilities.infixDateTime(filename)
        utilities.moveFile(targetfilespec, context.preparedpath + 'replaced/' + targetdatedspec)
    }
    utilities.writeFileCsv(targetfilespec,newcsv)

    utilities.writeFileCsv(context.preprocessedpath + 'latest/' + filename, originalcsv)
    let sourcedatedfilespec = utilities.infixDateTime(filename)
    utilities.moveFile(sourcefilespec, context.preprocessedpath + 'processed/' + sourcedatedfilespec)

}

// replace historic codes and names with continuity codes and names; add allocation notes when
// allocation is encountered
const imposeFileContinuity = (components,categorymeta, attributemeta, continuity, filename) => {

    let columns = categorymeta.columns

    let allocationsindex = columns.length + attributemeta.columns.length -1
    let amountindex = columns.length // next column
    let continuityindex = 6

    let allocationfound = false

    // this is a breadth-first dive
    for (let columnindex = 0; columnindex < columns.length;columnindex ++) {
        // for each column of the source data
        let columndef = columns[columnindex]
        // skip name columns...
        if (columndef.type == constants.CODE) {
            // we're in a dimension code column
            let dimensioncode = columndef.name.toLowerCase()
            // get the continuity lookups for the dimensioncode
            let continuitylookups = continuity[dimensioncode]
            if (!continuitylookups) {
                throw Error('continuitylookups not found for ' + dimensioncode + ' in ' + filename)
            }
            let data = components.data
            // the idea is to create new data lines for allocations,
            // or save the current line
            let newdata = []
            for (let line of data) {
                let code = line[columnindex]
                if (!code) { // no category at this level
                    newdata.push([...line]) // no change
                    continue
                }
                // look for continuity item
                // console.log('finding continuitylines for',code)
                let continuitylines = findContinuityLines(code, continuitylookups, filename)
                // console.log('continuitylines for line',line, continuitylines)
                for (let continuityline of continuitylines) {
                    let newline = [...line]
                    if (code != continuityline[0]) {
                        let amount = line[amountindex]
                        if (typeof amount == 'string') amount = amount.trim() // sometimes a blank char shows up for some reason
                        if (amount && !Number.isNaN(amount)) { // ignore if no amount is involved
                            // let preamount = amount
                            amount *= [continuityline[4]]
                            // console.log('cancellarion value',preamount,continuityline[4],amount)
                            allocationfound = true
                            let allocations = line[allocationsindex]
                            if (!allocations) { // only make note of allocation once, the first time
                                let addition = 'Allocation from: ' + line.join(',')
                                if (continuityline[continuityindex]) {
                                    addition += ' (' + continuityline[continuityindex] + ')'
                                }
                                allocations = addition
                                line[allocationsindex] = allocations
                            }    
                        }
                        newline[columnindex] = continuityline[0]
                        newline[amountindex] = amount                   
                    }
                    newline[columnindex + 1] = continuityline[1] // update name in any case
                    newdata.push(newline)
                }
            }
            components.data = newdata
        }
    }

    return allocationfound

}

// return continuity leaf lines with ratios in cell 4
const findContinuityLines = (linecode, continuitylookup, filename) => {

    let ratio = 1
    let allocationlines = findContinuityLine(linecode, ratio, continuitylookup, filename)
    return allocationlines
}


// TODO: prevent infinite recursion through infinite reflection
const findContinuityLine = (listcode, ratio, continuitylookup, filename) => {

    let continuityline = null
    let notes = null
    let allocationlines = []

    // console.log('find continuity line for listcode',listcode, ratio)

    let filtered = continuitylookup.filter(item => {
        return (item[0] == listcode)
    })
    if (filtered.length == 0 ) {
        throw Error(`continuity listcode ${listcode} not found in ${filename}`)
    }

    continuityline = [...filtered[0]]
    if (continuityline[6]) {
        if (notes) {
            notes += continuityline[6]
        } else {
            notes = continuityline[6]
        }
    }
    let allocationcode = continuityline[4].trim()

    if (allocationcode) { // recurse

        let allocationlist = prepareAllocationList(allocationcode)

        for (let item of allocationlist) {

            let [allocationcode, newratio] = item
            let ratioarg = newratio * ratio
            let returnlines = findContinuityLine(allocationcode, ratio * ratioarg, continuitylookup, filename)
            allocationlines = [...allocationlines, ... returnlines]

        }

    } else {

        let allocationline = [...continuityline]
        if (notes) {
            allocationine[6] = notes
        }
        allocationline[4] = ratio
        allocationlines = [allocationline]

    }

    return allocationlines
}
const prepareAllocationList = (allocationspecs) => {
    let allocationlist = allocationspecs.split(',')
    for (let itemindex in allocationlist) {
        let item = allocationlist[itemindex].trim()
        item = item.split('=')
        item[0] = item[0].trim()
        if (item[1]) {
            item[1] = Number(item[1])
        } else {
            item[1] = 1
        }
        allocationlist[itemindex] = item
    }
    // console.log('allocationlist for', allocationspecs, allocationlist)
    return allocationlist
}

// reduce the spreadsheet into an object hierarchy (because it's a highly deterministic normalization)
const reduceList = (components, categorymeta, attributemeta) => {

    let data = components.data
    let columns = categorymeta.columns
    let amountindex = columns.length // next column
    let noteindex = columns.length + 1
    let severityindex = columns.length + 2
    let allocationsindex = columns.length + attributemeta.columns.length - 1
    let reduction = {}

    data.reduce((reduction, line) => {

        let node = reduction // node is reset recusively

        // ----------------------[ create object hierarchy ]----------------------------

        // recurse into category structure; add node components properties recursively
        for (let columnindex = 0; columnindex < columns.length; columnindex++) {
            let codeitem = columns[columnindex]
            if (codeitem.type == constants.CODE) {
                let type = codeitem.name
                let code = line[columnindex]

                if (!code) {
                    continue // this category not part of tree for this line
                }

                let name = line[columnindex + 1]

                if (!node.components) {
                    node.components = {}
                }

                if (!node.components[code]) {
                    node.components[code] = {code:code, name:name, type:type}
                }
                node = node.components[code]
            }
        }

        if (node === reduction) {
            throw Error('no line item code found ' + line.join(',') + ' in ' + filename)
        }

        // --------------------[ collect attributes ]---------------------

        // latest node is the leaf, so add attributes
        // ... amount, note, severity, allocations
        let note = line[noteindex]
        if (note) {
            if (node.note) {
                node.note += '\n' + note
            } else {
                node.note = note
            }
        }

        let severity = line[severityindex]
        if (severity) {
            if (node.severity) {
                node.severity += '\n' + severity
            } else {
                node.severity = severity
            }
        }

        let allocation = line[allocationsindex]
        if (allocation) {
            if (node.allocations) {
                node.allocations += '\n' + allocation
            } else {
                let amount = node.amount
                if (amount === undefined) amount = null
                allocation = 'Original amount was ' + 
                    amount + 
                    ', plus:\n' + 
                    allocation
                node.allocations = allocation
            }
        }

        // amount is done after allocations to leave pre-allocation amount free
        // for catpure in allocation notes
        let amount = line[amountindex]
        if (typeof amount == 'string') amount = amount.trim() // sometimes a blank char shows up for some reason
        if (amount && !Number.isNaN(amount)) { // ignore if no amount is involved
            if (node.amount) {
                node.amount += amount
            } else {
                node.amount = amount
            }
        }

        return reduction

    }, reduction)

    return reduction

}

// reconsitute list csv structure from object hierarchy to spreadsheet format
const reconstituteList = (reduction, categorymeta, attributemeta) => {

    let columnarray = categorymeta.column_names

    let newList = []

    let rootcomponents = reduction.components
    let rootkeys = Object.keys(rootcomponents)
    rootkeys.sort()

    /*   
        for each code in rootcomponents, create a block of reconstituted line items
        ie for each code object hierarchy, map to columnar structure ( = block ), 
        then reconstitute lines from that columnar structure
        -> depth level = column number - dependency is preserved through backlink property
    */    
    for (let code of rootkeys) {
        let node = rootcomponents[code]
        let queue = [node] // initialize recursrion
        let block = [] // reconstitution data for each category column

        // --------------[ collect block data for reconsitution ]---------------

        // recursively cycle through current queue (column), to create nextqueue, then recurse
        // where nextqueue becomes current queue
        // cycle through block horizontally...
        for (let columnindex in columnarray) { // there should be these numbers of queues
            // each columnindex represents a category code/name pair

            let category = columnarray[columnindex]
            let nextqueue = []
            let column = block[columnindex] = []

            // cycle through column vertically
            for (let queueindex in queue) {

                let node = queue[queueindex]
                if (node.note) {
                }
                let backlink = parseInt(node.backlink)
                backlink = Number.isNaN(backlink)?null:backlink

                // -----------[ create item to reconstitute ]--------------
                let item = {
                    category:category,
                    type:node.type,
                    code:node.code,
                    name:node.name,
                    backlink:backlink
                }
                if (!node.components) {
                    item.amount = (node.amount !== undefined)?node.amount:null
                    item.allocations = node.allocations?node.allocations:null
                    item.note = node.note?node.note:null
                    item.severity = node.severity?node.severity:null
                    item.leaf = true
                }

                column.push(item) // push to block column

                // --------------------[ accumulate all dependents in nextqueue ]----------------
                let components = node.components

                if (components) {
                    // assemble current portion of next horizontal column to process
                    for (let code in components) {

                        let node = components[code]

                        node.backlink = queueindex // track dependencies
                        nextqueue.push(node)

                    }
                }
            }
            // recurse to next category column
            queue = nextqueue
        }

        // ------------------------[ now reconstitute lines for the block ]------------------
        /*
            recurse into the block data, creating a line into blocklines at each leaf point
        */
        // initialize for recursion launch
        let columnindex = 0
        let rowindex = 0
        let line_precursor = []
        let line_length = categorymeta.columns.length + attributemeta.columns.length
        // create placeholders in line_precursor
        for (let i = 0; i < line_length; i++) {
            line_precursor.push(null)
        }
        let blocklines = []

        // start recursion; emit lines at leaves of recursion
        reconstituteLines(block, columnindex, rowindex, line_precursor, blocklines, columnarray)

        // add the reconstituted blocklines to newList
        newList.splice(newList.length -1, 0, ...blocklines)

    }

    return newList

}

// recursive, stops at leaf node to add attributes to line, and line to blocklines
const reconstituteLines = (
    block, // a matrix containing the block data to reconstitute
    columnindex, // the current block column to process
    rowindex, // the backlink to identify child nodes to associate with current node
    line_precursor, // accumulating row data
    blocklines, // collection of lines for the main root category to add to the file lines
    columnarray // list of categories, in dependency order
    ) => {

    let node = block[columnindex][rowindex]
    // last category (expense/revenue by object) may skip blank cells...
    let typeindex = columnarray.indexOf(node.type) 
    if (typeindex == -1) {
        throw Error(`node type not found in type list in reconstituteLines: ${node.type}, ${node.name}` )
    }
    let lineindex = typeindex * 2 // paired category code and name
    let line = [...line_precursor] // new copy

    // add category code and name to the line
    line[lineindex] = node.code
    line[lineindex + 1] = node.name
    
    if (node.leaf) { // insert attributes; stop recursing

        let line_length = line.length
        line.splice(line_length - 4, 4, node.amount, node.note, node.severity, node.allocations)

        blocklines.push(line) // emit

    } else { // recurse

        let column = block[columnindex + 1]
        for (let columnlink in column) {
            let node = column[columnlink]
            if (node.backlink == rowindex) { // only process dependents
                reconstituteLines(block, columnindex + 1, columnlink, line, blocklines, columnarray)
            }
        }

    }
}

