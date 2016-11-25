// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// budgetbranch.tsx

/*

TODO: fix addnode to pass along cell settings for new child

*/

import databaseapi , { DatasetConfig, YearsRange, ViewpointData } from './databaseapi'
import {
    ChartParmsObj,
    SortedComponentItem,
    GetCellChartProps,
    BranchSettings,
} from '../modules/interfaces'
import getBudgetNode from '../modules/getbudgetnode'
import BudgetNode,{ BudgetNodeDeclarationParms, BudgetNodeParms } from './node.class'
import * as ExplorerActions from '../actions'

import BudgetCell from './cell.class'
import { ExplorerBranchActions } from '../components/explorerbranch'
import { 
    AspectNameToDatasetName, 
} from '../constants'

export interface CreateChildNodeProps {
    selectionrow: any,
    nodeIndex: number,
    cellIndex: number,
    priorCellSettings: {
        yearScope:any,
        chartConfigs:any,
    },
    priorNodeSettings: {
        yearSelections: any,
        cellIndex: number,
    }
    // chartSelectionData: any,
}

interface BudgetBranchParms {
    uid:string,
}

class BudgetBranch {
    constructor(parms:BudgetBranchParms) {
        this.uid = parms.uid
    }

    get nodes() {
        let copy = [...this.state.branchNodes]
        return copy // new copy
    }

    // get settings() {
    //     return this.props.declarationData.branchesById[this.uid]
    // }

    public uid: string

    public actions: ExplorerBranchActions

    public nodeCallbacks: any

    get state() {
        return this.getState()
    }

    get props() {
        return this.getProps()
    }

    get branchDeclaration() {
        return this.props.declarationData.branchesById[this.uid]
    }

    public getState: Function

    public getProps: Function

    public setState: Function

    // this generates a trigger to create a budget node object
    public getInitialBranchNodeParms = () => {

        let defaults = this.getProps().declarationData.defaults.node

        let branchSettings = this.branchDeclaration
        let viewpointData = this.state.viewpointData

        let budgetBranch = this

        let datapath = []

        let {
            viewpoint:viewpointName,
            aspect:aspectName,
        } = branchSettings

        let budgetNodeParms:BudgetNodeDeclarationParms = {
            viewpointName,
            aspectName,
            yearsRange: {
                firstYear: null,
                lastYear: null,
            },
            yearSelections: Object.assign({},defaults.yearSelections),
            dataPath: [],
            nodeIndex:0,
            cellIndex:0,
        }

        budgetNodeParms = Object.assign( defaults, budgetNodeParms )

        return budgetNodeParms

    }

    // this is a response to the addNode action
    addNode = (budgetNodeUid, nodeIndex, budgetNodeParms:BudgetNodeParms) => {

        let budgetBranch = this

        let { dataPath } = budgetNodeParms
        let branchSettings = budgetBranch.branchDeclaration

        let branchNode = budgetBranch

        let viewpointData = budgetBranch.state.viewpointData
        if (!viewpointData) return
        let treeNodeData = getBudgetNode(viewpointData, dataPath)
        let branchNodes = budgetBranch.nodes
        let parentNode = (nodeIndex === 0)? null: branchNodes[branchNodes.length - 1]
        // TODO: obtain and pass cell configurations - yearScope and chartConfigs
        let budgetNode:BudgetNode = new BudgetNode(budgetNodeParms, budgetNodeUid, treeNodeData, parentNode)
        branchNodes[nodeIndex] = budgetNode
        budgetBranch.setState({
            branchNodes,
        })

    }

    saveAspectState = () => {
        let budgetBranch = this
        let nodes = budgetBranch.nodes
        let node:BudgetNode
        for (node of nodes) {
            // let drilldown = node.treeNodeData.ComponentsDrilldown || 'Node'
            node.oldAspectState = !!node.treeNodeData.Components
            // node.oldAspectState = drilldown
        }
    }

    toggleInflationAdjusted = () => {

        let budgetBranch = this

        let nodeIndex: any
        let branchuid = budgetBranch.uid

        let branchSettings: BranchSettings = budgetBranch.branchDeclaration
        let viewpointData = budgetBranch.state.viewpointData

        let branchNodes:BudgetNode[] = budgetBranch.nodes

        for (nodeIndex in branchNodes) {

            let budgetNode: BudgetNode = branchNodes[nodeIndex]
            let dataNode = getBudgetNode(viewpointData, budgetNode.dataPath)

            budgetNode.updateDataNode(
                dataNode
            )
            budgetNode.resetCells()

        }

        budgetBranch.setState({
            branchNodes,
        })

    }

