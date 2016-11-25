// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// budgetcell.tsx
/*

Title components:
- Node meta category
- Node cagegory
- YearsRange
- Total (for one year charts)
- Inflation adjustment

Vertical axis:
- Metric (qualifier)

Horizontal access:
- Dimension

*/ 

import {
    ChartParms,
    SortedComponentItem,
} from '../modules/interfaces'

import {
    ChartSelectionCell,
    ChartSelectionContext,
} from '../modules/onchartcomponentselection'
import { 
    ChartCodeToGoogleChartType,
    AspectNameToDatasetName,
} from '../constants'

import BudgetNode from './node.class'
import { YearsRange, DatasetConfig } from './databaseapi'
import { TimeScope, GoogleChartColors } from '../constants'
import {ColorBrightness} from '../modules/utilities'

var format = require('format-number')

interface ViewpointConfigPack {
    viewpointNamingConfigs: any,
    datasetConfig: DatasetConfig,
    isInflationAdjusted: boolean,
    prorata:string,
}

export interface CellDeclaration {
    nodeDataseriesName:string, 
    chartConfigs:{
        ['OneYear']:{
            explorerChartCode: string,
        },
        ['TwoYears']:{
            explorerChartCode: string,
        },
        ['AllYears']:{
            explorerChartCode: string,
        },
    },
    chartSelection: number,
    yearScope: string,
    celluid?: string,
}

export interface CellConstructorArgs {
    nodeDataseriesName:string, 
    chartSelection:number,
    uid: string,
}

export interface NodeDataPack {
    treeNodeData: any,
    yearsRange: YearsRange,
    yearSelections: any,
    parentBudgetNode: any,
    budgetNode:any,
}

class BudgetCell {

    constructor(specs:CellConstructorArgs) {
        let { nodeDataseriesName, chartSelection, uid } = specs
        this.nodeDataseriesName = nodeDataseriesName
        this.chartSelection = chartSelection
        this.uid = uid
    }
    public getState: Function

    get state() {
        return this.getState()
    }

    public getProps: Function

    public setState: Function

    // =======================[ PROPERTIES ]============================

    // -------------[ primary control properties, set on creation ]---------------

    get explorerChartCode() {
        let cellDeclaration:CellDeclaration = this.getProps().declarationData.cellsById[this.uid]
        let settings = cellDeclaration.chartConfigs[cellDeclaration.yearScope]
        return settings.explorerChartCode
    } 
    nodeDataseriesName:string // the ref to the data to be presented, typically Components or CommonDimension
    chartSelection: number = null // interpreted by explorer; the logical row of the selection (per Sorted... lists)
    uid: string // universal id; set by addCellDeclarations action

    // ------------[ derivative control properties ]-------------------

    // map from internal code to googleChartType
    get googleChartType() {
        return ChartCodeToGoogleChartType[this.explorerChartCode]
    }

    get cellDeclaration() {
        return this.getProps().declarationData.cellsById[this.uid]
    }

    // the react Chart component, allows access to current google chart object
    // set by explorercell.tsx using ref callback
    chartComponent
    // current chart (can change) taken from chartComponent...
    get chart() {
        if (this.chartComponent)
            return this.chartComponent.chart // up to date version
        else 
            return null
    }

    chartParmsObject: any // also set by setChartParms; convenience for explorercell to read titles

    // readonly; set by setChartParms()
    // the formal parameters required by Chart Component for google chart creation
    // private _chartParms: ChartParms
    get chartParms() : ChartParms {
        return this.getState().chartParms
    }

    // ----------------[ mutable control properties ]-----------------

    aspectName: string // forwarded through branch settings by node
    viewpointConfigPack: ViewpointConfigPack
    nodeDataPack: NodeDataPack

    // ------------------[ display chart properties ]-------------------

    cellTitle: string // used by node to set tab title
    graph_id: string // prop for Chart component; required by google charts

    // ------------------[ callback functions ]------------------------

    // curried; inherited
    selectionCallback: Function // set by node

    // ========================[ METHODS ]==========================

