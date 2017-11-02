// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// explorer.tsx

/*
    BUG: in _getBranchCloneSettings unselect parent child creates 'data not availble in child branch'
    BUG: 'Working' sign persists when click fails to drill down,
        such as when staff aspect is selected and max depth is reached
    BUG: navigating to dialog help box loses bar selection
    TODO: 
    - change terms Expenditures and Receipts to Cost Elements and Revenue Elements
    - scroll down to new branch after hitting + sign
    - do systematic check for error handling requirements; protect against 
        unexpected data (extrenal)
    - move state to central store
    ? Classes:
        Explorer
        ExporerNode
        BudgetData = budgetdata -- package of aspects, lookup, and viewpoint data
        BudgetExplorer (set of BudgetNodes)
        BudgetNode (derive from chartconfig) Node within Hierarchy
        BedgetChart (derive from chartcomfig) - presentation of BudgetNode
        BudgetInfo explanation of budget node
        BudgetPath series of drilldown budgetnodes
        BudgetMatrix complete set of budget paths for BudgetExplorer
*/

// <reference path="../../../typings-custom/react-google-charts.d.ts" />
// <reference path="../../../typings-custom/react-slider.d.ts" />
// <reference path="../../../typings/globals/react-router/index.d.ts" />

'use strict'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
var { Component } = React
// doesn't require .d.ts...! (reference available in index.tsx)
import { connect } from 'react-redux'
// import { withRouter } from 'react-router' // not ready yet!!
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import FloatingActionButton from 'material-ui/FloatingActionButton'
// import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import DropDownMenu from 'material-ui/DropDownMenu'
import Divider from 'material-ui/Divider'
// import Popover from 'material-ui/Popover'
import Toggle from 'material-ui/Toggle'
import LinearProgress from 'material-ui/LinearProgress'
import {toastr} from 'react-redux-toastr'
let uuid = require('node-uuid') // use uuid.v4() for unique id
let jsonpack = require('jsonpack')
let ReactGA = require('react-ga')
var { Chart } = require('../../../forked/react-google-charts/Chart.js')

import ExplorerBranch from './components/explorerbranch'
import SearchDialog from './components/searchdialog'

import * as Actions from '../../core/actions/actions'
import * as ExplorerActions from './actions'
import BudgetBranch from './classes/branch.class'
import { getExplorerDeclarationData } from './reducers'
import dialogcontent from './content/helpcontent'
import * as Utilities from './modules/utilities'

import {
    BranchSettings,
} from './modules/interfaces'

// mapStateToProps wraps these redux actions with redux dispatch
// for use in explorernode
export interface MappedNodeActions {
    addCellDeclarations: Function,
    changeTab: Function,
    updateCellChartCode: Function,
    updateCellYearSelections: Function,
    normalizeCellYearDependencies: Function,
    updateNode: Function,
    // removeCellDeclarations:Function,
    // changeChart:Function,
    // toggleDelta:Function,
}

// for use in explorerbranch
export interface MappedBranchActions extends MappedNodeActions {
    addNodeDeclaration:Function,
    addNodeDeclarations:Function,
    removeNodeDeclarations: Function,
    changeViewpoint: Function,
    updateBranch: Function,
    changeVersion: Function,
    changeAspect: Function,
    toggleInflationAdjusted: Function,
    updateProrata: Function,
    toggleShowOptions: Function,
    incrementBranchDataVersion: Function,
    clearBranchStory: Function,
    updateCellChartSelection:Function,
    updateCellTimeScope:Function,
    updateCellYearSelections: Function,
    updateCellChartCode: Function,
    updateCellsDataseriesName: Function,
    resetLastAction: Function,
    harmonizeCells: Function,
    // toggleInflationAdjustement:Function
}

// for use here
interface MappedExplorerActions extends MappedBranchActions {
    // actions composed with dispatch
    addBranchDeclaration:Function, // dispatcher from ExplorerActions through connect
    cloneBranchDeclaration:Function,
    removeBranchDeclaration:Function,
    removeBranches:Function,
    resetLastAction:Function,
    branchMoveUp: Function,
    branchMoveDown: Function,
}

// also used here
interface MappedActions extends MappedExplorerActions{
    showWaitingMessage:Function, // dispatcher from Actions 
    hideWaitingMessage:Function, // dispatcher from Actions
    onetimeNotification:Function, 
}

interface ExplorerProps extends MappedActions {
    declarationData:any, // from global state.explorer; contains object declarations
    location?:any,
}

interface ExplorerState {
    budgetBranches?:BudgetBranch[],
    dialogOpen?: boolean,
    searchDialogOpen?:boolean,
    searchDialogAspect?:string,
    selectStoryboard?:string,
    storyboardDialogOpen?:boolean,
    analystNotesDialogOpen?:boolean,
    viewTaxonomyDialogOpen?:boolean,
}

