"use strict";
const constants_1 = require('../constants');
const constants_2 = require('../constants');
const utilities_1 = require('../modules/utilities');
var format = require('format-number');
class BudgetCell {
    constructor(specs) {
        this.chartSelection = null;
        this.refreshSelection = () => {
            let budgetCell = this;
            if (budgetCell.chartSelection !== null) {
                if (budgetCell.chart && budgetCell.chart.getSelection().length == 0) {
                    let selectionObj = { row: null, column: null };
                    let chartSelection = [selectionObj];
                    switch (budgetCell.googleChartType) {
                        case "PieChart":
                            selectionObj.row = budgetCell.chartSelection;
                            break;
                        case "ColumnChart":
                            if (budgetCell.explorerChartCode == "DiffColumnChart") {
                                selectionObj.row = Math.round((budgetCell.chartSelection * 2) + 1);
                                selectionObj.column = 2;
                            }
                            else {
                                selectionObj.row = budgetCell.chartSelection;
                                selectionObj.column = 1;
                            }
                            break;
                        case "LineChart":
                        case "AreaChart":
                            selectionObj.column = budgetCell.chartSelection + 1;
                            break;
                        default:
                            console.log('ERROR: default invoked in refreshSelection');
                            break;
                    }
                    budgetCell.chart.setSelection(chartSelection);
                }
            }
        };
        this.switchChartCode = () => {
            this.setChartParms();
        };
        this.switchYearScope = () => {
            this.setChartParms();
        };
        this.prorataControls = {
            prorataindex: null,
            yearsselector: null,
            isprorata: null,
            proratastring: null,
        };
        this.setChartParms = () => {
            let budgetCell = this;
            let { viewpointNamingConfigs, datasetConfig, isInflationAdjusted, prorata, } = budgetCell.viewpointConfigPack;
            let { treeNodeData, yearsRange, } = budgetCell.nodeDataPack;
            if (!treeNodeData) {
                console.error('System Error: node not found in setChartParms', budgetCell);
                throw Error('node not found');
            }
            let { prorataControls } = budgetCell;
            prorataControls.prorataindex = prorata;
            if (prorata == 'OFF') {
                prorataControls.isprorata = false;
                prorataControls.yearsselector = 'years';
                prorataControls.proratastring = null;
            }
            else {
                prorataControls.isprorata = true;
                prorataControls.yearsselector = 'calcyears';
                let thestring;
                switch (prorata) {
                    case "PERPERSON":
                        thestring = 'per person';
                        break;
                    case "PER100000PERSONS":
                        thestring = 'per 100,000 people';
                        break;
                    case "PERHOUSEHOLD":
                        thestring = 'per household';
                        break;
                    case "PER40000HOUSEHOLDS":
                        thestring = 'per 40,000 households';
                        break;
                    case "PERWARD":
                        thestring = 'per ward (average)';
                        break;
                    case "PERNEIGHBOURHOOD":
                        thestring = 'per neighbourhood (average)';
                        break;
                    default:
                        console.error('unknown prorataindex in _doProRataCalc', prorata);
                        return;
                }
                prorataControls.proratastring = thestring;
            }
            let chartType = budgetCell.googleChartType;
            let options = budgetCell._chartParmsOptions(treeNodeData, viewpointNamingConfigs, datasetConfig, yearsRange);
            let events = budgetCell._chartParmsEvents();
            let columns = null;
            let { nodeDataseriesName } = budgetCell;
            let sortedlistName = 'Sorted' + nodeDataseriesName;
            let sortedDataseries = treeNodeData[sortedlistName];
            let explorerChartCode = this.explorerChartCode;
            let rows = null;
            let diffdata = null;
            switch (explorerChartCode) {
                case "DiffColumnChart":
                case "DiffPieChart": {
                    let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
                    let leftcolumns = budgetCell._columns_diffChart(yearsRange, leftYear);
                    let rightcolumns = budgetCell._columns_diffChart(yearsRange, rightYear);
                    diffdata = this._chartParmsDiffData(treeNodeData, yearsRange);
                    diffdata.old.splice(0, 0, leftcolumns);
                    diffdata.new.splice(0, 0, rightcolumns);
                    if (explorerChartCode == "DiffPieChart") {
                        options.diff = {
                            innerCircle: { radiusFactor: 0.5 }
                        };
                        options.pieSliceText = 'percentage';
                        options.pieHole = null;
                    }
                    break;
                }
                default: {
                    columns = budgetCell._chartParmsColumns(yearsRange, treeNodeData);
                    if (sortedDataseries) {
                        rows = budgetCell._chartParmsRows(treeNodeData, yearsRange);
                    }
                    else {
                        console.error('System Error: no sortedDataSeries', sortedlistName, sortedDataseries, treeNodeData);
                        return;
                    }
                }
            }
            let chartParms = {
                chartType,
                options,
                events,
                columns,
                rows,
                diffdata,
            };
            this.chartParmsObject = chartParms;
            this.setState({
                chartParms,
            });
        };
        this._chartParmsOptions = (treeNodeData, viewpointNamingConfigs, datasetConfig, yearsRange) => {
            let budgetCell = this;
            let { aspectName, nodeDataseriesName } = budgetCell;
            let datasetName = constants_1.AspectNameToDatasetName[aspectName];
            let units = datasetConfig.Units;
            let calcAlias;
            if (budgetCell.prorataControls.isprorata) {
                calcAlias = datasetConfig.CalcUnitsAlias;
            }
            let verticalLabel = (calcAlias || datasetConfig.UnitsAlias) || datasetConfig.Units;
            verticalLabel = datasetConfig.DatasetName + ' (' + verticalLabel + ')';
            let horizontalLabel = null;
            if ((treeNodeData.NamingConfigRef) && (nodeDataseriesName != 'CommonDimension')) {
                let titleref = viewpointNamingConfigs[treeNodeData.NamingConfigRef];
                horizontalLabel = titleref.Contents.Alias || titleref.Contents.Name;
            }
            else {
                if (nodeDataseriesName == 'CommonDimension') {
                    let contentdimensionname = datasetConfig.CommonDimension;
                    let names = datasetConfig.DimensionNames;
                    horizontalLabel = names[contentdimensionname].Collection;
                }
                else {
                    let contentdimensionname = treeNodeData.ComponentsDimensionName;
                    let names = datasetConfig.DimensionNames;
                    horizontalLabel = names[contentdimensionname].Collection;
                }
            }
            let nodename = null;
            if (treeNodeData.Name) {
                nodename = treeNodeData.Name;
            }
            else {
                nodename = datasetConfig.DatasetTitle;
            }
            let configindex = treeNodeData.NamingConfigRef;
            let catname = null;
            if (configindex) {
                let names = viewpointNamingConfigs[configindex];
                let instancenames = names.Instance;
                catname = instancenames.Alias || instancenames.Name;
            }
            else {
                let { nodeDataPack } = this;
                if (nodeDataPack.parentBudgetNode &&
                    nodeDataPack.parentBudgetNode.treeNodeData) {
                    let { parentBudgetNode } = nodeDataPack;
                    let parentconfigindex = parentBudgetNode.treeNodeData.NamingConfigRef;
                    if (parentconfigindex) {
                        let names = viewpointNamingConfigs[parentconfigindex];
                        if (names && names.Contents && names.Contents.DefaultInstance) {
                            catname = names.Contents.DefaultInstance.Name;
                            if (!catname) {
                                console.log('category name not found in names.Contents.DefaultInstance.Name', parentconfigindex, viewpointNamingConfigs);
                            }
                        }
                    }
                    else {
                        let nameindex = nodeDataseriesName;
                        if (nameindex == 'Components') {
                            nameindex += 'DimensionName';
                        }
                        else if (nameindex == 'CommonDimension') {
                            nameindex += 'Name';
                        }
                        else {
                            console.error('nodeDataseriesName not found for ', this);
                        }
                        let dimensionname = parentBudgetNode.treeNodeData[nameindex];
                        catname = datasetConfig.DimensionNames[dimensionname].Instance;
                        if (!catname) {
                            console.log('category name not found in datasetConfig.DimensionNames[dimensionname].Instance', datasetConfig);
                        }
                    }
                }
                if (!catname) {
                    catname = '(** Unknown Category **)';
                }
            }
            let title = catname + ': ' + nodename;
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let { yearScope } = cellDeclaration;
            let timeSuffix = null;
            if (yearScope == constants_2.TimeScope[constants_2.TimeScope.OneYear]) {
                timeSuffix = rightYear.toString();
            }
            else {
                let separator;
                if (yearScope == constants_2.TimeScope[constants_2.TimeScope.TwoYears]) {
                    separator = ':';
                }
                else {
                    separator = ' - ';
                }
                timeSuffix = leftYear + separator + rightYear;
            }
            timeSuffix = ', ' + timeSuffix;
            title += timeSuffix;
            if (yearScope == constants_2.TimeScope[constants_2.TimeScope.OneYear]) {
                let titleamount = null;
                let dollarformat = format({ prefix: "$" });
                let rounded = format({ round: 0, integerSeparator: '' });
                let simpleroundedone = format({ round: 1, integerSeparator: ',' });
                let yearsselector = budgetCell.prorataControls.yearsselector;
                if (treeNodeData[yearsselector]) {
                    titleamount = treeNodeData[yearsselector][rightYear];
                    if (units == 'DOLLAR') {
                        titleamount = dollarformat(titleamount);
                    }
                    else {
                        titleamount = simpleroundedone(titleamount);
                    }
                    if (!titleamount)
                        titleamount = 'nil';
                    title += ' (Total: ' + titleamount + ')';
                }
            }
            if (datasetConfig.InflationAdjustable) {
                if (!(yearScope == constants_2.TimeScope[constants_2.TimeScope.OneYear] &&
                    datasetConfig.InflationReferenceYear <= rightYear)) {
                    let isInflationAdjusted = this.viewpointConfigPack.isInflationAdjusted;
                    let fragment;
                    if (!isInflationAdjusted) {
                        fragment = ' -- nominal $';
                    }
                    else {
                        fragment = ` -- inflation adjusted to ${datasetConfig.InflationReferenceYear} $`;
                    }
                    title += fragment;
                }
            }
            if (budgetCell.prorataControls.isprorata) {
                title += ', ' + budgetCell.prorataControls.proratastring;
            }
            let options = {
                animation: {
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
                height: "400px",
                width: "400px",
                diff: null,
                pieHole: null,
                pieSliceText: null,
            };
            let options_extension = budgetCell._chartTypeOptions(budgetCell.googleChartType, treeNodeData);
            options = Object.assign(options, options_extension);
            return options;
        };
        this._chartTypeOptions = (googleChartType, treeNodeData) => {
            let options;
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
                    };
                    break;
                case "PieChart": {
                    options = this._pieChartOptions(treeNodeData);
                    break;
                }
                case "AreaChart": {
                    options = {
                        isStacked: true,
                    };
                    if (this.explorerChartCode == "Proportional") {
                        options.isStacked = 'percent';
                    }
                }
                case "LineChart": {
                    if (!options)
                        options = {};
                    options.legend = {
                        position: "top",
                        textStyle: {
                            fontSize: 9,
                        },
                        maxLines: 4,
                    };
                    options.chartArea = {
                        height: '55%',
                        top: '30%',
                        left: 'auto',
                        width: 'auto',
                    };
                    break;
                }
                default: {
                    options = {};
                }
            }
            return options;
        };
        this._pieChartOptions = (treeNodeData) => {
            let budgetCell = this;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let { nodeDataseriesName } = budgetCell;
            let nodeDataseries = treeNodeData[nodeDataseriesName];
            let sortedlistName = 'Sorted' + nodeDataseriesName;
            let sortedDataseries = treeNodeData[sortedlistName];
            if (!sortedDataseries) {
                console.error({
                    errorMessage: 'sorted list "' + sortedlistName + '" not available'
                });
                throw Error('sorted list "' + sortedlistName + '" not available');
            }
            let sliceslist = sortedDataseries.map((sortedItem) => {
                let componentItem = nodeDataseries[sortedItem.Code];
                if (!componentItem) {
                    console.error('System Error: component not found for (node, sortedlistName, nodeDataseries, item, item.Code) ', treeNodeData, sortedlistName, nodeDataseries, sortedItem.Code, sortedItem);
                    throw Error('componentItem not found');
                }
                let offset = (!(componentItem.Components || componentItem.CommonDimension)) ? 0.2 : 0;
                return offset;
            });
            let slices = {};
            for (let index in sliceslist) {
                slices[index] = { offset: sliceslist[index] };
                if ((slices[index].offset) != 0) {
                    slices[index].color = utilities_1.ColorBrightness(constants_2.GoogleChartColors[index], 120);
                    slices[index].offset = 0;
                }
            }
            let options = {
                slices,
                pieHole: 0.4,
                legend: {
                    position: "top",
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
            };
            return options;
        };
        this._chartParmsEvents = () => {
            let budgetCell = this;
            return [
                {
                    eventName: 'select',
                    callback: (Chart, err) => {
                        let chart = Chart.chart;
                        let selection = chart.getSelection();
                        let chartSelectionData = {
                            selection,
                            err
                        };
                        budgetCell.selectionCallback(chartSelectionData);
                    }
                },
                {
                    eventName: 'animationfinish',
                    callback: ((cell) => Chart => {
                        let selection = Chart.chart.getSelection();
                        if (selection.length == 0 && cell.chartSelection !== null) {
                            if (cell.chart) {
                                cell.refreshSelection();
                            }
                        }
                    })(budgetCell)
                }
            ];
        };
        this._chartParmsColumns = (yearsRange, treeNodeData) => {
            let budgetCell = this;
            let { googleChartType } = budgetCell;
            switch (googleChartType) {
                case "ColumnChart":
                    return this._columns_ColumnChart(yearsRange);
                case "PieChart":
                    return this._columns_PieChart(yearsRange);
                case 'LineChart':
                case 'AreaChart':
                    return this._columns_LineChart(treeNodeData);
                default:
                    return null;
            }
        };
        this._columns_LineChart = (treeNodeData) => {
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let budgetCell = this;
            let columns = [
                { type: 'string', label: 'Year' },
            ];
            let chartDimensionType = this.nodeDataseriesName;
            let listName = 'Sorted' + chartDimensionType;
            let list = treeNodeData[listName];
            for (let listindex in list) {
                columns.push({ type: 'number', label: list[listindex].Name });
            }
            return columns;
        };
        this._columns_ColumnChart = (yearsRange) => {
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let budgetCell = this;
            let categorylabel = 'Component';
            let columns = [
                { type: 'string', label: categorylabel },
                { type: 'number', label: rightYear.toString() },
                { type: 'string', role: 'style' }
            ];
            return columns;
        };
        this._columns_diffChart = (yearsRange, year) => {
            let cellDeclaration = this.cellDeclaration;
            let budgetCell = this;
            let categorylabel = 'Component';
            let columns = [
                { type: 'string', label: categorylabel },
                { type: 'number', label: year.toString() },
            ];
            return columns;
        };
        this._columns_PieChart = (yearsRange) => {
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let budgetCell = this;
            let categorylabel = 'Component';
            let columns = [
                { type: 'string', label: categorylabel },
                { type: 'number', label: rightYear.toString() },
            ];
            return columns;
        };
        this._chartParmsRows = (treeNodeData, yearsRange) => {
            let budgetCell = this;
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let { nodeDataseriesName } = budgetCell;
            let nodeDataseries = treeNodeData[nodeDataseriesName];
            let sortedlistName = 'Sorted' + nodeDataseriesName;
            let sortedDataseries = treeNodeData[sortedlistName];
            if (!sortedDataseries) {
                console.error({
                    errorMessage: 'sorted list "' + sortedlistName + '" not available'
                });
                throw Error('sorted list "' + sortedlistName + '" not available');
            }
            switch (budgetCell.googleChartType) {
                case "PieChart":
                case "ColumnChart": {
                    let { googleChartType: chartType } = budgetCell;
                    let rows = this._getYearRows(sortedDataseries, nodeDataseries, rightYear, chartType);
                    return rows;
                }
                case "LineChart":
                case "AreaChart":
                    return this._LineChartRows(treeNodeData, sortedDataseries, yearsRange);
            }
        };
        this._chartParmsDiffData = (treeNodeData, yearsRange) => {
            let budgetCell = this;
            let diffdata = {
                old: null,
                new: null,
            };
            let cellDeclaration = this.cellDeclaration;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let { nodeDataseriesName } = budgetCell;
            let nodeDataseries = treeNodeData[nodeDataseriesName];
            let sortedlistName = 'Sorted' + nodeDataseriesName;
            let sortedDataseries = treeNodeData[sortedlistName];
            if (!sortedDataseries) {
                console.error({
                    errorMessage: 'sorted list "' + sortedlistName + '" not available'
                });
                throw Error('sorted list "' + sortedlistName + '" not available');
            }
            let chartType = this.explorerChartCode;
            let rows;
            diffdata.new = this._getYearRows(sortedDataseries, nodeDataseries, rightYear, chartType);
            diffdata.old = this._getYearRows(sortedDataseries, nodeDataseries, leftYear, chartType);
            return diffdata;
        };
        this._getYearRows = (sortedDataseries, nodeDataseries, year, chartType) => {
            let budgetCell = this;
            let rows = sortedDataseries.map((sortedItem) => {
                let componentItem = nodeDataseries[sortedItem.Code];
                if (!componentItem) {
                    console.error('System Error: component not found for (node, sortedlistName, nodeDataseries, item, item.Code) ', nodeDataseries, sortedItem.Code, sortedItem);
                    throw Error('componentItem not found');
                }
                let yearsselector = budgetCell.prorataControls.yearsselector;
                let amount;
                if (componentItem[yearsselector]) {
                    amount = componentItem[yearsselector][year];
                    if (amount === undefined)
                        amount = 0;
                }
                else {
                    amount = 0;
                }
                let row = [sortedItem.Name, amount];
                switch (chartType) {
                    case "ColumnChart":
                        row = budgetCell._rows_ColumnCharts_row(row, componentItem);
                        break;
                }
                return row;
            });
            return rows;
        };
        this._LineChartRows = (treeNodeData, sortedDataSeries, yearsRange) => {
            let rows = [];
            let budgetCell = this;
            let { rightYear, leftYear } = this.nodeDataPack.yearSelections;
            let yearsselector = budgetCell.prorataControls.yearsselector;
            for (let year = leftYear; year <= rightYear; year++) {
                let items = sortedDataSeries.map((sortedItem) => {
                    let amount = null;
                    let years = treeNodeData[this.nodeDataseriesName][sortedItem.Code][yearsselector];
                    if (years && years[year] !== undefined) {
                        amount = years[year];
                    }
                    return amount;
                });
                let row = [year.toString(), ...items];
                rows.push(row);
            }
            return rows;
        };
        this._rows_ColumnCharts_row = (row, componentItem) => {
            let style = '';
            if (componentItem.Baseline) {
                style = 'stroke-color: Gold; stroke-width: 3;';
            }
            if (!(componentItem.Components || componentItem.CommonDimension)) {
                style += 'fill-opacity: 0.5';
            }
            row.push(style);
            return row;
        };
        let { nodeDataseriesName, chartSelection, uid } = specs;
        this.nodeDataseriesName = nodeDataseriesName;
        this.chartSelection = chartSelection;
        this.uid = uid;
    }
    get state() {
        return this.getState();
    }
    get explorerChartCode() {
        let cellDeclaration = this.getProps().declarationData.cellsById[this.uid];
        let settings = cellDeclaration.chartConfigs[cellDeclaration.yearScope];
        return settings.explorerChartCode;
    }
    get googleChartType() {
        return constants_1.ChartCodeToGoogleChartType[this.explorerChartCode];
    }
    get cellDeclaration() {
        return this.getProps().declarationData.cellsById[this.uid];
    }
    get chart() {
        if (this.chartComponent)
            return this.chartComponent.chart;
        else
            return null;
    }
    get chartParms() {
        return this.getState().chartParms;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BudgetCell;