    // reset the visible element selection (if any) on the current chart
    // google charts clear the selection on blur, must be re-instated after each
    // operation
    // called after animation, on mount, and after update
    refreshSelection = () => {

        let budgetCell = this

        if (budgetCell.chartSelection !== null) {

            if (budgetCell.chart && budgetCell.chart.getSelection().length == 0) {
                let selectionObj = {row:null, column:null}
                let chartSelection = [selectionObj]
                switch (budgetCell.googleChartType) {
                    case "PieChart":
                        selectionObj.row = budgetCell.chartSelection
                        break;
                    case "ColumnChart":
                        if (budgetCell.explorerChartCode == "DiffColumnChart") {
                            selectionObj.row = Math.round((budgetCell.chartSelection * 2) + 1)
                            selectionObj.column = 2
                            // console.log('set diffcolumnchart selection',selectionObj)
                        } else {
                            selectionObj.row = budgetCell.chartSelection
                            selectionObj.column = 1 // ?
                        }
                        break;
                    case "LineChart":
                    case "AreaChart":
                        selectionObj.column = budgetCell.chartSelection + 1
                        break
                    default:
                        console.log('ERROR: default invoked in refreshSelection')
                        break;
                }

                budgetCell.chart.setSelection(chartSelection)
            }
        }        
    }

    switchChartCode = () => {

        this.setChartParms()

    }

    switchYearScope = () => {
        this.setChartParms()
    }

    // ----------------------[ setChartParms ]-------------------------

    prorataControls = {
        prorataindex: null,
        yearsselector:null,
        isprorata:null,
        proratastring:null,
    }

    // creates formal input parameters for google charts, through Chart Component
    // dataset is a data tree fetched from database
    // dataseries is a list of data rows attached to a node
    setChartParms = () => {

        let budgetCell: BudgetCell = this

        // --------------[ Unpack data bundles ]-------------

        let { 
            viewpointNamingConfigs, 
            datasetConfig,
            isInflationAdjusted,
            prorata,
        } = budgetCell.viewpointConfigPack

        let { 
            treeNodeData, 
            yearsRange, 
        } = budgetCell.nodeDataPack

        // ---------------------[ get data node components ]------------------
        // collect chart node and its components as data sources for the graph

        if (!treeNodeData) {
            console.error('System Error: node not found in setChartParms', budgetCell)
            throw Error('node not found')
        }

        let { prorataControls } = budgetCell
        prorataControls.prorataindex = prorata
        if (prorata == 'OFF') {
            prorataControls.isprorata = false
            prorataControls.yearsselector = 'years'
            prorataControls.proratastring = null
        } else {
            prorataControls.isprorata = true
            prorataControls.yearsselector = 'calcyears'
            let thestring
            switch (prorata) {
                case "PERPERSON":
                    thestring = 'per person'
                    break
                case "PER100000PERSONS":
                    thestring = 'per 100,000 people'
                    break;

                case "PERHOUSEHOLD":
                    thestring = 'per household'
                    break
                case "PER40000HOUSEHOLDS":
                    thestring = 'per 40,000 households'
                    break
                case "PERWARD":
                    thestring = 'per ward (average)'
                    break
                case "PERNEIGHBOURHOOD":
                    thestring = 'per neighbourhood (average)'
                    break
                default:
                    console.error('unknown prorataindex in _doProRataCalc',prorata)
                    return
            }
            prorataControls.proratastring = thestring
        }

        // ====================[ COLLECT CHART PARMS ]======================

        // ------------------
        // 1. chart type:
        // ------------------

        let chartType = budgetCell.googleChartType

        // ------------------
        // 2. chart options:
        // ------------------

        let options = budgetCell._chartParmsOptions(
            treeNodeData, 
            viewpointNamingConfigs, 
            datasetConfig, 
            yearsRange            
        )

        // ------------------
        // 3. chart events:
        // ------------------

        let events = budgetCell._chartParmsEvents()

        // ------------------
        // 4. chart columns:
        // ------------------

        let columns = null // = budgetCell._chartParmsColumns(yearsRange, treeNodeData)

        // ------------------
        // 5. chart rows:
        // ------------------
        let { nodeDataseriesName } = budgetCell

        let sortedlistName = 'Sorted' + nodeDataseriesName

        let sortedDataseries = treeNodeData[sortedlistName]

        let explorerChartCode = this.explorerChartCode
        let rows = null
        let diffdata = null
        switch (explorerChartCode) {
            // ------------------
            // 5. diff data:
            // ------------------
            case "DiffColumnChart":
            case "DiffPieChart": {
                // console.log('processing chart code',explorerChartCode)
                let { rightYear, leftYear} = this.nodeDataPack.yearSelections
                let leftcolumns = budgetCell._columns_diffChart(yearsRange, leftYear)
                let rightcolumns = budgetCell._columns_diffChart(yearsRange, rightYear)
                diffdata = this._chartParmsDiffData(treeNodeData, yearsRange)
                diffdata.old.splice(0,0,leftcolumns)
                diffdata.new.splice(0,0,rightcolumns)
                if (explorerChartCode == "DiffPieChart") {
                    options.diff = {
                        innerCircle: { radiusFactor: 0.5 }
                    }
                    options.pieSliceText = 'percentage'
                    options.pieHole = null
                }
                // console.log( 'diffdata', diffdata, options)
                break
            }
            default: {
                columns = budgetCell._chartParmsColumns(yearsRange, treeNodeData)
                // code...
                if (sortedDataseries) {
                    rows = budgetCell._chartParmsRows( treeNodeData, yearsRange )
                } else {
                    // fires on last chart
                    console.error('System Error: no sortedDataSeries', sortedlistName, sortedDataseries, treeNodeData )
                    return
                }
            }
        }


        // --------------------[ ASSEMBLE PARMS PACK ]----------------

        let chartParms: ChartParms = {

            chartType,
            options,
            events,
            columns,
            rows,
            diffdata,

        }

        this.chartParmsObject = chartParms

        // console.log('chartParms',chartParms)

        // save it
        this.setState({
             chartParms,
        })
    }

