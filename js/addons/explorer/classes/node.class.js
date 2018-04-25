// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// budgetnode.tsx
import { AspectNameToDatasetName, } from '../constants';
import BudgetCell from './cell.class';
class BudgetNode {
    constructor(parms, uid, node, parentBudgetNode = null) {
        // let portalcharts = parms.datasetSpecs
        this.new = true;
        this.updated = false;
        this.newCells = null;
        this.parentBudgetNode = null;
        this.updateAspect = (aspect, treeNodeData) => {
            this.aspectName = aspect;
            this.updateDataNode(treeNodeData);
        };
        this.updateDataNode = (treeNodeData) => {
            this._nodeData = treeNodeData;
            this.updated = true;
        };
        this.oldNodeState = {
            hasChildren: null
        };
        // ====================================================================
        // ---------------------[ PRIVATE ]------------------------------------
        this.getCellDeclarationParms = () => {
            let budgetNode = this;
            let parmsList = [];
            let datasetName = AspectNameToDatasetName[budgetNode.aspectName];
            let chartSpecs = budgetNode.viewpointConfigPack.datasetConfig.Dataseries;
            let node = budgetNode.treeNodeData;
            let cellDeclarationData;
            if (budgetNode.parentBudgetNode) {
                let parent = this.parentBudgetNode;
                if (parent.priorCellSettings) {
                    cellDeclarationData = parent.priorCellSettings;
                    parent.priorCellSettings = null;
                }
                else {
                    let parentNodeDeclaration = budgetNode.props.declarationData.nodesById[parent.uid];
                    let cellIndex = parentNodeDeclaration.cellIndex;
                    let parentCell = parent.cells[cellIndex];
                    if (parentCell) { // could fail with race condition of multiple concurrent node declarations from urlparms
                        // console.log('getCellDeclarationParms budgetNode',budgetNode)
                        let callingCellDeclaration = budgetNode.props.declarationData.cellsById[parentCell.uid];
                        let chartConfigs = Object.assign({}, callingCellDeclaration.chartConfigs);
                        cellDeclarationData = {
                            yearScope: callingCellDeclaration.yearScope,
                            chartConfigs,
                        };
                    }
                    else {
                        cellDeclarationData = this.props.declarationData.defaults.cell;
                    }
                }
            }
            else {
                cellDeclarationData = this.props.declarationData.defaults.cell;
            }
            for (let chartSpec of chartSpecs) {
                let cellDeclaration = Object.assign({}, cellDeclarationData);
                // not only must the dataseries be mandated, but also present...
                if (node[chartSpec.Type]) {
                    cellDeclaration.nodeDataseriesName = chartSpec.Type;
                    parmsList.push(cellDeclaration);
                }
            }
            return parmsList;
        };
        this._updateCell = (cell, cellIndex) => {
            let budgetNode = this;
            let { viewpointConfigPack, treeNodeData, yearsRange, yearSelections, parentBudgetNode, nodeIndex } = budgetNode;
            let nodeDataPack = {
                treeNodeData,
                yearsRange,
                yearSelections,
                parentBudgetNode,
                budgetNode,
            };
            cell.viewpointConfigPack = viewpointConfigPack;
            cell.nodeDataPack = nodeDataPack;
            cell.aspectName = budgetNode.branchSettings.aspect,
                budgetNode._setCellSelectionCallback(cell, cellIndex);
            budgetNode._setCellTitle(cell);
        };
        this._setCellTitle = (budgetCell) => {
            let portaltitles = budgetCell.viewpointConfigPack.datasetConfig.CellTitles;
            let chartblocktitle = null;
            if ((budgetCell.nodeDataseriesName == 'CommonDimension')) {
                chartblocktitle = portaltitles.CommonDimension;
            }
            else {
                chartblocktitle = portaltitles.Components;
            }
            budgetCell.cellTitle = chartblocktitle;
        };
        this._setCellSelectionCallback = (cell, cellIndex) => {
            let budgetNode = this;
            let selectfn = this.onChartComponentSelection;
            let fcurrent = selectfn(budgetNode.nodeIndex)(cellIndex);
            cell.selectionCallback = fcurrent;
        };
        this.viewpointName = parms.viewpointName;
        this.aspectName = parms.aspectName;
        this.dataPath = parms.dataPath;
        this.nodeIndex = parms.nodeIndex;
        this.yearsRange
            = parms.yearsRange;
        this.yearSelections = parms.yearSelections;
        this._nodeData = node;
        this.uid = uid;
        if (parentBudgetNode)
            this.parentBudgetNode = parentBudgetNode;
    }
    get treeNodeData() {
        return this._nodeData;
    }
    get state() {
        return this.getState();
    }
    get props() {
        return this.getProps();
    }
    // treeNodeMetaDataFromParentSortedList: any = null // includes parentNode for now
    // parentNode: any = null
    get nodeDeclaration() {
        return this.props.declarationData.nodesById[this.uid];
    }
    get cells() {
        return [...this.state.nodeCells];
    }
    setCells(cellDeclarations) {
        let cells = [];
        // // TODO: should be default for each chart...
        // build cells array
        for (let cellIndex in cellDeclarations) {
            let cellDeclaration = cellDeclarations[cellIndex];
            // TODO: this should use cellIndex not celluid of cellDeclaration!!
            let { nodeDataseriesName, celluid, chartSelection } = cellDeclaration;
            if (chartSelection === undefined)
                chartSelection = null;
            let cell = new BudgetCell({
                nodeDataseriesName,
                chartSelection,
                uid: celluid,
            });
            this._updateCell(cell, cellIndex);
            cells.push(cell);
        }
        return cells;
    }
    resetCells() {
        let budgetNode = this;
        let cells = budgetNode.cells;
        for (let cellIndex in cells) {
            let cell = cells[cellIndex];
            budgetNode._updateCell(cell, cellIndex);
            cell.setChartParms();
        }
        this.newCells = cells;
        this.updated = true;
    }
    switchYearSelections(yearSelections) {
        let budgetNode = this;
        this.yearSelections = yearSelections;
        let cells = budgetNode.cells;
        for (let cellIndex in cells) {
            let cell = cells[cellIndex];
            budgetNode._updateCell(cell, cellIndex);
            cell.setChartParms();
        }
        this.newCells = cells;
        this.updated = true;
    }
    get cellDeclarationList() {
        let list = this.getProps().declarationData.nodesById[this.uid].cellList;
        if (list == null)
            return list;
        else
            return [...list];
    }
}
export default BudgetNode;
