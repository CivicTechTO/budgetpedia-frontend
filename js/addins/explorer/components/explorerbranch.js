'use strict';
const React = require('react');
var { Component } = React;
const DropDownMenu_1 = require('material-ui/DropDownMenu');
const MenuItem_1 = require('material-ui/MenuItem');
const Subheader_1 = require('material-ui/Subheader');
const FontIcon_1 = require('material-ui/FontIcon');
const IconButton_1 = require('material-ui/IconButton');
const Dialog_1 = require('material-ui/Dialog');
const Snackbar_1 = require('material-ui/Snackbar');
const Toggle_1 = require('material-ui/Toggle');
const RaisedButton_1 = require('material-ui/RaisedButton');
const react_redux_toastr_1 = require('react-redux-toastr');
let jsonpack = require('jsonpack');
let validurl = require('valid-url');
const onchartcomponentselection_1 = require('../modules/onchartcomponentselection');
const getbudgetnode_1 = require('../modules/getbudgetnode');
const explorernode_1 = require('./explorernode');
const actions_1 = require('../actions');
const Utilities = require('../modules/utilities');
class ExplorerBranch extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            branchNodes: [],
            viewpointData: null,
            snackbar: { open: false, message: 'empty' },
            comparatorselection: 'Off',
            techDialogOpen: false,
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
                    this._processChangeViewpointStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.UPDATE_BRANCH: {
                    this._processUpdateBranchStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.CHANGE_VERSION: {
                    this._processChangeVersionStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.CHANGE_ASPECT: {
                    this._processChangeAspectStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.TOGGLE_INFLATION_ADJUSTED: {
                    this._processToggleInflationAdjustedStateChange(budgetBranch);
                    break;
                }
                case actions_1.branchTypes.UPDATE_PRORATA: {
                    this._processUpdateProrataStateChange(budgetBranch);
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
        this._processChangeViewpointStateChange = (budgetBranch) => {
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
                let explorer = this;
                setTimeout(() => {
                    explorer._updateCellChartSelections();
                });
                setTimeout(() => {
                    explorer.onPortalCreation();
                }, 1000);
            }).catch(reason => {
                console.error('error in data fetch, update branch', reason);
            });
        };
        this._updateCellChartSelections = () => {
            let nodes = this.state.branchNodes;
            let selections = this.finderSelections;
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
                let leafpath = this._getLeafPath(parms, viewpointdata);
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
        this._getLeafPath = (parms, viewpointdata) => {
            let path = [];
            let selections = [];
            let code = parms.code;
            let result = this._searchComponents(code, path, selections, viewpointdata.Components, viewpointdata.SortedComponents);
            if (!result) {
                react_redux_toastr_1.toastr.warning(this.findParmsToStateDictionary.aspect[parms.aspect] + ' chart not available for that selection (' + parms.name + ')');
            }
            let isLeaf = !path.pop();
            if (isLeaf) {
                path.pop();
                selections.pop();
            }
            this.finderSelections = selections;
            return path;
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
        this._processChangeVersionStateChange = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                let budgetNodeParms = budgetBranch.getInitialBranchNodeParms();
                this._stateActions.addNodeDeclaration(budgetNodeParms);
            }).catch(reason => {
                console.error('error in data fetch, changeversion', reason);
            });
        };
        this._processToggleInflationAdjustedStateChange = (budgetBranch) => {
            budgetBranch.getViewpointData().then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                budgetBranch.toggleInflationAdjusted();
            }).catch(reason => {
                console.error('error in data fetch, toggle inflation adjustment', reason);
            });
        };
        this._processUpdateProrataStateChange = (budgetBranch) => {
            budgetBranch.calculateProRata(this.state.viewpointData).then(() => {
                this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
                budgetBranch.updateProrata();
            }).catch(reason => {
                console.error('error in data fetch, updata prorata', reason);
            });
        };
        this._processChangeAspectStateChange = (budgetBranch) => {
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
                        message = "More drilldown is available for current aspect selection";
                    }
                    else {
                        message = "Less drilldown is available for current aspect selection";
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
            });
        };
        this.easeOutCubic = t => {
            const t1 = t - 1;
            return t1 * t1 * t1 + 1;
        };
        this.switchViewpoint = (viewpointname) => {
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
        this.switchVersion = (versionName) => {
            let { budgetBranch } = this.props;
            let { nodes: branchNodes } = budgetBranch;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = this._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            globalStateActions.changeVersion(budgetBranch.uid, versionName);
        };
        this.switchAspect = (aspect) => {
            switch (aspect) {
                case "Expenses":
                case "Revenues":
                case "Staffing":
                    break;
                default:
                    return;
            }
            let { budgetBranch } = this.props;
            budgetBranch.saveAspectState();
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
            let { budgetBranch } = this.props;
            this.props.globalStateActions.toggleShowOptions(budgetBranch.uid, value);
        };
        this.handleSearch = (e) => {
            this.props.handleFindDialogOpen(e, this.applySearch);
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
        this.applySearch = parms => {
            let explorer = this;
            if (parms.viewpoint == 'expenditures') {
                parms.aspect = 'expenditures';
            }
            explorer.finderParms = parms;
            let { budgetBranch } = explorer.props;
            let { nodes: branchNodes } = budgetBranch;
            let removed = branchNodes.splice(0);
            let removeditems = removed.map((item) => {
                return { nodeuid: item.uid, cellList: item.cellDeclarationList };
            });
            let globalStateActions = explorer._stateActions;
            globalStateActions.removeNodeDeclarations(removeditems);
            let settings = explorer._getNewBranchSettings(parms);
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
                return React.createElement(explorernode_1.ExplorerNode, {key: budgetNode.uid, callbackid: nodeindex, budgetNode: budgetNode, declarationData: branch.props.declarationData, globalStateActions: actions, showControls: branchDeclaration.showOptions, dataGenerationCounter: branchDeclaration.branchDataGeneration, callbacks: { harmonizeCells: branch.harmonizeCells }, urlparms: this.urlparms, clearUrlParms: this.clearUrlParms});
            });
            return portals;
        };
        this._inputonfocus = () => {
            this._inputfieldref.setSelectionRange(0, this._inputfieldref.value.length);
        };
        this.shareBranch = () => {
            let longurl = this._getShareUrl();
            this._getBitlyUrl(longurl).then((json) => {
                if (json.status_code != 200) {
                    let errmessage = json.status_txt + '(' + json.status_code + ')';
                    console.log('error message', errmessage);
                    throw new Error(errmessage);
                }
                let url = json.data.url;
                let toastrComponent = (React.createElement("div", {style: { width: "300px" }}, 
                    React.createElement("p", {style: { width: "290px" }}, "To share the selected row of charts, copy the url below, and send it to a friend."), 
                    React.createElement("input", {ref: node => {
                        this._inputfieldref = node;
                    }, onFocus: this._inputonfocus, style: { width: "290px" }, value: url, readOnly: true})));
                let toastrOptions = {
                    icon: (React.createElement(FontIcon_1.default, {className: "material-icons"}, "share")),
                    component: toastrComponent
                };
                console.log('toastroptions', toastrOptions, react_redux_toastr_1.toastr);
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
        this.handleTechDialogOpen = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({
                techDialogOpen: true
            });
        };
        this.handleTechDialogClose = () => {
            this.setState({
                techDialogOpen: false
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
                messages.push(React.createElement("div", {key: index}, Messages[index]));
            }
            return ((messages.length > 0) ? React.createElement("div", {style: { padding: "3px", margin: "3px", backgroundColor: "LemonChiffon" }}, messages) : null);
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
                return React.createElement("div", {key: headerkey, style: {
                    marginBottom: "8px",
                    border: "1px solid silver",
                    borderRadius: "8px",
                    padding: "3px",
                }}, 
                    React.createElement(RaisedButton_1.default, {style: { marginLeft: "3px", float: "right" }, disabled: !isvalidurl, type: "button", label: "Source", onTouchTap: () => {
                        isvalidurl ? this.openwindow(link) : void (0);
                    }}), 
                    React.createElement("div", {style: { fontWeight: "bold" }}, headerkey), 
                    React.createElement("div", {style: { whiteSpace: "normal" }}, 
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
        this.handleDialogOpen = (e) => {
            this.props.handleDialogOpen(e);
        };
        this.handleFindDialogOpen = (e) => {
            this.props.handleFindDialogOpen(e);
        };
    }
    componentWillMount() {
        this._initialize();
        let { budgetBranch, declarationData } = this.props;
        budgetBranch.getViewpointData().then(() => {
            this._stateActions.incrementBranchDataVersion(budgetBranch.uid);
            if (declarationData.branchesById[budgetBranch.uid].nodeList.length == 0) {
                let { urlparms } = this.props;
                if (urlparms) {
                    this.urlparms = urlparms;
                    this.props.clearUrlParms();
                    try {
                        let path = urlparms.branchdata.pa;
                        let dataNode = getbudgetnode_1.default(this.state.viewpointData, path);
                        if (dataNode) {
                            let settingslist = this._geturlsettingslist(urlparms);
                            this._stateActions.addNodeDeclarations(settingslist);
                            return;
                        }
                        else {
                            this.props.setToast('error', 'unable to locate data requested by url parameter. Using defaults...');
                        }
                    }
                    catch (e) {
                        console.log('urlparms failure', urlparms);
                        this.urlparms = null;
                    }
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
        let viewpointselection = (branchDeclaration.showOptions) ? React.createElement("div", {style: { display: 'inline-block', whiteSpace: "nowrap" }}, 
            React.createElement("span", {style: { fontStyle: "italic" }}, "Viewpoint: "), 
            React.createElement(DropDownMenu_1.default, {value: branchDeclaration.viewpoint, onChange: (e, index, value) => {
                branch.switchViewpoint(value);
            }}, 
                React.createElement(MenuItem_1.default, {value: 'FUNCTIONAL', primaryText: "Functional (operating budgets)"}), 
                React.createElement(MenuItem_1.default, {value: 'STRUCTURAL', primaryText: "Structural (operating budgets)"}), 
                React.createElement(MenuItem_1.default, {value: 'ACTUALEXPENSES', primaryText: "Audited Expenses"}), 
                React.createElement(MenuItem_1.default, {value: 'ACTUALREVENUES', primaryText: "Audited Revenues"}), 
                React.createElement(MenuItem_1.default, {value: 'EXPENDITURES', primaryText: "Audited Expenses by Object"}))) : null;
        let governmentselection = (branchDeclaration.showOptions) ? React.createElement("div", {style: { display: 'inline-block', whiteSpace: "nowrap" }}, 
            React.createElement(DropDownMenu_1.default, {value: "Toronto", disabled: true}, 
                React.createElement(MenuItem_1.default, {value: 'Toronto', primaryText: "Toronto, Ontario"})
            )
        ) : null;
        const versionchoices = () => {
            switch (branchDeclaration.viewpoint) {
                case "FUNCTIONAL":
                case "STRUCTURAL":
                    return [React.createElement(MenuItem_1.default, {key: 1, value: 'SUMMARY', primaryText: "Summary PDF reports 2003 - 2016"}),
                        React.createElement(MenuItem_1.default, {key: 2, value: 'PBFT', primaryText: "Detailed open data files 2011 - 2016"}),
                        React.createElement(MenuItem_1.default, {key: 3, disabled: true, value: 'VARIANCE', primaryText: "PDF Variance Reports"})];
                case 'ACTUALEXPENSES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'ACTUALEXPENSES', primaryText: "Audited statements 1998 - 2015"})];
                case 'ACTUALREVENUES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'ACTUALREVENUES', primaryText: "Audited statements 1998 - 2015"})];
                case 'EXPENDITURES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'EXPENDITURES', primaryText: "Audited statements 1998 - 2015"})];
            }
        };
        let versionselection = (branchDeclaration.showOptions) ? React.createElement("div", {style: { display: 'inline-block', whiteSpace: "nowrap" }}, 
            React.createElement("span", {style: { fontStyle: "italic" }}, "Source: "), 
            React.createElement(DropDownMenu_1.default, {disabled: versionchoices().length < 2, value: branchDeclaration.version, onChange: (e, index, value) => {
                branch.switchVersion(value);
            }}, versionchoices())) : null;
        const aspectchoices = () => {
            switch (branchDeclaration.viewpoint) {
                case "FUNCTIONAL":
                case "STRUCTURAL":
                    return [React.createElement(MenuItem_1.default, {key: 1, value: 'Expenses', primaryText: "Expenses"}),
                        React.createElement(MenuItem_1.default, {key: 2, value: 'Revenues', primaryText: "Revenues"}),
                        React.createElement(MenuItem_1.default, {key: 3, value: 'Staffing', primaryText: "Staffing"})];
                case 'ACTUALEXPENSES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'Expenses', primaryText: "Expenses"})];
                case 'ACTUALREVENUES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'Revenues', primaryText: "Revenues"})];
                case 'EXPENDITURES':
                    return [React.createElement(MenuItem_1.default, {key: 4, value: 'Expenditure', primaryText: "Expenditures"})];
            }
        };
        let aspectselection = (branchDeclaration.showOptions)
            ?
                React.createElement("div", {style: { display: 'inline-block', whiteSpace: "nowrap" }}, 
                    React.createElement("span", {style: { fontStyle: "italic" }}, "Aspect: "), 
                    React.createElement(DropDownMenu_1.default, {disabled: aspectchoices().length < 2, value: branchDeclaration.aspect, onChange: (e, index, value) => {
                        branch.switchAspect(value);
                    }}, aspectchoices()))
            :
                null;
        let byunitselection = (branchDeclaration.showOptions) ? React.createElement("div", {style: { display: 'inline-block', whiteSpace: "nowrap" }}, 
            React.createElement("span", {style: { fontStyle: "italic" }}, "Prorated: "), 
            React.createElement(DropDownMenu_1.default, {value: branchDeclaration.prorata, onChange: (e, index, value) => {
                this.switchComparator(value);
            }}, 
                React.createElement(MenuItem_1.default, {value: 'OFF', primaryText: "Off"}), 
                React.createElement(MenuItem_1.default, {value: 'PERPERSON', primaryText: "Per person"}), 
                React.createElement(MenuItem_1.default, {value: 'PER100000PERSONS', primaryText: "Per 100,000 people"}), 
                React.createElement(MenuItem_1.default, {value: 'PERHOUSEHOLD', primaryText: "Per household"}), 
                React.createElement(MenuItem_1.default, {value: 'PER40000HOUSEHOLDS', primaryText: "Per 40,000 households"}), 
                React.createElement(MenuItem_1.default, {value: 'PERWARD', primaryText: "Per ward (x 44)"}), 
                React.createElement(MenuItem_1.default, {value: 'PERNEIGHBOURHOOD', primaryText: "Per neighbourhood (x 4 x 44)"}))) : null;
        let inflationadjustment = (branchDeclaration.showOptions)
            ?
                React.createElement("div", {style: {
                    display: 'inline-block',
                    whiteSpace: "nowrap",
                    verticalAlign: "bottom",
                    marginRight: '16px',
                }}, 
                    React.createElement(Toggle_1.default, {label: 'Inflation adjusted:', style: {
                        height: '32px',
                        marginTop: '16px',
                        display: 'inline-block',
                    }, onToggle: (e, value) => {
                        this.toggleInflationAdjustment(value);
                    }, labelStyle: {
                        fontStyle: 'italic'
                    }, defaultToggled: branchDeclaration.inflationAdjusted})
                )
            :
                null;
        let showcontrols = React.createElement("div", {style: {
            display: 'inline-block',
            whiteSpace: "nowrap",
            verticalAlign: "bottom"
        }}, 
            React.createElement(Toggle_1.default, {label: 'Show options:', style: { height: '32px', marginTop: '16px' }, labelStyle: { fontStyle: 'italic' }, defaultToggled: branchDeclaration.showOptions, onToggle: (e, value) => {
                this.toggleShowOptions(value);
            }})
        );
        let technotesdialog = React.createElement(Dialog_1.default, {title: "Row Data Sources", modal: false, open: branch.state.techDialogOpen, onRequestClose: branch.handleTechDialogClose, bodyStyle: { padding: '12px' }, autoScrollBodyContent: true, contentStyle: { width: '95%', maxWidth: '600px' }}, 
            React.createElement(IconButton_1.default, {style: {
                top: 0,
                right: 0,
                padding: 0,
                height: "36px",
                width: "36px",
                position: "absolute",
                zIndex: 2,
            }, onTouchTap: branch.handleTechDialogClose}, 
                React.createElement(FontIcon_1.default, {className: "material-icons", style: { cursor: "pointer" }}, "close")
            ), 
            React.createElement("div", null, 
                "Please report" + ' ' + "any problems to ", 
                React.createElement("a", {target: "_blank", href: "mailto:mail@budgetpedia.ca"}, "mail@budgetpedia.ca"), 
                " "), 
            branch.state.techDialogOpen ? branch.getTechNotesDisplay() : null, 
            React.createElement("div", null, "Note: some historical numbers have been allocated to contemporary categories" + ' ' + "for continuity -- to make the numbers more easily comparable. We plan to disclose" + ' ' + "continuity details here."));
        let technotes = (branchDeclaration.showOptions)
            ? React.createElement(RaisedButton_1.default, {style: { margin: '3px 6px 0 0' }, type: "button", label: "Sources", onTouchTap: branch.handleTechDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, {style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons"}, "cloud")}) : null;
        let showhelp = (branchDeclaration.showOptions)
            ? React.createElement(RaisedButton_1.default, {label: "Help", style: { margin: '3px 6px 0 0' }, type: "button", onTouchTap: this.handleDialogOpen, labelPosition: "before", icon: React.createElement(FontIcon_1.default, {style: { color: 'rgba(0,0,0,0.5' }, className: "material-icons"}, "help_outline")})
            : null;
        let search = (branchDeclaration.showOptions) ?
            React.createElement(RaisedButton_1.default, {label: "Find", style: { margin: '3px 6px 0 0' }, type: "button", onTouchTap: this.handleSearch, labelPosition: "before", icon: React.createElement(FontIcon_1.default, {style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons"}, "search")})
            : null;
        let shareurl = (branchDeclaration.showOptions)
            ? React.createElement(RaisedButton_1.default, {type: "button", style: { margin: '3px 6px 0 0' }, label: "Share", onTouchTap: this.shareBranch, labelPosition: "before", icon: React.createElement(FontIcon_1.default, {style: { color: 'rgba(0,0,0,0.5)' }, className: "material-icons"}, "share")}) : null;
        return React.createElement("div", null, 
            React.createElement("div", null, 
                React.createElement("div", null, this.getBranchDataMessages()), 
                React.createElement("div", null, 
                    (branchDeclaration.showOptions) ? React.createElement("div", {style: {
                        display: "inline-block",
                        backgroundColor: "cornsilk",
                        border: "1px solid silver",
                        borderRadius: "8px",
                        margin: "3px",
                        paddingLeft: "6px",
                        paddingBottom: "3px",
                    }}, 
                        search, 
                        shareurl, 
                        technotes, 
                        showhelp) : null, 
                    governmentselection, 
                    showcontrols), 
                React.createElement("div", null, 
                    technotesdialog, 
                    viewpointselection, 
                    versionselection, 
                    aspectselection), 
                (branchDeclaration.showOptions) ? React.createElement("div", {style: {
                    display: "inline-block",
                    backgroundColor: "#ebfaf9",
                    border: "1px solid silver",
                    borderRadius: "8px",
                    margin: "3px",
                    paddingLeft: "6px",
                }}, 
                    byunitselection, 
                    inflationadjustment) : null), 
            React.createElement("div", {style: { whiteSpace: "nowrap" }}, 
                React.createElement("div", {ref: node => {
                    branch.branchScrollBlock = node;
                }, style: { overflow: "scroll" }}, 
                    drilldownportals, 
                    React.createElement("div", {style: { display: "inline-block", width: "500px" }}))
            ), 
            React.createElement(Snackbar_1.default, {open: this.state.snackbar.open, message: this.state.snackbar.message, autoHideDuration: 4000, onRequestClose: this.handleSnackbarRequestClose}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExplorerBranch;
