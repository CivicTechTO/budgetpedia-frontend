'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const DropDownMenu_1 = require("material-ui/DropDownMenu");
const MenuItem_1 = require("material-ui/MenuItem");
const Divider_1 = require("material-ui/Divider");
const Subheader_1 = require("material-ui/Subheader");
const FontIcon_1 = require("material-ui/FontIcon");
const IconButton_1 = require("material-ui/IconButton");
const Dialog_1 = require("material-ui/Dialog");
const Snackbar_1 = require("material-ui/Snackbar");
const Toggle_1 = require("material-ui/Toggle");
const RaisedButton_1 = require("material-ui/RaisedButton");
const react_redux_toastr_1 = require("react-redux-toastr");
const react_animations_1 = require("react-animations");
const Radium = require("radium");
let { StyleRoot } = Radium;
const animations = {
    fadeIn: {
        animation: 'x .5s',
        animationName: Radium.keyframes(react_animations_1.fadeIn, 'fadeIn')
    },
    fadeOut: {
        animation: 'x .5s',
        animationName: Radium.keyframes(react_animations_1.fadeOut, 'fadeOut')
    },
};
let jsonpack = require('jsonpack');
let validurl = require('valid-url');
let ReactGA = require('react-ga');
const onchartcomponentselection_1 = require("../modules/onchartcomponentselection");
const getbudgetnode_1 = require("../modules/getbudgetnode");
const explorernode_1 = require("./explorernode");
const actions_1 = require("../actions");
const branch_class_1 = require("../classes/branch.class");
const Utilities = require("../modules/utilities");
class ExplorerBranch extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            branchNodes: [],
            viewpointData: null,
            snackbar: { open: false, message: 'empty' },
            comparatorselection: 'Off',
            techDialogOpen: false,
            noticeDialogOpen: false,
            selectionsDialogOpen: false,
            animations: {
                buttons: null,
                controls: null,
            }
        };
        this.waitafteraction = 0;
        this.getState = () => this.state;
        this.getProps = () => this.props;
        this.addNodeDeclaration = branchUid => settings => this.props.globalStateActions.addNodeDeclaration(branchUid, settings);
        this.addNodeDeclarations = branchUid => settingslist => this.props.globalStateActions.addNodeDeclarations(branchUid, settingslist);
        this.removeNodeDeclarations = branchUid => nodeItems => this.props.globalStateActions.removeNodeDeclarations(branchUid, nodeItems);
        this.urlparms = null;
        this.urlparmscleared = [];
        this.clearUrlParms = nodeIndex => {
            if (!this.urlparms) {
                console.error('call to remove expired urlparms', nodeIndex);
            }
            this.urlparmscleared.push(nodeIndex);
            if (this.urlparmscleared.length == this.urlparms.settingsdata.length) {
                this.urlparms = null;
                this.urlparmscleared = [];
            }
            setTimeout(() => {
                this.onPortalCreation();
            }, 1000);
        };
        this.logEvent = (parms) => {
            if (window.location.hostname == 'budgetpedia.ca') {
                ReactGA.event(parms);
            }
        };
        this.story = null;
        this.storiescleared = [];
        this.storysettings = [];
        this.clearStory = nodeIndex => {
            if (!this.story) {
                console.error('call to remove expired story', nodeIndex);
            }
            this.storiescleared.push(nodeIndex);
            if (this.storiescleared.length == this.storysettings.length) {
                this.story = null;
                this.storiescleared = [];
                setTimeout(() => {
                    this.onPortalCreation();
                }, 1000);
            }
        };
        this._createStoryNodes = (story, viewpointdata) => {
            let path = this._getStoryPath(story);
            this.props.clearStories(branch_class_1.default);
            story.path = path;
            let settingslist = this._getStorySettingsList(story, viewpointdata);
            this.storysettings = settingslist;
            let explorerbranch = this;
            explorerbranch._stateActions.addNodeDeclarations(settingslist);
        };
        this._getStoryPath = story => {
            let path = [];
            let viewpoint = this.state.viewpointData;
            if (viewpoint.Components && story.code) {
                this._getPath(path, story.code, viewpoint.Components);
            }
            return path;
        };
        this._getStorySettingsList = (story, viewpointdata) => {
            let settingslist = [];
            let path = story.path;
            let nodeCount = path.length + 1;
            for (let n = 0; n < nodeCount; n++) {
                let nodeDefaultSettings = JSON.parse(JSON.stringify(this.props.declarationData.defaults.node));
                let nodeSettings = {
                    aspectName: story.aspect,
                    cellIndex: (n == (nodeCount - 1)) ? story.tab : 0,
                    cellList: null,
                    dataPath: path.slice(0, n),
                    nodeIndex: n,
                    viewpointName: story.viewpoint,
                    yearSelections: {
                        leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                    yearsRange: {
                        firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                };
                let settings = Object.assign(nodeDefaultSettings, nodeSettings);
                settingslist.push({
                    settings,
                });
            }
            return settingslist;
        };
        this._getPath = (path, targetcode, components) => {
            for (let code in components) {
                if (code == targetcode) {
                    let subcomponents = components[code].Components;
                    if (!subcomponents) {
                        subcomponents = components[code].CommonDimension;
                    }
                    if (subcomponents) {
                        path.push(code);
                    }
                    return true;
                }
                let subcomponents = components[code].Components;
                if (subcomponents) {
                    path.push(code);
                    if (this._getPath(path, targetcode, subcomponents)) {
                        return true;
                    }
                    else {
                        path.pop();
                    }
                }
            }
            return false;
        };
        this._createUrlNodes = urlparms => {
            this.urlparms = urlparms;
            this.props.clearUrlParms();
            try {
                let path = urlparms.branchdata.pa;
                let dataNode = getbudgetnode_1.default(this.state.viewpointData, path);
                if (dataNode) {
                    let settingslist = this._geturlsettingslist(urlparms);
                    this._stateActions.addNodeDeclarations(settingslist);
                    return true;
                }
                else {
                    this.props.setToast('error', 'unable to locate data requested by url parameter. Using defaults...');
                }
            }
            catch (e) {
                console.log('urlparms failure', urlparms);
                this.urlparms = null;
            }
            return false;
        };
        this._geturlsettingslist = urlparms => {
            let nodesettings = urlparms.settingsdata;
            let branch = urlparms.branchdata;
            let settingslist = [];
            for (let nodeindex in nodesettings) {
                let node = nodesettings[nodeindex];
                let settings = {
                    aspectName: branch.as,
                    cellIndex: node.ci,
                    cellList: null,
                    dataPath: branch.pa.slice(0, parseInt(nodeindex)),
                    nodeIndex: parseInt(nodeindex),
                    viewpointName: branch.vi,
                    yearSelections: {
                        leftYear: node.ys.ly,
                        rightYear: node.ys.ry,
                    },
                    yearsRange: {
                        firstYear: null,
                        lastYear: null,
                    },
                };
                settingslist.push({
                    settings,
                });
            }
            return settingslist;
        };
        this._initialize = () => {
            let branch = this;
            let { budgetBranch, globalStateActions: actions, displayCallbacks, declarationData } = branch.props;
            branch._stateActions = Object.assign({}, actions);
            branch._stateActions.addNodeDeclaration = branch.addNodeDeclaration(budgetBranch.uid);
            branch._stateActions.addNodeDeclarations = branch.addNodeDeclarations(budgetBranch.uid);
            branch._stateActions.removeNodeDeclarations = branch.removeNodeDeclarations(budgetBranch.uid);
            let { onPortalCreation } = branch;
            let { workingStatus } = displayCallbacks;
            branch._nodeDisplayCallbacks = {
                workingStatus,
                onPortalCreation,
            };
            budgetBranch.getProps = branch.getProps;
            budgetBranch.getState = branch.getState;
            budgetBranch.setState = branch.setState.bind(branch);
            budgetBranch.actions = branch._stateActions;
            budgetBranch.nodeCallbacks = branch._nodeDisplayCallbacks;
            branch._previousControlData = declarationData;
        };
        this._getLeafPath = (code, viewpointdata) => {
            let path = [];
            let selections = [];
            let result = this._searchComponents(code, path, selections, viewpointdata.Components, viewpointdata.SortedComponents);
            if (!result) {
                path = [];
            }
            let isLeaf = !path.pop();
            if (isLeaf) {
                path.pop();
                selections.pop();
            }
            this.pathSelections = selections;
            return path;
        };
        this.lastactiongeneration = 0;
        this.harmonizecount = null;
        this.harmonizeNodesToState = (branchNodes, nodeList, nodesById, budgetBranch) => {
            if (this.harmonizecount === null) {
                this.harmonizecount = (nodeList.length - branchNodes.length);
            }
            if (this.harmonizecount > 0) {
                this.harmonizecount--;
                let nodeIndex = branchNodes.length;
                let budgetNodeId = nodeList[nodeIndex];
                budgetBranch.addNode(budgetNodeId, nodeIndex, nodesById[budgetNodeId]);
                return true;
            }
            else {
                this.harmonizecount = null;
                return false;
            }
        };
        this._respondToGlobalStateChange = () => {
            let { budgetBranch } = this.props;
            let previousControlData = this._previousControlData;
            let currentControlData = this.props.declarationData;
            let { lastTargetedAction } = currentControlData;
            let lastAction = lastTargetedAction[budgetBranch.uid] || {};
            let returnvalue = true;
            if (!actions_1.branchTypes[lastAction.type]) {
                return false;
            }
            if (previousControlData && (currentControlData.generation == previousControlData.generation)) {
                return false;
            }
            switch (lastAction.type) {
                case actions_1.branchTypes.CHANGE_VIEWPOINT: {
                    this._processChangeViewpointSelection(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.UPDATE_BRANCH: {
                    this._processUpdateBranchStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.CHANGE_VERSION: {
                    this._processChangeVersionSelection(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.CHANGE_ASPECT: {
                    this._processChangeAspectSelection(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.TOGGLE_INFLATION_ADJUSTED: {
                    this._processToggleInflationAdjustedSelection(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.UPDATE_PRORATA: {
                    this._processUpdateProrataSelection(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.HARMONIZE_CELLS: {
                    budgetBranch.harmonizeCells();
                    break;
                }
                default:
                    returnvalue = false;
            }
            this._previousControlData = currentControlData;
            return returnvalue;
        };
        this._processChangeViewpointSelection = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                let budgetNodeParms = budgetBranch.getInitialBranchNodeParms();
                this._stateActions.addNodeDeclaration(budgetNodeParms);
            }).catch(reason => {
                console.error('error in data fetch, changeviewpoint', reason);
            });
        };
        this._processUpdateBranchStateChange = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                let settingslist = this._getFinderNodeSettingsList();
                this._stateActions.addNodeDeclarations(settingslist);
                let explorerbranch = this;
                setTimeout(() => {
                    explorerbranch._updateCellChartSelections();
                });
                setTimeout(() => {
                    explorerbranch.onPortalCreation();
                }, 1000);
            }).catch(reason => {
                console.error('error in data fetch, update branch', reason);
            });
        };
        this._updateCellChartSelections = () => {
            let nodes = this.state.branchNodes;
            let selections = this.pathSelections;
            for (let index in selections) {
                let node = nodes[index];
                let cell = node.cells[0];
                let selection = selections[index];
                this._stateActions.updateCellChartSelection(node.uid)(cell.uid, selection);
                cell.chartSelection = selection;
                cell.refreshSelection();
            }
        };
        this._getFinderNodeSettingsList = () => {
            let viewpointdata = this.state.viewpointData;
            let parms = this.finderParms;
            let dictionary = this.findParmsToStateDictionary;
            let settingslist = [];
            if (parms.source == 'detailedbudgets' &&
                (['expense', 'revenue', 'permanence'].indexOf(parms.level) > -1)) {
                let settings = {
                    aspectName: dictionary.aspect[parms.aspect],
                    cellIndex: 1,
                    cellList: null,
                    dataPath: [],
                    nodeIndex: 0,
                    viewpointName: dictionary.viewpoint[parms.viewpoint],
                    yearSelections: {
                        leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                    yearsRange: {
                        firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                };
                settingslist.push({
                    settings,
                });
                react_redux_toastr_1.toastr.info('Find ' + dictionary.level[parms.level].toUpperCase() + ' tabs at any program drilldown level');
            }
            else {
                let leafpath = this._getLeafPath(parms.code, viewpointdata);
                let settings = {
                    aspectName: dictionary.aspect[parms.aspect],
                    cellIndex: 0,
                    cellList: null,
                    dataPath: [],
                    nodeIndex: 0,
                    viewpointName: dictionary.viewpoint[parms.viewpoint],
                    yearSelections: {
                        leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                    yearsRange: {
                        firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                };
                settingslist.push({
                    settings,
                });
                for (let nodeindex in leafpath) {
                    let settings = {
                        aspectName: dictionary.aspect[parms.aspect],
                        cellIndex: 0,
                        cellList: null,
                        dataPath: leafpath.slice(0, parseInt(nodeindex) + 1),
                        nodeIndex: parseInt(nodeindex) + 1,
                        viewpointName: dictionary.viewpoint[parms.viewpoint],
                        yearSelections: {
                            leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                            rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                        },
                        yearsRange: {
                            firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                            lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                        },
                    };
                    settingslist.push({
                        settings,
                    });
                }
            }
            return settingslist;
        };
        this._searchComponents = (code, path, selections, components, sortedcomponents) => {
            for (let component_name in components) {
                path.push(component_name);
                if (component_name == code) {
                    let depth = path.length;
                    let selection;
                    for (let index = 0; index < sortedcomponents.length; index++) {
                        if (sortedcomponents[index].Code == component_name) {
                            selection = index;
                            break;
                        }
                    }
                    selections[depth - 1] = selection;
                    let node = components[component_name];
                    if (node.Components || node.CommonDimension) {
                        path.push(true);
                    }
                    else {
                        path.push(false);
                    }
                    return true;
                }
                else {
                    let subcomponents = components[component_name].Components;
                    let depth = path.length;
                    if (subcomponents) {
                        let sortedsubcomponents = components[component_name].SortedComponents;
                        if (this._searchComponents(code, path, selections, subcomponents, sortedsubcomponents)) {
                            let selection;
                            for (let index = 0; index < sortedcomponents.length; index++) {
                                if (sortedcomponents[index].Code == component_name) {
                                    selection = index;
                                    break;
                                }
                            }
                            selections[depth - 1] = selection;
                            return true;
                        }
                    }
                }
                path.pop();
            }
            return false;
        };
        this._processChangeVersionSelection = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                let path = this.previousVersionPath;
                if (path.length) {
                    let code = path.pop();
                    path = this._getLeafPath(code, this.state.viewpointData);
                }
                let settingslist = this._getTreeSelectionNodeSettingsList(path);
                this._stateActions.addNodeDeclarations(settingslist);
                let explorerbranch = this;
                setTimeout(() => {
                    explorerbranch._updateCellChartSelections();
                }, 500);
                setTimeout(() => {
                    explorerbranch.onPortalCreation();
                }, 1000);
            }).catch(reason => {
                console.error('error in data fetch, changeversion', reason);
            });
        };
        this._processToggleInflationAdjustedSelection = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                budgetBranch.toggleInflationAdjusted();
            }).catch(reason => {
                console.error('error in data fetch, toggle inflation adjustment', reason);
            });
        };
        this._processUpdateProrataSelection = (budgetBranch) => {
            budgetBranch.calculateProRata(this.state.viewpointData).then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                budgetBranch.updateProrata();
            }).catch(reason => {
                console.error('error in data fetch, updata prorata', reason);
            });
        };
        this._processChangeAspectSelection = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                let switchResults = budgetBranch.switchAspect();
                let { deeperdata, shallowerdata, mismatch } = switchResults;
                if (mismatch) {
                    let message = switchResults.message;
                    let { snackbar } = this.state;
                    snackbar = Object.assign({}, snackbar);
                    snackbar.message = message;
                    snackbar.open = true;
                    this.setState({
                        snackbar,
                    });
                }
                if (deeperdata || shallowerdata) {
                    let message = null;
                    if (deeperdata) {
                        message = "More drilldown is available for current selection";
                    }
                    else {
                        message = "Less drilldown is available for current selection";
                    }
                    let { snackbar } = this.state;
                    snackbar = Object.assign({}, snackbar);
                    snackbar.message = message;
                    snackbar.open = true;
                    this.setState({
                        snackbar,
                    });
                }
            }).catch(reason => {
                console.error('error in data fetch, changeaspect', reason);
            });
        };
        this.handleSnackbarRequestClose = () => {
            this.setState({
                snackbar: {
                    open: false,
                    message: 'empty',
                }
            });
        };
        this.branchScrollBlock = null;
        this.onPortalCreation = () => {
            let element = this.branchScrollBlock;
            if (!element) {
                console.error('System Error: expected branch element not found in onPortalCreation');
                return;
            }
            setTimeout(() => {
                let scrollwidth = element.scrollWidth;
                let scrollleft = element.scrollLeft;
                let clientwidth = element.clientWidth;
                let scrollright = scrollleft + clientwidth;
                let targetright = scrollwidth - 500;
                let adjustment = scrollright - targetright;
                if (adjustment > 0) {
                    adjustment = Math.min(adjustment, scrollleft);
                }
                let frames = 60;
                let t = 1 / frames;
                let counter = 0;
                let tick = () => {
                    counter++;
                    let factor = this.easeOutCubic(counter * t);
                    let scrollinterval = adjustment * factor;
                    element.scrollLeft = scrollleft - scrollinterval;
                    if (counter < frames) {
                        requestAnimationFrame(tick);
                    }
                };
                requestAnimationFrame(tick);
            }, 10);
        };
        this.easeOutCubic = t => {
            const t1 = t - 1;
            return t1 * t1 * t1 + 1;
        };
        this.selectViewpoint = (viewpointname) => {
            let { budgetBranch } = this.props;
            let { nodes: branchNodes } = budgetBranch;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = this._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            globalStateActions.changeViewpoint(budgetBranch.uid, viewpointname);
        };
        this.previousVersionPath = null;
        this.selectVersion = (versionName) => {
            let { budgetBranch } = this.props;
            let { nodes: branchNodes } = budgetBranch;
            let path = null;
            for (let n = branchNodes.length - 1; n >= 0; n--) {
                let node = branchNodes[n];
                if (node.treeNodeData.Baseline) {
                    path = node.dataPath;
                }
                if (!path)
                    path = node.dataPath;
            }
            this.previousVersionPath = path;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = this._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            globalStateActions.changeVersion(budgetBranch.uid, versionName);
        };
        this.selectAspect = (aspect) => {
            switch (aspect) {
                case "Expenses":
                case "Revenues":
                case "Staffing":
                    break;
                default:
                    return;
            }
            let { budgetBranch } = this.props;
            budgetBranch.saveNodeStates();
            this.props.globalStateActions.changeAspect(budgetBranch.uid, aspect);
        };
        this.switchComparator = comparatorindex => {
            let { budgetBranch } = this.props;
            this.props.globalStateActions.updateProrata(budgetBranch.uid, comparatorindex);
        };
        this.toggleInflationAdjustment = value => {
            let { budgetBranch } = this.props;
            this.props.globalStateActions.toggleInflationAdjusted(budgetBranch.uid, value);
        };
        this.toggleShowOptions = value => {
            let anims = {
                buttons: null,
                controls: null,
            };
            this.setState({
                animations: anims,
            }, () => {
                let a = (value) ? animations.fadeIn : animations.fadeOut;
                let anims = {
                    buttons: a,
                    controls: a,
                };
                this.setState({
                    animations: anims,
                }, () => {
                    let { budgetBranch } = this.props;
                    this.props.globalStateActions.toggleShowOptions(budgetBranch.uid, value);
                });
            });
        };
        this.handleSearch = (e) => {
            this.props.handleSearchDialogOpen(e, this.applySearchBranchSettings);
        };
        this.finderParms = null;
        this.findParmsToStateDictionary = {
            viewpoint: {
                functionalbudget: 'FUNCTIONAL',
                structuralbudget: 'STRUCTURAL',
                actualexpenses: 'ACTUALEXPENSES',
                actualrevenues: 'ACTUALREVENUES',
                expenditures: 'EXPENDITURES',
            },
            source: {
                summarybudgets: 'SUMMARY',
                detailedbudgets: 'PBFT',
                auditedexpenses: 'ACTUALEXPENSES',
                auditedrevenues: 'ACTUALREVENUES',
                auditedexpenditures: 'EXPENDITURES',
            },
            aspect: {
                expenses: 'Expenses',
                revenues: 'Revenues',
                staffing: 'Staffing',
                expenditures: 'Expenditure',
            },
            level: {
                expense: 'Expenditures',
                revenue: 'Receipts',
                permanence: 'Permanence',
            }
        };
        this.applySearchBranchSettings = parms => {
            let explorerbranch = this;
            if (parms.viewpoint == 'expenditures') {
                parms.aspect = 'expenditures';
            }
            explorerbranch.finderParms = parms;
            let { budgetBranch } = explorerbranch.props;
            let { nodes: branchNodes } = budgetBranch;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = explorerbranch._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            let settings = explorerbranch._getNewBranchSettings(parms);
            globalStateActions.updateBranch(budgetBranch.uid, settings);
        };
        this._getNewBranchSettings = parms => {
            let dictionary = this.findParmsToStateDictionary;
            let settings = {
                viewpoint: dictionary.viewpoint[parms.viewpoint],
                aspect: dictionary.aspect[parms.aspect],
                version: dictionary.source[parms.source],
            };
            return settings;
        };
        this.applytaxonomyselection = (parms) => {
            let targetcode = parms.selectedleafnode ? parms.selectedleafnode : parms.selectedtreenode;
            let branchDeclaration = this.props.declarationData.branchesById[this.props.budgetBranch.uid];
            let pathParms = {
                code: targetcode,
                aspect: branchDeclaration.aspect,
                name: targetcode
            };
            let path = this._getLeafPath(pathParms.code, this.state.viewpointData);
            let { budgetBranch } = this.props;
            let { nodes: branchNodes } = budgetBranch;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = this._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            let settingslist = this._getTreeSelectionNodeSettingsList(path);
            this._stateActions.addNodeDeclarations(settingslist);
            let explorerbranch = this;
            setTimeout(() => {
                explorerbranch._updateCellChartSelections();
            }, 500);
            setTimeout(() => {
                explorerbranch.onPortalCreation();
            }, 1000);
        };
        this._getTreeSelectionNodeSettingsList = (path) => {
            let settingslist = [];
            let viewpointdata = this.state.viewpointData;
            let branchDeclaration = this.props.declarationData.branchesById[this.props.budgetBranch.uid];
            let settings = {
                aspectName: branchDeclaration.aspect,
                cellIndex: 0,
                cellList: null,
                dataPath: [],
                nodeIndex: 0,
                viewpointName: branchDeclaration.viewpoint,
                yearSelections: {
                    leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                    rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
                yearsRange: {
                    firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                    lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                },
            };
            settingslist.push({
                settings,
            });
            for (let nodeindex in path) {
                let settings = {
                    aspectName: branchDeclaration.aspect,
                    cellIndex: 0,
                    cellList: null,
                    dataPath: path.slice(0, parseInt(nodeindex) + 1),
                    nodeIndex: parseInt(nodeindex) + 1,
                    viewpointName: branchDeclaration.viewpoint,
                    yearSelections: {
                        leftYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        rightYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                    yearsRange: {
                        firstYear: viewpointdata.Meta.datasetConfig.YearsRange.start,
                        lastYear: viewpointdata.Meta.datasetConfig.YearsRange.end,
                    },
                };
                settingslist.push({
                    settings,
                });
            }
            return settingslist;
        };
        this.harmonizeCells = (nodeUid, cellUid) => {
            let { budgetBranch } = this.props;
            let nodeList = [];
            let cellList = [];
            let nodeProperties = { cellIndex: null, yearSelections: null };
            let cellProperties = { yearScope: null, chartCode: null, nodeDataseriesName: null };
            let declarationData = this.props.declarationData;
            let refnode = declarationData.nodesById[nodeUid];
            let refcell = declarationData.cellsById[cellUid];
            nodeProperties.cellIndex = refnode.cellIndex;
            nodeProperties.yearSelections = Object.assign({}, refnode.yearSelections);
            cellProperties.yearScope = refcell.yearScope;
            cellProperties.chartCode = refcell.chartConfigs[refcell.yearScope].explorerChartCode;
            cellProperties.nodeDataseriesName = refcell.nodeDataseriesName;
            let nodeidlist = declarationData.branchesById[budgetBranch.uid].nodeList;
            for (let nodeid of nodeidlist) {
                nodeList.push(nodeid);
                let tempnode = declarationData.nodesById[nodeid];
                let cellidlist = tempnode.cellList;
                for (let cellid of cellidlist) {
                    if (cellid == cellUid)
                        continue;
                    cellList.push(cellid);
                }
            }
            if (nodeList.length > 0) {
                this._stateActions.harmonizeCells(budgetBranch.uid, nodeProperties, cellProperties, nodeList, cellList);
            }
        };
        this.getPortals = (budgetNodes) => {
            let branch = this;
            let { viewpointData } = branch.state;
            if (!viewpointData)
                return [];
            let datasetConfig = viewpointData.Meta.datasetConfig;
            let portalSeriesName = datasetConfig.DatasetName;
            if (datasetConfig.Units == 'DOLLAR') {
                portalSeriesName += ' (' + datasetConfig.UnitsAlias + ')';
            }
            let portals = budgetNodes.map((budgetNode, nodeindex) => {
                let branchDeclaration = branch.props.declarationData.branchesById[branch.props.budgetBranch.uid];
                let portalName = null;
                let treeNodeData = budgetNode.treeNodeData;
                if (treeNodeData.Name) {
                    portalName = budgetNode.treeNodeData.Name;
                    portalName += ' ' + portalSeriesName;
                }
                else {
                    portalName = datasetConfig.DatasetTitle;
                }
                let portalConfig = {
                    portalName,
                };
                budgetNode.portalConfig = portalConfig;
                let viewpointdata = branch.state.viewpointData;
                let { NamingConfigurations: viewpointNamingConfigs, isInflationAdjusted, } = viewpointdata.Meta;
                let viewpointConfigPack = {
                    viewpointNamingConfigs,
                    datasetConfig,
                    isInflationAdjusted,
                    prorata: branchDeclaration.prorata,
                };
                budgetNode.viewpointConfigPack = viewpointConfigPack;
                budgetNode.branchSettings = branch.props.budgetBranch.branchDeclaration;
                budgetNode.onChartComponentSelection = onchartcomponentselection_1.onChartComponentSelection(branch.props.budgetBranch);
                let actions = Object.assign({}, branch._stateActions);
                actions.updateCellTimeScope = branch._stateActions.updateCellTimeScope(budgetNode.uid);
                actions.updateCellChartSelection = branch._stateActions.updateCellChartSelection(budgetNode.uid);
                actions.updateCellChartCode = branch._stateActions.updateCellChartCode(budgetNode.uid);
                actions.updateCellYearSelections = branch._stateActions.updateCellYearSelections(budgetNode.uid);
                return React.createElement(explorernode_1.ExplorerNode, { key: budgetNode.uid, callbackid: nodeindex, budgetNode: budgetNode, declarationData: branch.props.declarationData, globalStateActions: actions, showControls: branchDeclaration.showOptions, dataGenerationCounter: branchDeclaration.branchDataGeneration, callbacks: { harmonizeCells: branch.harmonizeCells }, urlparms: this.urlparms, story: this.story, clearUrlParms: this.clearUrlParms, clearStory: this.clearStory, onCallAnalystNotes: this.props.onCallAnalystNotes });
            });
            return portals;
        };
        this._inputonfocus = () => {
            this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length);
        };
        this.shareBranch = () => {
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Share branch',
            });
            let longurl = this._getShareUrl();
            this._getBitlyUrl(longurl).then((json) => {
                if (json.status_code != 200) {
                    let errmessage = json.status_txt + '(' + json.status_code + ')';
                    console.log('error message', errmessage);
                    throw new Error(errmessage);
                }
                let url = json.data.url;
                let toastrComponent = () => (React.createElement("div", { style: { width: "300px" } },
                    React.createElement("p", { style: { width: "290px" } }, "To share the selected row of charts, copy the url below, and send it to a friend."),
                    React.createElement("input", { ref: node => {
                            this._inputfieldref = node;
                        }, onFocus: this._inputonfocus, style: { width: "290px" }, value: url, readOnly: true })));
                let toastrOptions = {
                    icon: (React.createElement(FontIcon_1.default, { className: "material-icons" }, "share")),
                    component: toastrComponent
                };
                react_redux_toastr_1.toastr.message('Share charts', toastrOptions);
            }).catch(error => {
                console.log('error getting bitly', error);
                react_redux_toastr_1.toastr.error('Bitly error', error.message);
            });
        };
        this._getBitlyUrl = (longurl) => {
            let token = 'bdf92b4b130fbc1d19871694f8fe957ccb775e12';
            return fetch('https://api-ssl.bitly.com/v3/shorten?access_token=' + token + '&longUrl=' + encodeURIComponent('http://' + longurl)).then((response) => {
                let json = response.json();
                return json;
            }).catch(error => {
                console.error('error getting bitly url', error);
            });
        };
        this._getShareUrl = () => {
            let branch = this;
            let branchDeclaration = branch.props.declarationData.branchesById[branch.props.budgetBranch.uid];
            let government = branchDeclaration.repository;
            let viewpoint = branchDeclaration.viewpoint;
            let version = branchDeclaration.version;
            let aspect = branchDeclaration.aspect;
            let prorata = branchDeclaration.prorata;
            let adjusted = branchDeclaration.inflationAdjusted;
            let path = this.state.branchNodes[this.state.branchNodes.length - 1].dataPath;
            let query = {
                g: government,
                vi: viewpoint,
                ve: version,
                as: aspect,
                pr: prorata,
                ad: adjusted,
                pa: path,
            };
            let nodeDeclarations = [];
            let node;
            for (node of this.state.branchNodes) {
                nodeDeclarations.push(node.nodeDeclaration);
            }
            let settings = [];
            for (let nodeDeclaration of nodeDeclarations) {
                let cellDeclarations = [];
                for (let celluid of nodeDeclaration.cellList) {
                    cellDeclarations.push(branch.props.declarationData.cellsById[celluid]);
                }
                let cellSettingsList = [];
                for (let cellDeclaration of cellDeclarations) {
                    let cellSettings = {
                        ys: cellDeclaration.yearScope,
                        ct: cellDeclaration.chartConfigs[cellDeclaration.yearScope].explorerChartCode
                    };
                    cellSettingsList.push(cellSettings);
                }
                let nodesettings = {
                    ci: nodeDeclaration.cellIndex,
                    ys: {
                        ly: nodeDeclaration.yearSelections.leftYear,
                        ry: nodeDeclaration.yearSelections.rightYear,
                    },
                    c: cellSettingsList[nodeDeclaration.cellIndex],
                };
                settings.push(nodesettings);
            }
            let branchstring = jsonpack.pack(query);
            let bsencoded = encodeURIComponent(branchstring);
            let settingsstring = jsonpack.pack(settings);
            let ssencoded = encodeURIComponent(settingsstring);
            let hashcode = Utilities.hashCode(branchstring + settingsstring);
            let url = location.hostname + '/explorer?branch=' + bsencoded + '&settings=' + ssencoded + '&hash=' + hashcode;
            return url;
        };
        this.handleSelectionsDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Selections Dialog',
            });
            this.setState({
                selectionsDialogOpen: true
            });
        };
        this.handleTechDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Show sources',
            });
            this.setState({
                techDialogOpen: true
            });
        };
        this.handleNoticeDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.logEvent({
                category: 'ExplorerBranch',
                action: 'Show notices',
            });
            this.setState({
                noticeDialogOpen: true
            });
        };
        this.handleSelectionsDialogClose = () => {
            this.setState({
                selectionsDialogOpen: false
            });
        };
        this.handleTechDialogClose = () => {
            this.setState({
                techDialogOpen: false
            });
        };
        this.handleNoticeDialogClose = () => {
            this.setState({
                noticeDialogOpen: false
            });
        };
        this.openwindow = (url) => {
            open(url, '_blank');
        };
        this.getBranchDataMessages = () => {
            if (!this.state.viewpointData)
                return null;
            let { datasetConfig } = this.state.viewpointData.Meta;
            let { DatasetTitle, Sources } = datasetConfig;
            let { Messages } = Sources;
            let messages = [];
            for (let index in Messages) {
                messages.push(React.createElement("div", { key: index }, Messages[index]));
            }
            return ((messages.length > 0) ? React.createElement("div", { style: { padding: "3px", margin: "3px", backgroundColor: "LemonChiffon" } }, messages) : null);
        };
        this.getTechNotesDisplay = () => {
            if (!this.state.viewpointData)
                return null;
            let { datasetConfig } = this.state.viewpointData.Meta;
            let { DatasetTitle, Sources } = datasetConfig;
            let { Headers } = Sources;
            let headerkeys = Object.keys(Headers);
            let itemlist = headerkeys.map(headerkey => {
                let item = Headers[headerkey];
                let notes = item.NOTES_CONTENT;
                let link = item.SOURCE_DOCUMENT_LINK_COPY;
                let isvalidurl = validurl.isUri(link);
                let doctitle = item.SOURCE_DOCUMENT_TITLE;
                let tablelocation = item.SOURCE_DOCUMENT_TABLE_LOCATION;
                let tabletitle = item.SOURCE_DOCUMENT_TABLE_TITLE;
                return React.createElement("div", { key: headerkey, style: {
                        marginBottom: "8px",
                        border: "1px solid silver",
                        borderRadius: "8px",
                        padding: "3px",
                    } },
                    React.createElement(RaisedButton_1.default, { style: { marginLeft: "3px", float: "right" }, disabled: !isvalidurl, type: "button", label: "Source", onTouchTap: () => {
                            isvalidurl ? this.openwindow(link) : void (0);
                        } }),
                    React.createElement("div", { style: { fontWeight: "bold" } }, headerkey),
                    React.createElement("div", { style: { whiteSpace: "normal" } },
                        React.createElement("div", null,
                            "Document title: ",
                            doctitle),
                        (!isvalidurl) ? React.createElement("div", null, "Invalid link! no source available") : null,
                        tabletitle ? React.createElement("div", null,
                            "Table title: ",
                            tabletitle) : null,
                        tablelocation ? React.createElement("div", null,
                            "Table location: ",
                            tablelocation) : null,
                        notes ? React.createElement("div", null,
                            "Note: ",
                            notes) : null));
            });
            return React.createElement("div", null,
                React.createElement(Subheader_1.default, null, DatasetTitle),
                itemlist);
        };
        this.taxonomychoices = {
            FUNCTIONAL: "Internal budget: Programs by function",
            STRUCTURAL: "Internal budget: Programs by org type",
            ACTUALEXPENSES: "Audited actual: Expenses by function",
            ACTUALREVENUES: "Audited actual: Revenues by type",
            EXPENDITURES: "Audited actual: Expenses by type",
            FINANCIALASSETS: "Audited actual: Financial assets",
            TANGIBLEASSETS: "Audited actual: Tangible assets",
        };
    }
    componentWillMount() {
        this._initialize();
        let { budgetBranch, declarationData } = this.props;
        let branchDeclarationData = declarationData.branchesById[budgetBranch.uid];
        if (branchDeclarationData.story) {
            this.story = branchDeclarationData.story;
            this._stateActions.clearBranchStory(budgetBranch.uid);
        }
        budgetBranch.getViewpointData().then(() => {
            this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
            let story;
            let explorerbranch = this;
            if (this.story) {
                story = explorerbranch.story;
                explorerbranch._createStoryNodes(story, explorerbranch.state.viewpointData);
                return;
            }
            if (branchDeclarationData.nodeList.length == 0) {
                let { urlparms } = this.props;
                if (urlparms) {
                    if (this._createUrlNodes(urlparms))
                        return;
                }
                let budgetNodeParms = budgetBranch.getInitialBranchNodeParms();
                this._stateActions.addNodeDeclaration(budgetNodeParms);
            }
            else {
                setTimeout(() => {
                    this._stateActions.resetLastAction();
                });
            }
        }).catch(reason => {
            console.error('error in data fetch, componentWillMount (branch)', reason);
        });
    }
    componentWillReceiveProps(nextProps) {
        let { nodesById } = nextProps.declarationData;
        let branchNodes = this.props.budgetBranch.nodes;
        let newBranchNodes = branchNodes.filter((node) => {
            return !!nodesById[node.uid];
        });
        if (newBranchNodes.length != branchNodes.length) {
            this.setState({
                branchNodes: newBranchNodes,
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        let show = false;
        if (nextState.snackbar.open != this.state.snackbar.open) {
            if (show)
                console.log('should update branch return true for snackbar');
            return true;
        }
        let branchComponent = this;
        return Utilities.filterActionsForUpdate(nextProps, branchComponent, show);
    }
    componentDidUpdate() {
        let { budgetBranch, declarationData } = this.props;
        let branchDeclarations = declarationData.branchesById[budgetBranch.uid];
        let { nodeList } = branchDeclarations;
        let { nodesById } = this.props.declarationData;
        let branchNodes = this.props.budgetBranch.nodes;
        if (!this.harmonizeNodesToState(branchNodes, nodeList, nodesById, budgetBranch)) {
            this._respondToGlobalStateChange();
        }
    }
    render() {
        let branch = this;
        let drilldownrow = branch.props.budgetBranch.nodes;
        let drilldownportals = branch.getPortals(drilldownrow);
        let branchDeclaration = this.props.declarationData.branchesById[this.props.budgetBranch.uid];
        let viewpointselection = React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement("div", { style: { display: 'inline-block' } },
                React.createElement("div", { style: { fontStyle: "italic", display: 'inline-block', height: '48px', verticalAlign: '23px' } },
                    React.createElement("span", { style: { lineHeight: '44px' } }, "Select workspace:")),
                React.createElement(DropDownMenu_1.default, { value: branchDeclaration.viewpoint, onChange: (e, index, value) => {
                        branch.selectViewpoint(value);
                    } },
                    React.createElement(MenuItem_1.default, { value: 'FUNCTIONAL', primaryText: this.taxonomychoices.FUNCTIONAL }),
                    React.createElement(MenuItem_1.default, { value: 'STRUCTURAL', primaryText: this.taxonomychoices.STRUCTURAL }),
                    React.createElement(Divider_1.default, null),
                    React.createElement(MenuItem_1.default, { value: 'ACTUALEXPENSES', primaryText: this.taxonomychoices.ACTUALEXPENSES }),
                    React.createElement(MenuItem_1.default, { value: 'ACTUALREVENUES', primaryText: this.taxonomychoices.ACTUALREVENUES }),
                    React.createElement(MenuItem_1.default, { value: 'EXPENDITURES', primaryText: this.taxonomychoices.EXPENDITURES }),
                    React.createElement(MenuItem_1.default, { value: 'FINANCIALASSETS', primaryText: this.taxonomychoices.FINANCIALASSETS }),
                    React.createElement(MenuItem_1.default, { value: 'NONFINANCIALASSETS', primaryText: this.taxonomychoices.TANGIBLEASSETS }))));
        let governmentselection = React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement("div", { style: { fontStyle: "italic", display: 'inline-block', height: '48px', verticalAlign: 'top', paddingTop: '5px' } },
                React.createElement("span", { style: { lineHeight: '44px' } }, "Select city:")),
            React.createElement(DropDownMenu_1.default, { value: "Toronto", disabled: true },
                React.createElement(MenuItem_1.default, { value: 'Toronto', primaryText: "Toronto, Ontario" })));
        const versionchoices = () => {
            switch (branchDeclaration.viewpoint) {
                case "FUNCTIONAL":
                case "STRUCTURAL":
                    return [React.createElement(MenuItem_1.default, { key: 1, value: 'SUMMARY', primaryText: "Summary PDF reports 2003 - 2017" },
                            React.createElement("em", null, "This data is shallower, but goes back further:")),
                        React.createElement(MenuItem_1.default, { key: 2, value: 'PBFT', primaryText: "Detail open data portal files 2011 - 2017" },
                            React.createElement("em", null, "This data drills down to Account Categories:")),
                        React.createElement(MenuItem_1.default, { key: 3, disabled: true, value: 'VARIANCE', primaryText: "PDF Variance Reports" })];
                case 'ACTUALEXPENSES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'ACTUALEXPENSES', primaryText: "Audited statements 1998 - 2016" })];
                case 'ACTUALREVENUES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'ACTUALREVENUES', primaryText: "Audited statements 1998 - 2016" })];
                case 'EXPENDITURES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'EXPENDITURES', primaryText: "Audited statements 1998 - 2016" })];
                case 'FINANCIALASSETS':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'FINANCIALASSETS', primaryText: "Audited statements 2010 - 2016" })];
                case 'NONFINANCIALASSETS':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'NONFINANCIALASSETS', primaryText: "Audited statements 2010 - 2016" })];
            }
        };
        let versionselection = React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement("div", { style: { fontStyle: "italic", display: 'inline-block', height: '48px', verticalAlign: 'top', paddingTop: '5px' } },
                React.createElement("span", { style: { lineHeight: '44px' } }, "Select dataset:")),
            React.createElement(DropDownMenu_1.default, { disabled: versionchoices().length < 2, value: branchDeclaration.version, onChange: (e, index, value) => {
                    branch.selectVersion(value);
                } }, versionchoices()));
        const aspectchoices = () => {
            switch (branchDeclaration.viewpoint) {
                case "FUNCTIONAL":
                case "STRUCTURAL":
                    return [React.createElement(MenuItem_1.default, { key: 1, value: 'Expenses', primaryText: "Expenditures" }),
                        React.createElement(MenuItem_1.default, { key: 2, value: 'Revenues', primaryText: "Receipts" }),
                        React.createElement(MenuItem_1.default, { key: 3, value: 'Staffing', primaryText: "Staffing" })];
                case 'ACTUALEXPENSES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'Expenses', primaryText: "Expenses" })];
                case 'ACTUALREVENUES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'Revenues', primaryText: "Revenues" })];
                case 'EXPENDITURES':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'Expenditure', primaryText: "Expenses" })];
                case 'FINANCIALASSETS':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'Assets', primaryText: "Assets" })];
                case 'NONFINANCIALASSETS':
                    return [React.createElement(MenuItem_1.default, { key: 4, value: 'TangibleAssets', primaryText: "Tangible Assets" })];
            }
        };
        let aspectselection = React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement("div", { style: { fontStyle: "italic", display: 'inline-block', height: '48px', verticalAlign: 'top', paddingTop: '5px' } },
                React.createElement("span", { style: { lineHeight: '44px' } }, "Select category:")),
            React.createElement(DropDownMenu_1.default, { disabled: aspectchoices().length < 2, value: branchDeclaration.aspect, onChange: (e, index, value) => {
                    branch.selectAspect(value);
                } }, aspectchoices()));
        let byunitselection = React.createElement("div", { style: { display: 'inline-block' } },
            React.createElement("div", { style: { fontStyle: "italic", display: 'inline-block', height: '48px', verticalAlign: 'top', paddingTop: '5px' } },
                React.createElement("span", { style: { lineHeight: '44px' } }, "Prorated:")),
            React.createElement(DropDownMenu_1.default, { value: branchDeclaration.prorata, onChange: (e, index, value) => {
                    this.switchComparator(value);
                } },
                React.createElement(MenuItem_1.default, { value: 'OFF', primaryText: "Off" }),
                React.createElement(MenuItem_1.default, { value: 'PERPERSON', primaryText: "Per person" }),
                React.createElement(MenuItem_1.default, { value: 'PER100000PERSONS', primaryText: "Per 100,000 people" }),
                React.createElement(MenuItem_1.default, { value: 'PERHOUSEHOLD', primaryText: "Per household" }),
                React.createElement(MenuItem_1.default, { value: 'PER40000HOUSEHOLDS', primaryText: "Per 40,000 households" }),
                React.createElement(MenuItem_1.default, { value: 'PERWARD', primaryText: "Per ward (x 44)" }),
                React.createElement(MenuItem_1.default, { value: 'PERNEIGHBOURHOOD', primaryText: "Per neighbourhood (x 4 x 44)" })));
        let inflationadjustment = React.createElement("div", { style: {
                display: 'inline-block',
                whiteSpace: "nowrap",
                verticalAlign: "top",
                marginRight: '16px',
            } },
            React.createElement(Toggle_1.default, { label: 'Inflation adjusted:', style: {
                    height: '32px',
                    marginTop: '16px',
                    display: 'inline-block',
                }, onToggle: (e, value) => {
                    this.toggleInflationAdjustment(value);
                }, labelStyle: {
                    fontStyle: 'italic'
                }, defaultToggled: branchDeclaration.inflationAdjusted }));
        let showcontrols = React.createElement("div", { style: {
                display: 'inline-block',
                whiteSpace: "nowrap",
                verticalAlign: "top"
            } },
            React.createElement(Toggle_1.default, { label: 'Show chart controls:', style: { height: '32px', marginTop: '16px' }, labelStyle: { fontStyle: 'italic' }, defaultToggled: branchDeclaration.showOptions, onToggle: (e, value) => {
                    this.toggleShowOptions(value);
                } }));
        let selectionsdialog = (branchDeclaration.showOptions) ?
            React.createElement(Dialog_1.default, { title: "Make selections for this row of charts", modal: false, open: branch.state.selectionsDialogOpen, onRequestClose: branch.handleSelectionsDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' } },
                React.createElement(IconButton_1.default, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, onTouchTap: branch.handleSelectionsDialogClose },
                    React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                React.createElement("div", null,
                    governmentselection,
                    viewpointselection,
                    versionselection,
                    aspectselection),
                React.createElement(RaisedButton_1.default, { label: "Done", style: { margin: '3px 6px 0 0', float: 'right' }, onTouchTap: branch.handleSelectionsDialogClose }),
                React.createElement("div", null)) : null;
        let noticesdialog = (branchDeclaration.showOptions) ?
            React.createElement(Dialog_1.default, { title: "Notices for this data", modal: false, open: branch.state.noticeDialogOpen, onRequestClose: branch.handleNoticeDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' } },
                React.createElement(IconButton_1.default, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, onTouchTap: branch.handleNoticeDialogClose },
                    React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                branch.state.noticeDialogOpen ? branch.getBranchDataMessages() : null) : null;
        let technotesdialog = (branchDeclaration.showOptions) ?
            React.createElement(Dialog_1.default, { title: "Row Data Sources", modal: false, open: branch.state.techDialogOpen, onRequestClose: branch.handleTechDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' } },
                React.createElement(IconButton_1.default, { style: {
                        top: 0,
                        right: 0,
                        padding: 0,
                        height: "36px",
                        width: "36px",
                        position: "absolute",
                        zIndex: 2,
                    }, onTouchTap: branch.handleTechDialogClose },
                    React.createElement(FontIcon_1.default, { className: "material-icons", style: { cursor: "pointer" } }, "close")),
                React.createElement("div", null,
                    "Please report any problems to ",
                    React.createElement("a", { target: "_blank", href: "mailto:mail@budgetpedia.ca" }, "mail@budgetpedia.ca"),
                    " "),
                branch.state.techDialogOpen ? branch.getTechNotesDisplay() : null,
                React.createElement("div", null, "Note: some historical numbers have been allocated to contemporary categories for continuity -- to make the numbers more easily comparable. We plan to disclose continuity details here.")) : null;
        let technotes = React.createElement(RaisedButton_1.default, { style: { margin: '3px 6px 0 0' }, type: "button", label: "Sources", onTouchTap: branch.handleTechDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "cloud") });
        let notices = React.createElement(RaisedButton_1.default, { style: { margin: '3px 6px 0 0' }, type: "button", label: "Notices", onTouchTap: branch.handleNoticeDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "priority_high") });
        let makeselections = React.createElement(RaisedButton_1.default, { label: "Selections", style: { margin: '3px 6px 0 0' }, type: "button", onTouchTap: branch.handleSelectionsDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons" }, "settings_applications") });
        let viewtaxonomy = React.createElement(RaisedButton_1.default, { label: "Workspace tree", style: { margin: '3px 6px 0 0' }, type: "button", onTouchTap: () => {
                let viewpointselection = {
                    viewpoint: branchDeclaration.viewpoint,
                    name: this.taxonomychoices[branchDeclaration.viewpoint]
                };
                this.props.onCallViewTaxonomy(this.state.viewpointData, viewpointselection, this.applytaxonomyselection);
            }, labelPosition: "before", icon: React.createElement("img", { style: { width: '24px' }, src: "./public/icons/org_chart.svg" }) });
        let search = React.createElement(RaisedButton_1.default, { label: "Search", style: { margin: '3px 6px 0 0' }, type: "button", onTouchTap: this.handleSearch, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons" }, "search") });
        let shareurl = React.createElement(RaisedButton_1.default, { type: "button", style: { margin: '3px 6px 0 0' }, label: "Share", onTouchTap: this.shareBranch, labelPosition: "before", icon: React.createElement(FontIcon_1.default, { style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons" }, "share") });
        let maxheight = (branchDeclaration.showOptions) ? '130px' : '0';
        let height = (branchDeclaration.showOptions) ? '52px' : '0';
        let maxwidth = (branchDeclaration.showOptions) ? '600px' : '0';
        return React.createElement(StyleRoot, null,
            React.createElement("div", { style: { marginBottom: '12px' } },
                " ",
                React.createElement("div", null,
                    React.createElement("div", { style: { maxHeight: maxheight, transition: 'max-height .5s', overflow: 'hidden' } },
                        React.createElement("div", { style: [this.state.animations.buttons, { marginBottom: '12px' }] },
                            makeselections,
                            viewtaxonomy,
                            search,
                            shareurl,
                            technotes,
                            notices),
                        selectionsdialog,
                        noticesdialog,
                        technotesdialog),
                    React.createElement("div", { style: [this.state.animations.controls,
                            {
                                height,
                                maxWidth: maxwidth,
                                overflow: 'hidden',
                                display: "inline-block",
                                transition: 'height .3s,max-width .3s',
                            }] },
                        React.createElement("div", { style: { height: '48px',
                                whiteSpace: 'nowrap',
                                display: "inline-block",
                                backgroundColor: "#ebfaf9",
                                border: "1px solid silver",
                                borderRadius: "8px",
                                marginRight: "6px",
                                paddingLeft: "6px",
                            } },
                            byunitselection,
                            inflationadjustment)),
                    showcontrols)),
            React.createElement("div", { style: { whiteSpace: "nowrap" } },
                React.createElement("div", { ref: node => {
                        branch.branchScrollBlock = node;
                    }, style: { overflow: "scroll" } },
                    drilldownportals,
                    React.createElement("div", { style: { display: "inline-block", width: "500px", height: "20px" } }))),
            React.createElement(Snackbar_1.default, { open: this.state.snackbar.open, message: this.state.snackbar.message, autoHideDuration: 4000, onRequestClose: this.handleSnackbarRequestClose }));
    }
}
exports.default = ExplorerBranch;
