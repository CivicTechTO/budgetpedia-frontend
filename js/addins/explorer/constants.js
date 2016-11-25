"use strict";
(function (TimeScope) {
    TimeScope[TimeScope["OneYear"] = 0] = "OneYear";
    TimeScope[TimeScope["TwoYears"] = 1] = "TwoYears";
    TimeScope[TimeScope["AllYears"] = 2] = "AllYears";
})(exports.TimeScope || (exports.TimeScope = {}));
var TimeScope = exports.TimeScope;
exports.GoogleChartColors = [
    "#3366CC",
    "#DC3912",
    "#FF9900",
    "#109618",
    "#990099",
    "#3B3EAC",
    "#0099C6",
    "#DD4477",
    "#66AA00",
    "#B82E2E",
    "#316395",
    "#994499",
    "#22AA99",
    "#AAAA11",
    "#6633CC",
    "#E67300",
    "#8B0707",
    "#329262",
    "#5574A6",
    "#3B3EAC",
];
let ChartCodeToGoogleChartType = {
    'DonutChart': 'PieChart',
    'ColumnChart': 'ColumnChart',
    'DiffPieChart': 'PieChart',
    'DiffColumnChart': 'ColumnChart',
    'TimeLine': 'LineChart',
    'ContextChart': 'TreeMap',
    'StackedArea': 'AreaChart',
    'Proportional': 'AreaChart',
};
exports.ChartCodeToGoogleChartType = ChartCodeToGoogleChartType;
let AspectNameToDatasetName = {
    'Expenses': 'Expenses',
    'Revenues': 'Revenues',
    'Staffing': 'Staffing',
    'Expenditure': 'Expenditure'
};
exports.AspectNameToDatasetName = AspectNameToDatasetName;
exports.DatasetNameToAspectName = {};
for (let AspectName in AspectNameToDatasetName) {
    exports.DatasetNameToAspectName[AspectNameToDatasetName[AspectName]] = AspectName;
}
