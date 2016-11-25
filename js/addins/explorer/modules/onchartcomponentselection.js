"use strict";
let applyChartComponentSelection = (budgetBranch, nodeIndex, cellIndex, chartSelectionData) => {
    let { nodes: branchNodes, uid: branchuid } = budgetBranch;
    let budgetNode = branchNodes[nodeIndex];
    let budgetCell = budgetNode.cells[cellIndex];
    if (!budgetCell) {
        console.error('System Error: budgetNode, faulty cellIndex in applyChartComponentSelection', budgetNode, cellIndex);
        throw Error('faulty cellIndex in applyChartComponentSelection');
    }
    let selection = chartSelectionData.selection[0];
    let logicalselectionrow = null;
    if (selection) {
        switch (budgetCell.googleChartType) {
            case "ColumnChart": {
                if (budgetCell.explorerChartCode == "DiffColumnChart") {
                    logicalselectionrow = Math.floor(selection.row / 2);
                }
                else {
                    logicalselectionrow = selection.row;
                }
                break;
            }
            case "AreaChart":
            case "LineChart":
                logicalselectionrow = selection.column - 1;
                if (budgetCell.chartSelection == logicalselectionrow) {
                    logicalselectionrow = null;
                }
                break;
            default:
                logicalselectionrow = selection.row;
                break;
        }
    }
    if (budgetCell.nodeDataseriesName == 'CommonDimension') {
        return;
    }
    budgetCell.chartSelection = logicalselectionrow;
    let removed = branchNodes.splice(nodeIndex + 1);
    let removeditems = removed.map((item, index) => {
        return { nodeuid: item.uid, cellList: item.cellDeclarationList, index };
    });
    let priorCellSettings = null;
    let priorNodeSettings = null;
    if (removeditems.length > 0) {
        let removednode = removed[removeditems[0].index];
        let priorCell = removednode.cells[removednode.nodeDeclaration.cellIndex];
        if (priorCell) {
            let chartConfigs = Object.assign({}, priorCell.cellDeclaration.chartConfigs);
            let yearScope = priorCell.cellDeclaration.yearScope;
            priorCellSettings = {
                chartConfigs,
                yearScope,
            };
            priorNodeSettings = {
                yearSelections: Object.assign({}, removednode.nodeDeclaration.yearSelections),
                cellIndex: removednode.nodeDeclaration.cellIndex
            };
        }
        else {
            console.log('error: did not find priorCell for node', removednode);
        }
        let { removeNodeDeclarations } = budgetBranch.actions;
        removeNodeDeclarations(removeditems);
    }
    let { updateCellChartSelection } = budgetNode.actions;
    updateCellChartSelection(budgetCell.uid, logicalselectionrow);
    if (logicalselectionrow === null) {
        budgetCell.chartSelection = null;
        return;
    }
    budgetCell.chartSelection = logicalselectionrow;
    let childprops = {
        selectionrow: logicalselectionrow,
        nodeIndex,
        cellIndex: parseInt(cellIndex),
        priorCellSettings,
        priorNodeSettings,
    };
    budgetBranch.createChildNodeDeclaration(childprops);
};
exports.onChartComponentSelection = budgetBranch => nodeIndex => cellIndex => chartSelectionData => {
    applyChartComponentSelection(budgetBranch, nodeIndex, cellIndex, chartSelectionData);
};