    harmonizeCells = () => {

        let budgetBranch = this

        let nodeIndex: any

        let branchNodes:BudgetNode[] = budgetBranch.nodes

        for (nodeIndex in branchNodes) {

            let budgetNode: BudgetNode = branchNodes[nodeIndex]

            let nodeDeclaration = budgetNode.props.declarationData.nodesById[budgetNode.uid]
            budgetNode.switchYearSelections(nodeDeclaration.yearSelections)
            budgetNode.resetCells()


        }

        budgetBranch.setState({
            branchNodes,
        })

    }

    // this resets the branch in response to the change aspect user request
    switchAspect = () => {

        let budgetBranch = this

        let { actions, nodeCallbacks:callbacks } = budgetBranch
        let switchResults = {
            deeperdata: false,
            shallowerdata: false,
            mismatch:false,
            message:null,
        }
        let branchSettings: BranchSettings = budgetBranch.branchDeclaration
        let viewpointData = budgetBranch.state.viewpointData

        let branchNodes:BudgetNode[] = budgetBranch.nodes

        let budgetNode: BudgetNode = null
        let parentBudgetNode: BudgetNode
        let nodeIndex: any
        let isError = false
        let chartParmsObj: ChartParmsObj = null
        let branchuid = budgetBranch.uid

        for (nodeIndex in branchNodes) {

            parentBudgetNode = budgetNode
            budgetNode = branchNodes[nodeIndex]
            let dataNode = getBudgetNode(viewpointData, budgetNode.dataPath)
            if (dataNode) {
                // check previous cell configuration against previous node
                // TODO: THIS IS A PROXY THAT NEEDS TO BE REPLACED
                // there is only one chart where there should be 2
                // let drilldown = dataNode.ComponentsDrilldown || 'None'
                // let deeperdata = ((drilldown != 'None') && (budgetNode.oldAspectState == 'None'))
                let deeperdata = ((!!dataNode.Components) && (!budgetNode.oldAspectState))
                // there are two charts where there should be 1
                // let shallowerdata = ((drilldown == 'None') && (budgetNode.oldAspectState != 'None'))
                let shallowerdata = ((!dataNode.Components) && (budgetNode.oldAspectState))

                // now set budgetNode with new data node
                let parentDataNode = null
                if (nodeIndex > 0) {
                    parentDataNode = branchNodes[nodeIndex-1].treeNodeData
                }
                if ( deeperdata || shallowerdata) {
                    switchResults.deeperdata = deeperdata
                    switchResults.shallowerdata = shallowerdata
                    // replace budgetNode
                    isError = true
                    let prevBudgetNode: BudgetNode = branchNodes[nodeIndex - 1]
                    let removed = branchNodes.splice(nodeIndex)
                    let removedids = removed.map((item:BudgetNode) => {
                        return {nodeuid:item.uid, cellList:item.cellDeclarationList}
                    })
                    actions.removeNodeDeclarations(removedids)
                    setTimeout(()=> { // avoid race condition in which google chart destroyed before react component

                        let prevBudgetCell:BudgetCell = prevBudgetNode.cells[0]

                        // TODO: pass prior cell and node settings
                        let childprops: CreateChildNodeProps = {
                            selectionrow: prevBudgetCell.chartSelection, // [0].row,
                            nodeIndex: prevBudgetNode.nodeIndex,
                            cellIndex:0,
                            priorCellSettings:null,
                            priorNodeSettings:null,
                            // chartSelectionData,
                        }
                        // let fcurrent = fn(nodeIndex)(0)
                        // let budgetBranch = this
                        budgetBranch.createChildNodeDeclaration(childprops)
                    })
                    budgetNode = null // branchNodes[nodeIndex] // created by createChildNodeDeclaration as side effect
                } else {
                    budgetNode.updateAspect(
                        branchSettings.aspect,
                        dataNode
                        // parentDataNode
                    )
                    budgetNode.resetCells()
                    // budgetNode.newCells = newCells
                }
            } else {

                let removed = branchNodes.splice(nodeIndex)
                let removedids = removed.map((item:BudgetNode) => {
                    return {nodeuid:item.uid, cellList:item.cellDeclarationList}
                })
                actions.removeNodeDeclarations(removedids)
                switchResults.mismatch = true
                switchResults.message = 'The new aspect does not have a matching chart for ' + 
                    budgetNode.treeNodeData.Name
                let cells = parentBudgetNode.cells
                for (let cell of cells) {
                    let theCell:BudgetCell = cell
                    if (theCell.chartSelection !== null) {
                        theCell.chartSelection = null
                    }
                }
                
            }
        }

        budgetBranch.setState({
            branchNodes,
        })
        return switchResults
    }

