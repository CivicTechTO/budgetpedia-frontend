// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// budgetnode.tsx

import { YearsRange } from './databaseapi'
import { 
    AspectNameToDatasetName, 
} from '../constants'
import {
    PortalConfig,
    GetCellChartProps,
    GetChartParmsProps,
    ChartParmsObj,
} from '../modules/interfaces'

import BudgetCell, { CellDeclaration, NodeDataPack } from './cell.class'

export interface BudgetNodeParms {
    viewpointName: string,
    aspectName: string, // used to select chartset to display
    // datasetSpecs:DataseriesMeta[],
    yearsRange: YearsRange,
    yearSelections: any,
    dataPath: string[],
    nodeIndex: number,
    // treeNodeMetaDataFromParentSortedList?:any,
}

export interface BudgetNodeDeclarationParms {
    viewpointName: string,
    aspectName: string, // used to select chartset to display
    // datasetSpecs:DataseriesMeta[],
    yearsRange: YearsRange,
    yearSelections: any,
    dataPath: string[],
    nodeIndex: number,
    cellIndex: any,
}

class BudgetNode {
    constructor(parms: BudgetNodeParms, uid:string, node:any, parentBudgetNode:any = null) {

        // let portalcharts = parms.datasetSpecs

        this.viewpointName = parms.viewpointName
        this.aspectName = parms.aspectName
        this.dataPath = parms.dataPath
        this.nodeIndex = parms.nodeIndex
        this.yearsRange
             = parms.yearsRange
            
        this.yearSelections = parms.yearSelections
        this._nodeData = node
        this.uid = uid

        if (parentBudgetNode) this.parentBudgetNode = parentBudgetNode

    }

    // ====================================================================
    // ---------------------[ PUBLIC ]------------------------------------

    uid:string
    viewpointName: string
    aspectName: string
    dataPath: string[]
    nodeIndex: number
    yearsRange: YearsRange
    yearSelections: any
    actions: any
    viewpointConfigPack: any
    branchSettings:any
    onChartComponentSelection: Function
    new:boolean = true
    updated:boolean = false
    newCells:BudgetCell[] = null
    get treeNodeData() {
        return this._nodeData
    }
    get state() {
        return this.getState()
    }

    get props() {
        return this.getProps()
    }

    public getState: Function

    public setState: Function

    public getProps: Function

    // treeNodeMetaDataFromParentSortedList: any = null // includes parentNode for now
    // parentNode: any = null

    get nodeDeclaration() {
        return this.props.declarationData.nodesById[this.uid]
    }

    priorCellSettings: any // to pass prior cell settings from replaced child for next child

    parentBudgetNode: any = null

    portalConfig: PortalConfig

    get cells() { // only return cells that have appropriate node datasets available
        return [...this.state.nodeCells]
    }

    updateAspect = (aspect, treeNodeData) => { 
        this.aspectName = aspect
        this.updateDataNode(treeNodeData) 
    }

    updateDataNode = (treeNodeData) => {
        this._nodeData = treeNodeData
        this.updated = true
    }

    oldAspectState: boolean // !!dataNode.Components

    // ====================================================================
    // ---------------------[ PRIVATE ]------------------------------------

