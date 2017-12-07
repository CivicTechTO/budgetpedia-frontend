// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// onchartcomponentselection.tsx

// TODO: replacement node should inherit cellIndex
// TODO: should be moved to branch.class

import BudgetNode from '../classes/node.class'
import BudgetBranch, { CreateChildNodeProps } from '../classes/branch.class'
import BudgetCell from '../classes/cell.class'

export interface ChartSelectionCell {
    row:number,
    column:number
}

// returned when user clicks on a chart component 
// for drill-down or other action
export interface ChartSelectionContext {
    // Chart: any,
    selection: ChartSelectionCell[],
    err: any,
}

// ------------------------[ UPDATE CHART BY SELECTION ]-----------------

// response to user selection of a chart component (such as a column )
// called by chart callback
// on selection, makes a child with the same datasetSpecs offset
let applyChartComponentSelection = (budgetBranch: BudgetBranch, nodeIndex, cellIndex, chartSelectionData:ChartSelectionContext) => {

    // console.log('chartSelection data',chartSelectionData)

    let { nodes:branchNodes, uid:branchuid } = budgetBranch

    let budgetNode: BudgetNode = branchNodes[nodeIndex]
    // budgetnode is undefined on final expendigure chart
    let budgetCell:BudgetCell = budgetNode.cells[cellIndex]

    if (!budgetCell) {
        console.error('System Error: budgetNode, faulty cellIndex in applyChartComponentSelection',budgetNode, cellIndex)
        throw Error('faulty cellIndex in applyChartComponentSelection')
    }

    // unpack chartSelectionData
    let selection = chartSelectionData.selection[0]


    // console.log('budgetCell googlecharttype',budgetCell.googleChartType, cellIndex)

    let logicalselectionrow = null
    if (selection) {
        // TODO: understand this: setting column to null avoids bugs
        // when chart animation is present
        // selection.column = null
        switch (budgetCell.googleChartType) {
            case "ColumnChart":{
                if (budgetCell.explorerChartCode == "DiffColumnChart") {
                    logicalselectionrow = Math.floor(selection.row / 2)
                } else {
                    logicalselectionrow = selection.row
                }
                break
            }
            case "AreaChart":
            case "LineChart":
                logicalselectionrow = selection.column - 1
                if (budgetCell.chartSelection == logicalselectionrow) {
                    logicalselectionrow = null
                }
                // TODO: save row and column separately and allow
                // mapping among chart types
                // chartSelectionData.selection[0].row = null
                break;
            // TODO: find out why the piechart column null causes fail
            // case "PieChart": 
            //     chartSelectionData.selection[0].column = null
            default:
                logicalselectionrow = selection.row
                break;
        }
    // } else {
    //     logicalselectionrow = null
    //     // return
    }

    // 1. stop if chart is not not drillable
    if (budgetCell.nodeDataseriesName == 'CommonDimension') {
        return
    }
    budgetCell.chartSelection = logicalselectionrow // selection? chartSelectionData.selection: null

    // console.log('setting chartSelection', budgetCell.chartSelection, logicalselectionrow, selection)

    // 2. remove any nodes to be replaced or abandoned

    let removed:BudgetNode[] = branchNodes.splice(nodeIndex + 1) // remove subsequent charts
    let removeditems = removed.map((item:BudgetNode, index) => {
        return {nodeuid:item.uid, cellList:item.cellDeclarationList, index}
    })

    let priorCellSettings = null
    let priorNodeSettings = null

    if (removeditems.length > 0) {

        // console.log('removed,removeditems',removed,removeditems)
        // TODO: review this for directness and efficiency
        let removednode:BudgetNode = removed[removeditems[0].index]
        let priorCell:BudgetCell = removednode.cells[removednode.nodeDeclaration.cellIndex]
        if (priorCell) {
            let chartConfigs = Object.assign({},priorCell.cellDeclaration.chartConfigs)
            let yearScope = priorCell.cellDeclaration.yearScope
            priorCellSettings = {
                chartConfigs,
                yearScope,
            }
            priorNodeSettings = {
                yearSelections: Object.assign({},removednode.nodeDeclaration.yearSelections),
                cellIndex: removednode.nodeDeclaration.cellIndex
            }
        } else {
            console.log('error: did not find priorCell for node',removednode)
        }
        let { removeNodeDeclarations } = budgetBranch.actions

        removeNodeDeclarations(removeditems)

    }

    let { updateCellChartSelection } = budgetNode.actions

    // console.log('logicalselectionrow', logicalselectionrow)

    updateCellChartSelection(budgetCell.uid,logicalselectionrow) // chartSelectionData.selection)

    if (logicalselectionrow === null) { // deselected

        budgetCell.chartSelection = null

        return
    }

    // 3. otherwise create new child node
    budgetCell.chartSelection = logicalselectionrow // chartSelectionData.selection
    let childprops: CreateChildNodeProps = {
        selectionrow:logicalselectionrow,
        nodeIndex,
        cellIndex:parseInt(cellIndex),
        priorCellSettings, 
        priorNodeSettings,
    }

    budgetBranch.createChildNodeDeclaration( childprops )

}

export const onChartComponentSelection = 
    budgetBranch => nodeIndex => cellIndex => chartSelectionData => {
        // console.log('chart selection data',chartSelectionData)
    applyChartComponentSelection(budgetBranch,nodeIndex, cellIndex, chartSelectionData)
}

