// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// explorerbranch.tsx
/*
    TODO: 
    - implement scrolldown to new clone
    - implement inheritance of settings to new clone
    - add input fields to title, explorer header, and branch rightmost box
      to allow textual explanations of pages
    - add control to explorer header to toggle show/hide controls of charts
    - have per unit and performance views
    - include document source version (eg. summary vs fpars)
    - prevent resetting branch when viewpoint selected is same as previous
*/
'use strict'

// -------------------[ libraries ]---------------------
import * as React from 'react'
var { Component } = React

import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Subheader from 'material-ui/Subheader'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List'
import {toastr} from 'react-redux-toastr'


import { fadeIn, fadeOut  } from 'react-animations'
import * as Radium from 'radium'

let { StyleRoot }  = Radium

const animations = {
  fadeIn: {
    animation: 'x .5s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  fadeOut: {
    animation: 'x .5s',
    animationName: Radium.keyframes(fadeOut, 'fadeOut')
  },
}

let jsonpack = require('jsonpack')
let validurl = require('valid-url')
let ReactGA = require('react-ga')

// ------------------------[ modules ]-----------------------------
import { 
    onChartComponentSelection,
} from '../modules/onchartcomponentselection'
import getBudgetNode from '../modules/getbudgetnode'

import {
    PortalConfig,
    BranchSettings,
} from '../modules/interfaces'

import { ExplorerNode } from './explorernode'

import { DatasetConfig, ViewpointData } from '../classes/databaseapi'

import { branchTypes as branchActionTypes } from '../actions'
import BudgetNode, {BudgetNodeDeclarationParms} from '../classes/node.class'
import BudgetCell from '../classes/cell.class'
import BudgetBranch from '../classes/branch.class'

import { MappedBranchActions as ExplorerBranchActions } from '../explorer'

import * as Utilities from '../modules/utilities'

export { ExplorerBranchActions }

// ------------------------[ interfaces ]-----------------------------

interface DeclarationData {
    branchesById: Object,
    generation: number,
    nodesById: Object,
    cellsById: Object,
    lastAction: any,
    lastTargetedAction: any,
    defaults:any,
}

interface SnackbarProps {
    open:boolean,
    message: string,
}

interface ExplorerBranchProps {
    budgetBranch: BudgetBranch,
    globalStateActions: ExplorerBranchActions,
    declarationData: DeclarationData,
    urlparms: {
        branchdata: any,
        settingsdata: any,
    },
    clearUrlParms: Function,
    clearStories: Function,
    setToast: Function,
    handleSearchDialogOpen: Function,
    onCallAnalystNotes: Function,
    onCallViewTaxonomy: Function,
}

interface ExplorerBranchState {
    branchNodes?:BudgetNode[], 
    viewpointData?:ViewpointData,
    snackbar?:SnackbarProps, 
    comparatorselection?: string,
    techDialogOpen?:boolean,
    noticeDialogOpen?:boolean,
    selectionsDialogOpen?:boolean,
    animations: {
        buttons: any,
        controls: any,
    },
}

// ------------------------[ class ]-----------------------------
class ExplorerBranch extends Component<ExplorerBranchProps, ExplorerBranchState> {

    // ---------------------[ initialization ]------------------------

    state = {

        branchNodes:[],
        viewpointData:null,
        snackbar:{open:false,message:'empty'},
        comparatorselection:'Off',
        techDialogOpen:false,
        noticeDialogOpen:false,
        selectionsDialogOpen:false,
        animations: {
            buttons:null,
            controls:null,
        }

    }

    waitafteraction:number = 0

/*    
    getState() and getProps() for budgetBranch object:
    return fresh copy of state object; changes after being set
    used by budgetBranch instance
*/
    getState = () => this.state
    getProps = () => this.props

    private _stateActions: ExplorerBranchActions
    // used by callbacks; set by componentDidMount
    private _nodeDisplayCallbacks: any

    // provide for curried versions
    private addNodeDeclaration = branchUid => settings => 
            this.props.globalStateActions.addNodeDeclaration(branchUid,settings);

    private addNodeDeclarations = branchUid => settingslist => 
            this.props.globalStateActions.addNodeDeclarations(branchUid,settingslist);

    private removeNodeDeclarations = branchUid => nodeItems => 
            this.props.globalStateActions.removeNodeDeclarations(branchUid, nodeItems);

    urlparms:any = null
    urlparmscleared = []

    clearUrlParms = nodeIndex => {
        if (!this.urlparms) {
            console.error('call to remove expired urlparms', nodeIndex)
        }
        this.urlparmscleared.push(nodeIndex)
        if (this.urlparmscleared.length == this.urlparms.settingsdata.length) {
            this.urlparms = null
            this.urlparmscleared = []
        }
        setTimeout(()=>{
            this.onPortalCreation()
        },1000)
    }

    logEvent = (parms) => {
        if (window.location.hostname == 'budgetpedia.ca') {
            ReactGA.event(parms);
        }
    }