    // ===========================================================================
    // 2. chart options:
    // ===========================================================================
    private _chartParmsOptions = (

        treeNodeData, 
        viewpointNamingConfigs, 
        datasetConfig:DatasetConfig, 
        yearsRange:YearsRange

    ) => {

        // ----------------------[ assemble support variables ]-------------------

        let budgetCell = this

        let { aspectName, nodeDataseriesName } = budgetCell

        let datasetName = AspectNameToDatasetName[aspectName]
        let units = datasetConfig.Units

        // --------------------[ assemble vertical label value ]--------------------
        let calcAlias
        if (budgetCell.prorataControls.isprorata) {
            calcAlias = datasetConfig.CalcUnitsAlias
        }
        let verticalLabel = (calcAlias || datasetConfig.UnitsAlias) || datasetConfig.Units
        verticalLabel = datasetConfig.DatasetName + ' (' + verticalLabel + ')'

        // -------------------[ assemble horizontal label value ]--------------------

        let horizontalLabel = null
        if ((treeNodeData.NamingConfigRef) && (nodeDataseriesName != 'CommonDimension')) {

            let titleref = viewpointNamingConfigs[treeNodeData.NamingConfigRef]
            horizontalLabel = titleref.Contents.Alias || titleref.Contents.Name

        } else {

            if (nodeDataseriesName == 'CommonDimension') {

                let contentdimensionname = datasetConfig.CommonDimension
                let names = datasetConfig.DimensionNames

                horizontalLabel = names[contentdimensionname].Collection

            } else {
                let contentdimensionname = 
                        treeNodeData.ComponentsDimensionName

                let names = datasetConfig.DimensionNames
                horizontalLabel = names[contentdimensionname].Collection
            }

        }

        // ----------------------[ assemble chart title ]----------------------

        // TODO: report reason for 'unknown category'
        // set basic title
        let nodename = null
        if (treeNodeData.Name) { 
            nodename = treeNodeData.Name
        } else {
            nodename = datasetConfig.DatasetTitle
        }
        // add category name
        let configindex = treeNodeData.NamingConfigRef
        let catname = null
        if (configindex) { // viewpoint node
            let names = viewpointNamingConfigs[configindex]
            let instancenames = names.Instance
            catname = instancenames.Alias || instancenames.Name
        } else { // sub-baseline dataset node
            let { nodeDataPack } = this
            if (nodeDataPack.parentBudgetNode && 
                nodeDataPack.parentBudgetNode.treeNodeData) {
                let {parentBudgetNode} = nodeDataPack
                let parentconfigindex = parentBudgetNode.treeNodeData.NamingConfigRef
                // first level below depends in parentconfigindex
                if (parentconfigindex) {
                    let names = viewpointNamingConfigs[parentconfigindex]
                    if (names && names.Contents && names.Contents.DefaultInstance) {
                        catname = names.Contents.DefaultInstance.Name
                        if (!catname) {
                            console.log('category name not found in names.Contents.DefaultInstance.Name',parentconfigindex,viewpointNamingConfigs)
                        }
                    }
                // lower levels depend on dimension category names.
                } else {
                    let nameindex = nodeDataseriesName 
                    if (nameindex == 'Components') {
                        nameindex += 'DimensionName'
                    } else if (nameindex == 'CommonDimension') {
                        nameindex += 'Name'
                    } else {
                        console.error('nodeDataseriesName not found for ', this)
                    }
                    let dimensionname = parentBudgetNode.treeNodeData[nameindex]                    
                    catname = datasetConfig.DimensionNames[dimensionname].Instance
                    if (!catname) {
                        console.log('category name not found in datasetConfig.DimensionNames[dimensionname].Instance',datasetConfig)
                    }
                }
            } 
            if (!catname) {
                catname = '(** Unknown Category **)'
            }
        }
        let title = catname + ': ' + nodename

        // add yearspan to title
        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections
        let { yearScope } = cellDeclaration

        let timeSuffix: string = null
        if ( yearScope == TimeScope[TimeScope.OneYear] ) {
            timeSuffix = rightYear.toString()
        } else {
            let separator
            if (yearScope == TimeScope[TimeScope.TwoYears]) {
                separator = ':'
            } else { // must be AllYears
                separator = ' - '
            }
            timeSuffix = leftYear + separator + rightYear
        }
        timeSuffix = ', ' + timeSuffix
        title += timeSuffix

        // add title amount
        if (yearScope == TimeScope[TimeScope.OneYear]) {
            let titleamount = null

            // utility functions for number formatting
            let dollarformat = format({ prefix: "$" })
            let rounded = format({ round: 0, integerSeparator: '' })
            let simpleroundedone = format({ round: 1, integerSeparator: ',' })
            let yearsselector = budgetCell.prorataControls.yearsselector
            if (treeNodeData[yearsselector]) {
                titleamount = treeNodeData[yearsselector][rightYear]
                if (units == 'DOLLAR') {
                    titleamount = dollarformat(titleamount)
                } else {
                    titleamount = simpleroundedone(titleamount)
                }
                if (!titleamount) titleamount = 'nil'
                title += ' (Total: ' + titleamount + ')'
            }
        }

        // add inflation adjustment indicator if appropriate
        if (datasetConfig.InflationAdjustable) {
            if (!(yearScope == TimeScope[TimeScope.OneYear] && 
                datasetConfig.InflationReferenceYear <= rightYear)) {
                let isInflationAdjusted = this.viewpointConfigPack.isInflationAdjusted

                let fragment
                if (!isInflationAdjusted) {
                    fragment = ' -- nominal $'
                } else {
                    fragment = ` -- inflation adjusted to ${datasetConfig.InflationReferenceYear} $`
                }
                title += fragment
            }
        }
        if (budgetCell.prorataControls.isprorata) {
            title += ', ' + budgetCell.prorataControls.proratastring
        }
        // ------------------------------[ assemble options ]--------------------------------

        let options = {
            animation:{
                startup: true,
                duration: 500,
                easing: 'out',
            },
            title,
            vAxis: { 
                title: verticalLabel, 
                minValue: 0, 
                textStyle: { 
                    fontSize: 8 
                } 
            },
            hAxis: { 
                title: horizontalLabel, 
                textStyle: { 
                    fontSize: 10 
                } 
            },
            bar: { 
                groupWidth: "95%" 
            },
            // width: children.length * 120,// 120 per column
            height: "400px",
            width: "400px",
            diff:null,
            pieHole:null,
            pieSliceText:null,
        }

        let options_extension = 
            budgetCell._chartTypeOptions(budgetCell.googleChartType, treeNodeData)

        options = Object.assign(options, options_extension)

        return options
        
    }

