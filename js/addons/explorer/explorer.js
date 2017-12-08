'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const react_redux_1 = require("react-redux");
const Card_1 = require("material-ui/Card");
const FontIcon_1 = require("material-ui/FontIcon");
const IconButton_1 = require("material-ui/IconButton");
const Dialog_1 = require("material-ui/Dialog");
const FloatingActionButton_1 = require("material-ui/FloatingActionButton");
const MenuItem_1 = require("material-ui/MenuItem");
const RaisedButton_1 = require("material-ui/RaisedButton");
const add_1 = require("material-ui/svg-icons/content/add");
const remove_1 = require("material-ui/svg-icons/content/remove");
const DropDownMenu_1 = require("material-ui/DropDownMenu");
const Divider_1 = require("material-ui/Divider");
const LinearProgress_1 = require("material-ui/LinearProgress");
const react_redux_toastr_1 = require("react-redux-toastr");
let uuid = require('node-uuid');
let jsonpack = require('jsonpack');
let ReactGA = require('react-ga');
var { Chart } = require('../../../forked_modules/react-google-charts/Chart.js');
const explorerbranch_1 = require("./components/explorerbranch");
const searchdialog_1 = require("./components/searchdialog");
const ExplorerActions = require("./actions");
const branch_class_1 = require("./classes/branch.class");
const reducers_1 = require("./reducers");
const helpcontent_1 = require("./content/helpcontent");
const Utilities = require("./modules/utilities");
let Explorer = class extends Component {
    constructor() {
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
        this.logEvent = (parms) => {
            if (window.location.hostname == 'budgetpedia.ca') {
                ReactGA.event(parms);
            }
        };
        this.setToast = (version, message) => {
            this.toastrmessages[version] = message;
        };
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
        this.storyboardDialog = () => (React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } }, "Your storyboard is being prepared"), modal: true, open: this.state.storyboardDialogOpen, autoScrollBodyContent: false, contentStyle: { maxWidth: '600px' }, autoDetectWindowHeight: false },
            React.createElement("div", null,
                "please wait while the charts are rendered...",
                React.createElement("br", null),
                "Toggle any row's \"Show chart controls\" to experiment with settings for that row",
                React.createElement(LinearProgress_1.default, { mode: "indeterminate" }))));
        this.getUrlParameter = name => {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };
        this.harmonizeBranchesToState = (budgetBranches, branchList, branchesById) => {
            let change = false;
            let newBranches = budgetBranches.filter((branch) => {
                return !!branchesById[branch.uid];
            });
            if (newBranches.length != budgetBranches.length) {
                change = true;
            }
            for (let i = 0; i < branchList.length; i++) {
                let uid = branchList[i];
                let foundbranch = newBranches.filter(branch => {
                    if (branch.uid == uid)
                        return branch;
                });
                if (foundbranch.length == 0) {
                    if (!change)
                        change = true;
                    let budgetBranch = new branch_class_1.default({ uid });
                    newBranches.push(budgetBranch);
                }
            }
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
        this.updateNode = branchuid => nodeuid => this.props.updateNode(branchuid, nodeuid);
        this.changeTab = branchuid => (nodeuid, tabvalue) => this.props.changeTab(branchuid, nodeuid, tabvalue);
        this.addCellDeclarations = branchuid => (nodeuid, settingslist) => this.props.addCellDeclarations(branchuid, nodeuid, settingslist);
        this.normalizeCellYearDependencies = branchuid => (nodeuid, cellList, yearsRange) => this.props.normalizeCellYearDependencies(branchuid, nodeuid, cellList, yearsRange);
        this.updateCellTimeScope = branchuid => nodeuid => (celluid, selection) => this.props.updateCellTimeScope(branchuid, nodeuid, celluid, selection);
        this.updateCellChartSelection = branchuid => nodeuid => (celluid, selection) => this.props.updateCellChartSelection(branchuid, nodeuid, celluid, selection);
        this.updateCellYearSelections = branchuid => nodeuid => (leftyear, rightyear) => this.props.updateCellYearSelections(branchuid, nodeuid, leftyear, rightyear);
        this.updateCellChartCode = branchuid => nodeuid => (celluid, explorerChartCode) => this.props.updateCellChartCode(branchuid, nodeuid, celluid, explorerChartCode);
        this.onExpandChange = (expanded) => {
            return;
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
            uidmap[refbranchid] = uuid.v4();
            clones.branch[refbranchid] = this._getClone(declarationData.branchesById[refbranchid]);
            for (let nodeid of clones.branch[refbranchid].nodeList) {
                let nodeobject = declarationData.nodesById[nodeid];
                clones.nodes[nodeid] = this._getClone(nodeobject);
                uidmap[nodeid] = uuid.v4();
            }
            for (let nodeid in clones.nodes) {
                for (let cellid of clones.nodes[nodeid].cellList) {
                    clones.cells[cellid] = this._getClone(declarationData.cellsById[cellid]);
                    uidmap[cellid] = uuid.v4();
                    clones.cells[cellid].celluid = uidmap[cellid];
                }
            }
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
            }, 1000);
        };
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
        this.handleSearchDialogOpen = (e, applySearchBranchSettings) => {
            e.stopPropagation();
            e.preventDefault();
            this.findParameters.applySearchBranchSettings = applySearchBranchSettings;
            this.setState({
                searchDialogOpen: true
            });
        };
        this.handleSearchDialogClose = () => {
            this.setState({
                searchDialogOpen: false
            });
        };
        this.storyBoards = null;
        this.getStoryboardsPromise = () => {
            let filespec = './db/repositories/toronto/storyboards/storyboards.json';
            let promise = new Promise((resolve, reject) => {
                fetch(filespec).then(response => {
                    if (response.ok) {
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
        this._doProcessStoryboardSelection = selection => {
            let storyboard = this.storyBoards.storyboards[selection];
            if (!storyboard) {
                react_redux_toastr_1.toastr.error('storyboard not found for ' + selection);
                return false;
            }
            let stories = storyboard.stories;
            this.stories = stories;
            if (!stories) {
                react_redux_toastr_1.toastr.error('stories not found for storyboard ' + selection);
                return false;
            }
            if (this.state.budgetBranches.length > 0) {
                this.removeBranches();
                this.setState({
                    budgetBranches: []
                });
            }
            let explorer = this;
            setTimeout(() => {
                for (let story of stories) {
                    let defaultSettings = JSON.parse(JSON.stringify(explorer.props.declarationData.defaults.branch));
                    let settings = Object.assign(defaultSettings, {
                        viewpoint: story.viewpoint,
                        version: story.source,
                        aspect: story.aspect,
                        story: story,
                        showOptions: false,
                    });
                    explorer.props.addBranchDeclaration(null, settings);
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
            this.props.addBranchDeclaration(null, defaultSettings);
        };
        this._inputonfocus = () => {
            this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length);
        };
        this.shareStoryboard = () => {
            let longurl = this._getShareUrl();
            let toastrComponent = () => (React.createElement("div", { style: { width: "300px" } },
                React.createElement("p", { style: { width: "240px" } }, "To share this storyboard (not including any changes you may have made), copy the url below, and send it to a friend."),
                React.createElement("input", { ref: node => {
                        this._inputfieldref = node;
                    }, onFocus: this._inputonfocus, style: { width: "310px", marginLeft: '-60px' }, value: longurl, readOnly: true })));
            let toastrOptions = {
                icon: (React.createElement(FontIcon_1.default, { className: "material-icons" }, "share")),
                component: toastrComponent
            };
            react_redux_toastr_1.toastr.message('Share', toastrOptions);
        };
        this._getShareUrl = () => {
            this.logEvent({
                category: 'Explorer',
                action: 'Share storyboard',
                label: this.state.selectStoryboard,
            });
            return 'http://' + location.hostname + '/explorer?storyboard=' + this.state.selectStoryboard;
        };
        this.viewtaxonomydata = {
            options: {
                allowHtml: true,
                allowCollapse: false,
            }
        };
        this.taxonomyleafnodeselection = null;
        this.onCallViewTaxonomy = (viewpointdata, viewpointselection, applytaxonomyselection) => {
            let self = this;
            self.viewtaxonomydata.applytaxonomyselection = applytaxonomyselection;
            self.taxonomyleafnodeselection = null;
            window['taxonomyCall'] = function (value) {
                self.taxonomyleafnodeselection = value;
            };
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
        this.setViewTaxonomyRow = (parentcode, components, data) => {
            let baselines = { string: '' };
            for (let code in components) {
                let component = components[code];
                if (component.Baseline) {
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
                if (this.taxonomyleafnodeselection) {
                    selectedleafnode = this.taxonomyleafnodeselection;
                    selectedtreenode = datanode[1];
                }
                else {
                    let substr = datanode[0].f.substring(0, 4);
                    if (substr == '<div') {
                        selectedtreenode = datanode[1];
                    }
                    else {
                        selectedtreenode = datanode[0].v;
                    }
                }
                let parms = {
                    selectedleafnode,
                    selectedtreenode,
                };
                this.viewtaxonomydata.applytaxonomyselection(parms);
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
            return this.viewtaxonomydata.data ? React.createElement(Chart, { chartType: 'OrgChart', options: this.viewtaxonomydata.options, chartEvents: this.taxonomyevents(), data: this.viewtaxonomydata.data }) : null;
        };
        this.viewTaxonomyDialog = () => {
            if (!this.viewtaxonomydata.viewpointdata)
                return null;
            let taxonomyselection = this.viewtaxonomydata.viewpointselection.viewpoint;
            return React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } },
                    "Chart view of selected workspace tree (",
                    React.createElement("span", { style: { fontStyle: 'italic' } }, this.viewtaxonomydata.viewpointselection.name),
                    ")"), modal: false, onRequestClose: () => {
                    this.setState({
                        viewTaxonomyDialogOpen: false,
                    });
                }, open: this.state.viewTaxonomyDialogOpen, contentStyle: { width: '90%', maxWidth: 'none', height: '90%', maxHeight: 'none' }, autoScrollBodyContent: true },
                React.createElement(IconButton_1.default, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, onTouchTap: () => {
                        this.setState({
                            viewTaxonomyDialogOpen: false,
                        });
                    } },
                    React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
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
        this.analystNotesDialog = () => (React.createElement(Dialog_1.default, { title: React.createElement("div", { style: { padding: '12px 0 0 12px' } }, "Budget Analyst Notes"), modal: false, onRequestClose: () => { this.onSelectAnalystNotes(null, null); }, open: this.state.analystNotesDialogOpen, autoScrollBodyContent: true },
            React.createElement(IconButton_1.default, { style: {
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }, onTouchTap: () => {
                    this.setState({
                        analystNotesDialogOpen: false,
                    });
                } },
                React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
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
        };
        this.analystnotes = {
            nodepath: null,
            taxonomies: {},
            analystnoteslist: null,
            displaylist: {}
        };
        this.onCallAnalystNotes = (taxonomycode, nodepath) => {
            this.analystnotes.nodepath = nodepath;
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
                    react_redux_toastr_1.toastr.error('could not find analyst notes framework:' + reason);
                });
            }
        };
        this.processTaxonomyTree = (taxonomyTree) => {
            if (this.analystnotes.analystnoteslist) {
                this.displayAnalystChoices(taxonomyTree);
            }
            else {
                let listPromise = this.filePromise('resources/analystnotes.json');
                let explorer = this;
                listPromise.then(json => {
                    this.analystnotes.analystnoteslist = json;
                    this.displayAnalystChoices(taxonomyTree);
                }).catch(reason => {
                    react_redux_toastr_1.toastr.error('could not find analyst notes list:' + reason);
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
                if (tailbranch.Components[headnode]) {
                    tailbranch = tailbranch.Components[headnode];
                }
                else {
                    tailbranch = null;
                    break;
                }
                count++;
            }
            if (!tailbranch) {
                react_redux_toastr_1.toastr.error('unable to find path in taxononmy');
                return;
            }
            let displaylist = this.getDisplayList(headnode, tailbranch, taxonomytree);
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
        let query = {
            search: this.props.location.search,
            branch: this.getUrlParameter('branch'),
            settings: this.getUrlParameter('settings'),
            hash: this.getUrlParameter('hash'),
            storyboard: this.getUrlParameter('storyboard'),
        };
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
                this.props.addBranchDeclaration(null, settings);
                return;
            }
            else {
                this.toastrmessages.error = 'the url parameters have apparently been damaged. Using defaults instead...';
                console.error('url hash no match', react_redux_toastr_1.toastr, query.hash, newhash);
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
        if (branchList.length == 0) {
            let defaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.branch));
            this.props.addBranchDeclaration(null, defaultSettings);
        }
        else {
            let { branchList, branchesById } = this.props.declarationData;
            let budgetBranches = [...this.state.budgetBranches];
            this.harmonizeBranchesToState(budgetBranches, branchList, branchesById);
        }
    }
    componentWillUnmount() {
        this.props.resetLastAction();
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
                react_redux_toastr_1.toastr[version](msg);
            }
        }
    }
    render() {
        let showhelp = React.createElement(RaisedButton_1.default, { label: "Help", style: { margin: '3px 6px 0 6px' }, type: "button", onTouchTap: this.handleDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "help_outline") });
        let showanalystnotes = React.createElement(RaisedButton_1.default, { label: "Latest Analyst Notes", style: { margin: '3px 6px 0 6px' }, type: "button", onTouchTap: () => { this.onCallAnalystNotes('FUNCTIONAL', []); } });
        let showvideos = React.createElement(RaisedButton_1.default, { label: "Videos", style: { margin: '3px 6px 0 6px' }, type: "button", onTouchTap: () => {
                this.logEvent({
                    category: 'Explorer',
                    action: 'Show videos',
                });
                window.open('https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig', '_blank');
            }, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "videocam") });
        let explorer = this;
        let dialogbox = React.createElement(Dialog_1.default, { title: "Budget Explorer Options", modal: false, open: explorer.state.dialogOpen, onRequestClose: explorer.handleDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' } },
            React.createElement(IconButton_1.default, { style: {
                    top: 0,
                    right: 0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex: 2,
                }, onTouchTap: explorer.handleDialogClose },
                React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
            helpcontent_1.default);
        let branchSegments = () => {
            let budgetBranches = explorer.state.budgetBranches;
            let segments = budgetBranches.map((budgetBranch, branchIndex) => {
                let urlparms = null;
                if (branchIndex == 0 && this.urlparms) {
                    urlparms = this.urlparms;
                }
                let actionFunctions = {
                    addCellDeclarations: this.addCellDeclarations(budgetBranch.uid),
                    normalizeCellYearDependencies: this.normalizeCellYearDependencies(budgetBranch.uid),
                    updateCellTimeScope: this.updateCellTimeScope(budgetBranch.uid),
                    updateCellChartSelection: this.updateCellChartSelection(budgetBranch.uid),
                    updateCellYearSelections: this.updateCellYearSelections(budgetBranch.uid),
                    changeTab: this.changeTab(budgetBranch.uid),
                    updateCellChartCode: this.updateCellChartCode(budgetBranch.uid),
                    updateNode: this.updateNode(budgetBranch.uid),
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
                return React.createElement(Card_1.Card, { initiallyExpanded: true, key: budgetBranch.uid, onExpandChange: (expanded) => {
                        this.onExpandChange(expanded);
                    } },
                    (budgetBranches.length > 1) ? React.createElement(Card_1.CardTitle, { actAsExpander: false, showExpandableButton: false },
                        "Row " + (branchIndex + 1) + " ",
                        React.createElement("input", { defaultValue: this.stories ? this.stories[branchIndex].title : '', type: "text", style: { width: '350px', fontWeight: 'bold', fontSize: '14px' }, onClick: (ev) => { ev.stopPropagation(); } }),
                        React.createElement(IconButton_1.default, { style: {
                                float: "right",
                                marginRight: "30px"
                            }, disabled: (branchIndex == (budgetBranches.length - 1)), onTouchTap: (uid => ev => {
                                ev.stopPropagation();
                                this.branchMoveDown(uid);
                            })(budgetBranch.uid), tooltip: "Move down" },
                            React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "arrow_downward")),
                        React.createElement(IconButton_1.default, { style: {
                                float: "right"
                            }, disabled: (branchIndex == 0), onTouchTap: (uid => ev => {
                                ev.stopPropagation();
                                this.branchMoveUp(uid);
                            })(budgetBranch.uid), tooltip: "Move up" },
                            React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "arrow_upward"))) : null,
                    React.createElement(Card_1.CardText, { expandable: false },
                        React.createElement(explorerbranch_1.default, { budgetBranch: budgetBranch, declarationData: explorer.props.declarationData, globalStateActions: actionFunctions, urlparms: urlparms, clearUrlParms: this.clearUrlParms, clearStories: this.clearStories, setToast: this.setToast, handleSearchDialogOpen: this.handleSearchDialogOpen, onCallAnalystNotes: this.onCallAnalystNotes, onCallViewTaxonomy: this.onCallViewTaxonomy })),
                    React.createElement(Card_1.CardActions, { expandable: false },
                        React.createElement(FloatingActionButton_1.default, { onTouchTap: (uid => () => {
                                this.addBranch(uid);
                            })(budgetBranch.uid) },
                            React.createElement(add_1.default, null)),
                        (budgetBranches.length > 1) ? React.createElement(FloatingActionButton_1.default, { onTouchTap: (uid => () => {
                                this.removeBranch(uid);
                            })(budgetBranch.uid), secondary: true },
                            React.createElement(remove_1.default, null)) : null));
            });
            return segments;
        };
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
            React.createElement(Card_1.Card, null,
                React.createElement(Card_1.CardTitle, { actAsExpander: true, showExpandableButton: true }, "Budget Explorer"),
                React.createElement(Card_1.CardText, { expandable: true },
                    React.createElement("div", { style: { display: 'inline-block', verticalAlign: 'top' } },
                        React.createElement("div", null,
                            React.createElement("span", { style: { lineHeight: '48px', verticalAlign: '23px' } }, "Explore charts below, or select an area of interest: "),
                            React.createElement(DropDownMenu_1.default, { style: { verticalAlign: 'top' }, value: this.state.selectStoryboard, onChange: (event, index, value) => {
                                    this.onSelectStoryboard(value);
                                } },
                                React.createElement(MenuItem_1.default, { value: 'SELECT', primaryText: "Select" }),
                                React.createElement(MenuItem_1.default, { value: 'SHARED', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "General Services") }),
                                React.createElement(MenuItem_1.default, { value: "WASTE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Solid Waste Management") }),
                                React.createElement(MenuItem_1.default, { value: "WATER", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Toronto Water") }),
                                React.createElement(Divider_1.default, { inset: true }),
                                React.createElement(MenuItem_1.default, { value: "TTC", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "TTC") }),
                                React.createElement(MenuItem_1.default, { value: "WHEELTRANS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Wheel Trans") }),
                                React.createElement(MenuItem_1.default, { value: "TRANSPORTATION", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Transportation (Roads)") }),
                                React.createElement(MenuItem_1.default, { value: "PARKING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Parking") }),
                                React.createElement(Divider_1.default, { inset: true }),
                                React.createElement(MenuItem_1.default, { value: "PFRACTIVITIES", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Parks, Forestry & Activity Centres") }),
                                React.createElement(MenuItem_1.default, { value: "LIBRARY", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Toronto Public Library") }),
                                React.createElement(MenuItem_1.default, { value: "ATTRACTIONS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Public Attractions") }),
                                React.createElement(MenuItem_1.default, { value: "CONSERVHERITAGE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Conservation & Heritage") }),
                                React.createElement(MenuItem_1.default, { value: 'SUPPORT', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Citizen Support Services") }),
                                React.createElement(MenuItem_1.default, { value: "FIRE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Fire") }),
                                React.createElement(MenuItem_1.default, { value: "PARAMEDICS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Paramedics") }),
                                React.createElement(MenuItem_1.default, { value: "POLICE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Policing & Court Services") }),
                                React.createElement(Divider_1.default, { inset: true }),
                                React.createElement(MenuItem_1.default, { value: "EMPLOYMENT", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Income Support Services") }),
                                React.createElement(MenuItem_1.default, { value: "HOUSING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Housing Support Services") }),
                                React.createElement(MenuItem_1.default, { value: "CHILDREN", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Children's Services") }),
                                React.createElement(Divider_1.default, { inset: true }),
                                React.createElement(MenuItem_1.default, { value: "HEALTH", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Public Health") }),
                                React.createElement(MenuItem_1.default, { value: "LONGTERMCARE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Long Term Care") }),
                                React.createElement(MenuItem_1.default, { value: 'ADMINISTRATIVE', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Administrative Services") }),
                                React.createElement(MenuItem_1.default, { value: "COUNCIL", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Corporate Management") }),
                                React.createElement(MenuItem_1.default, { value: "PLANNING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Planning & Development") }),
                                React.createElement(MenuItem_1.default, { value: "PERMITS", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Permits, Licencing & Standards") }),
                                React.createElement(Divider_1.default, { inset: true }),
                                React.createElement(MenuItem_1.default, { value: "INTERNAL", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Internal Services") }),
                                React.createElement(MenuItem_1.default, { value: "CORPORATE", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Corporate Accounts (Finance)") }),
                                React.createElement(MenuItem_1.default, { disabled: true, value: 'SPECIAL', primaryText: React.createElement("div", { style: { fontWeight: 'bold' } }, "Special Analytics") }),
                                React.createElement(MenuItem_1.default, { value: "STAFFING", primaryText: React.createElement("div", { style: { paddingLeft: "20px" } }, "Staffing costs") })),
                            React.createElement(RaisedButton_1.default, { disabled: this.state.selectStoryboard == 'SELECT', type: "button", style: { margin: '3px 6px 0 0', verticalAlign: '23px' }, label: "Share", onTouchTap: this.shareStoryboard, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons" }, "share") }),
                            React.createElement(RaisedButton_1.default, { style: { verticalAlign: '25px' }, type: "button", label: "Reset", onTouchTap: () => {
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
            this.state.searchDialogOpen ? React.createElement(searchdialog_1.default, { onRequestClose: this.handleSearchDialogClose, onConfirm: this.findParameters.applySearchBranchSettings }) : null,
            branches);
    }
};
let mapStateToProps = state => {
    return {
        declarationData: reducers_1.getExplorerDeclarationData(state),
    };
};
Explorer = react_redux_1.connect(mapStateToProps, {
    onetimeNotification: ExplorerActions.onetimeNotification,
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
    branchMoveUp: ExplorerActions.branchMoveUp,
    branchMoveDown: ExplorerActions.branchMoveDown,
    changeTab: ExplorerActions.changeTab,
    updateCellTimeScope: ExplorerActions.updateCellTimeScope,
    updateCellChartSelection: ExplorerActions.updateCellChartSelection,
    updateCellYearSelections: ExplorerActions.updateCellYearSelections,
    updateCellChartCode: ExplorerActions.updateCellChartCode,
    updateNode: ExplorerActions.updateNode,
})(Explorer);
exports.default = Explorer;