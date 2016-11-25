// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// explorerchart.tsx
// constants.tsx

export enum TimeScope {
    OneYear,
    TwoYears,
    AllYears,
}

// from http://there4.io/2012/05/02/google-chart-color-list/
export let GoogleChartColors = 
[
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
]

let ChartCodeToGoogleChartType = {
    'DonutChart':'PieChart',
    'ColumnChart':'ColumnChart',
    'DiffPieChart':'PieChart',
    'DiffColumnChart':'ColumnChart',
    'TimeLine':'LineChart',
    'ContextChart':'TreeMap',
    'StackedArea':'AreaChart', // isStacked:'absolute'
    'Proportional':'AreaChart', // isStacked:'percent'
}

export { ChartCodeToGoogleChartType }

let AspectNameToDatasetName = {
    'Expenses':'Expenses',
    'Revenues':'Revenues',
    'Staffing':'Staffing',
    'Expenditure':'Expenditure'
}

export var DatasetNameToAspectName = {
}

for (let AspectName in AspectNameToDatasetName) {
    DatasetNameToAspectName[AspectNameToDatasetName[AspectName]] = AspectName
}

export { AspectNameToDatasetName }
