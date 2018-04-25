// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// actions.tsx
/*

    URLPARMSTODO: create addNodeDeclarations (plural) ADD_NODES

*/
import { createAction } from 'redux-actions';
let uuid = require('node-uuid'); // use uuid.v4() for unique id
export var types;
(function (types) {
    types.ONETIME_NOTIFICATION = 'ONETIME_NOTIFICATION';
    types.ADD_BRANCH = 'ADD_BRANCH';
    types.CLONE_BRANCH = 'CLONE_BRANCH';
    types.UPDATE_BRANCH = 'UPDATE_BRANCH';
    types.REMOVE_BRANCH = 'REMOVE_BRANCH';
    types.REMOVE_BRANCHES = 'REMOVE_BRANCHES';
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
    types.CLEAR_BRANCH_STORY = 'CLEAR_BRANCH_STORY';
    types.NORMALIZE_CELL_YEAR_DEPENDENCIES = 'NORMALIZE_CELL_YEAR_DEPENDENCIES';
    types.HARMONIZE_CELLS = 'HARMONIZE_CELLS';
    types.ADD_CELLS = 'ADD_CELLS';
    types.CHANGE_TAB = 'CHANGE_TAB';
    types.UPDATE_CELL_SELECTION = 'UPDATE_CELL_SELECTION';
    types.UPDATE_CELL_TIMECODE = 'UPDATE_CELL_TIMECODE';
    types.UPDATE_CELL_CHART_CODE = 'UPDATE_CELL_CHART_CODE';
    types.TOGGLE_DELTA = 'TOGGLE_DELTA';
    // export const TOGGLE_NET = 'TOGGLE_NET'
    // export const TOGGLE_VARIANCE = 'TOGGLE_VARIANCE'
    types.UPDATE_NODE_YEAR_SELECTIONS = 'UPDATE_NODE_YEAR_SELECTIONS';
    types.UPDATE_NODE = 'UPDATE_NODE';
})(types || (types = {}));
export var branchTypes;
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
    branchTypes.CLEAR_BRANCH_STORY = types.CLEAR_BRANCH_STORY;
    branchTypes.HARMONIZE_CELLS = types.HARMONIZE_CELLS;
})(branchTypes || (branchTypes = {}));
export var nodeTypes;
(function (nodeTypes) {
    nodeTypes.ADD_CELLS = types.ADD_CELLS;
    nodeTypes.CHANGE_TAB = types.CHANGE_TAB;
    nodeTypes.NORMALIZE_CELL_YEAR_DEPENDENCIES = types.NORMALIZE_CELL_YEAR_DEPENDENCIES;
    nodeTypes.UPDATE_NODE = types.UPDATE_NODE;
    nodeTypes.UPDATE_NODE_YEAR_SELECTIONS = types.UPDATE_NODE_YEAR_SELECTIONS;
    // export import UPDATE_CELLS_DATASERIESNAME = types.UPDATE_CELLS_DATASERIESNAME
})(nodeTypes || (nodeTypes = {}));
export var cellTypes;
(function (cellTypes) {
    cellTypes.UPDATE_CELL_SELECTION = types.UPDATE_CELL_SELECTION;
    cellTypes.UPDATE_CELL_TIMECODE = types.UPDATE_CELL_TIMECODE;
    cellTypes.UPDATE_CELL_CHART_CODE = types.UPDATE_CELL_CHART_CODE;
    cellTypes.TOGGLE_DELTA = types.TOGGLE_DELTA;
    // export import TOGGLE_NET = types.TOGGLE_NET
    // export import TOGGLE_VARIANCE = types.TOGGLE_VARIANCE
})(cellTypes || (cellTypes = {}));
// --------------------[ Explorer ]---------------------
export const onetimeNotification = createAction(types.ONETIME_NOTIFICATION);
// --------------------[ Branch ]---------------------
export const addBranchDeclaration = createAction(types.ADD_BRANCH, (refbranchuid, settings) => ({
    settings,
    branchuid: uuid.v4(),
    refbranchuid,
}), () => ({
    explorer: true
}));
export const cloneBranchDeclaration = createAction(types.CLONE_BRANCH, (refbranchuid, settings) => ({
    branchuid: refbranchuid,
    settings,
    refbranchuid,
}), () => ({
    explorer: true
}));
export const removeBranchDeclaration = createAction(types.REMOVE_BRANCH, branchuid => ({
    branchuid,
}), () => ({
    explorer: false
}));
export const removeBranches = createAction(types.REMOVE_BRANCHES, () => ({}), () => ({
    explorer: false
}));
export const changeViewpoint = createAction(types.CHANGE_VIEWPOINT, (branchuid, viewpointname) => ({
    branchuid,
    viewpointname,
}), () => ({
    explorer: true
}));
export const updateBranch = createAction(types.UPDATE_BRANCH, (branchuid, settings) => ({
    branchuid,
    settings,
}), () => ({
    explorer: true
}));
export const changeVersion = createAction(types.CHANGE_VERSION, (branchuid, versionname) => ({
    branchuid,
    versionname,
}), () => ({
    explorer: true
}));
export const changeAspect = createAction(types.CHANGE_ASPECT, (branchuid, aspectname) => ({
    branchuid,
    aspectname,
}), () => ({
    explorer: true
}));
export const toggleInflationAdjusted = createAction(types.TOGGLE_INFLATION_ADJUSTED, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
export const updateProrata = createAction(types.UPDATE_PRORATA, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
export const harmonizeCells = createAction(types.HARMONIZE_CELLS, (branchuid, nodeProperties, cellProperties, nodeList, cellList) => ({
    branchuid,
    nodeProperties,
    cellProperties,
    nodeList,
    cellList,
}), () => ({
    explorer: true
}));
export const toggleShowOptions = createAction(types.TOGGLE_SHOW_OPTIONS, (branchuid, value) => ({
    branchuid,
    value,
}), () => ({
    explorer: true
}));
export const incrementBranchDataVersion = createAction(types.CHANGE_BRANCH_DATA, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
export const clearBranchStory = createAction(types.CLEAR_BRANCH_STORY, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
// ----------------------[ Node ]-----------------------------
export const changeTab = createAction(types.CHANGE_TAB, (branchuid, nodeuid, tabvalue) => ({
    nodeuid,
    tabvalue,
    branchuid,
}), () => ({
    explorer: true
}));
// TODO: validate this -- may not do anything
export const updateNode = createAction(types.UPDATE_NODE, (branchuid, nodeuid) => ({
    nodeuid,
    branchuid,
}), () => ({
    explorer: true
}));
export const addNodeDeclaration = createAction(types.ADD_NODE, (branchuid, settings) => ({
    settings,
    nodeuid: uuid.v4(),
    branchuid,
}), () => ({
    explorer: true
}));
export const addNodeDeclarations = (branchuid, settingslist) => {
    return dispatch => {
        for (let settingsdata of settingslist) {
            settingsdata.nodeuid = uuid.v4();
        }
        dispatch(_addNodeDeclarations(branchuid, settingslist));
    };
};
export const _addNodeDeclarations = createAction(types.ADD_NODES, (branchuid, settingslist) => ({
    settingslist,
    branchuid,
}), () => ({
    explorer: true
}));
export const removeNodeDeclarations = createAction(types.REMOVE_NODES, (branchuid, items) => ({
    items,
    branchuid,
}), () => ({
    explorer: true
}));
export const normalizeCellYearDependencies = createAction(types.NORMALIZE_CELL_YEAR_DEPENDENCIES, (branchuid, nodeuid, cellList, yearsRange) => ({
    branchuid,
    nodeuid,
    cellList,
    yearsRange,
}), () => ({
    explorer: true
}));
// ---------------------[ Cell ]---------------------
const _addCellDeclaration = createAction(types.ADD_CELLS, (branchuid, nodeuid, settings) => ({
    branchuid,
    settings,
    nodeuid,
}), () => ({
    explorer: true
}));
export const addCellDeclarations = (branchuid, nodeuid, settingslist) => {
    return dispatch => {
        for (let settings of settingslist) {
            settings.celluid = uuid.v4();
        }
        dispatch(_addCellDeclaration(branchuid, nodeuid, settingslist));
    };
};
export const updateCellChartSelection = createAction(types.UPDATE_CELL_SELECTION, (branchuid, nodeuid, celluid, selection) => ({
    celluid,
    selection,
    nodeuid,
    branchuid,
}), () => ({
    explorer: true
}));
export const updateCellTimeScope = createAction(types.UPDATE_CELL_TIMECODE, (branchuid, nodeuid, celluid, explorerTimeCode) => ({
    branchuid,
    nodeuid,
    celluid,
    explorerTimeCode,
}), () => ({
    explorer: true
}));
export const updateCellChartCode = createAction(types.UPDATE_CELL_CHART_CODE, (branchuid, nodeuid, celluid, explorerChartCode) => ({
    branchuid,
    nodeuid,
    celluid,
    explorerChartCode,
}), () => ({
    explorer: true
}));
export const updateCellYearSelections = createAction(types.UPDATE_NODE_YEAR_SELECTIONS, (branchuid, nodeuid, leftyear, rightyear) => ({
    branchuid,
    nodeuid,
    // celluid,
    leftyear,
    rightyear,
}), () => ({
    explorer: true
}));
export const resetLastAction = createAction(types.RESET_LAST_ACTION, () => ({}), () => ({
    explorer: true
}));
export const branchMoveUp = createAction(types.BRANCH_MOVE_UP, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
export const branchMoveDown = createAction(types.BRANCH_MOVE_DOWN, (branchuid) => ({
    branchuid,
}), () => ({
    explorer: false
}));
