// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// generate.js

/*
    BUG: default 'All' for drilldown inacurately reports drilldown available for all
    elements when there are none -- for absent services for pbft 2011-2014
*/

'use strict'

let utilities = require('./utilities')
let constants = require('./constants')
let common = require('./common')

const allocationcolumn = 4
const generate = context => {

    common.collectGenerateData(context)
    
    generateLookups(context)

    generateJsonFiles(context)

}

module.exports = generate

const generateLookups = context => {
    // move lookups files to history
    let lookupfiles = context.lookupfiles
    let lookupspath = context.lookupspath
    for (let filename of lookupfiles) {
        let datedfilename = utilities.infixDateTime(filename)
        utilities.moveFile(lookupspath + filename, lookupspath + 'history/' + datedfilename)
    }

    let continuityfiles = context.continuityfiles
    let continuitypath = context.continuitypath

    // include only codes that haven't been allocated
    let lookups = {}
    for (let filename of continuityfiles) {
        let csv = utilities.readFileCsv(continuitypath + filename)
        common.stripMapHeader(csv)
        let parts = filename.split('.')
        let category = parts[0]
        let lookup = {}
        for (let line of csv) { 
            if (!line[allocationcolumn]) {
                lookup[line[0]] = line[1]
            }
        }
        let targetname = category + '.lookup.json'
        utilities.writeFileJson(lookupspath + targetname, lookup)
        lookups[category] = lookup
    }
    context.lookups = lookups // for use in add Sorted... components below
    utilities.writeFileJson(lookupspath + 'lookups.json', lookups)

}

const generateJsonFiles = context => {
    let preparedfiles = context.preparedfiles
    let preparedpath = context.preparedpath
    let messagesfiles = context.messagesfiles
    let messagespath = context.messagespath

    // sort files into aspects
    let aspects = {}
    for (let filename of preparedfiles) {
        let parts = filename.split('.')
        let aspect = parts[1]
        if (!aspects[aspect]) {
            aspects[aspect] = []
        }
        aspects[aspect].push(filename)
    }

    for (let aspect in aspects) {
        aspects[aspect].sort()
    }

    // collect message sets by aspect
    let messages = {} 
    for (let filename of messagesfiles) {
        let parts = filename.split('.')
        let aspect = parts[0]
        let csv = utilities.readFileCsv(messagespath + filename)
        if (!messages[aspect]) {
            messages[aspect] = {}
        }
        for (let line of csv) {
            messages[aspect][line[0]] = line[1]
        }
    }

    // generate one json file for each aspect
    for (let aspect in aspects) {
        generateJsonFile(aspect, aspects, messages, context)
    }

}