let Explorer = class extends Component< ExplorerProps, ExplorerState > 
{

    // ---------------------[ Initialize ]-------------------------

    state = {
        budgetBranches:[],
        dialogOpen: false,
        searchDialogOpen: false,
        storyboardDialogOpen: false,
        analystNotesDialogOpen: false,
        viewTaxonomyDialogOpen: false,
        selectStoryboard:'SELECT',
    }

    toastrmessages = {
        error:null,
        warning:null,
        success:null,
        info:null,
    }

    // Value    Notes
    // args.category    String. Required. A top level category for these events. 
    //     E.g. 'User', 'Navigation', 'App Editing', etc.
    // args.action    String. Required. A description of the behaviour. 
    //     E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.
    // args.label    String. Optional. More precise labelling of the related action. 
    //     E.g. alongside the 'Added a component' action, we could add the name of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
    // args.value    Int. Optional. A means of recording a numerical value against an event. 
    //     E.g. a rating, a score, etc.
    // args.nonInteraction    Boolean. Optional. If an event is not triggered by a user interaction, 
    //     but instead by our code 
    //     (e.g. on page load, 
    //         it should be flagged as a nonInteraction event to avoid skewing bounce rate data.
    // args.transport    String. Optional. 
    //     This specifies the transport mechanism with which hits will be sent. 
    //     Valid values include 'beacon', 'xhr', or 'image'.

    logEvent = (parms) => {
        if (window.location.hostname == 'budgetpedia.ca') {
            ReactGA.event(parms);
        }
    }

    setToast = (version,message) => {
        this.toastrmessages[version] = message
    }

    // ----------------------------[ Lifecycle operations ]-------------------------------

    urlparms:any = null

    clearUrlParms = () => {
        this.urlparms = null
    }

    stories:any = null
    storiescleared = []
    clearStories = (branch) => {
        this.storiescleared.push(branch)
        if (this.storiescleared.length == this.stories.length) {
            this.stories = null
            this.storiescleared = []
            this.setState({
                storyboardDialogOpen:false,
            })
        }
    }

    storyboardDialog = () => (
        <Dialog
            title = {<div style = {{padding:'12px 0 0 12px'}} >Your storyboard is being prepared
            </div>}
            modal = { true }
            open = { this.state.storyboardDialogOpen }
            autoScrollBodyContent = {false}
            contentStyle = {{maxWidth:'600px'}}
            autoDetectWindowHeight = {false}
        >
            <div>
            please wait while the charts are rendered...<br />
            Toggle any row's "Show chart options" to experiment with settings for that row
            <LinearProgress mode="indeterminate" />
            </div>
        </Dialog>
    )

    componentWillMount() {

        // console.log('explorer props location.query',this.props.location.query)

        if (!this.props.declarationData.onetimenotification) {
            this.toastrmessages.info = "Click or tap on any chart column to drill down (except as noted)."
            this.props.onetimeNotification()
        }

        let {query} = this.props.location

        // console.log('query',query)

        let branchdata, settingsdata, hash

        if (query.branch && query.settings && query.hash) {

            branchdata = jsonpack.unpack(query.branch)
            settingsdata = jsonpack.unpack(query.settings)

            let newhash = Utilities.hashCode(query.branch + query.settings).toString()

            if (newhash == query.hash) {

                this.urlparms = {
                    branchdata,
                    settingsdata,
                }

                let defaultSettings:BranchSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch))
                // console.log('branchdata, settingsdata,defaultSettings',branchdata,settingsdata,defaultSettings)

                let querysettings = {
                    inflationAdjusted:branchdata.ad,
                    aspect:branchdata.as,
                    prorata:branchdata.pr,
                    repository:branchdata.g,
                    version:branchdata.ve,
                    viewpoint:branchdata.vi,
                    showOptions:true,
                }

                let settings = Object.assign(defaultSettings,querysettings)

                this.props.addBranchDeclaration(null,settings) // change state
                return

            } else {

                this.toastrmessages.error = 'the url parameters have apparently been damaged. Using defaults instead...'
                console.error('url hash no match',toastr,query.hash, newhash)

            }

        }

        if (query && query.storyboard) {
            let value = query.storyboard
            this.setState({
                selectStoryboard:value,
                storyboardDialogOpen:true,
            })
            this.processStoryboardSelection(value)
            return
        }

        let { branchList, branchesById } = this.props.declarationData

        if (branchList.length == 0) { // initialize explorer with first branch

            // this.freshstart = true
            let defaultSettings:BranchSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch))
            this.props.addBranchDeclaration(null,defaultSettings) // change state

        } else { // harmonize branch instances to branch declarations

            let { branchList, branchesById } = this.props.declarationData
            let budgetBranches:BudgetBranch[] = [...this.state.budgetBranches]

            this.harmonizeBranchesToState(budgetBranches, branchList, branchesById)
        }
    }

    // componentDidMount() {
    //     let query = this.props.location
    //     if (query && query.query && query.query.storyboard) {
    //         setTimeout(()=>{
    //             this.onSelectStoryboard(query.query.storyboard)
    //         },5000)
    //     }
    // }

    // start with open reminder to user that click on charts drills down

    componentWillUnmount() {
        this.props.resetLastAction() // clear sentinals for unmount //TODO verify this!
    }

    componentDidUpdate() {

        let { branchList, branchesById } = this.props.declarationData
        let budgetBranches:BudgetBranch[] = [...this.state.budgetBranches]

        this.harmonizeBranchesToState(budgetBranches, branchList, branchesById)

        let { toastrmessages } = this
        for (let version in toastrmessages) {
            let msg = toastrmessages[version]
            if (msg) {
                toastrmessages[version] = null
                toastr[version](msg)
            }
        }

    }

    /*
        harmonizeBranches creates branches to match branch declarations
        called from componentWillMount for initialization of imported workspaces
        and from componentWillReceiveProps to modify branch list
    */
    harmonizeBranchesToState = (budgetBranches, branchList, branchesById) => {
        // reset state branches if a change is made
        let change = false

        // delete branches that are no longer required
        let newBranches = budgetBranches.filter((branch) => {
            return !!branchesById[branch.uid]
        })
        if (newBranches.length != budgetBranches.length) {
            change = true
        }
        // add branches not yet created
        // let length = newBranches.length
        for ( let i = 0; i < branchList.length ; i++ ) {
            let uid = branchList[i]
            let foundbranch = newBranches.filter(branch => {
                if (branch.uid == uid) 
                    return branch
            })
            if (foundbranch.length == 0) { // branch not found, so add it
                if (!change) change = true
                let budgetBranch = new BudgetBranch({uid})
                newBranches.push(budgetBranch)
            }
        }
        // sort branches into correct order, per state branchlist
        let sortedBranches = []
        for ( let i = 0; i < branchList.length ; i++ ) {
            let uid = branchList[i]
            let foundbranch = newBranches.filter(branch => {
                if (branch.uid == uid)
                    return branch
            })
            if (!(foundbranch.length == 1)) {
                console.error(
                    'System error -- unexpected mismatch between state branch list and explorer branch list',
                    branchList, newBranches)
                throw Error('System error -- unexpected mismatch between state branch list and explorer branch list')
            }
            sortedBranches.push(foundbranch[0])
        }
        if (!change) {
            for (let i = 0; i<budgetBranches.length; i++) {
                if (budgetBranches[i].uid != sortedBranches[i].uid) {
                    change = true
                    break
                }
            }
        }
        if (change) {
            this.setState({
                budgetBranches:sortedBranches,
            })
        }
    }

    // ------------------------[ ancillary ui ]---------------------------

    handleDialogOpen = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.logEvent({
            category:'Explorer',
            action:'Show help',
        })
        this.setState({
            dialogOpen: true
        })
    }

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false
        })
    }

    // callbacks
    workingStatus = status => {
        if (status) {
            this.props.showWaitingMessage()
        } else {
            this.props.hideWaitingMessage()
        }

    }

    // ---------------[ create action calls versions for currying (branchid) ]---------------

    // node consumer
    private updateNode = branchuid => 
        nodeuid => 
        this.props.updateNode(branchuid, nodeuid)
    private changeTab = branchuid => 
        (nodeuid, tabvalue) => 
        this.props.changeTab(branchuid, nodeuid,tabvalue)
    private addCellDeclarations = branchuid => 
        (nodeuid, settingslist) => 
        this.props.addCellDeclarations(branchuid, nodeuid, settingslist)
    private normalizeCellYearDependencies = branchuid => 
        (nodeuid, cellList, yearsRange) => 
        this.props.normalizeCellYearDependencies(branchuid, nodeuid, cellList, yearsRange)

    // cell consumer
    private updateCellTimeScope = branchuid => 
        nodeuid => (celluid,selection) =>
        this.props.updateCellTimeScope(branchuid, nodeuid, celluid, selection )
    private updateCellChartSelection = branchuid => 
        nodeuid => (celluid,selection) =>
        this.props.updateCellChartSelection(branchuid, nodeuid, celluid, selection )
    private updateCellYearSelections = branchuid => 
        nodeuid => (leftyear,rightyear) =>
        this.props.updateCellYearSelections(branchuid, nodeuid, leftyear, rightyear )
    private updateCellChartCode = branchuid => 
        nodeuid => (celluid, explorerChartCode) => 
        this.props.updateCellChartCode(branchuid, nodeuid, celluid, explorerChartCode)
    
    // ----------------------------[ ui responses ]------------------------------

    onExpandChange = (expanded) => { // TODO: validate this
        return
        // TODO: change background color of title if it is collapsed
        // this.props.resetLastAction()
    }

    branchMoveUp = branchuid => {
        this.props.branchMoveUp(branchuid)
    }

    branchMoveDown = branchuid => {
        this.props.branchMoveDown(branchuid)
    }

    private _getBranchCloneSettings = refbranchid => {
        let declarationData = this.props.declarationData
        let clones = {
            branch:{},
            nodes:{},
            cells:{},
        }
        let uidmap = {}
        // clone branch
        uidmap[refbranchid] = uuid.v4()
        clones.branch[refbranchid] = this._getClone(declarationData.branchesById[refbranchid])
        // console.log('clones', clones)
        // clone branch nodes
        for (let nodeid of clones.branch[refbranchid].nodeList) {
            let nodeobject = declarationData.nodesById[nodeid]
            // console.log('nodeobject', nodeobject)
            clones.nodes[nodeid] = this._getClone(nodeobject)
            uidmap[nodeid] = uuid.v4()
        }
        // clone node cells
        for (let nodeid in clones.nodes) {
            for (let cellid of clones.nodes[nodeid].cellList) {
                clones.cells[cellid] = this._getClone(declarationData.cellsById[cellid])
                uidmap[cellid] = uuid.v4()
                clones.cells[cellid].celluid = uidmap[cellid] // TODO: this reference shouldn't be in cell declaration!!
            }
        }

        // console.log('cell clones',clones.cells)
        // map old uid's to new uid's
        let newclones = {
            newbranchid:uidmap[refbranchid],
            branch:{},
            nodes:{},
            cells:{},
        }
        let newrefbranchid = uidmap[refbranchid]
        newclones.branch[newrefbranchid] = clones.branch[refbranchid]
        let oldlist = newclones.branch[newrefbranchid].nodeList
        let newlist = []
        for (let id of oldlist) {
            newlist.push(uidmap[id])
        }
        newclones.branch[newrefbranchid].nodeList = newlist
        for (let id in clones.nodes) {
            let newid = uidmap[id]
            let nodeclone = newclones.nodes[newid] = clones.nodes[id]

            let oldlist = nodeclone.cellList
            let newlist = []
            for (let cellid of oldlist) {
                newlist.push(uidmap[cellid])
            }
            nodeclone.cellList = newlist

        }
        for (let oldid in clones.cells) {
            newclones.cells[uidmap[oldid]] = clones.cells[oldid]
        }
        return newclones
    }

    private _getClone = object => {
        return JSON.parse(JSON.stringify(object))
    }

    addBranch = refbranchuid => {
        let cloneSettings = this._getBranchCloneSettings(refbranchuid)

        this.logEvent({
            category:'ExplorerBranch',
            action:'Add branch',
        })
        this.props.cloneBranchDeclaration( refbranchuid, cloneSettings )
        this.onCloneCreation()

    }

    // crude scroll down on branch clone
    onCloneCreation = () => {

        setTimeout(() => {

            let adjustment = 400
            let frames = 60
            let t = 1 / frames
            let counter = 0
            let base = 0
            let tick = () => {
                counter++
                let factor = this.easeOutCubic(counter * t)
                let scrollinterval = adjustment * factor
                window.scrollBy(0,scrollinterval - base)
                base = scrollinterval
                if (counter < frames) {
                    requestAnimationFrame(tick)
                }
            }

            requestAnimationFrame(tick)

        },1000) // give charts some time to render and take up space
    }

    // TODO: should be in utilities
    // from https://github.com/DelvarWorld/easing-utils/blob/master/src/easing.js
    private easeOutCubic = t => {
        const t1 = t - 1;
        return t1 * t1 * t1 + 1;
    }

    removeBranch = branchuid => {
        this.props.removeBranchDeclaration(branchuid)
    }

    removeBranches = () => {
        this.props.removeBranches()
    }


    findParameters = {
        applySearchBranchSettings:null
    }

    // ==================[ FIND CHART ]=======================

    handleSearchDialogOpen = (e,applySearchBranchSettings) => {
        e.stopPropagation()
        e.preventDefault()
        this.findParameters.applySearchBranchSettings = applySearchBranchSettings
        // this.resetSelectionParameters()
        this.setState({
            searchDialogOpen: true
        })
    }

    handleSearchDialogClose = () => {
        this.setState({
            searchDialogOpen: false
        })
    }

    // =======================[ Storyboard Creation ]=====================


    storyBoards:any = null

    private getStoryboardsPromise = () => {
        let filespec = './db/repositories/toronto/storyboards/storyboards.json'
        let promise = new Promise((resolve,reject) => {
            fetch(filespec).then( response => {
                if (response.ok) {
                    // console.log('response for ' + path,response)
                    try {
                        let json = response.json().then(json => {
                            resolve(json)
                        }).catch(reason => {
                            let msg = 'failure to resolve ' + filespec + ' ' + reason
                            console.log(msg)
                            reject(msg)
                        })
                    } catch (e) {
                        console.log('error ' + filespec, e.message)
                        reject('failure to load ' + filespec)
                    }
                } else {
                    reject('could not load file ' + filespec)
                }

            }).catch(reason => {
                reject(reason + ' ' + filespec)
            })
        })
        return promise
    }

    onSelectStoryboard = (value:string) => {
        let showdialog = true
        if (value == 'SELECT') {
            showdialog = false
        }
        this.logEvent({
            category:'Explorer',
            action:'Select storyboard',
            label:value,
        })
        this.setState({
            selectStoryboard:value,
            storyboardDialogOpen:showdialog,
        })
        if (value == 'SELECT') {
            return
        }
        this.processStoryboardSelection(value)
    }

    processStoryboardSelection = selection => {
        // console.log('processing selection',selection)
        if (!this.storyBoards) {
            let promise = this.getStoryboardsPromise()
            promise.then(json => {
                this.storyBoards = json
                if (!this._doProcessStoryboardSelection(selection)) {
                    this.setState({
                        selectStoryboard:'SELECT',
                        storyboardDialogOpen:false,
                    })
                    if (this.state.budgetBranches.length == 0) {
                        this.resetBranches()
                    }
                }
            }).catch(reason => {
                console.error('error in processStoryboardSelection',reason)
                this.setState({
                    selectStoryboard:'SELECT',
                    storyboardDialogOpen:false,
                })
            }) 
        } else {
            if (!this._doProcessStoryboardSelection(selection)) {
                this.setState({
                    selectStoryboard:'SELECT',
                    storyboardDialogOpen:false,
                })
            }
        }
    }

