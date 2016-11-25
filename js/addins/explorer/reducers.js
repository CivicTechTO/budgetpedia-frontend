"use strict";
const redux_1 = require('redux');
const initialstate_1 = require("../../local/initialstate");
const actions_1 = require('./actions');
const constants_1 = require('./constants');
let generationcounter = 0;
let defaults = (state = initialstate_1.default.explorer.defaults, action) => {
    return state;
};
let branchList = (state = [], action) => {
    let { type } = action;
    let newstate;
    switch (type) {
        case actions_1.types.ADD_BRANCH: {
            let { refbranchuid, branchuid } = action.payload;
            if (!refbranchuid) {
                newstate = [...state, action.payload.branchuid];
            }
            else {
                newstate = [...state];
                let index = newstate.indexOf(refbranchuid);
                if (index == -1) {
                    console.error('System error; could not find rebranchid', refbranchuid, state);
                    newstate.push(branchuid);
                }
                else {
                    newstate.splice(index + 1, 0, branchuid);
                }
            }
            return newstate;
        }
        case actions_1.types.CLONE_BRANCH: {
            let { refbranchuid, settings } = action.payload;
            let newbranchuid = settings.newbranchid;
            if (!refbranchuid) {
                newstate = [...state, newbranchuid];
            }
            else {
                newstate = [...state];
                let index = newstate.indexOf(refbranchuid);
                if (index == -1) {
                    console.error('System error; could not find rebranchid', refbranchuid, state);
                    newstate.push(newbranchuid);
                }
                else {
                    newstate.splice(index + 1, 0, newbranchuid);
                }
            }
            return newstate;
        }
        case actions_1.types.REMOVE_BRANCH: {
            newstate = state.filter(item => item != action.payload.branchuid);
            return newstate;
        }
        case actions_1.types.BRANCH_MOVE_UP: {
            newstate = [...state];
            let { branchuid } = action.payload;
            let pos = newstate.indexOf(branchuid);
            if (pos == -1) {
                console.error('System Error: branchuid not found in list', branchuid, newstate);
                return newstate;
            }
            if (pos == 0) {
                console.error('System Error: branchuid for move up at beginning of list already', branchuid, newstate);
                return newstate;
            }
            let oldbranchuid = newstate[pos - 1];
            newstate[pos - 1] = branchuid;
            newstate[pos] = oldbranchuid;
            return newstate;
        }
        case actions_1.types.BRANCH_MOVE_DOWN: {
            newstate = [...state];
            let { branchuid } = action.payload;
            let pos = newstate.indexOf(branchuid);
            if (pos == -1) {
                console.error('System Error: branchuid not found in list', branchuid, newstate);
                return newstate;
            }
            if (pos == newstate.length - 1) {
                console.error('System Error: branchuid for move down at end of list already', branchuid, newstate);
                return newstate;
            }
            let oldbranchuid = newstate[pos + 1];
            newstate[pos + 1] = branchuid;
            newstate[pos] = oldbranchuid;
            return newstate;
        }
        default:
            return state;
    }
};
let branchesById = (state = {}, action) => {
    let { type } = action;
    let newstate;
    switch (type) {
        case actions_1.types.ADD_BRANCH: {
            newstate = Object.assign({}, state, { [action.payload.branchuid]: action.payload.settings });
            return newstate;
        }
        case actions_1.types.UPDATE_BRANCH: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            let newbranchstate = Object.assign({}, newstate[branchuid]);
            newbranchstate = Object.assign(newbranchstate, action.payload.settings);
            newstate[branchuid] = newbranchstate;
            return newstate;
        }
        case actions_1.types.CLONE_BRANCH: {
            let newbranchid = action.payload.settings.newbranchid;
            newstate = Object.assign({}, state, { [newbranchid]: action.payload.settings.branch[newbranchid] });
            return newstate;
        }
        case actions_1.types.REMOVE_BRANCH: {
            newstate = Object.assign({}, state);
            delete newstate[action.payload.branchuid];
            return newstate;
        }
        case actions_1.types.ADD_NODE: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].nodeList =
                [...state[branchuid].nodeList, action.payload.nodeuid];
            return newstate;
        }
        case actions_1.types.ADD_NODES: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            let { settingslist } = action.payload;
            let newnodelist = [];
            for (let settingsdata of settingslist) {
                newnodelist.push(settingsdata.nodeuid);
            }
            newstate[branchuid].nodeList =
                [...state[branchuid].nodeList, ...newnodelist];
            return newstate;
        }
        case actions_1.types.REMOVE_NODES: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            let removelist = action.payload.items;
            let newList = newstate[branchuid].nodeList.filter((nodeuid) => {
                let foundlist = removelist.filter(item => {
                    return item.nodeuid == nodeuid;
                });
                return foundlist.length == 0;
            });
            newstate[branchuid].nodeList = newList;
            return newstate;
        }
        case actions_1.types.CHANGE_VIEWPOINT: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            let newbranchstate = Object.assign({}, newstate[branchuid]);
            newbranchstate.viewpoint = action.payload.viewpointname;
            newbranchstate.version = newbranchstate.defaultVersions[newbranchstate.viewpoint];
            newbranchstate.aspect = newbranchstate.defaultAspects[newbranchstate.version];
            newstate[branchuid] = newbranchstate;
            return newstate;
        }
        case actions_1.types.CHANGE_VERSION: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            let newbranchstate = Object.assign({}, newstate[branchuid]);
            newbranchstate.version = action.payload.versionname;
            newbranchstate.aspect = newbranchstate.defaultAspects[newbranchstate.version];
            newstate[branchuid] = newbranchstate;
            return newstate;
        }
        case actions_1.types.CHANGE_ASPECT: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].aspect = action.payload.aspectname;
            return newstate;
        }
        case actions_1.types.TOGGLE_INFLATION_ADJUSTED: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].inflationAdjusted = action.payload.value;
            return newstate;
        }
        case actions_1.types.UPDATE_PRORATA: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].prorata = action.payload.value;
            return newstate;
        }
        case actions_1.types.TOGGLE_SHOW_OPTIONS: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].showOptions = action.payload.value;
            return newstate;
        }
        case actions_1.types.CHANGE_BRANCH_DATA: {
            let { branchuid } = action.payload;
            newstate = Object.assign({}, state);
            newstate[branchuid] = Object.assign({}, newstate[branchuid]);
            newstate[branchuid].branchDataGeneration++;
            return newstate;
        }
        default:
            return state;
    }
};
let nodesById = (state = {}, action) => {
    let { type } = action;
    let newstate;
    switch (type) {
        case actions_1.types.ADD_NODE: {
            let node = state[action.payload.nodeuid] || {};
            node = Object.assign(node, action.payload.settings);
            newstate = Object.assign({}, state, { [action.payload.nodeuid]: node });
            return newstate;
        }
        case actions_1.types.ADD_NODES: {
            let { settingslist } = action.payload;
            let newstate = Object.assign({}, state);
            for (let settingsdata of settingslist) {
                let node = newstate[settingsdata.nodeuid] || {};
                node = Object.assign(node, settingsdata.settings);
                newstate[settingsdata.nodeuid] = node;
            }
            return newstate;
        }
        case actions_1.types.CLONE_BRANCH: {
            let newnodes = action.payload.settings.nodes;
            newstate = Object.assign({}, state);
            for (let nodeid in newnodes) {
                newstate[nodeid] = newnodes[nodeid];
            }
            return newstate;
        }
        case actions_1.types.REMOVE_NODES: {
            newstate = Object.assign({}, state);
            let removelist = action.payload.items;
            for (let removeitem of removelist) {
                delete newstate[removeitem.nodeuid];
            }
            return newstate;
        }
        case actions_1.types.ADD_CELLS: {
            let newstate = Object.assign({}, state);
            let nodeuid = action.payload.nodeuid;
            let newnode = Object.assign({}, newstate[nodeuid]);
            newnode.cellList = newnode.cellList || [];
            let newcellList = action.payload.settings.map(setting => setting.celluid);
            newnode.cellList = [...newnode.cellList, ...newcellList];
            newstate[nodeuid] = newnode;
            return newstate;
        }
        case actions_1.types.CHANGE_TAB: {
            let newstate = Object.assign({}, state);
            let { nodeuid } = action.payload;
            let newnode = Object.assign({}, newstate[action.payload.nodeuid]);
            newnode.cellIndex = action.payload.tabvalue;
            newstate[nodeuid] = newnode;
            return newstate;
        }
        case actions_1.types.UPDATE_NODE_YEAR_SELECTIONS: {
            newstate = Object.assign({}, state);
            let { nodeuid, leftyear, rightyear } = action.payload;
            let newnode = Object.assign({}, newstate[nodeuid]);
            let newYearSelections = Object.assign({}, newnode.yearSelections);
            if (leftyear > rightyear) {
                leftyear = rightyear;
            }
            newYearSelections.leftYear = leftyear;
            newYearSelections.rightYear = rightyear;
            newnode.yearSelections = newYearSelections;
            newstate[nodeuid] = newnode;
            return newstate;
        }
        case actions_1.types.NORMALIZE_CELL_YEAR_DEPENDENCIES: {
            newstate = Object.assign({}, state);
            let { nodeuid, yearsRange } = action.payload;
            let { start: startYear, end: endYear } = yearsRange;
            let newnode = Object.assign({}, newstate[nodeuid]);
            let yearSpan = endYear - startYear;
            let range = Object.assign({}, newnode.yearSelections);
            if (range.leftYear < startYear || range.leftYear > endYear) {
                range.leftYear = startYear;
            }
            if (range.rightYear > endYear || range.rightYear < startYear) {
                range.rightYear = endYear;
            }
            newnode.yearSelections = range;
            newstate[nodeuid] = newnode;
            return newstate;
        }
        case actions_1.types.HARMONIZE_CELLS: {
            newstate = Object.assign({}, state);
            let { nodeProperties, nodeList } = action.payload;
            for (let nodeuid of nodeList) {
                let newnode = Object.assign({}, newstate[nodeuid]);
                if (nodeProperties.cellIndex < newnode.cellList.length) {
                    newnode.cellIndex = nodeProperties.cellIndex;
                }
                let yearSelections = nodeProperties.yearSelections;
                newnode.yearSelections = Object.assign({}, yearSelections);
                newstate[nodeuid] = newnode;
            }
            return newstate;
        }
        default:
            return state;
    }
};
let cellsById = (state = {}, action) => {
    let { type } = action;
    let newstate = Object.assign({}, state);
    switch (type) {
        case actions_1.types.ADD_CELLS: {
            for (let setting of action.payload.settings) {
                newstate[setting.celluid] = setting;
            }
            return newstate;
        }
        case actions_1.types.CLONE_BRANCH: {
            let newcells = action.payload.settings.cells;
            newstate = Object.assign({}, state);
            for (let cellid in newcells) {
                newstate[cellid] = newcells[cellid];
            }
            return newstate;
        }
        case actions_1.types.REMOVE_NODES: {
            for (let removeitem of action.payload.items) {
                for (let celluid of removeitem.cellList)
                    delete newstate[celluid];
            }
            return newstate;
        }
        case actions_1.types.UPDATE_CELL_SELECTION: {
            let { celluid } = action.payload;
            let newcell = Object.assign({}, newstate[celluid]);
            let chartSelection = action.payload.selection;
            newcell.chartSelection = chartSelection;
            newstate[celluid] = newcell;
            return newstate;
        }
        case actions_1.types.UPDATE_CELL_TIMECODE: {
            let { celluid, explorerTimeCode } = action.payload;
            let newcell = Object.assign({}, newstate[celluid]);
            newcell.yearScope = explorerTimeCode;
            newstate[celluid] = newcell;
            return newstate;
        }
        case actions_1.types.UPDATE_CELL_CHART_CODE: {
            let { celluid, explorerChartCode } = action.payload;
            let newcell = Object.assign({}, newstate[celluid]);
            let newChartConfigs = Object.assign({}, newcell.chartConfigs);
            let yearSettings = Object.assign({}, newChartConfigs[newcell.yearScope]);
            yearSettings.explorerChartCode = explorerChartCode;
            newChartConfigs[newcell.yearScope] = yearSettings;
            newcell.chartConfigs = newChartConfigs;
            newstate[celluid] = newcell;
            return newstate;
        }
        case actions_1.types.NORMALIZE_CELL_YEAR_DEPENDENCIES: {
            let { cellList, yearsRange } = action.payload;
            let { start: startYear, end: endYear } = yearsRange;
            let yearSpan = endYear - startYear;
            for (let celluid of cellList) {
                let newcell = Object.assign({}, newstate[celluid]);
                if (yearSpan == 0) {
                    newcell.yearScope = constants_1.TimeScope[constants_1.TimeScope.OneYear];
                }
                newstate[celluid] = newcell;
            }
            return newstate;
        }
        case actions_1.types.HARMONIZE_CELLS: {
            newstate = Object.assign({}, state);
            let { cellProperties, cellList } = action.payload;
            for (let celluid of cellList) {
                let newcell = Object.assign({}, newstate[celluid]);
                newcell.yearScope = cellProperties.yearScope;
                let chartconfigs = JSON.parse(JSON.stringify(newcell.chartConfigs));
                chartconfigs[newcell.yearScope].explorerChartCode = cellProperties.chartCode;
                newcell.chartConfigs = chartconfigs;
                newstate[celluid] = newcell;
            }
            return newstate;
        }
        default:
            return state;
    }
};
let lastActionDefaultState = {
    type: undefined, branchuid: undefined, nodeuid: undefined, celluid: undefined, explorer: undefined,
    generation: null,
};
let lastAction = (state = lastActionDefaultState, action) => {
    let newstate = Object.assign({}, state);
    if (!action.payload && !(action.type == actions_1.types.RESET_LAST_ACTION)) {
        let newstate = Object.assign({}, lastActionDefaultState);
        newstate.type = action.type;
        return newstate;
    }
    let { type } = action;
    switch (type) {
        case actions_1.types.RESET_LAST_ACTION: {
            let newstate = Object.assign({}, lastActionDefaultState);
            newstate.type = action.type;
            newstate.explorer = action.meta.explorer;
            newstate.generation = generationcounter;
            return newstate;
        }
        default: {
            if (action.meta) {
                newstate.explorer = action.meta.explorer;
            }
            let { payload } = action;
            newstate.type = action.type;
            newstate.branchuid = payload.branchuid;
            newstate.nodeuid = payload.nodeuid;
            newstate.celluid = payload.celluid;
            newstate.generation = generationcounter;
            return newstate;
        }
    }
};
let lastTargetedAction = (state = { counter: null }, action) => {
    if (!action.payload || !action.meta) {
        return state;
    }
    let { payload } = action;
    if (!payload.branchuid && !payload.nodeuid && !payload.celluid) {
        return state;
    }
    let newstate = Object.assign({}, state);
    switch (action.type) {
        case actions_1.types.REMOVE_BRANCH:
            delete newstate[payload.branchuid];
            return newstate;
        case actions_1.types.REMOVE_NODES:
            delete newstate[payload.nodeuid];
            for (let removeitem of payload.items) {
                for (let celluid of removeitem.cellList)
                    delete newstate[celluid];
            }
            return newstate;
    }
    if (payload.branchuid) {
        newstate[payload.branchuid] = {
            type: action.type,
            generation: generationcounter,
            branch: true,
        };
    }
    if (payload.nodeuid) {
        newstate[payload.nodeuid] = {
            type: action.type,
            generation: generationcounter,
            node: true
        };
    }
    if (payload.celluid) {
        newstate[payload.celluid] = {
            type: action.type,
            generation: generationcounter,
            cell: true,
        };
    }
    newstate.counter = { generation: generationcounter };
    return newstate;
};
let generation = (state = null, action) => {
    return generationcounter++;
};
let onetimenotification = (state = false, action) => {
    if (action.type == actions_1.types.ONETIME_NOTIFICATION) {
        return true;
    }
    else {
        return state;
    }
};
let explorer = redux_1.combineReducers({
    defaults,
    branchList,
    branchesById,
    nodesById,
    cellsById,
    lastAction,
    lastTargetedAction,
    generation,
    onetimenotification,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = explorer;
exports.getExplorerDeclarationData = state => state.explorer;