    private _chartTypeOptions = (googleChartType, treeNodeData) => {

        let options

        switch (googleChartType) {

            case "ColumnChart":
                options = {
                    legend: 'none',
                    chartArea: {
                        height: '50%',
                        top: '15%',
                        left: '25%',
                        width: '70%',
                    }
                }
                break
            
            case "PieChart": {
                options = this._pieChartOptions(treeNodeData)
                break
            }
            case "AreaChart": {
                options = {
                    isStacked:true,
                }
                if (this.explorerChartCode == "Proportional") {
                    options.isStacked = 'percent'
                }
            }
            case "LineChart": {
                if (!options) options = {}
                options.legend = {
                    position:"top",
                    textStyle: {
                        fontSize: 9,
                    },
                    maxLines: 4,
                }
                options.chartArea = {
                    height: '55%',
                    top: '30%',
                    left: 'auto',
                    width: 'auto',
                }
                break
            }
            default: {
                options = {}
            }

        }

        return options

    }

    private _pieChartOptions = (treeNodeData) => {

        let budgetCell = this

        // let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let { nodeDataseriesName } = budgetCell

        let nodeDataseries = treeNodeData[nodeDataseriesName]

        let sortedlistName = 'Sorted' + nodeDataseriesName

        let sortedDataseries = treeNodeData[sortedlistName]

        if (!sortedDataseries) {
            console.error( { 
                errorMessage:'sorted list "' + sortedlistName + '" not available'
            })
            throw Error('sorted list "' + sortedlistName + '" not available')
        }

        let sliceslist = sortedDataseries.map((sortedItem:SortedComponentItem) => {
            let componentItem = nodeDataseries[sortedItem.Code]
            if (!componentItem) {
                console.error('System Error: component not found for (node, sortedlistName, nodeDataseries, item, item.Code) ',
                    treeNodeData, sortedlistName, nodeDataseries, sortedItem.Code, sortedItem)
                throw Error('componentItem not found')
            }
            let offset = (!(componentItem.Components || componentItem.CommonDimension))?0.2:0
            return offset
        })
        let slices = {}
        for (let index in sliceslist) {
            slices[index] = {offset:sliceslist[index]}
            if ((slices[index].offset) != 0) {
  
                slices[index].color = ColorBrightness(GoogleChartColors[index],120)
                slices[index].offset = 0 // I changed my mind about having an offset; now just a proxy for no drilldown

            }
        }
        let options = {
            slices,
            pieHole:0.4,
            // is3D: true,
            legend: {
                position:"top",
                textStyle: {
                    fontSize: 9,
                },
                maxLines: 4,
            },
            chartArea: {
                height: '55%',
                top: '30%',
                left: 'auto',
                width: 'auto',
            }
        }
        return options
    }