    public calculateProRata = (viewpointdata) => {

        let { branchDeclaration } = this

        let { 
            repository,
            prorata:prorataindex,
        } = branchDeclaration

        let prorataseries
        switch (prorataindex) {
            case "OFF": {
                prorataseries = 'none'
                break
            }
            case "PERPERSON":
            case "PER100000PERSONS":
                prorataseries = 'population'
                break

            case "PERHOUSEHOLD":
            case "PER40000HOUSEHOLDS":
                prorataseries = 'households'
                break
            case "PERWARD":
            case "PERNEIGHBOURHOOD":
                prorataseries = 'none'
                break
            default:
                console.error('unknown prorataindex',prorataindex)
                return
        }

        let promise = new Promise((resolve, error) => {

            if (prorataindex == 'OFF') {
                resolve(true)
            } else {

                if (prorataseries == 'none') {
                    let {YearsRange} = viewpointdata.Meta.datasetConfig
                    let {start, end} = YearsRange

                    let proratadata = {
                        years:{}
                    }

                    for (let year = start; year <= end; year++) {
                        proratadata.years[year] = null
                    }

                    let budgetBranch = this

                    budgetBranch._doProRataCalc(viewpointdata, proratadata)

                    resolve(true)

                } else {

                    let _promise = databaseapi.getProrataData({
                        repository,
                        prorataseries,
                    })

                    _promise.then( (proratadata) => {

                        // console.log('returned proratadata',proratadata)

                        let budgetBranch = this

                        budgetBranch._doProRataCalc(viewpointdata, proratadata)

                        resolve(true)
                        
                    }).catch(reason =>{

                        console.error(reason)
                        error(reason)

                    })

                }

            }

        })

        return promise

    }

    private _doProRataCalc = (viewpointdata, proratadata) => {

        // console.log('viewpointdata,proratadata',viewpointdata,proratadata)
        let proratayearlist = Object.assign({},proratadata.years)

        let { branchDeclaration } = this

        let { prorata:prorataindex } = branchDeclaration

        let { datasetConfig } = viewpointdata.Meta

        let unitratio = datasetConfig.UnitRatio
        let denominator, multiplier, precision = 5, threshhold = 10000
        let proratatype = 'yearly'
        switch (prorataindex) {
            case "PERPERSON":
                denominator = 1
                multiplier = unitratio
                break
            case "PER100000PERSONS":
                denominator = 100000
                multiplier = 1
                break;

            case "PERHOUSEHOLD":
                denominator = 1
                multiplier = unitratio
                break
            case "PER40000HOUSEHOLDS":
                denominator = 40000
                multiplier = 1
                break
            case "PERWARD":
                denominator = 44
                multiplier = 1
                proratatype = 'fixed'
                break
            case "PERNEIGHBOURHOOD":
                denominator = (4 * 44)
                multiplier = 1
                proratatype = 'fixed'
                break
            default:
                console.error('unknown prorataindex in _doProRataCalc',prorataindex)
                return
        }
        if (multiplier != 1) {
            datasetConfig.CalcUnitRatio = 1
            datasetConfig.CalcUnitsAlias = "dollars"
        } else {
            datasetConfig.CalcUnitRatio = datasetConfig.UnitRatio
            datasetConfig.CalcUnitsAlias = datasetConfig.UnitsAlias
        }

        if (proratatype == 'fixed') {

            for (let yearindex in proratayearlist) {
                proratayearlist[yearindex] = denominator
            }

        } else {

            for (let yearindex in proratayearlist) {
                let amount = proratayearlist[yearindex]
                proratayearlist[yearindex] = (amount/denominator)/multiplier
            }

        }

        this._doCalcYears(viewpointdata, proratayearlist, threshhold, precision)

        // console.log('_doProRataCalc', viewpointdata, proratayearlist, threshhold, precision)

    }

    private _doCalcYears = (node, proratayearlist, threshhold, precision) => {
        let calcyears = {}
        let years = node.years
        if (years) {
            for (let yearindex in years) {
                if (proratayearlist[yearindex]) {
                    let amount = years[yearindex]/proratayearlist[yearindex]
                    if (amount < threshhold) {
                        amount = Number(amount.toPrecision(precision))
                    } else {
                        amount = Number(amount.toFixed(0))
                    }
                    calcyears[yearindex] = amount
                }
            }
            node.calcyears = calcyears
        }
        if (node.Components) {
            for (let index in node.Components) {
                let subnode = node.Components[index]
                this._doCalcYears(subnode, proratayearlist, threshhold, precision)
            }
        }
        if (node.CommonDimension) {
            for (let index in node.CommonDimension) {
                let subnode = node.CommonDimension[index]
                this._doCalcYears(subnode, proratayearlist, threshhold, precision)
            }
        }
    }

