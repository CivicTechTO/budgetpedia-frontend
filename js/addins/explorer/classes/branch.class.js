"use strict";
const databaseapi_1 = require('./databaseapi');
const getbudgetnode_1 = require('../modules/getbudgetnode');
const node_class_1 = require('./node.class');
const constants_1 = require('../constants');
class BudgetBranch {
    constructor(parms) {
        this.getInitialBranchNodeParms = () => {
            let defaults = this.getProps().declarationData.defaults.node;
            let branchSettings = this.branchDeclaration;
            let viewpointData = this.state.viewpointData;
            let budgetBranch = this;
            let datapath = [];
            let { viewpoint: viewpointName, aspect: aspectName, } = branchSettings;
            let budgetNodeParms = {
                viewpointName,
                aspectName,
                yearsRange: {
                    firstYear: null,
                    lastYear: null,
                },
                yearSelections: Object.assign({}, defaults.yearSelections),
                dataPath: [],
                nodeIndex: 0,
                cellIndex: 0,
            };
            budgetNodeParms = Object.assign(defaults, budgetNodeParms);
            return budgetNodeParms;
        };
        this.addNode = (budgetNodeUid, nodeIndex, budgetNodeParms) => {
            let budgetBranch = this;
            let { dataPath } = budgetNodeParms;
            let branchSettings = budgetBranch.branchDeclaration;
            let branchNode = budgetBranch;
            let viewpointData = budgetBranch.state.viewpointData;
            if (!viewpointData)
                return;
            let treeNodeData = getbudgetnode_1.default(viewpointData, dataPath);
            let branchNodes = budgetBranch.nodes;
            let parentNode = (nodeIndex === 0) ? null : branchNodes[branchNodes.length - 1];
            let budgetNode = new node_class_1.default(budgetNodeParms, budgetNodeUid, treeNodeData, parentNode);
            branchNodes[nodeIndex] = budgetNode;
            budgetBranch.setState({
                branchNodes,
            });
        };
        this.saveAspectState = () => {
            let budgetBranch = this;
            let nodes = budgetBranch.nodes;
            let node;
            for (node of nodes) {
                node.oldAspectState = !!node.treeNodeData.Components;
            }
        };
        this.toggleInflationAdjusted = () => {
            let budgetBranch = this;
            let nodeIndex;
            let branchuid = budgetBranch.uid;
            let branchSettings = budgetBranch.branchDeclaration;
            let viewpointData = budgetBranch.state.viewpointData;
            let branchNodes = budgetBranch.nodes;
            for (nodeIndex in branchNodes) {
                let budgetNode = branchNodes[nodeIndex];
                let dataNode = getbudgetnode_1.default(viewpointData, budgetNode.dataPath);
                budgetNode.updateDataNode(dataNode);
                budgetNode.resetCells();
            }
            budgetBranch.setState({
                branchNodes,
            });
        };
        this.harmonizeCells = () => {
            let budgetBranch = this;
            let nodeIndex;
            let branchNodes = budgetBranch.nodes;
            for (nodeIndex in branchNodes) {
                let budgetNode = branchNodes[nodeIndex];
                let nodeDeclaration = budgetNode.props.declarationData.nodesById[budgetNode.uid];
                budgetNode.switchYearSelections(nodeDeclaration.yearSelections);
                budgetNode.resetCells();
            }
            budgetBranch.setState({
                branchNodes,
            });
        };
        this.switchAspect = () => {
            let budgetBranch = this;
            let { actions, nodeCallbacks: callbacks } = budgetBranch;
            let switchResults = {
                deeperdata: false,
                shallowerdata: false,
                mismatch: false,
                message: null,
            };
            let branchSettings = budgetBranch.branchDeclaration;
            let viewpointData = budgetBranch.state.viewpointData;
            let branchNodes = budgetBranch.nodes;
            let budgetNode = null;
            let parentBudgetNode;
            let nodeIndex;
            let isError = false;
            let chartParmsObj = null;
            let branchuid = budgetBranch.uid;
            for (nodeIndex in branchNodes) {
                parentBudgetNode = budgetNode;
                budgetNode = branchNodes[nodeIndex];
                let dataNode = getbudgetnode_1.default(viewpointData, budgetNode.dataPath);
                if (dataNode) {
                    let deeperdata = ((!!dataNode.Components) && (!budgetNode.oldAspectState));
                    let shallowerdata = ((!dataNode.Components) && (budgetNode.oldAspectState));
                    let parentDataNode = null;
                    if (nodeIndex > 0) {
                        parentDataNode = branchNodes[nodeIndex - 1].treeNodeData;
                    }
                    if (deeperdata || shallowerdata) {
                        switchResults.deeperdata = deeperdata;
                        switchResults.shallowerdata = shallowerdata;
                        isError = true;
                        let prevBudgetNode = branchNodes[nodeIndex - 1];
                        let removed = branchNodes.splice(nodeIndex);
                        let removedids = removed.map((item) => {
                            return { nodeuid: item.uid, cellList: item.cellDeclarationList };
                        });
                        actions.removeNodeDeclarations(removedids);
                        setTimeout(() => {
                            let prevBudgetCell = prevBudgetNode.cells[0];
                            let childprops = {
                                selectionrow: prevBudgetCell.chartSelection,
                                nodeIndex: prevBudgetNode.nodeIndex,
                                cellIndex: 0,
                                priorCellSettings: null,
                                priorNodeSettings: null,
                            };
                            budgetBranch.createChildNodeDeclaration(childprops);
                        });
                        budgetNode = null;
                    }
                    else {
                        budgetNode.updateAspect(branchSettings.aspect, dataNode);
                        budgetNode.resetCells();
                    }
                }
                else {
                    let removed = branchNodes.splice(nodeIndex);
                    let removedids = removed.map((item) => {
                        return { nodeuid: item.uid, cellList: item.cellDeclarationList };
                    });
                    actions.removeNodeDeclarations(removedids);
                    switchResults.mismatch = true;
                    switchResults.message = 'The new aspect does not have a matching chart for ' +
                        budgetNode.treeNodeData.Name;
                    let cells = parentBudgetNode.cells;
                    for (let cell of cells) {
                        let theCell = cell;
                        if (theCell.chartSelection !== null) {
                            theCell.chartSelection = null;
                        }
                    }
                }
            }
            budgetBranch.setState({
                branchNodes,
            });
            return switchResults;
        };
        this.calculateProRata = (viewpointdata) => {
            let { branchDeclaration } = this;
            let { repository, prorata: prorataindex, } = branchDeclaration;
            let prorataseries;
            switch (prorataindex) {
                case "OFF": {
                    prorataseries = 'none';
                    break;
                }
                case "PERPERSON":
                case "PER100000PERSONS":
                    prorataseries = 'population';
                    break;
                case "PERHOUSEHOLD":
                case "PER40000HOUSEHOLDS":
                    prorataseries = 'households';
                    break;
                case "PERWARD":
                case "PERNEIGHBOURHOOD":
                    prorataseries = 'none';
                    break;
                default:
                    console.error('unknown prorataindex', prorataindex);
                    return;
            }
            let promise = new Promise((resolve, error) => {
                if (prorataindex == 'OFF') {
                    resolve(true);
                }
                else {
                    if (prorataseries == 'none') {
                        let { YearsRange } = viewpointdata.Meta.datasetConfig;
                        let { start, end } = YearsRange;
                        let proratadata = {
                            years: {}
                        };
                        for (let year = start; year <= end; year++) {
                            proratadata.years[year] = null;
                        }
                        let budgetBranch = this;
                        budgetBranch._doProRataCalc(viewpointdata, proratadata);
                        resolve(true);
                    }
                    else {
                        let _promise = databaseapi_1.default.getProrataData({
                            repository,
                            prorataseries,
                        });
                        _promise.then((proratadata) => {
                            let budgetBranch = this;
                            budgetBranch._doProRataCalc(viewpointdata, proratadata);
                            resolve(true);
                        }).catch(reason => {
                            console.error(reason);
                            error(reason);
                        });
                    }
                }
            });
            return promise;
        };
        this._doProRataCalc = (viewpointdata, proratadata) => {
            let proratayearlist = Object.assign({}, proratadata.years);
            let { branchDeclaration } = this;
            let { prorata: prorataindex } = branchDeclaration;
            let { datasetConfig } = viewpointdata.Meta;
            let unitratio = datasetConfig.UnitRatio;
            let denominator, multiplier, precision = 5, threshhold = 10000;
            let proratatype = 'yearly';
            switch (prorataindex) {
                case "PERPERSON":
                    denominator = 1;
                    multiplier = unitratio;
                    break;
                case "PER100000PERSONS":
                    denominator = 100000;
                    multiplier = 1;
                    break;
                case "PERHOUSEHOLD":
                    denominator = 1;
                    multiplier = unitratio;
                    break;
                case "PER40000HOUSEHOLDS":
                    denominator = 40000;
                    multiplier = 1;
                    break;
                case "PERWARD":
                    denominator = 44;
                    multiplier = 1;
                    proratatype = 'fixed';
                    break;
                case "PERNEIGHBOURHOOD":
                    denominator = (4 * 44);
                    multiplier = 1;
                    proratatype = 'fixed';
                    break;
                default:
                    console.error('unknown prorataindex in _doProRataCalc', prorataindex);
                    return;
            }
            if (multiplier != 1) {
                datasetConfig.CalcUnitRatio = 1;
                datasetConfig.CalcUnitsAlias = "dollars";
            }
            else {
                datasetConfig.CalcUnitRatio = datasetConfig.UnitRatio;
                datasetConfig.CalcUnitsAlias = datasetConfig.UnitsAlias;
            }
            if (proratatype == 'fixed') {
                for (let yearindex in proratayearlist) {
                    proratayearlist[yearindex] = denominator;
                }
            }
            else {
                for (let yearindex in proratayearlist) {
                    let amount = proratayearlist[yearindex];
                    proratayearlist[yearindex] = (amount / denominator) / multiplier;
                }
            }
            this._doCalcYears(viewpointdata, proratayearlist, threshhold, precision);
        };
        this._doCalcYears = (node, proratayearlist, threshhold, precision) => {
            let calcyears = {};
            let years = node.years;
            if (years) {
                for (let yearindex in years) {
                    if (proratayearlist[yearindex]) {
                        let amount = years[yearindex] / proratayearlist[yearindex];
                        if (amount < threshhold) {
                            amount = Number(amount.toPrecision(precision));
                        }
                        else {
                            amount = Number(amount.toFixed(0));
                        }
                        calcyears[yearindex] = amount;
                    }
                }
                node.calcyears = calcyears;
            }
            if (node.Components) {
                for (let index in node.Components) {
                    let subnode = node.Components[index];
                    this._doCalcYears(subnode, proratayearlist, threshhold, precision);
                }
            }
            if (node.CommonDimension) {
                for (let index in node.CommonDimension) {
                    let subnode = node.CommonDimension[index];
                    this._doCalcYears(subnode, proratayearlist, threshhold, precision);
                }
            }
        };
        this.updateProrata = () => {
            let budgetBranch = this;
            let nodeIndex;
            let branchuid = budgetBranch.uid;
            let branchSettings = budgetBranch.branchDeclaration;
            let viewpointData = budgetBranch.state.viewpointData;
            let branchNodes = budgetBranch.nodes;
            for (nodeIndex in branchNodes) {
                let budgetNode = branchNodes[nodeIndex];
                let dataNode = getbudgetnode_1.default(viewpointData, budgetNode.dataPath);
                budgetNode.updateDataNode(dataNode);
                budgetNode.resetCells();
            }
            budgetBranch.setState({
                branchNodes,
            });
        };
        this.getViewpointData = () => {
            let branchSettings = this.branchDeclaration;
            let { viewpoint: viewpointName, aspect: aspectName, inflationAdjusted, version: versionName, repository, } = branchSettings;
            let datasetName = constants_1.AspectNameToDatasetName[aspectName];
            let _promise = databaseapi_1.default.getViewpointData({
                repository,
                viewpointName,
                versionName,
                datasetName,
                inflationAdjusted
            });
            let promise = new Promise((resolve, error) => {
                _promise.then((viewpointdata) => {
                    let budgetBranch = this;
                    this.calculateProRata(viewpointdata).then(() => {
                        budgetBranch.setState({
                            viewpointData: viewpointdata
                        });
                        resolve(true);
                    }).catch(reason => {
                        console.error(reason);
                        throw Error(reason);
                    });
                }).catch(reason => {
                    console.error(reason);
                    error(reason);
                });
            });
            return promise;
        };
        this.createChildNodeDeclaration = (props) => {
            let budgetBranch = this;
            let { selectionrow, nodeIndex, cellIndex, priorCellSettings, priorNodeSettings, } = props;
            let { nodes: branchNodes, nodeCallbacks: callbacks, actions, branchDeclaration: branchSettings, } = budgetBranch;
            let viewpointData = budgetBranch.state.viewpointData;
            let budgetNode = branchNodes[nodeIndex];
            if (priorCellSettings) {
                budgetNode.priorCellSettings = priorCellSettings;
            }
            let { aspectName, viewpointName } = budgetNode;
            let { workingStatus, onPortalCreation, } = callbacks;
            let childdatapath = budgetNode.dataPath.slice();
            let treeNodeData = budgetNode.treeNodeData;
            if (!treeNodeData.Components) {
                return;
            }
            let components = treeNodeData.Components;
            let code = null;
            if (treeNodeData && treeNodeData.SortedComponents && treeNodeData.SortedComponents[selectionrow]) {
                let componentMetaDataFromSortedList = treeNodeData.SortedComponents[selectionrow];
                code = componentMetaDataFromSortedList.Code;
            }
            if (code)
                childdatapath.push(code);
            else {
                return;
            }
            let newnode = treeNodeData.Components[code];
            if (!newnode.Components && !newnode.CommonDimension) {
                return;
            }
            workingStatus(true);
            let newrange = Object.assign({}, budgetNode.yearsRange);
            let newselections;
            let newCellIndex = cellIndex;
            if (priorNodeSettings) {
                newselections = priorNodeSettings.yearSelections;
                newCellIndex = priorNodeSettings.cellIndex;
            }
            else {
                newselections = Object.assign({}, budgetNode.yearSelections);
            }
            let newdatanode = getbudgetnode_1.default(viewpointData, childdatapath);
            let newnodeconfigparms = {
                viewpointName,
                aspectName,
                dataPath: childdatapath,
                nodeIndex: nodeIndex + 1,
                yearsRange: newrange,
                yearSelections: newselections,
                cellIndex: newCellIndex,
            };
            actions.addNodeDeclaration(newnodeconfigparms);
            setTimeout(() => {
                workingStatus(false);
                onPortalCreation();
            });
        };
        this.uid = parms.uid;
    }
    get nodes() {
        let copy = [...this.state.branchNodes];
        return copy;
    }
    get state() {
        return this.getState();
    }
    get props() {
        return this.getProps();
    }
    get branchDeclaration() {
        return this.props.declarationData.branchesById[this.uid];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BudgetBranch;