    // ===========================================================================
    // 3. chart events:
    // ===========================================================================
    private _chartParmsEvents = () => {
        let budgetCell:BudgetCell = this
        return [
            {
                eventName: 'select',
                callback: (Chart, err) => {
                    let chart = Chart.chart
                    let selection = chart.getSelection()
                    let chartSelectionData: ChartSelectionContext = { 
                        selection, 
                        err 
                    }

                    budgetCell.selectionCallback(chartSelectionData)
                }
            },
            {
                eventName:'animationfinish',
                callback: ((cell:BudgetCell) => Chart => {
                    let selection = Chart.chart.getSelection()
                    if (selection.length == 0 && cell.chartSelection !== null) { 
                        if (cell.chart) {
                            cell.refreshSelection()
                        }
                    }
                })(budgetCell)
            }
        ]
    }

    // ===========================================================================
    // 4. chart columns:
    // ===========================================================================
    private _chartParmsColumns = (yearsRange:YearsRange, treeNodeData) => {
        let budgetCell = this

        let { googleChartType } = budgetCell

        switch (googleChartType) {
            case "ColumnChart":
                return this._columns_ColumnChart(yearsRange)
            
            case "PieChart":
                return this._columns_PieChart(yearsRange)

            case 'LineChart':
            case 'AreaChart':
                return this._columns_LineChart(treeNodeData)

            default:
                return null
        }
    }

    private _columns_LineChart = (treeNodeData) => {

        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let budgetCell = this

        let columns:any[] = [
            // type is required, else throws silent error
            { type: 'string', label: 'Year' },
        ]

        let chartDimensionType = this.nodeDataseriesName

        let listName = 'Sorted' + chartDimensionType

        let list = treeNodeData[listName]

        for (let listindex in list) {
            columns.push({type:'number',label:list[listindex].Name})
        }

        return columns

    }

    private _columns_ColumnChart = ( yearsRange:YearsRange ) => {

        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let budgetCell = this
        let categorylabel = 'Component' // placeholder

        let columns:any[] = [
            // type is required, else throws silent error
            { type: 'string', label: categorylabel },
            { type: 'number', label: rightYear.toString() },
            { type:'string', role:'style'}
        ]

        return columns

    }

    private _columns_diffChart = ( yearsRange:YearsRange, year ) => {

        let cellDeclaration = this.cellDeclaration
        // let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let budgetCell = this
        let categorylabel = 'Component' // placeholder

        let columns:any[] = [
            // type is required, else throws silent error
            { type: 'string', label: categorylabel },
            { type: 'number', label: year.toString() },
        ]

        return columns

    }