    updateProrata = () => {

        let budgetBranch = this

        let nodeIndex: any
        let branchuid = budgetBranch.uid

        let branchSettings: BranchSettings = budgetBranch.branchDeclaration
        let viewpointData = budgetBranch.state.viewpointData

        let branchNodes:BudgetNode[] = budgetBranch.nodes

        for (nodeIndex in branchNodes) {

            let budgetNode: BudgetNode = branchNodes[nodeIndex]
            let dataNode = getBudgetNode(viewpointData, budgetNode.dataPath)

            budgetNode.updateDataNode(
                dataNode
            )
            budgetNode.resetCells()

        }

        budgetBranch.setState({
            branchNodes,
        })

    }

    // TODO: generate action to show progress
    public getViewpointData = () => {

        let branchSettings:BranchSettings = this.branchDeclaration

        let { 
            viewpoint: viewpointName, 
            aspect: aspectName, 
            inflationAdjusted,
            version: versionName,
            repository,
        } = branchSettings

        let datasetName = AspectNameToDatasetName[aspectName]

        let _promise = databaseapi.getViewpointData({
            repository,
            viewpointName, 
            versionName,
            datasetName,
            inflationAdjusted
        })

        let promise = new Promise((resolve, error) => {

            _promise.then( (viewpointdata:ViewpointData) => {

                let budgetBranch = this

                this.calculateProRata(viewpointdata).then(
                    () => {

                        budgetBranch.setState({
                            viewpointData:viewpointdata
                        })

                        resolve(true)
                
                    }
                ).catch(reason => {
                    console.error(reason)
                    throw Error(reason)
                })

            }).catch(reason =>{
                console.error(reason)
                error(reason)
            })

        })

        return promise
    }

    // called only by user chart row selection
    // therefore metadata is always component
    createChildNodeDeclaration = ( props: CreateChildNodeProps ) => {

        let budgetBranch = this

        let {
            selectionrow,
            nodeIndex,
            cellIndex,
            priorCellSettings,
            priorNodeSettings,
        } = props

        let { 
            nodes: branchNodes, 
            nodeCallbacks:callbacks, 
            actions, 
            branchDeclaration:branchSettings,
        } = budgetBranch

        let viewpointData = budgetBranch.state.viewpointData

        let budgetNode = branchNodes[nodeIndex]

        // a hack to pass prior settings to child
        if (priorCellSettings) {
            budgetNode.priorCellSettings = priorCellSettings
        }
        let { aspectName, viewpointName } = budgetNode

        let {
            workingStatus,
            onPortalCreation,
        } = callbacks

        // ----------------------------------------------------
        // ----------------[ create child ]--------------------
        // copy path
        let childdatapath = budgetNode.dataPath.slice()

        let treeNodeData = budgetNode.treeNodeData

        if (!treeNodeData.Components) {

            return

        }

        let components = treeNodeData.Components

        let code = null
        if (treeNodeData && treeNodeData.SortedComponents && treeNodeData.SortedComponents[selectionrow]) {
            let componentMetaDataFromSortedList = treeNodeData.SortedComponents[selectionrow]
            code = componentMetaDataFromSortedList.Code
        }
        if (code)

            childdatapath.push(code)

        else {

            return

        }

        let newnode = treeNodeData.Components[code]
        if (!newnode.Components && !newnode.CommonDimension) {
            return
        }
        workingStatus(true)
        let newrange = Object.assign({}, budgetNode.yearsRange
            )
        let newselections
        let newCellIndex = cellIndex
        if (priorNodeSettings) {
            newselections = priorNodeSettings.yearSelections
            newCellIndex = priorNodeSettings.cellIndex
        } else {
            newselections = Object.assign({},budgetNode.yearSelections)
        }

        let newdatanode = getBudgetNode(viewpointData, childdatapath)
        let newnodeconfigparms: BudgetNodeDeclarationParms = {

            viewpointName,
            aspectName,
            dataPath: childdatapath,
            nodeIndex: nodeIndex + 1,
            yearsRange: newrange,
            yearSelections: newselections,
            cellIndex:newCellIndex,

        }

        actions.addNodeDeclaration(newnodeconfigparms)

        setTimeout(() => {

            workingStatus(false)
            onPortalCreation()

        })
    }

}


export default BudgetBranch