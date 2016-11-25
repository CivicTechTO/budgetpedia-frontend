// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// explorer.tsx

/*
    BUG: in _getBranchCloneSettings unselect parent child creates 'data not availble in child branch'
    BUG: 'Working' sign persists when click fails to drill down,
        such as when staff aspect is selected and max depth is reached
    BUG: navigating to dialog help box loses bar selection
    TODO: 
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

/// <reference path="../../../typings-custom/react-google-charts.d.ts" />
/// <reference path="../../../typings-custom/react-slider.d.ts" />
/// <reference path="../../../typings-custom/general.d.ts" />
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
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
// import Popover from 'material-ui/Popover'
import Toggle from 'material-ui/Toggle'
import {toastr} from 'react-redux-toastr'
let uuid = require('node-uuid') // use uuid.v4() for unique id
let jsonpack = require('jsonpack')

import ExplorerBranch from './components/explorerbranch'

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
    findDialogOpen?:boolean,
    findDialogAspect?:string,
    showdashboard?: boolean
}

let Explorer = class extends Component< ExplorerProps, ExplorerState > 
{

    // ---------------------[ Initialize ]-------------------------

    state = {
        budgetBranches:[],
        dialogOpen: false,
        showdashboard:false,
        findDialogOpen: false,
        findDialogAspect:'expenses',
    }

    toastrmessages = {
        error:null,
        warning:null,
        success:null,
        info:null,
    }

    setToast = (version,message) => {
        this.toastrmessages[version] = message
    }

    // ----------------------------[ Lifecycle operations ]-------------------------------

    urlparms:any = null

    clearUrlParms = () => {
        this.urlparms = null
    }

    componentWillMount() {

        // console.log('explorer props location.query',this.props.location.query)

        if (!this.props.declarationData.onetimenotification) {
            this.toastrmessages.info = "Click or tap on any chart column to drill down (except as noted)."
            this.props.onetimeNotification()
        }

        this.getAllFindLookups().then(data => {
            // console.log('sourcedata', data)
            this.findChartLookups = this.processFindChartLookups(data)
            // console.log('lookupdata set',this.findChartLookups)
        }).catch(reason => {
            toastr.error('Error loading finder lookups: ' + reason)
        })


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

    // ------------------------[ andcillary ui ]---------------------------

    handleDialogOpen = (e) => {
        e.stopPropagation()
        e.preventDefault()
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

        // console.log('branch clone',refbranchuid,cloneSettings)

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

    // ==================[ FIND CHART ]=======================

    private finderLookupPromise = path => {
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

    getAllFindLookups = () => {
        let summaryPromise = this.finderLookupPromise('datasets/summary/lookups/lookups.json')
        let pbftPromise = this.finderLookupPromise('datasets/pbft/lookups/lookups.json')
        let actualExpensesPromise = this.finderLookupPromise('datasets/actualexpenses/lookups/lookups.json')
        let actualRevenuesPromise = this.finderLookupPromise('datasets/actualrevenues/lookups/lookups.json')
        let expensesByObjectPromise = this.finderLookupPromise('datasets/expenditures/lookups/lookups.json')

        let functionalViewpointPromise = this.finderLookupPromise('viewpoints/functional.json')
        let structuralViewpointPromise = this.finderLookupPromise('viewpoints/structural.json')
        let actualExpensesViewpointPromise = this.finderLookupPromise('viewpoints/actualexpenses.json')
        let actualRevenuesViewpointPromise = this.finderLookupPromise('viewpoints/actualrevenues.json')
        let expendituresViewpointPromise = this.finderLookupPromise('viewpoints/expenditures.json')

        let promise = new Promise((resolve,reject) => {
            Promise.all(
                [
                    summaryPromise,
                    pbftPromise,
                    actualExpensesPromise,
                    actualRevenuesPromise,
                    expensesByObjectPromise,

                    functionalViewpointPromise,
                    structuralViewpointPromise,
                    actualExpensesViewpointPromise,
                    actualRevenuesViewpointPromise,
                    expendituresViewpointPromise,
                ]
            ).then( values => {

                // pick out viewpint lookups from viewpoint structures
                for (let i = 5; i < 10; i++) {
                    values[i] = values[i]['Meta'].Lookups
                }

                let lookups:{datasets:any,viewpoints:any}
                lookups = {
                    datasets:{
                        summarybudgets:values[0],
                        detailedbudgets:values[1],
                        auditedexpenses:values[2],
                        auditedrevenues:values[3],
                        auditedexpenditures:values[4],
                    },
                    viewpoints: {
                        functionalbudget:values[5],
                        structuralbudget:values[6],
                        actualexpenses:values[7],
                        actualrevenues:values[8],
                        expenditures:values[9],
                    }
                }

                resolve(lookups)

            }).catch(reason => {

                reject(reason)

            })
        })

        return promise

    }

    getFindAspectLookups = () => {
        let explorer = this
        if (!explorer.findChartLookups) {
            explorer.findAspectChartLookups = null
            return
        }
        let sourcelist = explorer.findChartLookups
        // console.log('sourcelist',sourcelist)
        let targetlist = []
        let aspect = explorer.state.findDialogAspect
        for (let item of sourcelist) {
            // console.log('item',item)
            if (item.aspects[aspect]) {
                targetlist.push(item)
            }
        }
        explorer.findAspectChartLookups = targetlist
    }

    findChartLookups: any = null

    findAspectChartLookups: any = null

    // coerce raw lookup data into form suitable for autofill field
    /*
        viewpoint
        dataset
        aspects:{}
        dimension
        code
        name
        value
    */
    findDictionary = {
        // viewpoints
        structuralbudget:'Structural Budget',
        functionalbudget:'Functional Budget',
        actualexpenses:'Actual Expenses',
        actualrevenues:'Actual Revenues',
        expenditures:'Expenses by Object',
        // sources
        auditedrevenues:'Audited Statements',
        auditedexpenses:'Audited Statements',
        auditedexpenditures:'Audited Statements',
        detailedbudgets:'Detailed Budgets',
        summarybudgets:'Summary Budgets',
        // levels
        Taxonomy:'Taxonomy',
        auditedexpense:"Expenses",
        auditedrevenue:"Revenues",
        program:'Programs',
        service:'Services',
        activity:'Activities',
        expense:'Expenditures',
        revenue:'Receipts',
        permanence:'Permanence',
        expenditure:"Expenses",        
    }
    
    processFindChartLookups = data => {

        let lookups = []
        let {viewpoints, datasets } = data
        // default viewpoints
        let sourceviewpoints = {
            auditedexpenses:'actualexpenses',
            auditedrevenues:'actualrevenues',
            auditedexpenditures:'expenditures',
            detailedbudgets:'functionalbudget',
            summarybudgets:'functionalbudget',
        }
        let alternatesourceviewpoints = {
            detailedbudgets:'structuralbudget',
            summarybudgets:'structuralbudget',
        }
        let sourceaspects = {
            auditedexpenses:{expenses:true},
            auditedrevenues:{revenues:true},
            auditedexpenditures:{expenses:true},
            detailedbudgets:{expenses:true,revenues:true,staffing:true},
            summarybudgets:{expenses:true,revenues:true,staffing:true},
        }
        let dictionary = this.findDictionary
        for (let datasetname in datasets) {
            let dataset = datasets[datasetname]
            for (let dimensionname in dataset) {
                let dimension = dataset[dimensionname]
                if (datasetname == 'detailedbudgets') {
                    // console.log('processing detailed budgets for dimension',dimensionname)
                    switch (dimensionname) {
                        case 'activity':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:false}
                            break
                        case 'expense':sourceaspects.detailedbudgets = {expenses:true,revenues:false,staffing:false}
                            break
                        case 'permanence':sourceaspects.detailedbudgets = {expenses:false,revenues:false,staffing:true}
                            break
                        case 'program':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:true}
                            break
                        case 'revenue':sourceaspects.detailedbudgets = {expenses:false,revenues:true,staffing:false}
                            break
                        case 'service':sourceaspects.detailedbudgets = {expenses:true,revenues:true,staffing:false}
                            break
                    }
                }
                let dimensionlookupname
                if (datasetname == 'auditedrevenues') {
                    dimensionlookupname = 'auditedrevenue'
                } else if (datasetname == 'auditedexpenses') {
                    dimensionlookupname = 'auditedexpense'
                } else {
                    dimensionlookupname = dimensionname
                }
                for (let code in dimension) {
                    let name = dimension[code]
                    let selection = {
                        viewpoint:sourceviewpoints[datasetname],
                        datasource:datasetname,
                        aspects:sourceaspects[datasetname],
                        dimension:dimensionname,
                        code,
                        name,
                        value:(
                            <MenuItem style={{whiteSpace:'normal',lineHeight:'150%'}}
                                >
                                <div><span style={{fontWeight:"bold"}}>{name}</span></div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>viewpoint: {dictionary[sourceviewpoints[datasetname]]}</span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>level: {dictionary[dimensionlookupname]} </span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}} >source: {dictionary[datasetname]}</span>
                                </div>
                            </MenuItem>
                            )
                    }
                    lookups.push(selection)
                    // including structuralviewpoint for all relevant choices is annoying (duplicates)
                    //  suppress for now
                    // if (datasetname == 'detailedbudgets' || datasetname == 'summarybudgets') {

                    //     let selection = {
                    //         viewpoint:alternatesourceviewpoints[datasetname],
                    //         datasource:datasetname,
                    //         aspects:sourceaspects[datasetname],
                    //         dimension:dimensionname,
                    //         code,
                    //         name,
                    //         value:(
                    //             <MenuItem primaryText={<span style={{fontStyle:"italic",color:"gray"}}>viewpoint: {dictionary[alternatesourceviewpoints[datasetname]]}</span>}
                    //                 secondaryText={<span style={{fontStyle:"italic",color:"gray"}}>level: {dictionary[dimensionname]} </span>}>
                    //                 <div>
                    //                 <span style={{fontWeight:"bold"}}>{name}</span> <span style={{float:"right",fontStyle:"italic",color:"gray"}} >source: {dictionary[datasetname]}</span>
                    //                 </div>
                    //             </MenuItem>
                    //             )
                    //     }
                    //     lookups.push(selection)

                    // }
                }
            }
        }

        // default viewpoint sources
        let viewpointsources = {
            actualexpenses:'auditedexpenses',
            actualrevenues:'auditedrevenues',
            expenditures:'auditedexpenditures',
            functionalbudget:'summarybudgets',
            structuralbudget:'summarybudgets',
        }
        let viewpointaspects = {
            actualexpenses:{expenses:true},
            actualrevenues:{revenues:true},
            expenditures:{expenses:true},
            functionalbudget:{expenses:true,revenues:true,staffing:true},
            structuralbudget:{expenses:true,revenues:true,staffing:true},
        }
        for (let viewpointname in viewpoints) {
            let viewpoint = viewpoints[viewpointname]
            for (let dimensionname in viewpoint) {
                let dimension = viewpoint[dimensionname]
                for (let code in dimension) {
                    let name = dimension[code]
                    let selection = {
                        viewpoint:viewpointname,
                        datasource:viewpointsources[viewpointname],
                        aspects:viewpointaspects[viewpointname],
                        dimension:dimensionname,
                        code,
                        name,
                        value:(
                            <MenuItem style={{whiteSpace:'normal',lineHeight:'150%'}}
                                >
                                <div>
                                <span style={{fontWeight:"bold"}}>{name}</span> 
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>viewpoint: {dictionary[viewpointname]}</span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}}>level: {dictionary[dimensionname]} </span>
                                </div>
                                <div style={{display:'inline-block',whiteSpace:'nowrap',paddingRight:'20px'}} >
                                <span style={{fontStyle:"italic",color:"gray"}} >source: {dictionary[viewpointsources[viewpointname]]}</span>
                                </div>
                            </MenuItem>
                            )
                    }
                    lookups.push(selection)
                }
            }
        }

        return lookups
        
    }

    findChart = () => {
        let findParms:{} = {}
        this.setState({
            findDialogOpen: true
        })
    }

    findApplyChart = () => {
        let explorer = this
        explorer.handleFindDialogClose()
        let selection = explorer.findSelection
        let parms = {
            viewpoint:selection.viewpoint,
            source:selection.source,
            level:selection.level,
            code:selection.code,
            aspect:explorer.state.findDialogAspect,
            name:selection.name,
        }
        explorer.findParameters.parms = parms
        explorer.findParameters.callback(parms)
    }

    findParameters = {
        callback:null,
        parms:null,
    }   

    handleFindDialogOpen = (e,callback) => {
        e.stopPropagation()
        e.preventDefault()
        this.findParameters.callback = callback
        this.findResetSelection()
        this.findChart()
    }

    handleFindDialogClose = () => {
        this.setState({
            findDialogOpen: false
        })
    }

    onChangeFindAspect = (e,value) => {
        this.findAspectChartLookups = null
        this.findClearSearchText()
        this.findResetSelection()
        this.setState({
            findDialogAspect:value
        })
    }

    findResetSelection = () => {
        this.findSelection = {
            known:false,
            viewpoint:null,
            viewpointdisplay:'?',
            source:null,
            sourcedisplay:'?',
            level:null,
            leveldisplay:'?',
            code:null,
            name:null,
        }
    }

    findOnNewRequest = (chosenRequest, index) => {
        if (index == -1) {
            this.findResetSelection()
        } else {
            let item = this.findAspectChartLookups[index]
            let dictionary = this.findDictionary
            // console.log('selected item',item)
            this.findSelection = {
                known:true,
                level:item.dimension,
                leveldisplay:dictionary[item.dimension],
                source:item.datasource,
                sourcedisplay:dictionary[item.datasource],
                viewpoint: item.viewpoint,
                viewpointdisplay:dictionary[item.viewpoint],
                code:item.code,
                name:item.name,
            }
            this.forceUpdate()
        }
    }

    findClearSearchText = () => {
        let instance:any = this.refs['autocomplete']
        instance.setState({searchText:''});
        instance.focus();
    }

    findSelection = {
        known:false,
        viewpoint:null,
        viewpointdisplay:'?',
        source:null,
        sourcedisplay:'?',
        level:null,
        leveldisplay:'?',
        code:null,
        name:null,
    }

    findOnUpdateInput = () => {
        if (this.findSelection.known) {
            this.findResetSelection()
            this.forceUpdate()
        }
    }

    findDialog = () => (
        <Dialog
            title = {<div style = {{padding:'12px 0 0 12px'}} >Find a Chart</div>}
            modal = { false }
            open = { this.state.findDialogOpen }
            onRequestClose = { this.handleFindDialogClose }
            autoScrollBodyContent = {false}
            contentStyle = {{maxWidth:'600px'}}
            autoDetectWindowHeight = {false}
        >
            <div>
                <AutoComplete
                  style = {{width:'100%'}}
                  ref={'autocomplete'}
                  floatingLabelText="type in a key word, then select a list item"
                  filter={AutoComplete.caseInsensitiveFilter}
                  dataSource={this.findAspectChartLookups || []}
                  dataSourceConfig = {{text:'name',value:'value'}}
                  fullWidth = {true}
                  menuStyle = {{maxHeight:"300px"}}
                  openOnFocus = {false}
                  maxSearchResults = {60}
                  onNewRequest = {this.findOnNewRequest}
                  onUpdateInput = {this.findOnUpdateInput}
                />
                <RadioButtonGroup 
                    valueSelected= {this.state.findDialogAspect} 
                    name="findchart"
                    onChange = { this.onChangeFindAspect }
                >
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="expenses"
                    label="expenses"
                  />
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="revenues"
                    label="revenues"
                  />
                  <RadioButton
                    style={{display:'inline-block',width:'auto',marginRight:'50px'}}
                    value="staffing"
                    label="staffing"
                  />
                </RadioButtonGroup>
            </div>
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
                onTouchTap={ this.handleFindDialogClose } >

                <FontIcon
                    className="material-icons"
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>

            <div style={{padding:"8px"}} >
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>viewpoint: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.viewpointdisplay }</span>
                </div>
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>level: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.leveldisplay}</span>
                </div>
                <div style={{whiteSpace:'nowrap',display:'inline-block'}}>
                    <span style={{color:'silver',fontStyle:'italic'}}>source: </span> 
                    <span style={{color:this.findSelection.known?'black':'silver',marginRight:'50px',fontStyle:'italic'}}>{this.findSelection.sourcedisplay}</span>
                </div> 
            </div>

            <div>
                <RaisedButton disabled = { !this.findSelection.known }
                    onTouchTap = {() => {
                        this.findApplyChart()
                    }}
                    label="Apply" primary={ true } style={{marginRight:"50px"}} />
                <RaisedButton disabled = { false }
                    onTouchTap = {() => (this.handleFindDialogClose())}
                    label="Cancel" secondary={true} />
            </div>
            <div style={{height:'200px'}}></div>
        </Dialog >)


    // ===================================================================
    // ---------------------------[ Render ]------------------------------ 

    render() {

        let explorer = this

        if (this.state.findDialogOpen && !this.findAspectChartLookups) {
            this.getFindAspectLookups()
        }

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
                    // this.urlparms = null // pass once only
                    // console.log('branchIndex, urlparms in explorer map branches',branchIndex,urlparms)
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

                return <Card initiallyExpanded 
                    key = {budgetBranch.uid}
                    onExpandChange = {(expanded) => {
                        this.onExpandChange(expanded)
                    }}
                    >

                    <CardTitle
                        actAsExpander={false}
                        showExpandableButton={false} >

                        {"Row " + (branchIndex + 1 ) + " "} 
                        <input 
                            type="text" 
                            onTouchTap = {(ev) => {ev.stopPropagation()}}
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

                    </CardTitle>

                    <CardText expandable = {false}>
                    <ExplorerBranch 
                        budgetBranch = { budgetBranch }
                        declarationData = { explorer.props.declarationData }
                        globalStateActions = { actionFunctions }
                        displayCallbacks = { displayCallbackFunctions }
                        handleDialogOpen = {this.handleDialogOpen}
                        urlparms = { urlparms }
                        clearUrlParms = {this.clearUrlParms}
                        setToast = {this.setToast}
                        handleFindDialogOpen = {this.handleFindDialogOpen}
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
        Caution: This is a very early version of the Budgetpedia Explorer. The data presented in these charts should be treated as approximations.
        There are numerous data source quality and continuity issues, the intake process has not been
        validated, and the data presented has not been rigorously verified against source data.</div>

        <Card expanded = {this.state.showdashboard}>

            <CardTitle>

                {
                // <Toggle 
                //     label={'Show dashboard:'} 
                //     toggled = {this.state.showdashboard}
                //     style={{
                //         height:'32px', float:"right",
                //         display:"inline-block",
                //         width:'auto',
                //     }} 
                //     labelStyle = {{fontStyle:'italic'}} 
                //     onToggle = { (e,value) => {
                //         e.stopPropagation()
                //         this.setState({
                //             showdashboard:value
                //         })
                //     }}/>
                }

                Budget Explorer

            </CardTitle>
            <CardText expandable >

                <span style= {{fontStyle:'italic'}}>[content to be determined]</span>
            </CardText>
        </Card>
        
            { dialogbox }

            { this.findDialog() }

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