    // finish initialization of budgetBranch and branch explorer objects
    componentWillMount() {

        this._initialize()

        let { budgetBranch, declarationData } = this.props

        let branchDeclarationData = declarationData.branchesById[budgetBranch.uid]

        if (branchDeclarationData.story) {
            this.story = branchDeclarationData.story
            this._stateActions.clearBranchStory(budgetBranch.uid)
        }

        budgetBranch.getViewpointData().then(() => {

            // console.log('branch story var',this.story)

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid) // change data generation counter for child compare
            let story
            let explorerbranch = this
            if (this.story) {

                story = explorerbranch.story
                explorerbranch._createStoryNodes(story, explorerbranch.state.viewpointData)

                return // should never fail as it is internal
            } // else

            if (branchDeclarationData.nodeList.length == 0) {

                let { urlparms } = this.props

                if (urlparms) {

                    if (this._createUrlNodes(urlparms)) return
                }

                let budgetNodeParms:BudgetNodeDeclarationParms = budgetBranch.getInitialBranchNodeParms()

                // console.log('budgetNodeParms in branchWillMount',budgetNodeParms)
                this._stateActions.addNodeDeclaration(budgetNodeParms)

            } else {

                setTimeout(()=>{ // attempt to reduce screen flash on return and renewal TODO: verify this!! 

                    this._stateActions.resetLastAction() // trigger update -> render

                })

            }

        }).catch(reason => {

            console.error('error in data fetch, componentWillMount (branch)', reason)

        })
    }

    //----------------------------[ stories ]--------------------------------
    // these are sets of branches; this section is for this branch's story section

    private story:any = null
    private storiescleared = []
    private storysettings = []

    clearStory = nodeIndex => {
        if (!this.story) {
            console.error('call to remove expired story', nodeIndex)
        }
        this.storiescleared.push(nodeIndex)
        if (this.storiescleared.length == this.storysettings.length) {
            this.story = null
            this.storiescleared = []
            setTimeout(()=>{
                this.onPortalCreation()
            },1000)
        }
    }

    private _createStoryNodes = (story,viewpointdata) => {
        let path = this._getStoryPath(story) 
        // console.log('story path',story.code,path)
        this.props.clearStories(BudgetBranch)
        story.path = path
        let settingslist = this._getStorySettingsList(story, viewpointdata)
        this.storysettings = settingslist
        // console.log('settingslist',settingslist)
        let explorerbranch = this
        explorerbranch._stateActions.addNodeDeclarations(settingslist)

    }

    private _getStoryPath = story => {
        let path = []
        let viewpoint = this.state.viewpointData
        // console.log('story viewpoint data',viewpoint)

        if (viewpoint.Components && story.code) {
            this._getPath(path,story.code,viewpoint.Components)
        }

        return path

    }

    private _getStorySettingsList = (story, viewpointdata) => {
        let settingslist = []
        let path = story.path
        let nodeCount = path.length + 1
        for (let n = 0; n < nodeCount; n++) {
            let nodeDefaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.node))
            let nodeSettings = {
                aspectName:story.aspect,
                cellIndex:(n==(nodeCount - 1))? story.tab:0,
                cellList:null,
                dataPath: path.slice(0,n),
                nodeIndex:n,
                viewpointName:story.viewpoint,
                yearSelections: {
                    leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
                yearsRange:{
                    firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
            }
            let settings = Object.assign(nodeDefaultSettings,nodeSettings)
            settingslist.push({
                settings,
            })
        }


        return settingslist

    }

    // -------------------------[ utilities ]----------------------

    private _getPath = (path, targetcode, components) => {
        for (let code in components) {
            if (code == targetcode) {
                let subcomponents = components[code].Components
                if (!subcomponents) {
                    subcomponents = components[code].CommonDimension
                }
                if (subcomponents) {
                    path.push(code)
                }
                return true
            }
            let subcomponents = components[code].Components
            if (subcomponents) {
                path.push(code)
                if (this._getPath(path,targetcode,subcomponents)) {
                    return true
                } else {
                    path.pop()
                }
            }
        }
        return false
    }

    private _createUrlNodes = urlparms => {

        this.urlparms = urlparms
        this.props.clearUrlParms()

        try {

            let path = urlparms.branchdata.pa

            // TODO: validate data path
            let dataNode = getBudgetNode(this.state.viewpointData, path)
            // let dataNode = null

            if (dataNode) {

                let settingslist = this._geturlsettingslist(urlparms)

                this._stateActions.addNodeDeclarations(settingslist)

                return true

            } else {

                this.props.setToast('error','unable to locate data requested by url parameter. Using defaults...')

            }

        } catch (e) {

            console.log('urlparms failure',urlparms)
            this.urlparms = null

        }

        return false

    }

    private _geturlsettingslist = urlparms => {
        let nodesettings = urlparms.settingsdata
        let branch = urlparms.branchdata
        let settingslist = []
        for (let nodeindex in nodesettings) {
            let node = nodesettings[nodeindex]
            let settings = {
                aspectName:branch.as,
                cellIndex:node.ci,
                cellList:null,
                dataPath: branch.pa.slice(0,parseInt(nodeindex)),
                nodeIndex:parseInt(nodeindex),
                viewpointName:branch.vi,
                yearSelections:{
                    leftYear:node.ys.ly,
                    rightYear:node.ys.ry,
                },
                yearsRange:{
                    firstYear:null,
                    lastYear:null,
                },
            }
            settingslist.push({
                settings,
            })
        }

        return settingslist
    } 

    private _initialize = () => {

        let branch = this

        let { budgetBranch, globalStateActions:actions, declarationData } = branch.props

        // create global actions bundle for children
        branch._stateActions = Object.assign({}, actions)
        // replace originals with curried versions
        branch._stateActions.addNodeDeclaration = branch.addNodeDeclaration(budgetBranch.uid)
        branch._stateActions.addNodeDeclarations = branch.addNodeDeclarations(budgetBranch.uid)
        branch._stateActions.removeNodeDeclarations = branch.removeNodeDeclarations(budgetBranch.uid)

        let { onPortalCreation } = branch

        // create display callbacks bundle for children
        branch._nodeDisplayCallbacks = {
            onPortalCreation,
        }

        // complete initialization of budgetBranch class instance
        // assign helpful getters and setters to budgetBranch
        budgetBranch.getProps = branch.getProps
        budgetBranch.getState = branch.getState
        budgetBranch.setState = branch.setState.bind(branch)

        // assign callbacks to budgetBranch
        budgetBranch.actions = branch._stateActions
        budgetBranch.nodeCallbacks = branch._nodeDisplayCallbacks

        branch._previousControlData = declarationData // initialize

    }

    private _getLeafPath = (code, viewpointdata) => {
        // console.log('code, viewpointdata',code, viewpointdata)
        let path = []
        let selections = []
        // let code = parms.code
        let result = this._searchComponents(code, path, selections, viewpointdata.Components, viewpointdata.SortedComponents)
        if (!result) {
            path = []
            // toastr.warning(parms.aspect + ' chart not available for that selection (' + parms.name + ')')
        }
        let isLeaf = !path.pop()
        if (isLeaf) {
            path.pop()
            selections.pop()
        }

        this.pathSelections = selections
        // console.log('leafpath, selections',path,selections)
        return path
    }

    pathSelections: any

    // ---------------------------[ lifecycle events ]--------------------------

    // remove obsolete node objects
    componentWillReceiveProps(nextProps) {

        let { nodesById } = nextProps.declarationData
        let branchNodes = this.props.budgetBranch.nodes // copy
        let newBranchNodes = branchNodes.filter((node) => {
            return !!nodesById[node.uid]
        })
        if (newBranchNodes.length != branchNodes.length) { // some nodes were deleted

            this.setState({

                branchNodes:newBranchNodes,

            })

        }
    }

    private lastactiongeneration:number = 0

    shouldComponentUpdate(nextProps: ExplorerBranchProps, nextState) {

        let show = false // debug

        // Exception: allow snackbar open through in any case
        if (nextState.snackbar.open != this.state.snackbar.open) {
            if (show) console.log('should update branch return true for snackbar')
            return true
        }

        let branchComponent = this

        return Utilities.filterActionsForUpdate(nextProps, branchComponent, show)

    }

    componentDidUpdate() {

        // refresh branchnodes
        let { budgetBranch, declarationData } = this.props
        let branchDeclarations = declarationData.branchesById[budgetBranch.uid]
        let { nodeList } = branchDeclarations
        let { nodesById } = this.props.declarationData
        let branchNodes = this.props.budgetBranch.nodes // copy

        // harmonize is here for first setup; called from will mount for re-creation
        if (!this.harmonizeNodesToState(branchNodes, nodeList, nodesById, budgetBranch)) {

            this._respondToGlobalStateChange()

        }

        // console.log('nodes', branchNodes)

    }