const generateJsonFile = (aspect, aspects, messages, context) => {

    if (aspects[aspect].length == 0) {
        utilities.log('no files for aspect ' + aspect)
        return
    }

    // -----------------------[ initialize ]----------------------
    let aspectfiles = aspects[aspect]
    // create root of json file...
    let json = {
        "MetaData":null,
        "Data":null,
        "Notes":{}, 
        "Allocations":{},
        "Headers":{},
        "Messages":null
    }
    let metafilename = aspect + '.json'
    let metapath = context.metapath
    let metadata = utilities.readFileJson(metapath + metafilename)

    // assign bulk properties
    json.MetaData = metadata
    if (messages[aspect]) {
        json.Messages = messages[aspect]
    }

    // add ReferenceYear, Decimals, InflationReferenceYear, and YearsRange:{start, end}
    metadata.ReferenceYear = context.settings.ReferenceYear
    metadata.Decimals = context.settings.Decimals[metadata.Units]
    if (metadata.InflationAdjustable) {
        metadata.InflationReferenceYear = context.settings.InflationReferenceYear
    }
    metadata.YearsRange = {
        start:null,
        end:null
    }

    // set years range; files have been sorted by year
    let filename = aspectfiles[0] // first year
    let parts = filename.split('.')
    let year = parseInt(parts[0])
    metadata.YearsRange.start = year
    filename = aspectfiles[aspectfiles.length - 1] // last year
    parts = filename.split('.')
    year = parseInt(parts[0])
    metadata.YearsRange.end = year

    // initialize data property
    let data
    let basedata // to be filled by addPreparedData
    if (metadata.InflationAdjustable) {
        data = {
            Adjusted:{
            },
            Nominal:{
            }
        }
        basedata = data.Nominal
    } else {
        data = {
        }
        basedata = data
    }
    json.Data = data

    // create other parameter objects to be filled
    let notes = json.Notes
    let headers = json.Headers
    let allocations = json.Allocations

    // ----------------[ fill data properties for json file ]---------------
    for (let filename of aspectfiles) {
        addPreparedData(filename, 
            // objects to be populated
            basedata, notes, allocations, headers, 
            // controls
            metadata, context)
    }

    // --------------[ create adjusted shadow for appropriate sets ]-----------
    // ... and add Sorted... properties for Components and CommonDimension lists
    if (metadata.InflationAdjustable) {
        addAdjustedData(data, metadata, context)
        addSortedProperties(data.Nominal, context)
        addSortedProperties(data.Adjusted, context)
    } else {
        addSortedProperties(data, context)
    }

    // --------------------[ integrate meta overrides ]---------------------

    let overridefilespec = context.metaoverridepath + aspect + '.json'
    if (utilities.fileExists(overridefilespec)) {
        console.log('processing', overridefilespec)
        let ojson = utilities.readFileJson(overridefilespec)
        for (let index in ojson) {
            json.MetaData[index] = ojson[index]
            utilities.log(aspect + ' override change ' + index + ':' + 
                JSON.stringify(ojson[index]))
        }
    }

    // ---------------------[ save files ]--------------------
    let targetfilename = aspect + '.json'
    let targetfilespec = context.jsonpath + targetfilename
    if (utilities.fileExists(targetfilespec)) {
        let datedfilename = utilities.infixDateTime(targetfilename)
        utilities.moveFile(targetfilespec, context.jsonpath + 'history/' + datedfilename)
    }
    utilities.log('saving json file ' + targetfilename)
    utilities.writeFileJson(targetfilespec, json)

}