    getCellDeclarationParms = () => {
        let budgetNode = this
        let parmsList:CellDeclaration[] = []
        let datasetName:string = AspectNameToDatasetName[budgetNode.aspectName]
        let chartSpecs = budgetNode.viewpointConfigPack.datasetConfig.Dataseries
        let node = budgetNode.treeNodeData
        let cellDeclarationData
        if (budgetNode.parentBudgetNode) {
            let parent:BudgetNode = this.parentBudgetNode
            if (parent.priorCellSettings) {
                cellDeclarationData = parent.priorCellSettings
                parent.priorCellSettings = null
            } else {
                let parentNodeDeclaration = budgetNode.props.declarationData.nodesById[parent.uid]
                let cellIndex = parentNodeDeclaration.cellIndex
                let parentCell = parent.cells[cellIndex]
                if (parentCell) { // could fail with race condition of multiple concurrent node declarations from urlparms
                    // console.log('getCellDeclarationParms budgetNode',budgetNode)
                    let callingCellDeclaration = budgetNode.props.declarationData.cellsById[parentCell.uid]
                    let chartConfigs = Object.assign({},callingCellDeclaration.chartConfigs)
                    cellDeclarationData = {
                        yearScope:callingCellDeclaration.yearScope,
                        chartConfigs,
                    }
                } else {
                    cellDeclarationData = this.props.declarationData.defaults.cell
                }
            }
        } else {
            cellDeclarationData = this.props.declarationData.defaults.cell
        }
        for (let chartSpec of chartSpecs) {
            let cellDeclaration:CellDeclaration = Object.assign({},cellDeclarationData)
            // not only must the dataseries be mandated, but also present...
            if (node[chartSpec.Type]) {
                cellDeclaration.nodeDataseriesName = chartSpec.Type
                parmsList.push(cellDeclaration)
            }
        }
        return parmsList
    }

    public setCells(cellDeclarations:CellDeclaration[]) {
        let cells = []
        // // TODO: should be default for each chart...
        // build cells array
        for (let cellIndex in cellDeclarations) {
            let cellDeclaration: CellDeclaration = cellDeclarations[cellIndex]
            // TODO: this should use cellIndex not celluid of cellDeclaration!!
            let {nodeDataseriesName, celluid, chartSelection} = cellDeclaration
            if (chartSelection === undefined) chartSelection = null

            let cell = new BudgetCell(
                {
                    nodeDataseriesName,
                    chartSelection,
                    uid:celluid,
                }
            )

            this._updateCell(cell, cellIndex)
            cells.push(cell)
        }

        return cells
    }

    public resetCells() {

        let budgetNode = this

        let cells = budgetNode.cells
        for (let cellIndex in cells) {

            let cell:BudgetCell = cells[cellIndex]

            budgetNode._updateCell(cell, cellIndex)
            cell.setChartParms()

        }
        this.newCells = cells
        this.updated = true

    }

    switchYearSelections(yearSelections) {

        let budgetNode = this

        this.yearSelections = yearSelections

        let cells = budgetNode.cells
        for (let cellIndex in cells) {

            let cell:BudgetCell = cells[cellIndex]

            budgetNode._updateCell(cell, cellIndex)
            cell.setChartParms()

        }
        this.newCells = cells
        this.updated = true

    }

    private _updateCell = (cell:BudgetCell, cellIndex) => {

        let budgetNode = this

        let { viewpointConfigPack, treeNodeData, yearsRange, 
            yearSelections, parentBudgetNode, nodeIndex } = budgetNode
        let nodeDataPack: NodeDataPack = {
            treeNodeData,
            yearsRange
            ,
            yearSelections,
            parentBudgetNode,
            budgetNode,
        }

        cell.viewpointConfigPack = viewpointConfigPack
        cell.nodeDataPack = nodeDataPack
        cell.aspectName = budgetNode.branchSettings.aspect,

        budgetNode._setCellSelectionCallback(cell, cellIndex)
        budgetNode._setCellTitle(cell)

    }

    private _setCellTitle = (budgetCell:BudgetCell) => {

        let portaltitles = budgetCell.viewpointConfigPack.datasetConfig.CellTitles
        let chartblocktitle = null
        if ((budgetCell.nodeDataseriesName == 'CommonDimension')) {
            chartblocktitle = portaltitles.CommonDimension
        } else {
            chartblocktitle = portaltitles.Components
        }
        budgetCell.cellTitle = chartblocktitle
        
    }

    private _setCellSelectionCallback = (cell:BudgetCell, cellIndex) => {
        let budgetNode = this

        let selectfn = this.onChartComponentSelection
        let fcurrent = selectfn(budgetNode.nodeIndex)(cellIndex)

        cell.selectionCallback = fcurrent

    }

    get cellDeclarationList() {
        let list = this.getProps().declarationData.nodesById[this.uid].cellList

        if (list == null)
            return list
        else 
            return [...list]
    }

    private _nodeData: any

}

export default BudgetNode