/*
    harmonization means creating local nodes to match global declarations
    acts as a sentinel; if count goes below zero, means that some 
    harmonization operation has failed, which is a system error
*/
    harmonizecount: any = null
    // harmonize branch nodes; add pending node objects, and process state changes
    harmonizeNodesToState = (branchNodes, nodeList, nodesById, budgetBranch) => {

        if (this.harmonizecount === null) { // initialize harmonization count

            this.harmonizecount = (nodeList.length - branchNodes.length)

        }

        // let harmonizecount = (nodeList.length - branchNodes.length)
        // first task is to harmonize declarationData nodeList list with local branchNode list
        // this condition will keep adding nodes on each render cycle triggered by 
        // addBranchNode, until all nodes are drawn
        if (this.harmonizecount > 0) {
            // places sentinal in place in case addNode below fails
            //   generating an infinite loop
            this.harmonizecount--

            let nodeIndex = branchNodes.length
            let budgetNodeId = nodeList[nodeIndex]
            // console.log('arguments for addNode',nodeIndex,nodeList,budgetNodeId,nodesById,this.harmonizecount)
            // TODO: investigate doing addNodes instead, and adding them to the nodes state in one operation
            budgetBranch.addNode( // sets state to trigger a render, and re-visitation of this code
                budgetNodeId,
                nodeIndex,
                nodesById[budgetNodeId] // declarations
            )
            return true
        } else { // otherwise see if there are other cascading actions that have to be taken
            this.harmonizecount = null // reset
            return false
        }

    }

    // _previousControlData is not in a closure to allow for initializing in componentDidMount
    private _previousControlData: any

    // state change machine
    // TODO return value is ignored
    private _respondToGlobalStateChange = () => {

        let { budgetBranch } = this.props
        let previousControlData = this._previousControlData
        let currentControlData = this.props.declarationData
        let { lastTargetedAction } = currentControlData
        let lastAction = lastTargetedAction[budgetBranch.uid] || {}
        let returnvalue = true

        if (!branchActionTypes[lastAction.type]) {

            return false

        }

        // the generation counter could be the same if render is being triggered
        // solely by a local state change, which we want to ignore here
        if (previousControlData && (currentControlData.generation == previousControlData.generation)) {

            return false

        }

        switch (lastAction.type) {
            case branchActionTypes.CHANGE_VIEWPOINT: {

                this._processChangeViewpointSelection(budgetBranch)
                break

            }
            case branchActionTypes.UPDATE_BRANCH: {

                this._processUpdateBranchStateChange(budgetBranch)
                break

            }
            case branchActionTypes.CHANGE_VERSION: {

                this._processChangeVersionSelection(budgetBranch)
                break

            }
            case branchActionTypes.CHANGE_ASPECT: {

                this._processChangeAspectSelection(budgetBranch)
                break

            }
            case branchActionTypes.TOGGLE_INFLATION_ADJUSTED: {

                this._processToggleInflationAdjustedSelection(budgetBranch)
                break

            }
            case branchActionTypes.UPDATE_PRORATA: {
                this._processUpdateProrataSelection(budgetBranch)
                break
            }
            case branchActionTypes.HARMONIZE_CELLS: {
                budgetBranch.harmonizeCells()
                break
            }
            default:
                returnvalue = false
        }

        this._previousControlData = currentControlData

        return returnvalue

    }

    private _processChangeViewpointSelection = (budgetBranch:BudgetBranch) => {

        budgetBranch.getViewpointData().then(()=>{

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid)
            let budgetNodeParms:BudgetNodeDeclarationParms = budgetBranch.getInitialBranchNodeParms()
            this._stateActions.addNodeDeclaration(budgetNodeParms)

        }).catch(reason => {

            console.error('error in data fetch, changeviewpoint', reason)

        })
    }

    private _processUpdateBranchStateChange = (budgetBranch:BudgetBranch) => {

        budgetBranch.getViewpointData().then(()=>{

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid)

            let settingslist = this._getFinderNodeSettingsList()
            this._stateActions.addNodeDeclarations(settingslist)

            let explorerbranch = this

            setTimeout(()=>{
                explorerbranch._updateCellChartSelections()
            })
            setTimeout(()=>{

                explorerbranch.onPortalCreation()
                
            },1000)

        }).catch(reason => {

            console.error('error in data fetch, update branch', reason)

        })
    }

    private _updateCellChartSelections = () => {

        let nodes = this.state.branchNodes
        let selections = this.pathSelections
        for (let index in selections) {
            let node = nodes[index]
            let cell = node.cells[0]
            let selection = selections[index]
            this._stateActions.updateCellChartSelection(node.uid)(cell.uid,selection)
            cell.chartSelection = selection
            cell.refreshSelection()
        }
    }

    // --------------------------[ finder (search) ]-----------------------------

    private _getFinderNodeSettingsList = () => {
        let viewpointdata = this.state.viewpointData
        let parms = this.finderParms
        let dictionary = this.findParmsToStateDictionary
        let settingslist = []
        // let defaults = this.props.declarationData.defaults.node
        // console.log('viewpointdata',viewpointdata)
        // if this is a common dimension request, return first portal only
        if (parms.source == 'detailedbudgets' && 
            (['expense','revenue','permanence'].indexOf(parms.level) > -1)) {
            // console.log('found common dimension')
            let settings = {
                aspectName:dictionary.aspect[parms.aspect],
                cellIndex:1,
                cellList:null,
                dataPath: [],
                nodeIndex:0,
                viewpointName:dictionary.viewpoint[parms.viewpoint],
                yearSelections: {
                    leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
                yearsRange:{
                    firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
            }
            settingslist.push({
                settings,
            })
            toastr.info('Find ' + dictionary.level[parms.level].toUpperCase() + ' tabs at any program drilldown level')

        } else {

            let leafpath = this._getLeafPath(parms.code, viewpointdata)

            let settings = {
                aspectName:dictionary.aspect[parms.aspect],
                cellIndex:0,
                cellList:null,
                dataPath: [],
                nodeIndex:0,
                viewpointName:dictionary.viewpoint[parms.viewpoint],
                yearSelections: {
                    leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
                yearsRange:{
                    firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
            }

            settingslist.push({
                settings,
            })

            for (let nodeindex in leafpath) {

                let settings = {
                    aspectName:dictionary.aspect[parms.aspect],
                    cellIndex:0,
                    cellList:null,
                    dataPath: leafpath.slice(0,parseInt(nodeindex) + 1),
                    nodeIndex:parseInt(nodeindex) + 1,
                    viewpointName:dictionary.viewpoint[parms.viewpoint],
                    yearSelections: {
                        leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                        rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                    yearsRange:{
                        firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                        lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                }
                settingslist.push({
                    settings,
                })
            }

        }
        // console.log('viewpointdata and parms in get node settings list',viewpointdata, parms, settingslist)
        return settingslist
    }

    private _searchComponents = (code, path, selections, components, sortedcomponents) => {
        for (let component_name in components) {
            path.push(component_name)
            if (component_name == code) { // leaf
                let depth = path.length
                let selection
                for (let index = 0; index < sortedcomponents.length; index++ ) {
                    if (sortedcomponents[index].Code == component_name) {
                        selection = index
                        break
                    }
                }
                selections[depth-1] = selection
                let node = components[component_name]
                if (node.Components || node.CommonDimension) {
                    path.push(true)
                } else {
                    path.push(false)
                }
                return true
            } else {
                let subcomponents = components[component_name].Components
                let depth = path.length
                if (subcomponents) {
                    let sortedsubcomponents = components[component_name].SortedComponents
                    if (this._searchComponents(code, path, selections, subcomponents, sortedsubcomponents)) {
                        // console.log('returning from depth',depth,code,component_name,components,sortedcomponents)
                        let selection
                        for (let index = 0; index < sortedcomponents.length; index++ ) {
                            if (sortedcomponents[index].Code == component_name) {
                                selection = index
                                break
                            }
                        }
                        selections[depth-1] = selection
                        // TODO add selection
                        return true
                    }
                }
            }
            path.pop()
        }
        return false
    }

    // ---------------------------[ user requested state changes ]------------------

    private _processChangeVersionSelection = (budgetBranch:BudgetBranch) => {

        // console.log('previousVersionPath',this.previousVersionPath)

        budgetBranch.getViewpointData().then(()=>{

            let path = this.previousVersionPath

            if (path.length) {
                let code = path.pop()
                path = this._getLeafPath(code,this.state.viewpointData)
            }

            let settingslist = this._getTreeSelectionNodeSettingsList(path)
            this._stateActions.addNodeDeclarations(settingslist)

            let explorerbranch = this

            setTimeout(()=>{
                explorerbranch._updateCellChartSelections()
            },500)
            setTimeout(()=>{

                explorerbranch.onPortalCreation()
                
            },1000)
            // this._stateActions.incrementBranchDataVersion(budgetBranch.uid)
            // let budgetNodeParms:BudgetNodeDeclarationParms = budgetBranch.getInitialBranchNodeParms()
            // this._stateActions.addNodeDeclaration(budgetNodeParms)

        }).catch(reason => {

            console.error('error in data fetch, changeversion', reason)

        })

    }

    private _processToggleInflationAdjustedSelection = (budgetBranch:BudgetBranch) => {
        budgetBranch.getViewpointData().then(() => {

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid)
            budgetBranch.toggleInflationAdjusted()

        }).catch(reason => {

            console.error('error in data fetch, toggle inflation adjustment',reason)

        })
    }

    private _processUpdateProrataSelection = (budgetBranch:BudgetBranch) => {
        budgetBranch.calculateProRata(this.state.viewpointData).then(() => {

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid)
            budgetBranch.updateProrata()

        }).catch(reason => {

            console.error('error in data fetch, updata prorata',reason)

        })
    }

    private _processChangeAspectSelection = (budgetBranch:BudgetBranch) => {

        budgetBranch.getViewpointData().then(() => {

            this._stateActions.incrementBranchDataVersion(budgetBranch.uid)
            let switchResults = budgetBranch.switchAspect()

            let { deeperdata, shallowerdata, mismatch } = switchResults

            if (mismatch) {

                let message = switchResults.message
                let { snackbar } = this.state
                snackbar = Object.assign ({},snackbar)
                snackbar.message = message
                snackbar.open = true
                this.setState({
                    snackbar,
                })

            }

            if (deeperdata || shallowerdata) {

                let message = null
                if (deeperdata) {
                    message = "More drilldown is available for current selection"
                } else {
                    message = "Less drilldown is available for current selection"
                }
                let { snackbar } = this.state
                snackbar = Object.assign ( {},snackbar )
                snackbar.message = message
                snackbar.open = true
                this.setState({
                    snackbar,
                })

            }

        }).catch(reason => {

            console.error('error in data fetch, changeaspect',reason)

        })
    }

    handleSnackbarRequestClose = () => {
        // this.props.globalStateActions.resetLastAction()
        this.setState({

            snackbar: {
                open: false,
                message: 'empty',
            }

        })

    }

    // ============================================================
    // ---------------------[ *** BRANCH *** CONTROL RESPONSES ]------------------

    // onPortalCreation animates scroll-in of new portal

    private branchScrollBlock = null

    onPortalCreation = () => {

        let element: Element = this.branchScrollBlock
        if (!element) {
            console.error('System Error: expected branch element not found in onPortalCreation')
            return
        }

        setTimeout(() => {

            let scrollwidth = element.scrollWidth
            let scrollleft = element.scrollLeft
            let clientwidth = element.clientWidth
            let scrollright = scrollleft + clientwidth
            let targetright = scrollwidth - 500
            let adjustment = scrollright - targetright
            // console.log('scrollwidth,scrollleft,clientwidth,scrollright,targetright,adjustment',scrollwidth,scrollleft,clientwidth,scrollright,targetright,adjustment)
            if (adjustment > 0) {
                adjustment = Math.min(adjustment,scrollleft)
            }
            // console.log('final adjustment',adjustment)
            let frames = 60
            let t = 1 / frames
            let counter = 0
            let tick = () => {
                counter++
                let factor = this.easeOutCubic(counter * t)
                let scrollinterval = adjustment * factor
                element.scrollLeft = scrollleft - scrollinterval
                if (counter < frames) {
                    requestAnimationFrame(tick)
                }
            }

            requestAnimationFrame(tick)

        },10)
    }

    // from https://github.com/DelvarWorld/easing-utils/blob/master/src/easing.js
    private easeOutCubic = t => {
        const t1 = t - 1;
        return t1 * t1 * t1 + 1;
    }

    // ---------------------[ user interactions ]---------------------------

    selectViewpoint = (viewpointname:string) => {

        let { budgetBranch } = this.props
        let { nodes:branchNodes } = budgetBranch

        // branchNodes is just a copy of the component state's BranchNodes
        let removed = branchNodes.splice(0) // identify nodes to remove
        let removeditems = removed.map((item:BudgetNode) => {
            return {nodeuid:item.uid, cellList:item.cellDeclarationList}
        })
        // this will trigger render cycle that will delete the component state's stored nodes
        let globalStateActions = this._stateActions
        globalStateActions.removeNodeDeclarations(removeditems)

        globalStateActions.changeViewpoint(budgetBranch.uid, viewpointname)

    }

    previousVersionPath = null

    selectVersion = (versionName: string) => {

        let { budgetBranch } = this.props
        let { nodes:branchNodes } = budgetBranch

        let path = null
        for (let n = branchNodes.length - 1; n >= 0; n--) {
            let node = branchNodes[n]
            if (node.treeNodeData.Baseline) {
                path = node.dataPath
            }
            if (!path) path = node.dataPath
        }

        this.previousVersionPath = path

        // branchNodes is just a copy of the component state's BranchNodes
        let removed = branchNodes.splice(0) // identify nodes to remove
        let removeditems = removed.map((item:BudgetNode) => {
            return {nodeuid:item.uid, cellList:item.cellDeclarationList}
        })
        // this will trigger render cycle that will delete the component state's stored nodes
        let globalStateActions = this._stateActions

        globalStateActions.removeNodeDeclarations(removeditems)
        // now the viewpoint can be changed, triggering a change in viewpoint data

        globalStateActions.changeVersion(budgetBranch.uid, versionName)

    }

    selectAspect = (aspect:string) => {

        switch (aspect) {
            case "Expenses":
            case "Revenues":
            case "Staffing":
                break

            default:
                return
        }

        let { budgetBranch }:{budgetBranch:BudgetBranch} = this.props

        budgetBranch.saveNodeStates()

        this.props.globalStateActions.changeAspect(budgetBranch.uid, aspect)

    }

    switchComparator = comparatorindex => {

        let { budgetBranch } = this.props
        this.props.globalStateActions.updateProrata(budgetBranch.uid, comparatorindex)

    }

    toggleInflationAdjustment = value => {

        let { budgetBranch }:{budgetBranch:BudgetBranch} = this.props

        this.props.globalStateActions.toggleInflationAdjusted(budgetBranch.uid, value)

    }

    toggleShowOptions = value => {

        let anims = {
            buttons:null,
            controls:null,
        }

        this.setState({
            animations:anims,
        }
        ,() => {
            let a = (value)?animations.fadeIn:animations.fadeOut
            let anims = {
                buttons:a,
                controls:a,
            }
            this.setState({
                animations:anims,
            },() => {
                let { budgetBranch }:{budgetBranch:BudgetBranch} = this.props
                this.props.globalStateActions.toggleShowOptions( budgetBranch.uid, value )
            })
        })

    }

    // ---------------------------[ search dialog response ]-------------------------

    handleSearch = (e) => {
        this.props.handleSearchDialogOpen(e,this.applySearchBranchSettings)
    }

    finderParms:any = null

    findParmsToStateDictionary = {
        viewpoint:{
            functionalbudget:'FUNCTIONAL',
            structuralbudget:'STRUCTURAL',
            actualexpenses:'ACTUALEXPENSES',
            actualrevenues:'ACTUALREVENUES',
            expenditures:'EXPENDITURES',
        },
        source: {
            summarybudgets:'SUMMARY',
            detailedbudgets:'PBFT',
            auditedexpenses:'ACTUALEXPENSES',
            auditedrevenues:'ACTUALREVENUES',
            auditedexpenditures:'EXPENDITURES',
        },
        aspect: {
            expenses:'Expenses',
            revenues:'Revenues',
            staffing:'Staffing',
            expenditures:'Expenditure',
        },
        level: {
            expense:'Expenditures',
            revenue:'Receipts',
            permanence:'Permanence',
        }
    }

    applySearchBranchSettings = parms => {
        let explorerbranch = this
        if (parms.viewpoint == 'expenditures') {
            parms.aspect = 'expenditures'
        }
        explorerbranch.finderParms = parms
        let { budgetBranch } = explorerbranch.props
        let { nodes:branchNodes } = budgetBranch

        // branchNodes is just a copy of the component state's BranchNodes
        let removed = branchNodes.splice(0) // identify nodes to remove
        let removeditems = removed.map((item:BudgetNode) => {
            return {nodeuid:item.uid, cellList:item.cellDeclarationList}
        })
        // this will trigger render cycle that will delete the component state's stored nodes
        let globalStateActions = explorerbranch._stateActions
        globalStateActions.removeNodeDeclarations(removeditems)


        let settings = explorerbranch._getNewBranchSettings(parms)

        globalStateActions.updateBranch(budgetBranch.uid, settings)

    }

    private _getNewBranchSettings = parms => {
        let dictionary = this.findParmsToStateDictionary
        let settings = {
            viewpoint:dictionary.viewpoint[parms.viewpoint],
            aspect:dictionary.aspect[parms.aspect],
            version:dictionary.source[parms.source],
        }
        return settings
    }

    // ------------------------------[ workspace tree selection response ]------------------------

    applytaxonomyselection = (parms) => {
        let targetcode = parms.selectedleafnode? parms.selectedleafnode:parms.selectedtreenode
        // console.log('applytaxonomyselection parms',parms,targetcode)
        let branchDeclaration:BranchSettings = this.props.declarationData.branchesById[this.props.budgetBranch.uid]

        let pathParms = {
            code:targetcode,
            aspect:branchDeclaration.aspect,
            name:targetcode
        }

        let path = this._getLeafPath(pathParms.code,this.state.viewpointData)

        // console.log('path',path)
        // remove previous branches
        let { budgetBranch } = this.props
        let { nodes:branchNodes } = budgetBranch

        // branchNodes is just a copy of the component state's BranchNodes
        let removed = branchNodes.splice(0) // identify nodes to remove
        let removeditems = removed.map((item:BudgetNode) => {
            return {nodeuid:item.uid, cellList:item.cellDeclarationList}
        })
        // this will trigger render cycle that will delete the component state's stored nodes
        let globalStateActions = this._stateActions
        globalStateActions.removeNodeDeclarations(removeditems)

        // add new branches
        let settingslist = this._getTreeSelectionNodeSettingsList(path)
        this._stateActions.addNodeDeclarations(settingslist)

        let explorerbranch = this

        setTimeout(()=>{
            explorerbranch._updateCellChartSelections()
        },500)
        setTimeout(()=>{

            explorerbranch.onPortalCreation()
            
        },1000)

    }

    _getTreeSelectionNodeSettingsList = (path) => {
        let settingslist = []
        let viewpointdata = this.state.viewpointData

        let branchDeclaration:BranchSettings = this.props.declarationData.branchesById[this.props.budgetBranch.uid]


        let settings = {
            aspectName:branchDeclaration.aspect,
            cellIndex:0,
            cellList:null,
            dataPath: [],
            nodeIndex:0,
            viewpointName:branchDeclaration.viewpoint,
            yearSelections: {
                leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
            },
            yearsRange:{
                firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
            },
        }

        settingslist.push({
            settings,
        })

        for (let nodeindex in path) {

            let settings = {
                aspectName:branchDeclaration.aspect,
                cellIndex:0,
                cellList:null,
                dataPath: path.slice(0,parseInt(nodeindex) + 1),
                nodeIndex:parseInt(nodeindex) + 1,
                viewpointName:branchDeclaration.viewpoint,
                yearSelections: {
                    leftYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    rightYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
                yearsRange:{
                    firstYear:viewpointdata.Meta.datasetConfig.YearsRange.start,
                    lastYear:viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
            }
            settingslist.push({
                settings,
            })
        }

        return settingslist
    }


    // ---------------------------[ callbacks ]------------------------------

    /*
        harmonize:
        node:
        - tab selection cellIndex
        - yearSelections selection yearSelections
        cell:
        - yearScope selection "OneYear" etc.
        - chart selection [YearScope].ExplorerChartCode

        TODO: if the reference chart is an expenditure chart
            then all other nodes should also show expenditure chart
            -- so if the reference chart is in the leaf node
    */
    harmonizeCells = (nodeUid, cellUid) => {

        let { budgetBranch } = this.props
        let nodeList = []
        let cellList = []
        let nodeProperties = { cellIndex:null, yearSelections:null }
        let cellProperties = { yearScope:null, chartCode:null, nodeDataseriesName:null }
        let declarationData = this.props.declarationData
        let refnode = declarationData.nodesById[nodeUid]
        let refcell = declarationData.cellsById[cellUid]

        // get defaults to apply
        nodeProperties.cellIndex = refnode.cellIndex
        nodeProperties.yearSelections = Object.assign({},refnode.yearSelections)

        cellProperties.yearScope = refcell.yearScope
        cellProperties.chartCode = refcell.chartConfigs[refcell.yearScope].explorerChartCode
        cellProperties.nodeDataseriesName = refcell.nodeDataseriesName

        // collect node and cell lists
        let nodeidlist = declarationData.branchesById[budgetBranch.uid].nodeList
        for (let nodeid of nodeidlist) {
            // if (nodeid == nodeUid) continue
            nodeList.push(nodeid)
            let tempnode = declarationData.nodesById[nodeid]
            let cellidlist = tempnode.cellList
            for (let cellid of cellidlist) {
                if (cellid == cellUid) continue
                cellList.push(cellid)
            }
        }

        if (nodeList.length > 0) {

            this._stateActions.harmonizeCells(
                budgetBranch.uid,
                nodeProperties,
                cellProperties,
                nodeList,
                cellList
            )

        }

    }

    // -----------------------------[ prepare for render ]---------------------------------

    // get React components to render
    getPortals = (budgetNodes:BudgetNode[]) => {

        let branch = this

        let { viewpointData } = branch.state

        if (!viewpointData) return []
        let datasetConfig: DatasetConfig = viewpointData.Meta.datasetConfig

        let portalSeriesName = datasetConfig.DatasetName
        if (datasetConfig.Units == 'DOLLAR') {
            portalSeriesName += ' (' + datasetConfig.UnitsAlias + ')'
        }

        let portals = budgetNodes.map((budgetNode: BudgetNode, nodeindex) => {

            let branchDeclaration:BranchSettings = branch.props.declarationData.branchesById[branch.props.budgetBranch.uid]

            let portalName = null
            let treeNodeData = budgetNode.treeNodeData
            if (treeNodeData.Name) { // .Name) // MetaDataFromParentSortedList) {
                portalName = budgetNode.treeNodeData.Name
                portalName += ' ' + portalSeriesName
            } else {
                portalName = datasetConfig.DatasetTitle //'City Budget'
            }

            let portalConfig: PortalConfig = {
                portalName,
            }

            budgetNode.portalConfig = portalConfig

            let viewpointdata:ViewpointData = branch.state.viewpointData
            let {
                NamingConfigurations: viewpointNamingConfigs,
                // datasetConfig, declared previously
                isInflationAdjusted,
            } = viewpointdata.Meta

            let viewpointConfigPack = {
                viewpointNamingConfigs,
                datasetConfig,
                isInflationAdjusted,
                prorata:branchDeclaration.prorata,
            }
            budgetNode.viewpointConfigPack = viewpointConfigPack
            budgetNode.branchSettings = branch.props.budgetBranch.branchDeclaration
            budgetNode.onChartComponentSelection = onChartComponentSelection(branch.props.budgetBranch)
            let actions = Object.assign({}, branch._stateActions)
            actions.updateCellTimeScope = branch._stateActions.updateCellTimeScope(budgetNode.uid)
            actions.updateCellChartSelection = branch._stateActions.updateCellChartSelection(budgetNode.uid)
            actions.updateCellChartCode = branch._stateActions.updateCellChartCode(budgetNode.uid)
            actions.updateCellYearSelections = branch._stateActions.updateCellYearSelections(budgetNode.uid)

            return <ExplorerNode
                key = {budgetNode.uid}
                callbackid = { nodeindex }
                budgetNode = { budgetNode }
                declarationData = {branch.props.declarationData}
                globalStateActions = { actions }
                showControls = {branchDeclaration.showOptions}
                dataGenerationCounter = { branchDeclaration.branchDataGeneration }
                callbacks = { {harmonizeCells:branch.harmonizeCells} }
                urlparms = {this.urlparms}
                story = {this.story}
                clearUrlParms = {this.clearUrlParms}
                clearStory = {this.clearStory}
                onCallAnalystNotes = {this.props.onCallAnalystNotes}
            />
        })

        return portals

    }

    private _inputfieldref

    private _inputonfocus = () => {
        this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length)
    }

    // ----------------------------[ response to share request ]--------------------------

    shareBranch = () => {
        this.logEvent({
            category:'ExplorerBranch',
            action:'Share branch',
        })
        let longurl = this._getShareUrl()
        // console.log('long url',longurl)
        this._getBitlyUrl(longurl).then((json:any)=>{
            // console.log('result',json)
            if (json.status_code != 200) {
                let errmessage = json.status_txt + '(' + json.status_code + ')'
                console.log('error message',errmessage)
                throw new Error(errmessage)
            }
            let url = json.data.url

            let toastrComponent = () =>  ( <div style={{width:"300px"}}>
                    <p style={{width:"290px"}}>To share the selected row of charts, copy the url below, and send it to a friend.</p>
                    <input 
                        ref = {node => {
                            this._inputfieldref = node
                        }}
                        onFocus= {this._inputonfocus}
                        style={{width:"290px"}} value = {url} readOnly />
            </div> )

            let toastrOptions = {
                icon: (<FontIcon
                    className="material-icons"
                    >

                    share

                </FontIcon>),

                component: toastrComponent
            }
            toastr.message('Share charts',toastrOptions)
        }).catch(error => {
            console.log('error getting bitly',error)
            toastr.error('Bitly error',error.message)
        })
    }

    // bitly token: bdf92b4b130fbc1d19871694f8fe957ccb775e12
    private _getBitlyUrl = (longurl) => {
        let token = 'bdf92b4b130fbc1d19871694f8fe957ccb775e12'
        return fetch('https://api-ssl.bitly.com/v3/shorten?access_token=' + token + '&longUrl=' + encodeURIComponent('http://'+longurl)).then(
            (response) => {
                // let reply = response.
                let json = response.json()
                return json

            }).catch(error => {
                console.error('error getting bitly url',error)
            })
    }

    private _getShareUrl = () => {
        let branch = this
        let branchDeclaration:BranchSettings = branch.props.declarationData.branchesById[branch.props.budgetBranch.uid]
        let government = branchDeclaration.repository
        let viewpoint = branchDeclaration.viewpoint
        let version = branchDeclaration.version
        let aspect = branchDeclaration.aspect
        let prorata = branchDeclaration.prorata
        let adjusted = branchDeclaration.inflationAdjusted
        let path = this.state.branchNodes[this.state.branchNodes.length - 1].dataPath
        let query = {
            g:government,
            vi:viewpoint,
            ve:version,
            as:aspect,
            pr:prorata,
            ad:adjusted,
            pa:path,
        }
        let nodeDeclarations = []
        let node:BudgetNode
        for (node of this.state.branchNodes) {
            nodeDeclarations.push(node.nodeDeclaration)
        }
        let settings = []
        for (let nodeDeclaration of nodeDeclarations) {
            let cellDeclarations = []
            for (let celluid of nodeDeclaration.cellList) {
                cellDeclarations.push(branch.props.declarationData.cellsById[celluid])
            }
            let cellSettingsList=[]
            // TODO: only process the cellDeclaration for current cellIndex
            for (let cellDeclaration of cellDeclarations) {
                let cellSettings = {
                    ys:cellDeclaration.yearScope,
                    // cs:cellDeclaration.chartSelection,
                    ct:cellDeclaration.chartConfigs[cellDeclaration.yearScope].explorerChartCode
                }
                cellSettingsList.push(cellSettings)
            }
            let nodesettings = {
                ci:nodeDeclaration.cellIndex,
                ys:{
                    ly:nodeDeclaration.yearSelections.leftYear,
                    ry:nodeDeclaration.yearSelections.rightYear,
                },
                c:cellSettingsList[nodeDeclaration.cellIndex],
            }
            settings.push(nodesettings)
        }
        let branchstring = jsonpack.pack(query)
        let bsencoded = encodeURIComponent(branchstring)
        let settingsstring = jsonpack.pack(settings)
        let ssencoded = encodeURIComponent(settingsstring)
        let hashcode = Utilities.hashCode(branchstring + settingsstring)
        // console.log('query',query, branchstring,branchstring.length,bsencoded,bsencoded.length)
        // console.log('settings',settings,settingsstring, settingsstring.length,ssencoded,ssencoded.length)
        let url = location.hostname + '/explorer?branch=' + bsencoded + '&settings=' + ssencoded + '&hash=' + hashcode
        // console.log('url',url,url.length)
        return url
    }

    // -------------------------------------[ handle dialog requests ]-----------------------

    handleSelectionsDialogOpen = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.logEvent({
            category:'ExplorerBranch',
            action:'Selections Dialog',
        })
        this.setState({
            selectionsDialogOpen: true
        })
    }

    handleTechDialogOpen = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.logEvent({
            category:'ExplorerBranch',
            action:'Show sources',
        })
        this.setState({
            techDialogOpen: true
        })
    }

    handleNoticeDialogOpen = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.logEvent({
            category:'ExplorerBranch',
            action:'Show notices',
        })
        this.setState({
            noticeDialogOpen: true
        })
    }

    handleSelectionsDialogClose = () => {
        this.setState({
            selectionsDialogOpen: false
        })
    }

    handleTechDialogClose = () => {
        this.setState({
            techDialogOpen: false
        })
    }

    handleNoticeDialogClose = () => {
        this.setState({
            noticeDialogOpen: false
        })
    }

    openwindow = (url) => {
        open(url,'_blank')
    }

    getBranchDataMessages = () => {
        if (!this.state.viewpointData) return null

        let {datasetConfig} = this.state.viewpointData.Meta

        let {  DatasetTitle, Sources } = datasetConfig

        let { Messages } = Sources

        let messages = []

        for (let index in Messages) {
            messages.push(
                <div key={index}>{Messages[index]}</div>
            )
        }

        // console.log('messages',messages, Messages)

        return ((messages.length > 0)?<div 
            style={{padding:"3px",margin:"3px",backgroundColor:"LemonChiffon"}}
        >
            {messages}
        </div>:null)

    }

    getTechNotesDisplay = () => {

        if (!this.state.viewpointData) return null

        let {datasetConfig} = this.state.viewpointData.Meta

        let {  DatasetTitle, Sources } = datasetConfig

        let { Headers } = Sources

        // console.log('headers',Headers)

        let headerkeys = Object.keys(Headers)

        let itemlist = headerkeys.map(headerkey => {
            let item = Headers[headerkey]
            let notes = item.NOTES_CONTENT
            let link = item.SOURCE_DOCUMENT_LINK_COPY
            let isvalidurl = validurl.isUri(link)
            let doctitle = item.SOURCE_DOCUMENT_TITLE
            let tablelocation = item.SOURCE_DOCUMENT_TABLE_LOCATION
            let tabletitle = item.SOURCE_DOCUMENT_TABLE_TITLE
            // console.log('ListItem values',notes, link, isvalidurl, doctitle, tablelocation,tabletitle)
            return <div
                key={headerkey}
                style={
                    {
                        marginBottom:"8px",
                        border:"1px solid silver",
                        borderRadius:"8px",
                        padding:"3px",
                    }
                }
                ><RaisedButton
                    style={{marginLeft:"3px",float:"right"}}
                    disabled = {!isvalidurl}
                    type="button"
                    label="Source"
                    onTouchTap={
                        () => {
                            isvalidurl?this.openwindow(link):void(0)
                        }
                    } 
                />
                <div style={{fontWeight:"bold"}}>{headerkey}</div>
                <div style={{whiteSpace:"normal"}}>
                    <div>Document title: {doctitle}</div>
                    {(!isvalidurl)?<div>Invalid link! no source available</div>:null}
                    {tabletitle?<div>Table title: {tabletitle}</div>:null}
                    {tablelocation?<div>Table location: {tablelocation}</div>:null}
                    {notes?<div>Note: {notes}</div>:null}
                </div>
            </div>
        })

        return <div>
                <Subheader>{DatasetTitle}</Subheader>
                { itemlist }
        </div>

    }

    // handleSearchDialogOpen = (e) => {
    //     this.props.handleSearchDialogOpen(e)
    // }

    taxonomychoices = {
        FUNCTIONAL:"Programs by function",
        STRUCTURAL:"Programs by org type",
        ACTUALEXPENSES:"Expenses by function",
        ACTUALREVENUES:"Revenues by type",
        EXPENDITURES:"Expenses by type",
        FINANCIALASSETS:"Financial assets",
        TANGIBLEASSETS:"Tangible assets",
        LIABILITIES:"Liabilities",
    }


    // -------------------------------------[ render! ]---------------------------------

    render() {

    // ---------------------------------[ interactive controls ]--------------------------

    let branch = this
    let drilldownrow = branch.props.budgetBranch.nodes

    // console.log('drilldownrow',drilldownrow)

    let drilldownportals = branch.getPortals(drilldownrow)

    let branchDeclaration:BranchSettings = this.props.declarationData.branchesById[this.props.budgetBranch.uid]

    let viewpointselection = 
    <div style={{display:'inline-block'}}>
        <div style = {{display:'inline-block'}}>
        <div style={{ fontStyle: "italic",display:'inline-block',height:'48px',verticalAlign:'23px' }}>
            <span style={{lineHeight:'44px'}} >Select workspace:</span>
        </div>
        <DropDownMenu
            value={branchDeclaration.viewpoint}
            onChange={
                (e, index, value) => {
                    branch.selectViewpoint(value)
                }
            }
            >

            <div style={{padding:"3px",fontStyle:'italic'}} >Internal Budget</div>
            <MenuItem value={'FUNCTIONAL'} primaryText={this.taxonomychoices.FUNCTIONAL}/>
            <MenuItem value={'STRUCTURAL'} primaryText={this.taxonomychoices.STRUCTURAL}/>
            <div style={{padding:"3px",fontStyle:'italic'}}>Audited Actual</div>
            <MenuItem value={'ACTUALEXPENSES'} primaryText={this.taxonomychoices.ACTUALEXPENSES}/>
            <MenuItem value={'ACTUALREVENUES'} primaryText={this.taxonomychoices.ACTUALREVENUES}/>
            <MenuItem value={'EXPENDITURES'} primaryText={this.taxonomychoices.EXPENDITURES}/>
            <MenuItem value={'FINANCIALASSETS'} primaryText={this.taxonomychoices.FINANCIALASSETS}/>
            <MenuItem value={'NONFINANCIALASSETS'} primaryText={this.taxonomychoices.TANGIBLEASSETS}/>
            <MenuItem value={'LIABILITIES'} primaryText={this.taxonomychoices.LIABILITIES}/>

        </DropDownMenu>
        </div>

    </div>

    // <span style={{ fontStyle: "italic" }}>Government: </span>
    let governmentselection = 
    <div style={{display:'inline-block'}}>
        <div style={{ fontStyle: "italic",display:'inline-block',height:'48px',verticalAlign:'top',paddingTop:'5px' }}>
            <span style={{lineHeight:'44px'}} >Select city:</span>
        </div>
        <DropDownMenu
                value={"Toronto"}
                disabled
            >

            <MenuItem value={'Toronto'} primaryText="Toronto, Ontario"/>

        </DropDownMenu>

    </div>

    // TODO externalize this; make it metadata-driven
    const versionchoices = () => {
        switch (branchDeclaration.viewpoint) {
            case "FUNCTIONAL":
            case "STRUCTURAL":
                return [<MenuItem key = {1} value={'SUMMARY'} primaryText="Summary PDF reports 2003 - 2017">
                    <em>This data is shallower, but goes back further:</em>
                </MenuItem>,
                <MenuItem key = {2} value={'PBFT'} primaryText="Detail open data portal files 2011 - 2017">
                    <em>This data drills down to Account Categories:</em>
                </MenuItem>,
                <MenuItem key = {3} disabled value={'VARIANCE'} primaryText="PDF Variance Reports"/>]
            case 'ACTUALEXPENSES':
                return [<MenuItem key = {4} value={'ACTUALEXPENSES'} primaryText="Audited statements 1998 - 2016"/>]
            case 'ACTUALREVENUES':
                return [<MenuItem key = {4} value={'ACTUALREVENUES'} primaryText="Audited statements 1998 - 2016"/>]
            case 'EXPENDITURES':
                return [<MenuItem key = {4} value={'EXPENDITURES'} primaryText="Audited statements 1998 - 2016"/>]
            case 'FINANCIALASSETS':
                return [<MenuItem key = {4} value={'FINANCIALASSETS'} primaryText="Audited statements 2010 - 2016"/>]
            case 'NONFINANCIALASSETS':
                return [<MenuItem key = {4} value={'NONFINANCIALASSETS'} primaryText="Audited statements 2010 - 2016"/>]
            case 'LIABILITIES':
                return [<MenuItem key = {4} value={'LIABILITIES'} primaryText="Audited statements 2010 - 2016"/>]
        }
    }

    // TODO: add contitional logic depending on viewpoint selection
    let versionselection = 
    <div style={{display:'inline-block'}}>
        <div style={{ fontStyle: "italic",display:'inline-block',height:'48px',verticalAlign:'top',paddingTop:'5px' }}>
            <span style={{lineHeight:'44px'}} >Select dataset:</span>
        </div>
        <DropDownMenu
            disabled = {versionchoices().length < 2}
            value = {branchDeclaration.version}
            onChange={
                (e, index, value) => {
                    branch.selectVersion(value)
                }
            }
            >

            { versionchoices() }

        </DropDownMenu>
    </div>

    // TODO externalize this; make it metadata-driven
    const aspectchoices = () => {
        // console.log('branchdeclaration.viewpoint',branchDeclaration.viewpoint)
        switch (branchDeclaration.viewpoint) {
            case "FUNCTIONAL":
            case "STRUCTURAL":
                return [<MenuItem key = {1} value={'Expenses'} primaryText="Expenditures"/>,
                <MenuItem key = {2} value={'Revenues'} primaryText="Receipts"/>,
                <MenuItem key = {3} value={'Staffing'} primaryText="Staffing" />]
            case 'ACTUALEXPENSES':
                return [<MenuItem key = {4} value={'Expenses'} primaryText="Expenses"/>]
            case 'ACTUALREVENUES':
                return [<MenuItem key = {4} value={'Revenues'} primaryText="Revenues"/>]
            case 'EXPENDITURES':
                return [<MenuItem key = {4} value={'Expenditure'} primaryText="Expenses"/>]
            case 'FINANCIALASSETS':
                return [<MenuItem key = {4} value={'Assets'} primaryText="Assets"/>]
            case 'NONFINANCIALASSETS': {
                return [<MenuItem key = {4} value={'TangibleAssets'} primaryText="Tangible Assets"/>]
                }
            case 'LIABILITIES':
                return [<MenuItem key = {4} value={'Liabilities'} primaryText="Liabilities"/>]
        }
    }

    // aspect = category
    let aspectselection = 
    <div style={{display:'inline-block'}}>

        <div style={{ fontStyle: "italic",display:'inline-block',height:'48px',verticalAlign:'top',paddingTop:'5px' }}>
            <span style={{lineHeight:'44px'}} >Select category:</span>
        </div>

        <DropDownMenu
            disabled = { aspectchoices().length < 2}
            value={branchDeclaration.aspect}
            onChange={
                (e, index, value) => {
                    branch.selectAspect(value)
                }
            }
            >

            { aspectchoices() }

        </DropDownMenu>

    </div>

    let byunitselection =
    <div style={{display:'inline-block'}}>
        <div style={{ fontStyle: "italic",display:'inline-block',height:'48px',verticalAlign:'top',paddingTop:'5px' }}>
            <span style={{lineHeight:'44px'}} >Prorated:</span>
        </div>
        <DropDownMenu
            value={branchDeclaration.prorata}
            onChange={
                (e, index, value) => {
                    this.switchComparator(value)
                }
            }
        >

            <MenuItem value={'OFF'} primaryText="Off"/>
            <MenuItem value={'PERPERSON'} primaryText="Per person"/>
            <MenuItem value={'PER100000PERSONS'} primaryText="Per 100,000 people"/>
            <MenuItem value={'PERHOUSEHOLD'} primaryText="Per household"/>
            <MenuItem value={'PER40000HOUSEHOLDS'} primaryText="Per 40,000 households"/>
            <MenuItem value={'PERWARD'} primaryText="Per ward (x 44)"/>
            <MenuItem value={'PERNEIGHBOURHOOD'} primaryText="Per neighbourhood (x 4 x 44)"/>

        </DropDownMenu>
    </div>

    let inflationadjustment =
        <div 
            style={
                {
                    display:'inline-block', 
                    whiteSpace:"nowrap", 
                    verticalAlign:"top", 
                    marginRight:'16px',
                }
            }>
            <Toggle 
                label={'Inflation adjusted:'} 
                style={
                    {
                        height:'32px', 
                        marginTop:'16px',
                        display:'inline-block',
                    }
                } 
                onToggle = {(e,value) => {
                    this.toggleInflationAdjustment(value)
                }}
                labelStyle = {
                    {
                        fontStyle:'italic'
                    }
                } 
                defaultToggled={branchDeclaration.inflationAdjusted} 
            /> 
        </div>

    let showcontrols = 
        <div 
            style={
                {
                    display:'inline-block', 
                    whiteSpace:"nowrap", 
                    verticalAlign:"top"
                }
            }>
            <Toggle 
                label={'Show chart controls:'} 
                style={{height:'32px', marginTop:'16px'}} 
                labelStyle = {{fontStyle:'italic'}} 
                defaultToggled={branchDeclaration.showOptions}
                onToggle = { 
                    (e,value) => {
                        this.toggleShowOptions(value)
                    }
                }
            />
        </div>

        // dialogs

        let selectionsdialog = (branchDeclaration.showOptions)?
        <Dialog
            title = "Make selections for this row of charts"
            modal = { false }
            open = { branch.state.selectionsDialogOpen }
            onRequestClose = { branch.handleSelectionsDialogClose }
            bodyStyle={{padding:'12px'}}
            autoScrollBodyContent
            contentStyle = {{width:'95%',maxWidth:'600px'}}
        >
            <IconButton
                style={{
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}
                onTouchTap={ branch.handleSelectionsDialogClose } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>

        <div>

            { governmentselection }

            { viewpointselection }

            { versionselection }

            { aspectselection }

        </div>

        <RaisedButton label="Done" 
            style={{margin:'3px 6px 0 0',float:'right'}}
            onTouchTap={branch.handleSelectionsDialogClose} 
        />

        <div></div>
    
        </Dialog >:null

        let noticesdialog = (branchDeclaration.showOptions)?
        <Dialog
            title = "Notices for this data"
            modal = { false }
            open = { branch.state.noticeDialogOpen }
            onRequestClose = { branch.handleNoticeDialogClose }
            bodyStyle={{padding:'12px'}}
            autoScrollBodyContent
            contentStyle = {{width:'95%',maxWidth:'600px'}}
        >
            <IconButton
                style={{
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}
                onTouchTap={ branch.handleNoticeDialogClose } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>

            { branch.state.noticeDialogOpen?branch.getBranchDataMessages():null }

        </Dialog >:null


    let technotesdialog = (branchDeclaration.showOptions)?
        <Dialog
            title = "Row Data Sources"
            modal = { false }
            open = { branch.state.techDialogOpen }
            onRequestClose = { branch.handleTechDialogClose }
            bodyStyle={{padding:'12px'}}
            autoScrollBodyContent
            contentStyle = {{width:'95%',maxWidth:'600px'}}
        >
            <IconButton
                style={{
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }}
                onTouchTap={ branch.handleTechDialogClose } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>
            <div>Please report
            any problems to <a target="_blank" href="mailto:mail@budgetpedia.ca">
            mail@budgetpedia.ca</a> </div>

            { branch.state.techDialogOpen?branch.getTechNotesDisplay():null }

            <div>Note: some historical numbers have been allocated to contemporary categories
            for continuity -- to make the numbers more easily comparable. We plan to disclose
            continuity details here.</div>

        </Dialog >:null

    // dialog calls

    let technotes = 
        <RaisedButton
            style={{margin:'3px 6px 0 0'}}
            type="button"
            label="Sources"
            onTouchTap={branch.handleTechDialogOpen} 
            labelPosition="before"
            icon = {<FontIcon 
                style={{color:'rgba(0,0,0,0.5'}}
                className="material-icons">cloud</FontIcon>}
        />

    let notices = 
        <RaisedButton
            style={{margin:'3px 6px 0 0'}}
            type="button"
            label="Notices"
            onTouchTap={branch.handleNoticeDialogOpen} 
            labelPosition="before"
            icon = {<FontIcon 
                style={{color:'rgba(0,0,0,0.5'}}
                className="material-icons">priority_high</FontIcon>}
        />

    let makeselections = 
        <RaisedButton
            label = "Selections"
            style={{margin:'3px 6px 0 0'}}
            type="button"
            onTouchTap={branch.handleSelectionsDialogOpen} 
            labelPosition="before"
            icon ={<FontIcon 
                style={{color:'rgba(0,0,0,0.5'}}
                className="material-icons">settings_applications</FontIcon>}
            />

    let viewtaxonomy = 
        <RaisedButton
            label = "Workspace tree"
            style={{margin:'3px 6px 0 0'}}
            type="button"
            onTouchTap = { () => {
                let viewpointselection = {
                    viewpoint:branchDeclaration.viewpoint,
                    name:this.taxonomychoices[branchDeclaration.viewpoint]
                }
                this.props.onCallViewTaxonomy(
                    this.state.viewpointData,
                    viewpointselection,
                    this.applytaxonomyselection
                )} 
            } 
            labelPosition="before"
            icon = {<img style={{width:'24px'}} src="./public/icons/org_chart.svg" />
            }
            />

    let search =
        <RaisedButton 
            label = "Search"
            style={{margin:'3px 6px 0 0'}}
            type="button"
            onTouchTap = { this.handleSearch }
            labelPosition="before"
            icon = {<FontIcon 
                style={{color:'rgba(0,0,0,0.5)'}}
                className="material-icons">search</FontIcon>}
            />

    let shareurl =
        <RaisedButton
            type="button"
            style={{margin:'3px 6px 0 0'}}
            label="Share"
            onTouchTap={this.shareBranch} 
            labelPosition="before"
            icon = {<FontIcon 
                style={{color:'rgba(0,0,0,0.5)'}}
                className="material-icons">share</FontIcon>}
        />

    // assemble the page

    // if (branchDeclaration.showOptions) {
    //     // this.animations.controls = this.animations.buttons = animations.zoomInLeft
    // } else {
    //     this.animations.controls = this.animations.buttons = animations.zoomOutLeft
    // }

    let maxheight = (branchDeclaration.showOptions)?'130px':'0'
    let height = (branchDeclaration.showOptions)?'52px':'0'
    let maxwidth = (branchDeclaration.showOptions)?'600px':'0'

    return <StyleRoot>
    <div style={{marginBottom:'12px'}} > { <div >
        <div style = {
            {maxHeight:maxheight,transition:'max-height .5s',overflow:'hidden'}
            }>
        <div style = {[this.state.animations.buttons,{marginBottom:'12px'}]}>

        { makeselections }

        { viewtaxonomy }

        { search }

        { shareurl }

        { technotes }

        { notices }

        </div>

        { selectionsdialog }

        { noticesdialog }

        { technotesdialog }

        </div>
        <div style = {[this.state.animations.controls,
            {
                height,
                maxWidth:maxwidth,
                overflow:'hidden',
                display:"inline-block",
                transition:'height .3s,max-width .3s',
            }]}>
            <div 
                style = {
                    {   height:'48px',
                        whiteSpace:'nowrap',
                        display:"inline-block",
                        backgroundColor:"#ebfaf9",
                        border:"1px solid silver",
                        borderRadius:"8px",
                        marginRight:"6px",
                        paddingLeft:"6px",
                    }
                }
            >
            { byunitselection }

            { inflationadjustment }
            </div>
        </div>

        { showcontrols }

        </div> }

    </div>

    <div style={{ whiteSpace: "nowrap" }}>
        <div ref={node => {
            branch.branchScrollBlock = node
        } } style={{ overflow: "scroll" }}>

            { drilldownportals }

            <div style={{ display: "inline-block", width: "500px",height:"20px" }}></div>

        </div>
    </div>
    <Snackbar
        open={this.state.snackbar.open}
        message={this.state.snackbar.message}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackbarRequestClose}
        />
    </StyleRoot>
    }

}

export default ExplorerBranch