// add base data, notes data, allocations data, and headers data
// this procedure must be able to deal with files with varying numbers of dimensions
// however commondimension (rightmost column) must be shared by all
const addPreparedData = (filename, basedata, notes, allocations, headers, metadata, context) => {

    // --------------------------[ initialize ]----------------------

    // get file data
    let preparedpath = context.preparedpath
    let csv = utilities.readFileCsv(preparedpath + filename)

    let filecomponents = common.decomposeCsv(csv, filename) // {meta, data}
    let metasource = filecomponents.meta
    let datasource = filecomponents.data

    // get year from file name
    let parts = filename.split('.')
    let year = parseInt(parts[0])

    // set line indexes
    let categorymeta = common.getCategoryMeta(filecomponents, filename) // names, codes, columns, per _COLUMNS_CATEGORIES_
    let attributemeta = common.getAttributeMeta(filecomponents, filename) // names, codes, columns, per _COLUMNS_ATTRIBUTES_
    let columns = categorymeta.columns
    let allocationsindex = columns.length + attributemeta.columns.length -1
    let amountindex = columns.length // next column
    let notesindex = amountindex + 1

    // create data multiplier
    // getMetaRow UNITS_CODE, UNITS_MULTIPLIER
    let unitscode = utilities.getMetaRow(constants.UNITS_CODE, metasource)
    unitscode = unitscode[1]
    let unitsmultiplier = utilities.getMetaRow(constants.UNITS_MULTIPLIER, metasource)
    unitsmultiplier = unitsmultiplier[1] // multiply for singles
    let unitsratio = metadata.UnitRatio // divide for presentation
    let multiplier = unitsmultiplier/unitsratio

    // format control
    let unitdecimals = context.settings.Decimals[unitscode] || 0

    // -----------------------[ populate aspect components ]--------------------------

    // collect header
    let headersource = {}
    for (let index = 1; index < metasource.length - 1; index ++) {
        headersource[metasource[index][0]] = metasource[index][1]
    }
    headersource.TOTAL_AMOUNT = Number(headersource.TOTAL_AMOUNT.toFixed(1)) // avoid numeric conversion issues
    headers[year] = headersource

    // set up controls for handling of commondimension
    let commondimensionindex = null
    let commondimension = metadata.CommonDimension
    if (commondimension) {
        let filtered = columns.filter((item, index) => {
            if (item.name == commondimension && item.type == constants.CODE) {
                commondimensionindex = index
                return true
            } else {
                return false
            }
        })
        if (filtered.length == 0) {
            throw Error('common dimension not found in ' + filename + ': ' + commondimension)
        }
    }

    // process each line of the data source into object hierarchy
    for (let line of datasource) { // for each line of the source file

        // get amount
        let amount = line[amountindex]
        if (typeof amount == 'string') amount = amount.trim() // sometimes a blank char shows up for some reason
        amount = Number(amount)
        if (amount && !Number.isNaN(amount)) {
            if (multiplier != 1) {
                amount *= multiplier
            }
            amount = Number(amount.toFixed(unitdecimals))
        }

        // get sharedDimension account, if any
        let commondimensioncode = null
        if (commondimension) {
            commondimensioncode = line[commondimensionindex]
            if (!commondimensioncode) {
                throw Error('in ' + filename + 'no common dimension code [' + line.join(',') + ']')
            }
        }

        // populate components with amount data
        let components = basedata
        let columnindex = 0
        let code = line[columnindex]
        let codeindex = year + '.'
        let node

        do  { // for each dimension of the line

            // add amount to the code node
            if (code) { // always true on the first pass, therefore node will always be set

                // create node if required
                if (!components[code]) {
                    components[code] = {years:{}}
                }

                // add amount to node
                node = components[code]
                if (amount && !Number.isNaN(amount)) { // ignore if no amount is involved
                    if (!node.years[year]) {
                        node.years[year] = amount
                    } else { // increment amount
                        let yearamount = Number((amount + node.years[year]).toFixed(unitdecimals))
                        node.years[year] = yearamount
                    }
                }

                // prepare codeindex for use by notes and allocations
                codeindex += ((columnindex/2)+1).toFixed(0) + '.' + code + '.'

            }

            // move on to next dimension
            columnindex += 2 // skip name
            if (columnindex >= columns.length) {
                break
            }

            // test next column def
            let columndef = columns[columnindex]
            if (columndef.type != constants.CODE) {
                throw Error('wrong order of columns in ' + filename)
            }

            // get next dimension code
            code = line[columnindex]
            if (code) { // else no category at this level

                // at leaf, if leaf is commondimension, just record the commondimension values
                if (commondimension && (commondimension == columndef.name)) {

                    // create components property
                    if (!node.CommonDimension) {
                        node.CommonDimension = {}
                        node.CommonDimensionName = commondimension
                    }
                    components = node.CommonDimension

                } else {

                    // not at leaf, or no commondimension is present
                    if (amount && !Number.isNaN(amount)) { // ignore if no amount is involved

                        // if there is a commondimension (not at leaf) record commondimension at every level
                        if (commondimension) {
                            if (!node.CommonDimension) {
                                node.CommonDimension = {}
                                node.CommonDimensionName = commondimension
                            }
                            if (!node.CommonDimension[commondimensioncode]) {
                                node.CommonDimension[commondimensioncode] = {years:{}}
                            }
                            let yearslist = node.CommonDimension[commondimensioncode].years
                            if (yearslist[year]) {
                                let yearamount = Number((amount + yearslist[year]).toFixed(unitdecimals))
                                yearslist[year] = yearamount
                            } else {
                                yearslist[year] = amount
                            }
                        }
                    }

                    // in any case create components property
                    if (!node.Components) {
                        node.Components = {}
                        node.ComponentsDimensionName = columndef.name
                    }

                    // recurse
                    components = node.Components

                }
            }

        } while (true) // end of process line dimensions

        // add notes
        if (line[notesindex]) {
            notes[codeindex] = line[notesindex]
        }

        // add allocations
        if (line[allocationsindex]) {
            allocations[codeindex] = line[allocationsindex]
        }

    }
}