    private _columns_PieChart = ( yearsRange:YearsRange ) => {

        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let budgetCell = this
        let categorylabel = 'Component' // placeholder

        let columns:any[] = [
            // type is required, else throws silent error
            { type: 'string', label: categorylabel },
            { type: 'number', label: rightYear.toString() },
        ]

        return columns

    }

    // ===========================================================================
    // 5. chart rows:
    // ===========================================================================
    private _chartParmsRows = ( treeNodeData, yearsRange:YearsRange ) => {

        let budgetCell = this

        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let { nodeDataseriesName } = budgetCell

        let nodeDataseries = treeNodeData[nodeDataseriesName]

        let sortedlistName = 'Sorted' + nodeDataseriesName

        let sortedDataseries = treeNodeData[sortedlistName]

        if (!sortedDataseries) {
            console.error( { 
                errorMessage:'sorted list "' + sortedlistName + '" not available'
            })
            throw Error('sorted list "' + sortedlistName + '" not available')
        }

        switch (budgetCell.googleChartType) {
            case "PieChart":
            case "ColumnChart": {
                let { googleChartType:chartType } = budgetCell
                let rows = this._getYearRows( sortedDataseries, nodeDataseries, rightYear, chartType )
                return rows
            }
            case "LineChart":
            case "AreaChart":
                return this._LineChartRows( treeNodeData, sortedDataseries, yearsRange )

        }
    }

    private _chartParmsDiffData = ( treeNodeData, yearsRange:YearsRange ) => {

        let budgetCell = this

        let diffdata = {
            old:null,
            new:null,
        }

        let cellDeclaration = this.cellDeclaration
        let { rightYear, leftYear} = this.nodeDataPack.yearSelections

        let { nodeDataseriesName } = budgetCell

        let nodeDataseries = treeNodeData[nodeDataseriesName]

        let sortedlistName = 'Sorted' + nodeDataseriesName

        let sortedDataseries = treeNodeData[sortedlistName]

        if (!sortedDataseries) {
            console.error( { 
                errorMessage:'sorted list "' + sortedlistName + '" not available'
            })
            throw Error('sorted list "' + sortedlistName + '" not available')
        }

        let chartType = this.explorerChartCode

        let rows
        diffdata.new = this._getYearRows( sortedDataseries, nodeDataseries, rightYear, chartType )
        diffdata.old = this._getYearRows( sortedDataseries, nodeDataseries, leftYear, chartType )

        return diffdata
    }

    private _getYearRows = (sortedDataseries, nodeDataseries, year, chartType) => {
        let budgetCell = this
        let rows = sortedDataseries.map((sortedItem:SortedComponentItem) => {

            let componentItem = nodeDataseries[sortedItem.Code]
            if (!componentItem) {
                console.error('System Error: component not found for (node, sortedlistName, nodeDataseries, item, item.Code) ',
                    nodeDataseries, sortedItem.Code, sortedItem)
                throw Error('componentItem not found')
            }
            let yearsselector = budgetCell.prorataControls.yearsselector
            let amount
            // amount cannot be null or undefined; causes diff charts to fail
            if (componentItem[yearsselector]) {
                amount = componentItem[yearsselector][year]
                if (amount === undefined) amount = 0
            } else {
                amount = 0
            }

            let row = [sortedItem.Name, amount]

            // enhance row
            switch (chartType) {

                case "ColumnChart":
                    row = budgetCell._rows_ColumnCharts_row(row, componentItem)
                    break;
                
            }

            return row
        })
        return rows

    }

    private _LineChartRows = ( treeNodeData, sortedDataSeries, yearsRange ) => {

        let rows = []
        let budgetCell = this

        let { rightYear, leftYear} = this.nodeDataPack.yearSelections
        let yearsselector = budgetCell.prorataControls.yearsselector
        for (let year = leftYear; year <= rightYear; year++) {
            let items = sortedDataSeries.map((sortedItem:SortedComponentItem) => {
                let amount = null
                let years = treeNodeData[this.nodeDataseriesName][sortedItem.Code][yearsselector]
                if (years && years[year]!== undefined) {
                    amount = years[year]
                }
                return amount
            })
            let row = [year.toString(),...items]
            rows.push(row)
        }
        return rows
    }

    private _rows_ColumnCharts_row = (row, componentItem) => {

        let style = ''

        if (componentItem.Baseline) {
            style = 'stroke-color: Gold; stroke-width: 3;'
        }
        if (!(componentItem.Components || componentItem.CommonDimension)) {
            style += 'fill-opacity: 0.5'
        }

        row.push(style)

        return row

    }

}

export default BudgetCell