/*
    each story consists of the following properties
    {
        viewpoint:"", FUNCTIONAL, STRUCTURAL, ACTUALEXPENSES, ACTUALREVENUES, EXPENDITURES
        source:"", 
            for FUNCTIONAL or STRUCTURAL:
                SUMMARY, PBFT, VARIANCE
            otherwise source = viewpoint
        level:"",

            for FUNCTIONAL or STRUCTURAL Expenses:
                Taxonomy, Program, Service, Activity, Expense

            for FUNCTIONAL or STRUCTURAL Revenues:
                Taxonomy, Program, Service, Activity, Revenue

            for FUNCTIONAL or STRUCTURAL Staffing:
                Taxonomy, Program, Permanence

            for ACTUALEXPENSES Expenses
                Taxonomy, Expense

            for ACTUALREVENUES Revenues
                Taxonomy, Revenue

            for EXPENDITURES Expenditure
                Taxonomy, Expenditure
        code:"",
        aspect:"",
            for FUNCTIONAL or STRUCTURAL:
                Expenses, Revenues, Staffing
            for ACTUALEXPENSES,
                Expenses
            for ACTUALREVENUES:
                Revenues
            for EXPENDITURES:
                Expenditure
        name:""
    }
*/   

    _doProcessStoryboardSelection = selection => {
        let storyboard = this.storyBoards.storyboards[selection]
        if (!storyboard) {
            toastr.error('storyboard not found for ' + selection)
            return false
        }
        // console.log('processing story board',selection,storyboard)
        let stories = storyboard.stories
        this.stories = stories
        if (!stories) {
            toastr.error('stories not found for storyboard ' + selection)
            return false
        }
        // clear all branches
        if (this.state.budgetBranches.length > 0) {
            this.removeBranches()
            this.setState({
                budgetBranches:[]
            })
        }

        let explorer = this
        setTimeout(()=>{

            for (let story of stories) {
                // create branch
                let defaultSettings:BranchSettings = JSON.parse(JSON.stringify(explorer.props.declarationData.defaults.branch))
                let settings = Object.assign(defaultSettings,{
                    viewpoint:story.viewpoint,
                    version:story.source,
                    aspect:story.aspect,
                    story:story,
                    showOptions:false,
                })
                explorer.props.addBranchDeclaration(null,settings) // change state 
            }
        })
        return true 
    }

    resetBranches = () => {
        let value:string = 'SELECT'
        this.setState({
            selectStoryboard:value,
        })
        this.removeBranches()
        let defaultSettings:BranchSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch))
        this.props.addBranchDeclaration(null,defaultSettings) // change state        
    }

    private _inputfieldref

    private _inputonfocus = () => {
        this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length)
    }

    shareStoryboard = () => {
        let longurl = this._getShareUrl()
        // console.log('long url',longurl)
        let toastrComponent = () =>  ( <div style={{width:"300px"}}>
                <p style={{width:"240px"}}>To share this storyboard 
                (not including any changes you may have made), 
                copy the url below, and send it to a friend.</p>
                <input 
                    ref = {node => {
                        this._inputfieldref = node
                    }}
                    onFocus= {this._inputonfocus}
                    style={{width:"310px",marginLeft:'-60px'}} value = {longurl} readOnly />
        </div> )

        let toastrOptions = {
            icon: (<FontIcon
                className="material-icons"
                >

                share

            </FontIcon>),

            component: toastrComponent
        }
        toastr.message('Share',toastrOptions)
    }

    private _getShareUrl = () => {
        this.logEvent({
            category:'Explorer',
            action:'Share storyboard',
            label:this.state.selectStoryboard,
        })
        return 'http://' + location.hostname + '/explorer?storyboard=' + this.state.selectStoryboard
    }

    // =============================================================================
    // ---------------------------[ View Taxonomy/workspace ]-----------------------

    viewtaxonomydata:any = {
        options:{
            allowHtml:true,
            allowCollapse:false,
        }
    }

    taxonomyleafnodeselection = null

    // TODO: should log event for google analytics
    onCallViewTaxonomy = (viewpointdata,viewpointselection,applytaxonomyselection) => {
        let self = this
        self.viewtaxonomydata.applytaxonomyselection = applytaxonomyselection
        self.taxonomyleafnodeselection = null
        window['taxonomyCall'] = function(value) {
            self.taxonomyleafnodeselection = value
            // console.log('set taxonomynodeselection',value)
        }
        // console.log('viewpointdata,viewpointselection',viewpointdata, viewpointselection)
        this.viewtaxonomydata.viewpointdata = viewpointdata
        this.viewtaxonomydata.viewpointselection = viewpointselection
        this.setViewTaxonomyData()
        this.setState({
            viewTaxonomyDialogOpen:true,
        })
    }

    setViewTaxonomyData = () => {
        let viewpointdata = this.viewtaxonomydata.viewpointdata
        let data = []
        data.push(['Code','Parent','Tooltip'])
        let code = viewpointdata.NamingConfigRef
        data.push([{v:code,f:viewpointdata.Meta.NamingConfigurations[code].Contents.Alias},'',''])
        this.setViewTaxonomyRow(code,viewpointdata.Components,data)
        this.viewtaxonomydata.data = data
    }

    // recursive
    setViewTaxonomyRow = (parentcode,components,data) => {
        let baselines:any = {string:''}
        for (let code in components) {
            let component = components[code]
            if (component.Baseline) {
                // console.log('single baseline',component)
                if (!baselines.code) {
                    baselines.code = code
                }
                baselines.string += '<div style="border:2px solid gray;margin-bottom:3px;border-radius:6px;font-size:smaller" onClick="taxonomyCall(\''+ code +'\')">'+component.Name+'</div>'
            } else {
                data.push([{v:code,f:component.Name},parentcode,''])
                this.setViewTaxonomyRow(code,component.Components,data)
            }
        }
        // console.log('baselines',baselines)
        if (baselines.code) {
            data.push([
                {v:baselines.code,f:'<div style="background-color:pink;height:100%">'+
                    baselines.string+'</div>'},parentcode,''
            ])
        }
    }

    setSelectionBranchNodes = (selection) => {
        setTimeout( () => { // wait for this.taxonomyleafnodeselection to be set
            let selectedleafnode = null
            let selectedtreenode = null
            let selectednoderow = selection[0].row
            let datanode = this.viewtaxonomydata.data[selectednoderow+1]
            if (this.taxonomyleafnodeselection) { // an html injected div has been clicked
                selectedleafnode = this.taxonomyleafnodeselection
                selectedtreenode = datanode[1] // parent
            } else {
                let substr = datanode[0].f.substring(0,4)
                if ( substr == '<div') { // a constructed node. get parent
                    selectedtreenode = datanode[1] // parent
                } else { // get current code
                    selectedtreenode = datanode[0].v // node code
                }

            }
            let parms = {
                selectedleafnode,
                selectedtreenode,
            }
            this.viewtaxonomydata.applytaxonomyselection(parms)
            // console.log('viewtaxonomydata.data',this.viewtaxonomydata.data)
            // console.log('selectedleafnode, selectedtreenode, chart selection, taxonomynodeselection', selectedleafnode, selectedtreenode, selection, this.taxonomyleafnodeselection)
        })
    }

    taxonomyevents = () => {
        let self = this
        return [
            {
                eventName: 'select',
                callback: (Chart, err) => {
                    let chart = Chart.chart
                    let selection = chart.getSelection()
                    self.setState({
                        viewTaxonomyDialogOpen: false,
                    })
                    if (selection.length) {
                        self.setSelectionBranchNodes(selection)
                    }
                }
            }
        ]
    }

    taxonomychart = () => {
        // console.log('viewtaxonomydata',this.viewtaxonomydata)
        return this.viewtaxonomydata.data?<Chart 
        chartType = 'OrgChart'
        options = { this.viewtaxonomydata.options }
        chartEvents = { this.taxonomyevents() }
        data = { this.viewtaxonomydata.data }
    />:null }

    viewTaxonomyDialog = () => {
        if (!this.viewtaxonomydata.viewpointdata) return null
        let taxonomyselection = this.viewtaxonomydata.viewpointselection.viewpoint
         return <Dialog
            title = {<div style = {{padding:'12px 0 0 12px'}} >Chart view of selected workspace tree (<span style={{fontStyle:'italic'}}>{this.viewtaxonomydata.viewpointselection.name}</span>)
            </div>}
            modal = {false}
            onRequestClose = { () => {  
                this.setState({
                    viewTaxonomyDialogOpen: false,
                })} }
            open = { this.state.viewTaxonomyDialogOpen }
            contentStyle = {{width:'90%',maxWidth:'none',height:'90%',maxHeight:'none'}}
            autoScrollBodyContent = {true}
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
                onTouchTap={ 
                    () => {
                        this.setState({
                            viewTaxonomyDialogOpen:false,
                        })
                    }
                } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>
            <div style={{height:window.innerHeight}}>
                <div style={{fontStyle:'italic',fontSize:'smaller'}} >
                click on a cell to view chart. <div
                    style ={
                        {
                            display:'inline-block',
                            height:'9px',
                            width:'9px',
                            backgroundColor:'pink',
                            border:'1px solid gray',
                        }
                    } ></div> = {
                        (taxonomyselection == 'FUNCTIONAL' || taxonomyselection == 'STRUCTURAL')? 
                        'City Divisions and Agencies':'Source document base categories'
                    }
                </div>
                {this.taxonomychart()}
            </div>
        </Dialog>
    }

    // ===================================================================
    // ---------------------------[ Analyst Notes ]-----------------------

    analystNotesDialog = () => (
        <Dialog
            title = {<div style = {{padding:'12px 0 0 12px'}} >Budget Analyst Notes
            </div>}
            modal = {false}
            onRequestClose = { () => { this.onSelectAnalystNotes(null,null)} }
            open = { this.state.analystNotesDialogOpen }
            autoScrollBodyContent = {true}
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
                onTouchTap={ 
                    () => {
                        this.setState({
                            analystNotesDialogOpen:false,
                        })
                    }
                } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>
            <div>
                {this.getAnalystNotesDisplay()}
            </div>
        </Dialog>
    )

    getAnalystNotesDisplay = () => {
        let display = []
        display.push(this.getDisplayRoot())
        return display
    }

    getDisplayRoot = () => {
        let display = this.analystnotes.displaylist
        let displayroot = display[0] || {}
        return <div key="main">
            <h3>{displayroot.name}</h3>
            {this.getDisplayTail(displayroot)}
        </div>
    }

    getDisplayTail = (displayobj) => {
        if (displayobj.subset) {
            return this.getDisplaySubset(displayobj.subset)
        } else if (displayobj.notes) {
            return this.getDisplayNotes(displayobj.notes)
        } else {
            return <div>no notes to display</div>
        }
    }

    getDisplaySubset = subset => {
        let elements = []
        for (let index in subset) {
            let displayobj = subset[index]
            elements.push(
                <div key = {index} style = {
                    {
                        borderLeft:'1px solid silver',
                        marginLeft:'3px',
                        paddingLeft:'3px',
                    }
                } >
                <h4 style={displayobj.notes?{fontStyle:'italic'}:null} >{displayobj.name}</h4>
                {this.getDisplayTail(displayobj)}
                </div>
            )
        }
        return elements
    }

    getDisplayNotes = notes => {
        let elements = []
        for (let index in notes) {
            let note = notes[index]
            elements.push(
                <div key={index}>
                - <a target="_blank" href={note.link}>{note.title}</a>
                </div>
            )
        }
        if (elements.length == 0) {
            elements.push(<div key="none" style={{fontStyle:'italic'}} >(no notes)</div>)
        }
        return elements
    }


    // TODO: This needs to be hooked into event that opens analyst notes window!!
    onSelectAnalystNotes = (code:string, index:number) => {
        if (code !== null) {
            this.logEvent({
                category:'Explorer',
                action:'Select analyst notes',
                label:code,
            })
        }
        this.setState({
            analystNotesDialogOpen:false,
        })
        // open window for analyst notes
    }

    analystnotes = {
        nodepath:null,
        taxonomies: {},
        analystnoteslist:null,
        displaylist:{}
    }

    // TODO: should log this for google analytics
    onCallAnalystNotes = (taxonomycode, nodepath) => {
        this.analystnotes.nodepath = nodepath
        // console.log('taxonomy code for call analyst notes',taxonomycode, nodepath)
        if (this.analystnotes.taxonomies[taxonomycode]) {
            let json = this.analystnotes.taxonomies[taxonomycode]
            this.processTaxonomyTree(json)
        } else {

            let taxonomyPromise = this.filePromise('viewpoints/' + taxonomycode.toLowerCase() + '.json')
            let explorer = this
            taxonomyPromise.then(json => 
            {
                this.processTaxonomyTree(json)
            }).catch(reason => {
                toastr.error('could not find analyst notes framework:' + reason)
            })
        }
    }

    private processTaxonomyTree = (taxonomyTree) => {
        // console.log('taxonomy tree', taxonomyTree)
        if (this.analystnotes.analystnoteslist) {
            this.displayAnalystChoices(taxonomyTree)
        } else {
            let listPromise = this.filePromise('resources/analystnotes.json')
            let explorer = this
            listPromise.then(json => 
            {
                this.analystnotes.analystnoteslist = json
                // console.log('analyst notes loaded', json)
                this.displayAnalystChoices(taxonomyTree)
            }).catch(reason => {
                toastr.error('could not find analyst notes list:' + reason)
            })
        }
    }

    private displayAnalystChoices = (taxonomytree) => {
        let nodepath = this.analystnotes.nodepath
        let headnode = null
        let count = 0
        let tailbranch = taxonomytree
        while (true) {
            if (count == nodepath.length) break
            if (!tailbranch.Components) break
            headnode = nodepath[count]
            // console.log('headnode, tailbranch', headnode, tailbranch)
            if (tailbranch.Components[headnode]) {
                tailbranch = tailbranch.Components[headnode]
            } else {
                tailbranch = null
                break
            }
            count++
            // console.log('count',count)
        }
        if (!tailbranch) {
            toastr.error('unable to find path in taxononmy')
            return
        }
        // console.log('headnode, tailbranch',headnode,tailbranch)
        let displaylist = this.getDisplayList(headnode,tailbranch,taxonomytree)
        // console.log('displaylist',displaylist)
        this.analystnotes.displaylist = displaylist
        this.setState({
            analystNotesDialogOpen:true,
        })
    }

    private getDisplayList = (headnode, tailbranch, taxonomytree) => {

        let analystnotes = this.analystnotes.analystnoteslist

        let displaylist:any = []

        let displayset = this.getDisplaySet(headnode,tailbranch,taxonomytree,analystnotes)

        displaylist.push(displayset)
        return displaylist
    }

    private getDisplaySet = (headnode, tailbranch, taxonomytree, analystnotes) => {

        let displayset:any = {}

        try {
        if (tailbranch.Baseline) {
            let noteset = analystnotes[headnode]
            displayset.code = headnode
            if (!noteset) {
                displayset.name = headnode
                displayset.notes = []
            } else {
                displayset.name = noteset.name
                displayset.notes = noteset.links
            }
        } else {
            let subset:any = []
            for (let subcode in tailbranch.Components ) {
                let displayset = this.getDisplaySet(subcode, tailbranch.Components[subcode],taxonomytree,analystnotes)
                subset.push(displayset)
            }

            displayset.code = headnode
            if (!headnode) {
                let contents = taxonomytree.Meta.NamingConfigurations[taxonomytree.NamingConfigRef].Contents
                displayset.name = contents.Alias || contents.Name
            } else {
                displayset.name = taxonomytree.Meta.Lookups.Taxonomy[headnode]
            }
            displayset.subset = subset
        }
        } catch (e) {
            console.error('error!',e)
        }

        return displayset

    }

    private filePromise = (path:string) => {
        let root = './db/repositories/toronto/'
        let filespec = root + path
        let promise = new Promise((resolve,reject) => {
            fetch(filespec).then( response => {
                if (response.ok) {
                    // console.log('response for ' + path,response)
                    try {
                        let json = response.json().then(json => {
                            resolve(json)
                        }).catch(reason => {
                            let msg = 'failure to resolve ' + path + ' ' + reason
                            console.log(msg)
                            reject(msg)
                        })
                    } catch (e) {
                        console.log('error ' + path, e.message)
                        reject('failure to load ' + path)
                    }
                } else {
                    reject('could not load file ' + path)
                }

            }).catch(reason => {
                reject(reason + ' ' + path)
            })
        })
        return promise
    }

    // ===================================================================
    // ---------------------------[ Render ]------------------------------ 

    render() {

        let showhelp = <RaisedButton
                label = "Help"
                style={{margin:'3px 6px 0 6px'}}
                type="button"
                onTouchTap = { this.handleDialogOpen } 
                labelPosition="before"
                icon = {<FontIcon style={{color:'rgba(0,0,0,0.5'}}
                    className="material-icons">help_outline</FontIcon>
                }
                />

        let showanalystnotes = <RaisedButton
                label = "Latest Analyst Notes"
                style={{margin:'3px 6px 0 6px'}}
                type="button"
                onTouchTap = { () => {this.onCallAnalystNotes('FUNCTIONAL',[])} } 
                />

        let showvideos = <RaisedButton
                label = "Videos"
                style={{margin:'3px 6px 0 6px'}}
                type="button"
                onTouchTap = { () =>{
                    this.logEvent({
                        category:'Explorer',
                        action:'Show videos',
                    })
                    window.open('https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig','_blank')
                } } 
                labelPosition="before"
                icon = {<FontIcon style={{color:'rgba(0,0,0,0.5'}}
                    className="material-icons">videocam</FontIcon>
                }
                />

        let explorer = this

        let dialogbox =  
            <Dialog
                title = "Budget Explorer Options"
                modal = { false }
                open = { explorer.state.dialogOpen }
                onRequestClose = { explorer.handleDialogClose }
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
                    onTouchTap={ explorer.handleDialogClose } >

                    <FontIcon
                        className="material-icons"
                        style = {{ cursor: "pointer" }} >

                        close

                    </FontIcon>

                </IconButton>

                { dialogcontent }

            </Dialog >

        // -----------[ BRANCH SEGMENT]-------------

        let branchSegments = () => {

            let budgetBranches = explorer.state.budgetBranches

            // console.log('budgetBranches',budgetBranches)
            // map over budgetBranches state
            let segments = budgetBranches.map((budgetBranch:BudgetBranch, branchIndex) => {

                let urlparms = null
                if (branchIndex == 0 && this.urlparms) {
                    urlparms = this.urlparms
                }
                // collect functions to pass down to nested components
                let actionFunctions:MappedBranchActions = {
                    
                    // curried
                    addCellDeclarations: this.addCellDeclarations(budgetBranch.uid),
                    normalizeCellYearDependencies: this.normalizeCellYearDependencies(budgetBranch.uid),
                    updateCellTimeScope: this.updateCellTimeScope(budgetBranch.uid),
                    updateCellChartSelection: this.updateCellChartSelection(budgetBranch.uid),
                    updateCellYearSelections: this.updateCellYearSelections(budgetBranch.uid),
                    changeTab: this.changeTab(budgetBranch.uid),
                    updateCellChartCode: this.updateCellChartCode(budgetBranch.uid),
                    updateNode: this.updateNode(budgetBranch.uid),

                    // pass-through
                    addNodeDeclaration: this.props.addNodeDeclaration,
                    addNodeDeclarations: this.props.addNodeDeclarations,
                    removeNodeDeclarations: this.props.removeNodeDeclarations,
                    changeViewpoint: this.props.changeViewpoint,
                    updateBranch: this.props.updateBranch,
                    changeVersion: this.props.changeVersion,
                    toggleInflationAdjusted: this.props.toggleInflationAdjusted,
                    updateProrata:this.props.updateProrata,
                    changeAspect: this.props.changeAspect,
                    incrementBranchDataVersion: this.props.incrementBranchDataVersion,
                    clearBranchStory: this.props.clearBranchStory,
                    toggleShowOptions: this.props.toggleShowOptions,
                    updateCellsDataseriesName: this.props.updateCellsDataseriesName,
                    resetLastAction: this.props.resetLastAction,
                    harmonizeCells: this.props.harmonizeCells,
                }

                let displayCallbackFunctions = { 
                    workingStatus: explorer.workingStatus,
                    // updateChartSelections: explorer.updateChartSelections(branchIndex),
                }

                // ----------------[ Contains ExplorerBranch ]-------------------------

                // console.log('explorer branchindex and stories',branchIndex,this.stories)

                return <Card initiallyExpanded 
                    key = {budgetBranch.uid}
                    onExpandChange = {(expanded) => {
                        this.onExpandChange(expanded)
                    }}
                    >

                    {(budgetBranches.length > 1)?<CardTitle
                        actAsExpander={false}
                        showExpandableButton={false} >

                        {"Row " + (branchIndex + 1 ) + " "} 
                        <input 
                            defaultValue = {this.stories?this.stories[branchIndex].title:''}
                            type="text" 
                            style={{width:'350px',fontWeight:'bold',fontSize:'14px'}}
                            onClick = {(ev) => {ev.stopPropagation()}}
                        />

                        <IconButton
                            style={{
                                float:"right",
                                marginRight:"30px"
                            }}
                            disabled = {(branchIndex == (budgetBranches.length - 1))}
                            onTouchTap = { 
                                (uid => 
                                    ev => {
                                        ev.stopPropagation()
                                        this.branchMoveDown(uid)
                                    }
                                )(budgetBranch.uid)
                            }
                            tooltip= "Move down"
                            >

                            <FontIcon
                                className="material-icons"
                                style = {{ cursor: "pointer" }} >

                                arrow_downward

                            </FontIcon>

                        </IconButton>
                        <IconButton
                            style={{
                                float:"right"
                            }}
                            disabled = {(branchIndex == 0)}
                            onTouchTap = { 
                                (uid => 
                                    ev => {
                                        ev.stopPropagation()
                                        this.branchMoveUp(uid)
                                    }
                                )(budgetBranch.uid)
                            }
                            tooltip= "Move up"
                            >

                            <FontIcon
                                className="material-icons"
                                style = {{ cursor: "pointer" }} >

                                arrow_upward

                            </FontIcon>

                        </IconButton>

                    </CardTitle>:null}

                    <CardText expandable = {false}>
                    <ExplorerBranch 
                        budgetBranch = { budgetBranch }
                        declarationData = { explorer.props.declarationData }
                        globalStateActions = { actionFunctions }
                        displayCallbacks = { displayCallbackFunctions }
                        urlparms = { urlparms }
                        clearUrlParms = {this.clearUrlParms}
                        clearStories = {this.clearStories}
                        setToast = {this.setToast}
                        handleSearchDialogOpen = {this.handleSearchDialogOpen}
                        onCallAnalystNotes = {this.onCallAnalystNotes}
                        onCallViewTaxonomy = {this.onCallViewTaxonomy}
                    />
                    </CardText>
                    <CardActions expandable = {false}>
                        <FloatingActionButton
                            onTouchTap = {
                                (uid => () => {
                                    this.addBranch(uid)
                                })(budgetBranch.uid)
                            }
                        >
                            <ContentAdd />
                        </FloatingActionButton>
                        {( budgetBranches.length > 1 )?<FloatingActionButton 
                            onTouchTap = {
                                (uid => () => {
                                    this.removeBranch(uid)
                                })(budgetBranch.uid)
                            }
                            secondary={true}>
                            <ContentRemove />
                        </FloatingActionButton>:null}
                    </CardActions>

                </Card >
            })

            return segments
        }
        // -----------[ COMBINE SEGMENTS ]---------------

        let branches = branchSegments()

        return <div>

        <div style={
            {
                backgroundColor:"lemonchiffon",
                padding:"3px",
                margin:"3px",
                borderRadius:"8px",
                fontFamily:"Roboto,sans-serif",
                fontSize:"12px",
            }
        } >
        PLEASE READ NOTICES BELOW. Caution: This is a very early version of the Budgetpedia Explorer. The data presented in these charts should be treated as approximations.
        There are numerous data source quality and continuity issues, the intake process has not been
        validated, and the data presented has not been rigorously verified against source data.</div>

        <Card 
        >

            <CardTitle
                actAsExpander
                showExpandableButton >

                Budget Explorer

            </CardTitle>
            <CardText expandable >

                <div style={{ display:'inline-block',verticalAlign:'top'}}>
                    <div>
                    <span style={{lineHeight:'48px',verticalAlign:'23px'}} >Explore charts below, or select an area of interest: </span>
                    <DropDownMenu
                            style = {{verticalAlign:'top'}}
                            value = {this.state.selectStoryboard}
                            onChange = {(event, index, value) => {
                                this.onSelectStoryboard(value)
                            }}
                        >

                        <MenuItem value = {'SELECT'} primaryText = "Select" />
                        <MenuItem value={'SHARED'} primaryText={
                            <div style={{fontWeight:'bold'}} >General Services</div>} />
                            <MenuItem value={"WASTE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Solid Waste Management</div>
                            }/>
                            <MenuItem value={"WATER"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Toronto Water</div>
                            }/>
                            <Divider inset />
                            <MenuItem value={"TTC"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >TTC</div>
                            }/>
                            <MenuItem value={"WHEELTRANS"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Wheel Trans</div>
                            }/>
                            <MenuItem value={"TRANSPORTATION"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Transportation (Roads)</div>
                            }/>
                            <MenuItem value={"PARKING"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Parking</div>
                            }/>
                            <Divider inset />
                            <MenuItem value={"PFRACTIVITIES"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Parks, Forestry & Activity Centres</div>
                            }/>
                            <MenuItem value={"LIBRARY"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Toronto Public Library</div>
                            }/>
                            <MenuItem value={"ATTRACTIONS"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Public Attractions</div>
                            }/>
                            <MenuItem value={"CONSERVHERITAGE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Conservation & Heritage</div>
                            }/>

                        <MenuItem value={'SUPPORT'} primaryText={
                            <div style={{fontWeight:'bold'}} >Citizen Support Services</div>} />
                            <MenuItem value={"FIRE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Fire</div>
                            }/>
                            <MenuItem value={"PARAMEDICS"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Paramedics</div>
                            }/>
                            <MenuItem value={"POLICE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Policing & Court Services</div>
                            }/>
                            <Divider inset />
                            <MenuItem value={"EMPLOYMENT"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Income Support Services</div>
                            }/>
                            <MenuItem value={"HOUSING"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Housing Support Services</div>
                            }/>
                            <MenuItem value={"CHILDREN"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Children's Services</div>
                            }/>
                            <Divider inset />
                            <MenuItem value={"HEALTH"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Public Health</div>
                            }/>
                            <MenuItem value={"LONGTERMCARE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Long Term Care</div>
                            }/>
                        <MenuItem value={'ADMINISTRATIVE'} primaryText={
                            <div style={{fontWeight:'bold'}} >Administrative Services</div>} />
                            <MenuItem value={"COUNCIL"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Corporate Management</div>
                            }/>
                            <MenuItem value={"PLANNING"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Planning & Development</div>
                            }/>
                            <MenuItem value={"PERMITS"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Permits, Licencing & Standards</div>
                            }/>
                            <Divider inset />
                            <MenuItem value={"INTERNAL"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Internal Services</div>
                            }/>
                            <MenuItem value={"CORPORATE"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Corporate Accounts (Finance)</div>
                            }/>
                        <MenuItem disabled value={'SPECIAL'} primaryText={
                            <div style={{fontWeight:'bold'}} >Special Analytics</div>} />
                            <MenuItem value={"STAFFING"} primaryText = {
                                <div style={{paddingLeft:"20px"}} >Staffing costs</div>
                            }/>

                    </DropDownMenu>
                    <RaisedButton
                        disabled = {this.state.selectStoryboard=='SELECT'}
                        type="button"
                        style={{margin:'3px 6px 0 0',verticalAlign:'23px'}}
                        label="Share"
                        onTouchTap={this.shareStoryboard} 
                        labelPosition="before"
                        icon = {<FontIcon 
                            style={{color:'rgba(0,0,0,0.5)'}}
                            className="material-icons">share</FontIcon>}
                    />
                    <RaisedButton
                        style = {{ verticalAlign:'25px' }}
                        type="button"
                        label="Reset"
                        onTouchTap={
                            () => {
                                this.resetBranches()
                            }
                        } 
                    />    
                    </div>
                    <div>
                    For some background see {showhelp} or {showvideos} or {showanalystnotes}
                    </div>            
                </div>
                <div></div>
            </CardText>
        </Card>
        
            { dialogbox }

            { this.storyboardDialog() }

            { this.analystNotesDialog() }

            { this.viewTaxonomyDialog() }

            {this.state.searchDialogOpen?<SearchDialog
                onRequestClose = {this.handleSearchDialogClose}
                onConfirm = {this.findParameters.applySearchBranchSettings}
            />:null}

            { branches }

        </div>
    }

}
// ====================================================================================
// ------------------------------[ INJECT DATA STORE ]---------------------------------