// create shadow structure with inflation adjusted values
// also inserts Sorted... properties
const addAdjustedData = (data, metadata, context) => {

    let adjusted = data.Adjusted
    let nominal = data.Nominal
    let inflationseries = utilities.readFileJson(context.dataseriespath + 'inflation.json')

    // start recursion
    addAdjustedSeries(nominal, adjusted, inflationseries, metadata.Decimals)

}

// recursive
const addAdjustedSeries = (nominalcomponents, adjustedcomponents, inflationseries, decimals) => {

    let multiplier, amount

    // iterate through nodes
    for (let category in nominalcomponents) {
        let nominalcomponent = nominalcomponents[category]
        let adjustedcomponent = adjustedcomponents[category] = {}

        // recurse into components
        let subcomponents = nominalcomponent.Components
        if (subcomponents) {
            adjustedcomponent.Components = {}
            adjustedcomponent.ComponentsDimensionName = nominalcomponent.ComponentsDimensionName
            addAdjustedSeries(subcomponents, adjustedcomponent.Components, inflationseries, decimals)
        }

        // recurse into commondimension
        let commondimensions = nominalcomponent.CommonDimension
        if (commondimensions) {
            adjustedcomponent.CommonDimension = {}
            adjustedcomponent.CommonDimensionName = nominalcomponent.CommonDimensionName
            addAdjustedSeries(commondimensions, adjustedcomponent.CommonDimension, inflationseries, decimals)
        }

        // if there are no years to update, iterate
        if (!nominalcomponent.years) {
            continue
        }

        // multiply every year value by inflation multiplier
        let nominalyears = nominalcomponent.years
        if (!adjustedcomponent.years) { // create container
            adjustedcomponent.years = {}
        }
        let adjustedyears = adjustedcomponent.years

        // adjust years
        for (let year in nominalyears) {
            multiplier = inflationseries.years[year] || 1
            amount = nominalyears[year] * multiplier
            amount = Number(amount.toFixed(decimals))
            adjustedyears[year] = amount
        }
        
    }
    
}

const addSortedProperties = (data, context) => {

    let count = 0
    let subcomponentscount = 0
    let commondimensioncount = 0
    for (let category in data) {

        let node = data[category]
        let subcomponents = node.Components

        let subcomponentdrilldown = "None"
        let commondimensiondrilldown = "None"
        if (subcomponents) {

            subcomponentscount++
            subcomponentdrilldown = addSortedProperties(subcomponents, context)
            let cname = node.ComponentsDimensionName
            let sorted = getNameSortedComponentItems(cname, subcomponents, context.lookups)
            node.SortedComponents = sorted
            node.ComponentsDrilldown = subcomponentdrilldown

        }

        // recurse into commondimension
        let commondimension = node.CommonDimension

        if (commondimension) {

            commondimensioncount++
            commondimensiondrilldown = addSortedProperties(commondimension, context)
            let cname = node.CommonDimensionName
            let sorted = getNameSortedComponentItems(cname, commondimension, context.lookups)
            node.SortedCommonDimension = sorted
            node.CommonDimensionDrilldown = commondimensiondrilldown
            
        }

        count++

    }
    let drilldown
    if (subcomponentscount == 0 && commondimensioncount == 0) {
        drilldown = 'None'
    } else if (subcomponentscount == count || commondimensioncount == count) {
        drilldown = 'All'
    } else {
        drilldown = 'Some'
    }
    return drilldown

}

const getNameSortedComponentItems = (dimensionname, components, lookups) => {
    let sorted = []
    let complookups = lookups[dimensionname.toLowerCase()]
    for (let componentname in components) {
        let component = components[componentname]
        // let config = component.NamingConfigRef
        let name = complookups[componentname]
        let item = {
            Code: componentname,
            Name: name || 'unknown name'
        }
        component.Name = name || 'unknown name'
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

