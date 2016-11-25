"use strict";
const redux_actions_1 = require('redux-actions');
let uuid = require('node-uuid');
var types;
(function (types) {
    types.ONETIME_NOTIFICATION = 'ONETIME_NOTIFICATION';
    types.ADD_BRANCH = 'ADD_BRANCH';
    types.CLONE_BRANCH = 'CLONE_BRANCH';
    types.UPDATE_BRANCH = 'UPDATE_BRANCH';
    types.REMOVE_BRANCH = 'REMOVE_BRANCH';
    types.CHANGE_VIEWPOINT = 'CHANGE_VIEWPOINT';
    types.CHANGE_VERSION = 'CHANGE_VERSION';
    types.CHANGE_ASPECT = 'CHANGE_ASPECT';
    types.TOGGLE_INFLATION_ADJUSTED = 'TOGGLE_INFLATION_ADJUSTED';
    types.UPDATE_PRORATA = 'UPDATE_PRORATA';
    types.TOGGLE_SHOW_OPTIONS = 'TOGGLE_SHOW_OPTIONS';
    types.ADD_NODE = 'ADD_NODE';
    types.ADD_NODES = 'ADD_NODES';
    types.REMOVE_NODES = 'REMOVE_NODES';
    types.RESET_LAST_ACTION = 'RESET_LAST_ACTION';
    types.BRANCH_MOVE_UP = 'BRANCH_MOVE_UP';
    types.BRANCH_MOVE_DOWN = 'BRANCH_MOVE_DOWN';
    types.CHANGE_BRANCH_DATA = 'CHANGE_BRANCH_DATA';
    types.NORMALIZE_CELL_YEAR_DEPENDENCIES = 'NORMALIZE_CELL_YEAR_DEPENDENCIES';
    types.HARMONIZE_CELLS = 'HARMONIZE_CELLS';
    types.ADD_CELLS = 'ADD_CELLS';
    types.CHANGE_TAB = 'CHANGE_TAB';
    types.UPDATE_CELL_SELECTION = 'UPDATE_CELL_SELECTION';
    types.UPDATE_CELL_TIMECODE = 'UPDATE_CELL_TIMECODE';
    types.UPDATE_CELL_CHART_CODE = 'UPDATE_CELL_CHART_CODE';
    types.TOGGLE_DELTA = 'TOGGLE_DELTA';
    types.UPDATE_NODE_YEAR_SELECTIONS = 'UPDATE_NODE_YEAR_SELECTIONS';
    types.UPDATE_NODE = 'UPDATE_NODE';
})(types = exports.types || (exports.types = {}));
var branchTypes;
(function (branchTypes) {
    branchTypes.ADD_NODE = types.ADD_NODE;
    branchTypes.ADD_NODES = types.ADD_NODES;
    branchTypes.REMOVE_NODES = types.REMOVE_NODES;
    branchTypes.CHANGE_VIEWPOINT = types.CHANGE_VIEWPOINT;
    branchTypes.UPDATE_BRANCH = types.UPDATE_BRANCH;
    branchTypes.CHANGE_VERSION = types.CHANGE_VERSION;
    branchTypes.CHANGE_ASPECT = types.CHANGE_ASPECT;
    branchTypes.TOGGLE_INFLATION_ADJUSTED = types.TOGGLE_INFLATION_ADJUSTED;
    branchTypes.UPDATE_PRORATA = types.UPDATE_PRORATA;
    branchTypes.TOGGLE_SHOW_OPTIONS = types.TOGGLE_SHOW_OPTIONS;
    branchTypes.CHANGE_BRANCH_DATA = types.CHANGE_BRANCH_DATA;
    branchTypes.HARMONIZE_CELLS = types.HARMONIZE_CELLS;
})(branchTypes = exports.branchTypes || (exports.branchTypes = {}));
var nodeTypes;
(function (nodeTypes) {
    nodeTypes.ADD_CELLS = types.ADD_CELLS;
    nodeTypes.CHANGE_TAB = types.CHANGE_TAB;
    nodeTypes.NORMALIZE_CELL_YEAR_DEPENDENCIES = types.NORMALIZE_CELL_YEAR_DEPENDENCIES;
    nodeTypes.UPDATE_NODE = types.UPDATE_NODE;
    nodeTypes.UPDATE_NODE_YEAR_SELECTIONS = types.UPDATE_NODE_YEAR_SELECTIONS;
})(nodeTypes = exports.nodeTypes || (exports.nodeTypes = {}));
var cellTypes;
(function (cellTypes) {
    cellTypes.UPDATE_CELL_SELECTION = types.UPDATE_CELL_SELECTION;
    cellTypes.UPDATE_CELL_TIMECODE = types.UPDATE_CELL_TIMECODE;
    cellTypes.UPDATE_CELL_CHART_CODE = types.UPDATE_CELL_CHART_CODE;
    cellTypes.TOGGLE_DELTA = types.TOGGLE_DELTA;
})(cellTypes = exports.cellTypes || (exports.cellTypes = {}));
exports.onetimeNotification = redux_actions_1.createAction(types.ONETIME_NOTIFICATION);
exports.addBranchDeclaration = redux_actions_1.createAction(types.ADD_BRANCH, (refbranchuid, settings) => ({
    settings,
    branchuid: uuid.v4(),
    refbranchuid,
}), () => ({
    explorer: true
}));
exports.cloneBranchDeclaration = redux_actions_1.createAction(types.CLONE_BRANCH, (refbranchuid, settings) => ({
    branchuid: refbranchuid,
    settings,
    refbranchuid,
}), () => ({
    explorer: true
}));
exports.removeBranchDeclaration = redux_actions_1.createAction(types.REMOVE_BRANCH, branchuid => ({
    branchuid,
}), () => ({
    explorer: false
}));
exports.changeViewpoint = redux_actions_1.createAction(types.CHANGE_VIEWPOINT, (branchuid, viewpointname) => ({
    branchuid,
    viewpointname,
}), () => ({
    explorer: true
}));
exports.updateBranch = redux_actions_1.createAction(types.UPDATE_BRANCH, (branchuid, settings) => ({
    branchuid,
    settings,
}), () => ({
    explorer: true
}));
exports.changeVersion = redux_actions_1.createAction(types.CHANGE_VERSION, (branchuid, versionname) => ({
    branchuid,
    versionname,
}), () => ({
    explorer: true
}));
exports.changeAspect = redux_actions_1.createAction(types.CHANGE_ASPECT, (branchuid, aspectname) => ({
    branchuid,
    aspectname,
}), () => ({
    explorer: true
}));
exports.toggleInflationAdjusted = redux_actions_1.createAction(types.TOGGLE_INFLATION_ADJUSTED, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
exports.updateProrata = redux_actions_1.createAction(types.UPDATE_PRORATA, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
exports.harmonizeCells = redux_actions_1.createAction(types.HARMONIZE_CELLS, (branchuid, nodeProperties, cellProperties, nodeList, cellList) => ({
    branchuid,
    nodeProperties,
    cellProperties,
    nodeList,
    cellList,
}), () => ({
    explorer: true
}));
exports.toggleShowOptions = redux_actions_1.createAction(types.TOGGLE_SHOW_OPTIONS, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
exports.incrementBranchDataVersion = redux_actions_1.createAction(types.CHANGE_BRANCH_DATA, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
exports.changeTab = redux_actions_1.createAction(types.CHANGE_TAB, (branchuid, nodeuid, tabvalue) => ({
    nodeuid,
    tabvalue,
    branchuid,
}), () => ({
    explorer: true
}));
exports.updateNode = redux_actions_1.createAction(types.UPDATE_NODE, (branchuid, nodeuid) => ({
    nodeuid,
    branchuid,
}), () => ({
    explorer: true
}));
exports.addNodeDeclaration = redux_actions_1.createAction(types.ADD_NODE, (branchuid, settings) => ({
    settings,
    nodeuid: uuid.v4(),
    branchuid,
}), () => ({
    explorer: true
}));
exports.addNodeDeclarations = (branchuid, settingslist) => {
    return dispatch => {
        for (let settingsdata of settingslist) {
            settingsdata.nodeuid = uuid.v4();
        }
        dispatch(exports._addNodeDeclarations(branchuid, settingslist));
    };
};
exports._addNodeDeclarations = redux_actions_1.createAction(types.ADD_NODES, (branchuid, settingslist) => ({
    settingslist,
    branchuid,
}), () => ({
    explorer: true
}));
exports.removeNodeDeclarations = redux_actions_1.createAction(types.REMOVE_NODES, (branchuid, items) => ({
    items,
    branchuid,
}), () => ({
    explorer: true
}));
exports.normalizeCellYearDependencies = redux_actions_1.createAction(types.NORMALIZE_CELL_YEAR_DEPENDENCIES, (branchuid, nodeuid, cellList, yearsRange) => ({
    branchuid,
    nodeuid,
    cellList,
    yearsRange,
}), () => ({
    explorer: true
}));
const _addCellDeclaration = redux_actions_1.createAction(types.ADD_CELLS, (branchuid, nodeuid, settings) => ({
    branchuid,
    settings,
    nodeuid,
}), () => ({
    explorer: true
}));
exports.addCellDeclarations = (branchuid, nodeuid, settingslist) => {
    return dispatch => {
        for (let settings of settingslist) {
            settings.celluid = uuid.v4();
        }
        dispatch(_addCellDeclaration(branchuid, nodeuid, settingslist));
    };
};
exports.updateCellChartSelection = redux_actions_1.createAction(types.UPDATE_CELL_SELECTION, (branchuid, nodeuid, celluid, selection) => ({
    celluid,
    selection,
    nodeuid,
    branchuid,
}), () => ({
    explorer: true
}));
exports.updateCellTimeScope = redux_actions_1.createAction(types.UPDATE_CELL_TIMECODE, (branchuid, nodeuid, celluid, explorerTimeCode) => ({
    branchuid,
    nodeuid,
    celluid,
    explorerTimeCode,
}), () => ({
    explorer: true
}));
exports.updateCellChartCode = redux_actions_1.createAction(types.UPDATE_CELL_CHART_CODE, (branchuid, nodeuid, celluid, explorerChartCode) => ({
    branchuid,
    nodeuid,
    celluid,
    explorerChartCode,
}), () => ({
    explorer: true
}));
exports.updateCellYearSelections = redux_actions_1.createAction(types.UPDATE_NODE_YEAR_SELECTIONS, (branchuid, nodeuid, leftyear, rightyear) => ({
    branchuid,
    nodeuid,
    leftyear,
    rightyear,
}), () => ({
    explorer: true
}));
exports.resetLastAction = redux_actions_1.createAction(types.RESET_LAST_ACTION, () => ({}), () => ({
    explorer: true
}));
exports.branchMoveUp = redux_actions_1.createAction(types.BRANCH_MOVE_UP, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
exports.branchMoveDown = redux_actions_1.createAction(types.BRANCH_MOVE_DOWN, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
