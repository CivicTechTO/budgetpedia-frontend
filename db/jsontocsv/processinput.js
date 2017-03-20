// processinput.js
'use strict'

let fs = require('fs')
let jsonfile = require('jsonfile')
jsonfile.spaces = 4
let stringify = require('csv-stringify/lib/sync')

let yearindexes = [
"2000",
"2001",
"2002",
"2003",
"2004",
"2005",
"2006",
"2007",
"2008",
"2009",
"2010",
"2011",
"2012",
"2013",
"2014",
"2015",
"2016",
"2017",
]

let inputdir = './input/'
let outputdir = './output/'

const writeFileText = (filespec, content) => {
    fs.writeFileSync(filespec,content,'utf8')
}
const readFileJson = filespec => {
    return jsonfile.readFileSync(filespec)
}

const writeFileJson = (filespec, content) => {

    jsonfile.writeFile(filespec, content)

}

const writeFileCsv = (filespec, csv) => {
    let output = stringify(csv)

    writeFileText(filespec, output)
}

const createCsvArray = (jsondata) => {
    let arr = [['baseitem',...yearindexes]]
    for (let index in jsondata) {
        let yeardata = jsondata[index]
        let line = []
        line.push(index)
        for (let yearindex of yearindexes) {
            let value = null
            if (yeardata[yearindex] !== undefined) {
                value = yeardata[yearindex]
            }
            line.push(value)
        }
        arr.push(line)
    }
    return arr
}

const process = filename => {
    console.log('processing',inputdir + filename)
    let json = readFileJson(inputdir + filename)
    let data = json.Data
    let fileroot = filename.split('.')[0]
    let outputspec = outputdir + fileroot + 'data.json'
    console.log('writing',outputspec)
    writeFileJson(outputspec,data)
    let sourcedatasets = []
    if (data.Adjusted) {
        sourcedatasets[0] = data.Adjusted
        sourcedatasets[1] = data.Nominal
    } else {
        sourcedatasets[0] = data
    }
    for (let jsondata of sourcedatasets) {
        for (let index in jsondata) {
            jsondata[index] = jsondata[index]['years']
        }
    }
    if (sourcedatasets.length == 2) {
        outputspec = outputdir + 'flat.' + fileroot + '.adjusted.json'
        console.log('writing',outputspec)
        writeFileJson(outputspec,sourcedatasets[0])
        let csvarray = createCsvArray(sourcedatasets[0])
        outputspec = outputdir + fileroot + '.adjusted.csv'
        console.log('writing',outputspec)
        writeFileCsv(outputspec,csvarray)

        outputspec = outputdir + 'flat.' + fileroot + '.nominal.json'
        console.log('writing',outputspec)
        writeFileJson(outputspec,sourcedatasets[1])
        csvarray = createCsvArray(sourcedatasets[1])
        outputspec = outputdir + fileroot + '.nominal.csv'
        console.log('writing',outputspec)
        writeFileCsv(outputspec,csvarray)

    } else {
        outputspec = outputdir + 'flat.' + fileroot + '.json'
        console.log('writing',outputspec)
        writeFileJson(outputspec,sourcedatasets[0])
        let csvarray = createCsvArray(sourcedatasets[0])
        outputspec = outputdir + fileroot + '.csv'
        console.log('writing',outputspec)
        writeFileCsv(outputspec,csvarray)

    }
}

// main line

let inputlist = fs.readdirSync(inputdir)

for (let inputname of inputlist) {
    process(inputname)
}

