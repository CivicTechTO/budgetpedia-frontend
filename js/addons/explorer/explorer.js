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
'use strict';
import * as React from 'react';
var { Component } = React;
// doesn't require .d.ts...! (reference available in index.tsx)
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import DropDownMenu from 'material-ui/DropDownMenu';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';
import { toastr } from 'react-redux-toastr';
import Loadable from 'react-loadable';
import { Link } from 'react-router-dom';
let uuid = require('node-uuid'); // use uuid.v4() for unique id
let jsonpack = require('jsonpack');
let ReactGA = require('react-ga');
var { Chart } = require('../../../forked_modules/react-google-charts/Chart.js');
// import ExplorerBranch from './components/explorerbranch'
// import SearchDialog from './components/searchdialog'
const Loading = () => React.createElement("div", null, "Loading...");
const ExplorerBranch = Loadable({
    loader: () => import(/* webpackChunkName: "ExplorerBranch" */ './components/explorerbranch'),
    loading: Loading,
});
const SearchDialog = Loadable({
    loader: () => import(/* webpackChunkName: "SearchDialog" */ './components/searchdialog'),
    loading: Loading,
});
// import * as Actions from '../../core/actions/actions'
import * as ExplorerActions from './actions';
import BudgetBranch from './classes/branch.class';
import { getExplorerDeclarationData } from './reducers';
import dialogcontent from './content/helpcontent';
import * as Utilities from './modules/utilities';
let Explorer = class extends Component {
    constructor() {
        // ---------------------[ Initialize ]-------------------------
        super(...arguments);
        this.state = {
            budgetBranches: [],
            dialogOpen: false,
            searchDialogOpen: false,
            storyboardDialogOpen: false,
            analystNotesDialogOpen: false,
            viewTaxonomyDialogOpen: false,
            selectStoryboard: 'SELECT',
        };
        this.toastrmessages = {
            error: null,
            warning: null,
            success: null,
            info: null,
        };
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
        this.logEvent = (parms) => {
            if (window.location.hostname == 'budgetpedia.ca') {
                ReactGA.event(parms);
            }
        };
        this.setToast = (version, message) => {
            this.toastrmessages[version] = message;
        };
        // ----------------------------[ Lifecycle operations ]-------------------------------
        this.urlparms = null;
        this.clearUrlParms = () => {
            this.urlparms = null;
        };
        this.stories = null;
        this.storiescleared = [];
        this.clearStories = (branch) => {
            this.storiescleared.push(branch);
            if (this.storiescleared.length == this.stories.length) {
                this.stories = null;
                this.storiescleared = [];
                this.setState({
                    storyboardDialogOpen: false,
                });
            }
        };
        this.storyboardDialog = () => (React.createElement(Dialog, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } }, "Your storyboard is being prepared"), modal: true, open: this.state.storyboardDialogOpen, autoScrollBodyContent: false, contentStyle: { maxWidth: '600px' }, autoDetectWindowHeight: false },
            React.createElement("div", null,
                "please wait while the charts are rendered...",
                React.createElement("br", null),
                "Toggle any row's \"Show chart controls\" to experiment with settings for that row",
                React.createElement(LinearProgress, { mode: "indeterminate" }))));
        this.getUrlParameter = name => {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
        /*
            harmonizeBranches creates branches to match branch declarations
            called from componentWillMount for initialization of imported datasets
            and from componentWillReceiveProps to modify branch list
        */
        this.harmonizeBranchesToState = (budgetBranches, branchList, branchesById) => {
            // reset state branches if a change is made
            let change = false;
            // delete branches that are no longer required
            let newBranches = budgetBranches.filter((branch) => {
                return !!branchesById[branch.uid];
            });
            if (newBranches.length != budgetBranches.length) {
                change = true;
            }
            // add branches not yet created
            // let length = newBranches.length
            for (let i = 0; i < branchList.length; i++) {
                let uid = branchList[i];
                let foundbranch = newBranches.filter(branch => {
                    if (branch.uid == uid)
                        return branch;
                });
                if (foundbranch.length == 0) { // branch not found, so add it
                    if (!change)
                        change = true;
                    let budgetBranch = new BudgetBranch({ uid });
                    newBranches.push(budgetBranch);
                }
            }
            // sort branches into correct order, per state branchlist
            let sortedBranches = [];
            for (let i = 0; i < branchList.length; i++) {
                let uid = branchList[i];
                let foundbranch = newBranches.filter(branch => {
                    if (branch.uid == uid)
                        return branch;
                });
                if (!(foundbranch.length == 1)) {
                    console.error('System error -- unexpected mismatch between state branch list and explorer branch list', branchList, newBranches);
                    throw Error('System error -- unexpected mismatch between state branch list and explorer branch list');
                }
                sortedBranches.push(foundbranch[0]);
            }
            if (!change) {
                for (let i = 0; i < budgetBranches.length; i++) {
                    if (budgetBranches[i].uid != sortedBranches[i].uid) {
                        change = true;
                        break;
                    }
                }
            }
            if (change) {
                this.setState({
                    budgetBranches: sortedBranches,
                });
            }
        };
        // ------------------------[ ancillary ui ]---------------------------
        this.handleDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.logEvent({
                category: 'Explorer',
                action: 'Show help',
            });
            this.setState({
                dialogOpen: true
            });
        };
        this.handleDialogClose = () => {
            this.setState({
                dialogOpen: false
            });
        };
        // ---------------[ create action calls versions for currying (branchid) ]---------------
        // node consumer
        this.updateNode = branchuid => nodeuid => this.props.updateNode(branchuid, nodeuid);
        this.changeTab = branchuid => (nodeuid, tabvalue) => this.props.changeTab(branchuid, nodeuid, tabvalue);
        this.addCellDeclarations = branchuid => (nodeuid, settingslist) => this.props.addCellDeclarations(branchuid, nodeuid, settingslist);
        this.normalizeCellYearDependencies = branchuid => (nodeuid, cellList, yearsRange) => this.props.normalizeCellYearDependencies(branchuid, nodeuid, cellList, yearsRange);
        // cell consumer
        this.updateCellTimeScope = branchuid => nodeuid => (celluid, selection) => this.props.updateCellTimeScope(branchuid, nodeuid, celluid, selection);
        this.updateCellChartSelection = branchuid => nodeuid => (celluid, selection) => this.props.updateCellChartSelection(branchuid, nodeuid, celluid, selection);
        this.updateCellYearSelections = branchuid => nodeuid => (leftyear, rightyear) => this.props.updateCellYearSelections(branchuid, nodeuid, leftyear, rightyear);
        this.updateCellChartCode = branchuid => nodeuid => (celluid, explorerChartCode) => this.props.updateCellChartCode(branchuid, nodeuid, celluid, explorerChartCode);
        // ----------------------------[ ui responses ]------------------------------
        this.onExpandChange = (expanded) => {
            return;
            // TODO: change background color of title if it is collapsed
            // this.props.resetLastAction()
        };
        this.branchMoveUp = branchuid => {
            this.props.branchMoveUp(branchuid);
        };
        this.branchMoveDown = branchuid => {
            this.props.branchMoveDown(branchuid);
        };
        this._getBranchCloneSettings = refbranchid => {
            let declarationData = this.props.declarationData;
            let clones = {
                branch: {},
                nodes: {},
                cells: {},
            };
            let uidmap = {};
            // clone branch
            uidmap[refbranchid] = uuid.v4();
            clones.branch[refbranchid] = this._getClone(declarationData.branchesById[refbranchid]);
            // console.log('clones', clones)
            // clone branch nodes
            for (let nodeid of clones.branch[refbranchid].nodeList) {
                let nodeobject = declarationData.nodesById[nodeid];
                // console.log('nodeobject', nodeobject)
                clones.nodes[nodeid] = this._getClone(nodeobject);
                uidmap[nodeid] = uuid.v4();
            }
            // clone node cells
            for (let nodeid in clones.nodes) {
                for (let cellid of clones.nodes[nodeid].cellList) {
                    clones.cells[cellid] = this._getClone(declarationData.cellsById[cellid]);
                    uidmap[cellid] = uuid.v4();
                    clones.cells[cellid].celluid = uidmap[cellid]; // TODO: this reference shouldn't be in cell declaration!!
                }
            }
            // console.log('cell clones',clones.cells)
            // map old uid's to new uid's
            let newclones = {
                newbranchid: uidmap[refbranchid],
                branch: {},
                nodes: {},
                cells: {},
            };
            let newrefbranchid = uidmap[refbranchid];
            newclones.branch[newrefbranchid] = clones.branch[refbranchid];
            let oldlist = newclones.branch[newrefbranchid].nodeList;
            let newlist = [];
            for (let id of oldlist) {
                newlist.push(uidmap[id]);
            }
            newclones.branch[newrefbranchid].nodeList = newlist;
            for (let id in clones.nodes) {
                let newid = uidmap[id];
                let nodeclone = newclones.nodes[newid] = clones.nodes[id];
                let oldlist = nodeclone.cellList;
                let newlist = [];
                for (let cellid of oldlist) {
                    newlist.push(uidmap[cellid]);
                }
                nodeclone.cellList = newlist;
            }
            for (let oldid in clones.cells) {
                newclones.cells[uidmap[oldid]] = clones.cells[oldid];
            }
            return newclones;
        };
        this._getClone = object => {
            return JSON.parse(JSON.stringify(object));
        };
        this.addBranch = refbranchuid => {
            let cloneSettings = this._getBranchCloneSettings(refbranchuid);
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Add branch',
            });
            this.props.cloneBranchDeclaration(refbranchuid, cloneSettings);
            this.onCloneCreation();
        };
        // crude scroll down on branch clone
        this.onCloneCreation = () => {
            setTimeout(() => {
                let adjustment = 400;
                let frames = 60;
                let t = 1 / frames;
                let counter = 0;
                let base = 0;
                let tick = () => {
                    counter++;
                    let factor = this.easeOutCubic(counter * t);
                    let scrollinterval = adjustment * factor;
                    window.scrollBy(0, scrollinterval - base);
                    base = scrollinterval;
                    if (counter < frames) {
                        requestAnimationFrame(tick);
                    }
                };
                requestAnimationFrame(tick);
            }, 1000); // give charts some time to render and take up space
        };
        // TODO: should be in utilities
        // from https://github.com/DelvarWorld/easing-utils/blob/master/src/easing.js
        this.easeOutCubic = t => {
            const t1 = t - 1;
            return t1 * t1 * t1 + 1;
        };
        this.removeBranch = branchuid => {
            this.props.removeBranchDeclaration(branchuid);
        };
        this.removeBranches = () => {
            this.props.removeBranches();
        };
        this.findParameters = {
            applySearchBranchSettings: null
        };
        // ==================[ FIND CHART ]=======================
        this.handleSearchDialogOpen = (e, applySearchBranchSettings) => {
            e.stopPropagation();
            e.preventDefault();
            this.findParameters.applySearchBranchSettings = applySearchBranchSettings;
            // this.resetSelectionParameters()
            this.setState({
                searchDialogOpen: true
            });
        };
        this.handleSearchDialogClose = () => {
            this.setState({
                searchDialogOpen: false
            });
        };
        // =======================[ Storyboard Creation ]=====================
        this.storyBoards = null;
        this.getStoryboardsPromise = () => {
            let filespec = './db/repositories/toronto/storyboards/storyboards.json';
            let promise = new Promise((resolve, reject) => {
                fetch(filespec).then(response => {
                    if (response.ok) {
                        // console.log('response for ' + path,response)
                        try {
                            let json = response.json().then(json => {
                                resolve(json);
                            }).catch(reason => {
                                let msg = 'failure to resolve ' + filespec + ' ' + reason;
                                console.log(msg);
                                reject(msg);
                            });
                        }
                        catch (e) {
                            console.log('error ' + filespec, e.message);
                            reject('failure to load ' + filespec);
                        }
                    }
                    else {
                        reject('could not load file ' + filespec);
                    }
                }).catch(reason => {
                    reject(reason + ' ' + filespec);
                });
            });
            return promise;
        };
        this.onSelectStoryboard = (value) => {
            let showdialog = true;
            if (value == 'SELECT') {
                showdialog = false;
            }
            this.logEvent({
                category: 'Explorer',
                action: 'Select storyboard',
                label: value,
            });
            this.setState({
                selectStoryboard: value,
                storyboardDialogOpen: showdialog,
            });
            if (value == 'SELECT') {
                return;
            }
            this.processStoryboardSelection(value);
        };
        this.processStoryboardSelection = selection => {
            // console.log('processing selection',selection)
            if (!this.storyBoards) {
                let promise = this.getStoryboardsPromise();
                promise.then(json => {
                    this.storyBoards = json;
                    if (!this._doProcessStoryboardSelection(selection)) {
                        this.setState({
                            selectStoryboard: 'SELECT',
                            storyboardDialogOpen: false,
                        });
                        if (this.state.budgetBranches.length == 0) {
                            this.resetBranches();
                        }
                    }
                }).catch(reason => {
                    console.error('error in processStoryboardSelection', reason);
                    this.setState({
                        selectStoryboard: 'SELECT',
                        storyboardDialogOpen: false,
                    });
                });
            }
            else {
                if (!this._doProcessStoryboardSelection(selection)) {
                    this.setState({
                        selectStoryboard: 'SELECT',
                        storyboardDialogOpen: false,
                    });
                }
            }
        };
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
        this._doProcessStoryboardSelection = selection => {
            let storyboard = this.storyBoards.storyboards[selection];
            if (!storyboard) {
                toastr.error('storyboard not found for ' + selection);
                return false;
            }
            // console.log('processing story board',selection,storyboard)
            let stories = storyboard.stories;
            this.stories = stories;
            if (!stories) {
                toastr.error('stories not found for storyboard ' + selection);
                return false;
            }
            // clear all branches
            if (this.state.budgetBranches.length > 0) {
                this.removeBranches();
                this.setState({
                    budgetBranches: []
                });
            }
            let explorer = this;
            setTimeout(() => {
                for (let story of stories) {
                    // create branch
                    let defaultSettings = JSON.parse(JSON.stringify(explorer.props.declarationData.defaults.branch));
                    let settings = Object.assign(defaultSettings, {
                        viewpoint: story.viewpoint,
                        version: story.source,
                        aspect: story.aspect,
                        story: story,
                        showOptions: false,
                    });
                    explorer.props.addBranchDeclaration(null, settings); // change state 
                }
            });
            return true;
        };
        this.resetBranches = () => {
            let value = 'SELECT';
            this.setState({
                selectStoryboard: value,
            });
            this.removeBranches();
            let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
            this.props.addBranchDeclaration(null, defaultSettings); // change state        
        };
        this._inputonfocus = () => {
            this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length);
        };
        this.shareStoryboard = () => {
            let longurl = this._getShareUrl();
            // console.log('long url',longurl)
            let toastrComponent = () => (React.createElement("div", { style: { width: "300px" } },
                React.createElement("p", { style: { width: "240px" } }, "To share this storyboard (not including any changes you may have made), copy the url below, and send it to a friend."),
                React.createElement("input", { ref: node => {
                        this._inputfieldref = node;
                    }, onFocus: this._inputonfocus, style: { width: "310px", marginLeft: '-60px' }, value: longurl, readOnly: true })));
            let toastrOptions = {
                icon: (React.createElement(FontIcon, { className: "material-icons" }, "share")),
                component: toastrComponent
            };
            toastr.message('Share', toastrOptions);
        };
        this._getShareUrl = () => {
            this.logEvent({
                category: 'Explorer',
                action: 'Share storyboard',
                label: this.state.selectStoryboard,
            });
            return 'http://' + location.hostname + '/explorer?storyboard=' + this.state.selectStoryboard;
        };
        // =============================================================================
        // ---------------------------[ View Taxonomy/dataset ]-----------------------
        this.viewtaxonomydata = {
            options: {
                allowHtml: true,
                allowCollapse: false,
            }
        };
        this.taxonomyleafnodeselection = null;
        // TODO: should log event for google analytics
        this.onCallViewTaxonomy = (viewpointdata, viewpointselection, applytaxonomyselection) => {
            let self = this;
            self.viewtaxonomydata.applytaxonomyselection = applytaxonomyselection;
            self.taxonomyleafnodeselection = null;
            window['taxonomyCall'] = function (value) {
                self.taxonomyleafnodeselection = value;
                // console.log('set taxonomynodeselection',value)
            };
            // console.log('viewpointdata,viewpointselection',viewpointdata, viewpointselection)
            this.viewtaxonomydata.viewpointdata = viewpointdata;
            this.viewtaxonomydata.viewpointselection = viewpointselection;
            this.setViewTaxonomyData();
            this.setState({
                viewTaxonomyDialogOpen: true,
            });
        };
        this.setViewTaxonomyData = () => {
            let viewpointdata = this.viewtaxonomydata.viewpointdata;
            let data = [];
            data.push(['Code', 'Parent', 'Tooltip']);
            let code = viewpointdata.NamingConfigRef;
            data.push([{ v: code, f: viewpointdata.Meta.NamingConfigurations[code].Contents.Alias }, '', '']);
            this.setViewTaxonomyRow(code, viewpointdata.Components, data);
            this.viewtaxonomydata.data = data;
        };
        // recursive
        this.setViewTaxonomyRow = (parentcode, components, data) => {
            let baselines = { string: '' };
            for (let code in components) {
                let component = components[code];
                if (component.Baseline) {
                    // console.log('single baseline',component)
                    if (!baselines.code) {
                        baselines.code = code;
                    }
                    baselines.string += '<div style="border:2px solid gray;margin-bottom:3px;border-radius:6px;font-size:smaller" onClick="taxonomyCall(\'' + code + '\')">' + component.Name + '</div>';
                }
                else {
                    data.push([{ v: code, f: component.Name }, parentcode, '']);
                    this.setViewTaxonomyRow(code, component.Components, data);
                }
            }
            // console.log('baselines',baselines)
            if (baselines.code) {
                data.push([
                    { v: baselines.code, f: '<div style="background-color:pink;height:100%">' +
                            baselines.string + '</div>' }, parentcode, ''
                ]);
            }
        };
        this.setSelectionBranchNodes = (selection) => {
            setTimeout(() => {
                let selectedleafnode = null;
                let selectedtreenode = null;
                let selectednoderow = selection[0].row;
                let datanode = this.viewtaxonomydata.data[selectednoderow + 1];
                if (this.taxonomyleafnodeselection) { // an html injected div has been clicked
                    selectedleafnode = this.taxonomyleafnodeselection;
                    selectedtreenode = datanode[1]; // parent
                }
                else {
                    let substr = datanode[0].f.substring(0, 4);
                    if (substr == '<div') { // a constructed node. get parent
                        selectedtreenode = datanode[1]; // parent
                    }
                    else { // get current code
                        selectedtreenode = datanode[0].v; // node code
                    }
                }
                let parms = {
                    selectedleafnode,
                    selectedtreenode,
                };
                this.viewtaxonomydata.applytaxonomyselection(parms);
                // console.log('viewtaxonomydata.data',this.viewtaxonomydata.data)
                // console.log('selectedleafnode, selectedtreenode, chart selection, taxonomynodeselection', selectedleafnode, selectedtreenode, selection, this.taxonomyleafnodeselection)
            });
        };
        this.taxonomyevents = () => {
            let self = this;
            return [
                {
                    eventName: 'select',
                    callback: (Chart, err) => {
                        let chart = Chart.chart;
                        let selection = chart.getSelection();
                        self.setState({
                            viewTaxonomyDialogOpen: false,
                        });
                        if (selection.length) {
                            self.setSelectionBranchNodes(selection);
                        }
                    }
                }
            ];
        };
        this.taxonomychart = () => {
            // console.log('viewtaxonomydata',this.viewtaxonomydata)
            return this.viewtaxonomydata.data ? React.createElement(Chart, { chartType: 'OrgChart', options: this.viewtaxonomydata.options, chartEvents: this.taxonomyevents(), data: this.viewtaxonomydata.data }) : null;
        };
        this.viewTaxonomyDialog = () => {
            if (!this.viewtaxonomydata.viewpointdata)
                return null;
            let taxonomyselection = this.viewtaxonomydata.viewpointselection.viewpoint;
            return React.createElement(Dialog, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } },
                    "Chart view of selected dataset tree (",
                    React.createElement("span", { style: { fontStyle: 'italic' } }, this.viewtaxonomydata.viewpointselection.name),
                    ")"), modal: false, onRequestClose: () => {
                    this.setState({
                        viewTaxonomyDialogOpen: false,
                    });
                }, open: this.state.viewTaxonomyDialogOpen, contentStyle: { width: '90%', maxWidth: 'none', height: '90%', maxHeight: 'none' }, autoScrollBodyContent: true },
                React.createElement(IconButton, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, onClick: () => {
                        this.setState({
                            viewTaxonomyDialogOpen: false,
                        });
                    } },
                    React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                React.createElement("div", { style: { height: window.innerHeight } },
                    React.createElement("div", { style: { fontStyle: 'italic', fontSize: 'smaller' } },
                        "click on a cell to view chart. ",
                        React.createElement("div", { style: {
                                display: 'inline-block',
                                height: '9px',
                                width: '9px',
                                backgroundColor: 'pink',
                                border: '1px solid gray',
                            } }),
                        " = ",
                        (taxonomyselection == 'FUNCTIONAL' || taxonomyselection == 'STRUCTURAL') ?
                            'City Divisions and Agencies' : 'Source document base categories'),
                    this.taxonomychart()));
        };
        // ===================================================================
        // ---------------------------[ Analyst Notes ]-----------------------
        this.analystNotesDialog = () => (React.createElement(Dialog, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } }, "Budget Analyst Notes"), modal: false, onRequestClose: () => { this.onSelectAnalystNotes(null, null); }, open: this.state.analystNotesDialogOpen, autoScrollBodyContent: true },
            React.createElement(IconButton, { style: {
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }, onClick: () => {
                    this.setState({
                        analystNotesDialogOpen: false,
                    });
                } },
                React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
            React.createElement("div", null, this.getAnalystNotesDisplay())));
        this.getAnalystNotesDisplay = () => {
            let display = [];
            display.push(this.getDisplayRoot());
            return display;
        };
        this.getDisplayRoot = () => {
            let display = this.analystnotes.displaylist;
            let displayroot = display[0] || {};
            return React.createElement("div", { key: "main" },
                React.createElement("h3", null, displayroot.name),
                this.getDisplayTail(displayroot));
        };
        this.getDisplayTail = (displayobj) => {
            if (displayobj.subset) {
                return this.getDisplaySubset(displayobj.subset);
            }
            else if (displayobj.notes) {
                return this.getDisplayNotes(displayobj.notes);
            }
            else {
                return React.createElement("div", null, "no notes to display");
            }
        };
        this.getDisplaySubset = subset => {
            let elements = [];
            for (let index in subset) {
                let displayobj = subset[index];
                elements.push(React.createElement("div", { key: index, style: {
                        borderLeft: '1px solid silver',
                        marginLeft: '3px',
                        paddingLeft: '3px',
                    } },
                    React.createElement("h4", { style: displayobj.notes ? { fontStyle: 'italic' } : null }, displayobj.name),
                    this.getDisplayTail(displayobj)));
            }
            return elements;
        };
        this.getDisplayNotes = notes => {
            let elements = [];
            for (let index in notes) {
                let note = notes[index];
                elements.push(React.createElement("div", { key: index },
                    "- ",
                    React.createElement("a", { target: "_blank", href: note.link }, note.title)));
            }
            if (elements.length == 0) {
                elements.push(React.createElement("div", { key: "none", style: { fontStyle: 'italic' } }, "(no notes)"));
            }
            return elements;
        };
        // TODO: This needs to be hooked into event that opens analyst notes window!!
        this.onSelectAnalystNotes = (code, index) => {
            if (code !== null) {
                this.logEvent({
                    category: 'Explorer',
                    action: 'Select analyst notes',
                    label: code,
                });
            }
            this.setState({
                analystNotesDialogOpen: false,
            });
            // open window for analyst notes
        };
        this.analystnotes = {
            nodepath: null,
            taxonomies: {},
            analystnoteslist: null,
            displaylist: {}
        };
        // TODO: should log this for google analytics
        this.onCallAnalystNotes = (taxonomycode, nodepath) => {
            this.analystnotes.nodepath = nodepath;
            // console.log('taxonomy code for call analyst notes',taxonomycode, nodepath)
            if (this.analystnotes.taxonomies[taxonomycode]) {
                let json = this.analystnotes.taxonomies[taxonomycode];
                this.processTaxonomyTree(json);
            }
            else {
                let taxonomyPromise = this.filePromise('viewpoints/' + taxonomycode.toLowerCase() + '.json');
                let explorer = this;
                taxonomyPromise.then(json => {
                    this.processTaxonomyTree(json);
                }).catch(reason => {
                    toastr.error('could not find analyst notes framework:' + reason);
                });
            }
        };
        this.processTaxonomyTree = (taxonomyTree) => {
            // console.log('taxonomy tree', taxonomyTree)
            if (this.analystnotes.analystnoteslist) {
                this.displayAnalystChoices(taxonomyTree);
            }
            else {
                let listPromise = this.filePromise('resources/analystnotes.json');
                let explorer = this;
                listPromise.then(json => {
                    this.analystnotes.analystnoteslist = json;
                    // console.log('analyst notes loaded', json)
                    this.displayAnalystChoices(taxonomyTree);
                }).catch(reason => {
                    toastr.error('could not find analyst notes list:' + reason);
                });
            }
        };
        this.displayAnalystChoices = (taxonomytree) => {
            let nodepath = this.analystnotes.nodepath;
            let headnode = null;
            let count = 0;
            let tailbranch = taxonomytree;
            while (true) {
                if (count == nodepath.length)
                    break;
                if (!tailbranch.Components)
                    break;
                headnode = nodepath[count];
                // console.log('headnode, tailbranch', headnode, tailbranch)
                if (tailbranch.Components[headnode]) {
                    tailbranch = tailbranch.Components[headnode];
                }
                else {
                    tailbranch = null;
                    break;
                }
                count++;
                // console.log('count',count)
            }
            if (!tailbranch) {
                toastr.error('unable to find path in taxononmy');
                return;
            }
            // console.log('headnode, tailbranch',headnode,tailbranch)
            let displaylist = this.getDisplayList(headnode, tailbranch, taxonomytree);
            // console.log('displaylist',displaylist)
            this.analystnotes.displaylist = displaylist;
            this.setState({
                analystNotesDialogOpen: true,
            });
        };
        this.getDisplayList = (headnode, tailbranch, taxonomytree) => {
            let analystnotes = this.analystnotes.analystnoteslist;
            let displaylist = [];
            let displayset = this.getDisplaySet(headnode, tailbranch, taxonomytree, analystnotes);
            displaylist.push(displayset);
            return displaylist;
        };
        this.getDisplaySet = (headnode, tailbranch, taxonomytree, analystnotes) => {
            let displayset = {};
            try {
                if (tailbranch.Baseline) {
                    let noteset = analystnotes[headnode];
                    displayset.code = headnode;
                    if (!noteset) {
                        displayset.name = headnode;
                        displayset.notes = [];
                    }
                    else {
                        displayset.name = noteset.name;
                        displayset.notes = noteset.links;
                    }
                }
                else {
                    let subset = [];
                    for (let subcode in tailbranch.Components) {
                        let displayset = this.getDisplaySet(subcode, tailbranch.Components[subcode], taxonomytree, analystnotes);
                        subset.push(displayset);
                    }
                    displayset.code = headnode;
                    if (!headnode) {
                        let contents = taxonomytree.Meta.NamingConfigurations[taxonomytree.NamingConfigRef].Contents;
                        displayset.name = contents.Alias || contents.Name;
                    }
                    else {
                        displayset.name = taxonomytree.Meta.Lookups.Taxonomy[headnode];
                    }
                    displayset.subset = subset;
                }
            }
            catch (e) {
                console.error('error!', e);
            }
            return displayset;
        };
        this.filePromise = (path) => {
            let root = './db/repositories/toronto/';
            let filespec = root + path;
            let promise = new Promise((resolve, reject) => {
                fetch(filespec).then(response => {
                    if (response.ok) {
                        // console.log('response for ' + path,response)
                        try {
                            let json = response.json().then(json => {
                                resolve(json);
                            }).catch(reason => {
                                let msg = 'failure to resolve ' + path + ' ' + reason;
                                console.log(msg);
                                reject(msg);
                            });
                        }
                        catch (e) {
                            console.log('error ' + path, e.message);
                            reject('failure to load ' + path);
                        }
                    }
                    else {
                        reject('could not load file ' + path);
                    }
                }).catch(reason => {
                    reject(reason + ' ' + path);
                });
            });
            return promise;
        };
    }
    componentWillMount() {
        // console.log('explorer props location.query',this.props.location.query)
        // console.log('window.location,state, props',window.location, this.state, this.props)
        // if (!this.props.declarationData.onetimenotification) {
        //     this.toastrmessages.info = "Click or tap on any chart column to drill down (except as noted)."
        //     this.props.onetimeNotification()
        // }
        let query = {
            search: this.props.location.search,
            branch: this.getUrlParameter('branch'),
            settings: this.getUrlParameter('settings'),
            hash: this.getUrlParameter('hash'),
            storyboard: this.getUrlParameter('storyboard'),
        };
        // console.log('query',query)
        let branchdata, settingsdata, hash;
        if (query.branch && query.settings && query.hash) {
            branchdata = jsonpack.unpack(query.branch);
            settingsdata = jsonpack.unpack(query.settings);
            let newhash = Utilities.hashCode(query.branch + query.settings).toString();
            if (newhash == query.hash) {
                this.urlparms = {
                    branchdata,
                    settingsdata,
                };
                let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
                // console.log('branchdata, settingsdata,defaultSettings',branchdata,settingsdata,defaultSettings)
                let querysettings = {
                    inflationAdjusted: branchdata.ad,
                    aspect: branchdata.as,
                    prorata: branchdata.pr,
                    repository: branchdata.g,
                    version: branchdata.ve,
                    viewpoint: branchdata.vi,
                    showOptions: true,
                };
                let settings = Object.assign(defaultSettings, querysettings);
                this.props.addBranchDeclaration(null, settings); // change state
                return;
            }
            else {
                this.toastrmessages.error = 'the url parameters have apparently been damaged. Using defaults instead...';
                console.error('url hash no match', toastr, query.hash, newhash);
            }
        }
        if (query && query.storyboard) {
            let value = query.storyboard;
            this.setState({
                selectStoryboard: value,
                storyboardDialogOpen: true,
            });
            this.processStoryboardSelection(value);
            return;
        }
        let { branchList, branchesById } = this.props.declarationData;
        if (branchList.length == 0) { // initialize explorer with first branch
            // this.freshstart = true
            let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
            this.props.addBranchDeclaration(null, defaultSettings); // change state
        }
        else { // harmonize branch instances to branch declarations
            let { branchList, branchesById } = this.props.declarationData;
            let budgetBranches = [...this.state.budgetBranches];
            this.harmonizeBranchesToState(budgetBranches, branchList, branchesById);
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
        this.props.resetLastAction(); // clear sentinals for unmount //TODO verify this!
    }
    componentDidUpdate() {
        let { branchList, branchesById } = this.props.declarationData;
        let budgetBranches = [...this.state.budgetBranches];
        this.harmonizeBranchesToState(budgetBranches, branchList, branchesById);
        let { toastrmessages } = this;
        for (let version in toastrmessages) {
            let msg = toastrmessages[version];
            if (msg) {
                toastrmessages[version] = null;
                toastr[version](msg);
            }
        }
    }
    // ===================================================================
    // ---------------------------[ Render ]------------------------------ 
    render() {
        let showhelp = React.createElement(RaisedButton, { label: "Help", style: { margin: '3px 6px 0 6px' }, type: "button", onClick: this.handleDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "help_outline") });
        let showanalystnotes = React.createElement(RaisedButton, { label: "Latest Analyst Notes", style: { margin: '3px 6px 0 6px' }, type: "button", onClick: () => { this.onCallAnalystNotes('FUNCTIONAL', []); } });
        let showvideos = React.createElement(RaisedButton, { label: "Videos", style: { margin: '3px 6px 0 6px' }, type: "button", onClick: () => {
                this.logEvent({
                    category: 'Explorer',
                    action: 'Show videos',
                });
                window.open('https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig', '_blank');
            }, labelPosition: "before", icon: React.createElement(FontIcon, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "videocam") });
        let explorer = this;
        let dialogbox = React.createElement(Dialog, { title: "Budget Explorer Options", modal: false, open: explorer.state.dialogOpen, onRequestClose: explorer.handleDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' } },
            React.createElement(IconButton, { style: {
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }, onClick: explorer.handleDialogClose },
                React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
            dialogcontent);
        // -----------[ BRANCH SEGMENT]-------------
        let branchSegments = () => {
            let budgetBranches = explorer.state.budgetBranches;
            // console.log('budgetBranches',budgetBranches)
            // map over budgetBranches state
            let segments = budgetBranches.map((budgetBranch, branchIndex) => {
                let urlparms = null;
                if (branchIndex == 0 && this.urlparms) {
                    urlparms = this.urlparms;
                }
                // collect functions to pass down to nested components
                let actionFunctions = {
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
                    updateProrata: this.props.updateProrata,
                    changeAspect: this.props.changeAspect,
                    incrementBranchDataVersion: this.props.incrementBranchDataVersion,
                    clearBranchStory: this.props.clearBranchStory,
                    toggleShowOptions: this.props.toggleShowOptions,
                    updateCellsDataseriesName: this.props.updateCellsDataseriesName,
                    resetLastAction: this.props.resetLastAction,
                    harmonizeCells: this.props.harmonizeCells,
                };
                // ----------------[ Contains ExplorerBranch ]-------------------------
                // console.log('explorer branchindex and stories',branchIndex,this.stories)
                return React.createElement(Card, { initiallyExpanded: true, key: budgetBranch.uid, onExpandChange: (expanded) => {
                        this.onExpandChange(expanded);
                    } },
                    (budgetBranches.length > 1) ? React.createElement(CardTitle, { actAsExpander: false, showExpandableButton: false },
                        "Row " + (branchIndex + 1) + " ",
                        React.createElement("input", { defaultValue: this.stories ? this.stories[branchIndex].title : '', type: "text", style: { width: '350px', fontWeight: 'bold', fontSize: '14px' }, onClick: (ev) => { ev.stopPropagation(); } }),
                        React.createElement(IconButton, { style: {
                                float: "right",
                                marginRight: "30px"
                            }, disabled: (branchIndex == (budgetBranches.length - 1)), onClick: (uid => ev => {
                                ev.stopPropagation();
                                this.branchMoveDown(uid);
                            })(budgetBranch.uid), tooltip: "Move down" },
                            React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "arrow_downward")),
                        React.createElement(IconButton, { style: {
                                float: "right"
                            }, disabled: (branchIndex == 0), onClick: (uid => ev => {
                                ev.stopPropagation();
                                this.branchMoveUp(uid);
                            })(budgetBranch.uid), tooltip: "Move up" },
                            React.createElement(FontIcon, { className: "material-icons", style: { cursor: "pointer" } }, "arrow_upward"))) : null,
                    React.createElement(CardText, { expandable: false },
                        React.createElement(ExplorerBranch, { budgetBranch: budgetBranch, declarationData: explorer.props.declarationData, globalStateActions: actionFunctions, urlparms: urlparms, clearUrlParms: this.clearUrlParms, clearStories: this.clearStories, setToast: this.setToast, handleSearchDialogOpen: this.handleSearchDialogOpen, onCallAnalystNotes: this.onCallAnalystNotes, onCallViewTaxonomy: this.onCallViewTaxonomy })),
                    React.createElement(CardActions, { expandable: false },
                        React.createElement(FloatingActionButton, { onClick: (uid => () => {
                                this.addBranch(uid);
                            })(budgetBranch.uid) },
                            React.createElement(ContentAdd, null)),
                        (budgetBranches.length > 1) ? React.createElement(FloatingActionButton, { onClick: (uid => () => {
                                this.removeBranch(uid);
                            })(budgetBranch.uid), secondary: true },
                            React.createElement(ContentRemove, null)) : null));
            });
            return segments;
        };
        // -----------[ COMBINE SEGMENTS ]---------------
        let branches = branchSegments();
        return React.createElement("div", null,
            React.createElement("div", { style: {
                    backgroundColor: "lemonchiffon",
                    padding: "3px",
                    margin: "3px",
                    borderRadius: "8px",
                    fontFamily: "Roboto,sans-serif",
                    fontSize: "12px",
                } }, "PLEASE READ NOTICES BELOW. Caution: This is an early version of the Budgetpedia Explorer. The data presented in these charts should be treated as approximations. There are numerous data source quality and continuity issues, the intake process has not been validated, and the data presented has not been rigorously verified against source data."),
            React.createElement("div", { style: { backgroundColor: "white" } },
                React.createElement(CardText, null,
                    "Taking a tour? ",
                    React.createElement(Link, { to: '/context' },
                        "next page",
                        React.createElement("span", { style: { verticalAlign: 'middle' }, className: "material-icons" }, "navigate_next")),
                    React.createElement(Link, { to: '/tracker' },
                        React.createElement("span", { style: { verticalAlign: 'middle' }, className: "material-icons" }, "navigate_before"),
                        "previous page"),
                    React.createElement(Link, { to: '/basics' },
                        React.createElement("span", { style: { verticalAlign: 'middle' }, className: "material-icons" }, "first_page"),
                        "start"))),
            React.createElement(Card, null,
                React.createElement(CardTitle, { actAsExpander: true, showExpandableButton: true }, "Budget Explorer"),
                React.createElement(CardText, { expandable: true },
                    React.createElement("div", { style: { display: 'inline-block', verticalAlign: 'top' } },
                        React.createElement("div", null,
                            React.createElement("span", { style: { lineHeight: '48px', verticalAlign: '23px' } }, "Explore charts below, or select an area of interest: "),
                            React.createElement(DropDownMenu, { style: { verticalAlign: 'top' }, value: this.state.selectStoryboard, onChange: (event, index, value) => {
                                    this.onSelectStoryboard(value);
                                } },
                                React.createElement(MenuItem, { value: 'SELECT', primaryText: "Select" }),
                                React.createElement(MenuItem, { value: 'SHARED', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "General Services") }),
                                React.createElement(MenuItem, { value: "WASTE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Solid Waste Management") }),
                                React.createElement(MenuItem, { value: "WATER", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Toronto Water") }),
                                React.createElement(Divider, { inset: true }),
                                React.createElement(MenuItem, { value: "TTC", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "TTC") }),
                                React.createElement(MenuItem, { value: "WHEELTRANS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Wheel Trans") }),
                                React.createElement(MenuItem, { value: "TRANSPORTATION", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Transportation (Roads)") }),
                                React.createElement(MenuItem, { value: "PARKING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Parking") }),
                                React.createElement(Divider, { inset: true }),
                                React.createElement(MenuItem, { value: "PFRACTIVITIES", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Parks, Forestry & Activity Centres") }),
                                React.createElement(MenuItem, { value: "LIBRARY", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Toronto Public Library") }),
                                React.createElement(MenuItem, { value: "ATTRACTIONS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Public Attractions") }),
                                React.createElement(MenuItem, { value: "CONSERVHERITAGE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Conservation & Heritage") }),
                                React.createElement(MenuItem, { value: 'SUPPORT', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Citizen Support Services") }),
                                React.createElement(MenuItem, { value: "FIRE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Fire") }),
                                React.createElement(MenuItem, { value: "PARAMEDICS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Paramedics") }),
                                React.createElement(MenuItem, { value: "POLICE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Policing & Court Services") }),
                                React.createElement(Divider, { inset: true }),
                                React.createElement(MenuItem, { value: "EMPLOYMENT", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Income Support Services") }),
                                React.createElement(MenuItem, { value: "HOUSING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Housing Support Services") }),
                                React.createElement(MenuItem, { value: "CHILDREN", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Children's Services") }),
                                React.createElement(Divider, { inset: true }),
                                React.createElement(MenuItem, { value: "HEALTH", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Public Health") }),
                                React.createElement(MenuItem, { value: "LONGTERMCARE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Long Term Care") }),
                                React.createElement(MenuItem, { value: 'ADMINISTRATIVE', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Administrative Services") }),
                                React.createElement(MenuItem, { value: "COUNCIL", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Corporate Management") }),
                                React.createElement(MenuItem, { value: "PLANNING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Planning & Development") }),
                                React.createElement(MenuItem, { value: "PERMITS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Permits, Licencing & Standards") }),
                                React.createElement(Divider, { inset: true }),
                                React.createElement(MenuItem, { value: "INTERNAL", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Internal Services") }),
                                React.createElement(MenuItem, { value: "CORPORATE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Corporate Accounts (Finance)") }),
                                React.createElement(MenuItem, { disabled: true, value: 'SPECIAL', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Special Analytics") }),
                                React.createElement(MenuItem, { value: "STAFFING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Staffing costs") })),
                            React.createElement(RaisedButton, { disabled: this.state.selectStoryboard == 'SELECT', type: "button", style: { margin: '3px 6px 0 0', verticalAlign: '23px' }, label: "Share", onClick: this.shareStoryboard, labelPosition: "before", icon: React.createElement(FontIcon, { style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons" }, "share") }),
                            React.createElement(RaisedButton, { style: { verticalAlign: '25px' }, type: "button", label: "Reset", onClick: () => {
                                    this.resetBranches();
                                } })),
                        React.createElement("div", null,
                            "For some background see ",
                            showhelp,
                            " or ",
                            showvideos,
                            " or ",
                            showanalystnotes)),
                    React.createElement("div", null))),
            dialogbox,
            this.storyboardDialog(),
            this.analystNotesDialog(),
            this.viewTaxonomyDialog(),
            this.state.searchDialogOpen ? React.createElement(SearchDialog, { onRequestClose: this.handleSearchDialogClose, onConfirm: this.findParameters.applySearchBranchSettings }) : null,
            branches);
    }
};
// ====================================================================================
// ------------------------------[ INJECT DATA STORE ]---------------------------------
let mapStateToProps = state => {
    return {
        declarationData: getExplorerDeclarationData(state),
    };
};
// initialize all these call backs with dispatch
Explorer = connect(mapStateToProps, {
    // presentation
    onetimeNotification: ExplorerActions.onetimeNotification,
    // toggleShowControls
    // branch actions - components
    addBranchDeclaration: ExplorerActions.addBranchDeclaration,
    cloneBranchDeclaration: ExplorerActions.cloneBranchDeclaration,
    removeBranchDeclaration: ExplorerActions.removeBranchDeclaration,
    removeBranches: ExplorerActions.removeBranches,
    addNodeDeclaration: ExplorerActions.addNodeDeclaration,
    addNodeDeclarations: ExplorerActions.addNodeDeclarations,
    removeNodeDeclarations: ExplorerActions.removeNodeDeclarations,
    addCellDeclarations: ExplorerActions.addCellDeclarations,
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
})(Explorer);
export default Explorer;