let mapStateToProps = state => ({ 
    declarationData:getExplorerDeclarationData(state), 
})

// initialize all these call backs with dispatch

Explorer = connect(mapStateToProps, {
    // presentation
    showWaitingMessage: Actions.showWaitingMessage,
    hideWaitingMessage: Actions.hideWaitingMessage,
    onetimeNotification: ExplorerActions.onetimeNotification,
    // toggleShowControls

    // branch actions - components
    addBranchDeclaration:ExplorerActions.addBranchDeclaration,
    cloneBranchDeclaration:ExplorerActions.cloneBranchDeclaration,
    removeBranchDeclaration: ExplorerActions.removeBranchDeclaration,
    removeBranches: ExplorerActions.removeBranches,
    addNodeDeclaration:ExplorerActions.addNodeDeclaration,
    addNodeDeclarations: ExplorerActions.addNodeDeclarations,
    removeNodeDeclarations:ExplorerActions.removeNodeDeclarations,
    addCellDeclarations:ExplorerActions.addCellDeclarations,
    normalizeCellYearDependencies: ExplorerActions.normalizeCellYearDependencies,
    harmonizeCells: ExplorerActions.harmonizeCells,
    // removeCellDeclarations:ExplorerActions.removeCellDeclarations,

    // branch actions - variations
    changeViewpoint: ExplorerActions.changeViewpoint,
    updateBranch: ExplorerActions.updateBranch,
    changeVersion: ExplorerActions.changeVersion,
    changeAspect: ExplorerActions.changeAspect,
    toggleInflationAdjusted: ExplorerActions.toggleInflationAdjusted,
    updateProrata: ExplorerActions.updateProrata,
    incrementBranchDataVersion: ExplorerActions.incrementBranchDataVersion,
    clearBranchStory: ExplorerActions.clearBranchStory,
    toggleShowOptions: ExplorerActions.toggleShowOptions,
    resetLastAction: ExplorerActions.resetLastAction,
    // toggleInflationAdjustment
    branchMoveUp: ExplorerActions.branchMoveUp,
    branchMoveDown: ExplorerActions.branchMoveDown,

    // node actions
    changeTab: ExplorerActions.changeTab,

    // cell actions
    updateCellTimeScope: ExplorerActions.updateCellTimeScope,
    updateCellChartSelection: ExplorerActions.updateCellChartSelection,
    updateCellYearSelections: ExplorerActions.updateCellYearSelections,
    // updateCellsDataseriesName: ExplorerActions.updateCellsDataseriesName,
    updateCellChartCode: ExplorerActions.updateCellChartCode,
    updateNode: ExplorerActions.updateNode,
    // toggleDelta
    // toggleVariance
    
})(Explorer)

export default Explorer

