// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// actions.tsx

/*

    URLPARMSTODO: create addNodeDeclarations (plural) ADD_NODES

*/
import { createAction } from 'redux-actions';
let uuid = require('node-uuid') // use uuid.v4() for unique id

export namespace types {
    export const ONETIME_NOTIFICATION = 'ONETIME_NOTIFICATION'
    export const ADD_BRANCH = 'ADD_BRANCH'
    export const CLONE_BRANCH = 'CLONE_BRANCH'
    export const UPDATE_BRANCH = 'UPDATE_BRANCH'
    export const REMOVE_BRANCH = 'REMOVE_BRANCH'
    export const CHANGE_VIEWPOINT = 'CHANGE_VIEWPOINT'
    export const CHANGE_VERSION = 'CHANGE_VERSION'
    export const CHANGE_ASPECT = 'CHANGE_ASPECT'
    export const TOGGLE_INFLATION_ADJUSTED = 'TOGGLE_INFLATION_ADJUSTED'
    export const UPDATE_PRORATA = 'UPDATE_PRORATA'
    export const TOGGLE_SHOW_OPTIONS = 'TOGGLE_SHOW_OPTIONS'
    export const ADD_NODE = 'ADD_NODE'
    export const ADD_NODES = 'ADD_NODES'
    export const REMOVE_NODES = 'REMOVE_NODES'
    export const RESET_LAST_ACTION = 'RESET_LAST_ACTION'
    export const BRANCH_MOVE_UP = 'BRANCH_MOVE_UP'
    export const BRANCH_MOVE_DOWN = 'BRANCH_MOVE_DOWN'
    export const CHANGE_BRANCH_DATA = 'CHANGE_BRANCH_DATA'
    export const NORMALIZE_CELL_YEAR_DEPENDENCIES = 'NORMALIZE_CELL_YEAR_DEPENDENCIES'
    export const HARMONIZE_CELLS = 'HARMONIZE_CELLS'

    export const ADD_CELLS = 'ADD_CELLS'
    export const CHANGE_TAB = 'CHANGE_TAB'

    export const UPDATE_CELL_SELECTION = 'UPDATE_CELL_SELECTION'
    export const UPDATE_CELL_TIMECODE = 'UPDATE_CELL_TIMECODE'
    export const UPDATE_CELL_CHART_CODE = 'UPDATE_CELL_CHART_CODE'
    export const TOGGLE_DELTA = 'TOGGLE_DELTA'
    // export const TOGGLE_NET = 'TOGGLE_NET'
    // export const TOGGLE_VARIANCE = 'TOGGLE_VARIANCE'
    export const UPDATE_NODE_YEAR_SELECTIONS = 'UPDATE_NODE_YEAR_SELECTIONS'
    export const UPDATE_NODE = 'UPDATE_NODE'
}

export namespace branchTypes {
    export import ADD_NODE = types.ADD_NODE
    export import ADD_NODES = types.ADD_NODES
    export import REMOVE_NODES = types.REMOVE_NODES
    export import CHANGE_VIEWPOINT = types.CHANGE_VIEWPOINT
    export import UPDATE_BRANCH = types.UPDATE_BRANCH
    export import CHANGE_VERSION = types.CHANGE_VERSION
    export import CHANGE_ASPECT = types.CHANGE_ASPECT
    export import TOGGLE_INFLATION_ADJUSTED = types.TOGGLE_INFLATION_ADJUSTED
    export import UPDATE_PRORATA = types.UPDATE_PRORATA
    export import TOGGLE_SHOW_OPTIONS = types.TOGGLE_SHOW_OPTIONS
    export import CHANGE_BRANCH_DATA = types.CHANGE_BRANCH_DATA 
    export import HARMONIZE_CELLS = types.HARMONIZE_CELLS   
}

export namespace nodeTypes {
    export import ADD_CELLS = types.ADD_CELLS
    export import CHANGE_TAB = types.CHANGE_TAB
    export import NORMALIZE_CELL_YEAR_DEPENDENCIES = types.NORMALIZE_CELL_YEAR_DEPENDENCIES
    export import UPDATE_NODE = types.UPDATE_NODE
    export import UPDATE_NODE_YEAR_SELECTIONS = types.UPDATE_NODE_YEAR_SELECTIONS
    // export import UPDATE_CELLS_DATASERIESNAME = types.UPDATE_CELLS_DATASERIESNAME

}

export namespace cellTypes {
    export import UPDATE_CELL_SELECTION = types.UPDATE_CELL_SELECTION
    export import UPDATE_CELL_TIMECODE = types.UPDATE_CELL_TIMECODE
    export import UPDATE_CELL_CHART_CODE = types.UPDATE_CELL_CHART_CODE
    export import TOGGLE_DELTA = types.TOGGLE_DELTA
    // export import TOGGLE_NET = types.TOGGLE_NET
    // export import TOGGLE_VARIANCE = types.TOGGLE_VARIANCE
}

// --------------------[ Explorer ]---------------------

export const onetimeNotification = createAction(
    types.ONETIME_NOTIFICATION
)

// --------------------[ Branch ]---------------------

export const addBranchDeclaration = createAction(
    types.ADD_BRANCH,(refbranchuid, settings) => ({
        settings,
        branchuid: uuid.v4(),
        refbranchuid,
    }), () => ({
        explorer:true
    })
)
    
export const cloneBranchDeclaration = createAction(
    types.CLONE_BRANCH,(refbranchuid, settings) => ({
        branchuid:refbranchuid, // for action filter
        settings,
        refbranchuid,
    }), () => ({
        explorer:true
    })
)

export const removeBranchDeclaration = createAction(
    types.REMOVE_BRANCH,branchuid => ({
        branchuid, 
    }), () => ({
        explorer:false
    })
)

export const changeViewpoint = createAction(
    types.CHANGE_VIEWPOINT, (branchuid, viewpointname) => ({
        branchuid,
        viewpointname,        
    }), () => ({
        explorer:true
    })
)

export const updateBranch = createAction(
    types.UPDATE_BRANCH, (branchuid, settings) => ({
        branchuid,
        settings,        
    }), () => ({
        explorer:true
    })
)

export const changeVersion = createAction(
    types.CHANGE_VERSION, (branchuid, versionname) => ({
        branchuid,
        versionname,        
    }), () => ({
        explorer:true
    })
)

export const changeAspect = createAction(
    types.CHANGE_ASPECT, (branchuid, aspectname) => ({ //, nodeidlist, cellidlist) => ({
        branchuid,
        aspectname,
        // nodeidlist,
        // cellidlist,        
    }), () => ({
        explorer:true
    })
)

export const toggleInflationAdjusted = createAction(
    types.TOGGLE_INFLATION_ADJUSTED, (branchuid, value) => ({
        branchuid,
        value,
    }), () => ({
        explorer:true
    })
)

export const updateProrata = createAction(
    types.UPDATE_PRORATA, (branchuid, value) => ({
        branchuid,
        value,
    }), () => ({
        explorer:true
    })
)

export const harmonizeCells = createAction(
    types.HARMONIZE_CELLS, (branchuid, nodeProperties, cellProperties, nodeList, cellList) => ({
        branchuid, 
        nodeProperties,
        cellProperties,
        nodeList,
        cellList,
    }), () => ({
        explorer:true
    })
)

export const toggleShowOptions = createAction(
    types.TOGGLE_SHOW_OPTIONS, (branchuid, value) => ({
        branchuid,
        value,        
    }), () => ({
        explorer:true
    })
)

export const incrementBranchDataVersion = createAction(
    types.CHANGE_BRANCH_DATA, (branchuid) => ({
        branchuid,
    }), () => ({
        explorer:false
    })
)

// ----------------------[ Node ]-----------------------------

export const changeTab = createAction(
    types.CHANGE_TAB, (branchuid, nodeuid, tabvalue) => ({
        nodeuid,
        tabvalue,
        branchuid,
    }), () => ({
        explorer:true
    })
)

// TODO: validate this -- may not do anything
export const updateNode = createAction(
    types.UPDATE_NODE, (branchuid, nodeuid) => ({
        nodeuid,
        branchuid,
    }), () => ({
        explorer:true
    })
)

export const addNodeDeclaration = createAction(
    types.ADD_NODE,(branchuid,settings) => ({
        settings,
        nodeuid: uuid.v4(),
        branchuid,
    }), () => ({
        explorer:true
    })
)

export const addNodeDeclarations = (branchuid, settingslist) => {
    return dispatch => {
        for (let settingsdata of settingslist) {
            settingsdata.nodeuid = uuid.v4()
        }
        dispatch(_addNodeDeclarations(branchuid,settingslist))
    }
}

export const _addNodeDeclarations = createAction(
    types.ADD_NODES,(branchuid,settingslist) => ({
        settingslist,
        branchuid,
    }), () => ({
        explorer:true
    })
)

export const removeNodeDeclarations = createAction(
    types.REMOVE_NODES,(branchuid,items) => ({
        items,
        branchuid,
    }), () => ({
        explorer:true
    })
)

export const normalizeCellYearDependencies = createAction(
    types.NORMALIZE_CELL_YEAR_DEPENDENCIES, (branchuid, nodeuid, cellList, yearsRange) => ({
        branchuid,
        nodeuid,
        cellList,
        yearsRange,
    }), () => ({
        explorer: true
    })
)

// ---------------------[ Cell ]---------------------

const _addCellDeclaration = createAction(
    types.ADD_CELLS,(branchuid, nodeuid,settings) => ({
        branchuid,
        settings,
        nodeuid,
    }), () => ({
        explorer:true
    })
)

export const addCellDeclarations = (branchuid, nodeuid, settingslist) => {
    return dispatch => {
        for (let settings of settingslist) {
            settings.celluid = uuid.v4()
        }
        dispatch(_addCellDeclaration(branchuid,nodeuid,settingslist))
    }
}

export const updateCellChartSelection = createAction(
    types.UPDATE_CELL_SELECTION,(branchuid,nodeuid,celluid, selection) => ({
        celluid,
        selection,
        nodeuid,
        branchuid,
    }), () => ({
        explorer:true
    })
)

export const updateCellTimeScope = createAction(
    types.UPDATE_CELL_TIMECODE, (branchuid, nodeuid, celluid, explorerTimeCode) => ({
        branchuid,
        nodeuid,
        celluid,
        explorerTimeCode,
    }), () => ({
        explorer:true
    })
)

export const updateCellChartCode = createAction(
    types.UPDATE_CELL_CHART_CODE, (branchuid, nodeuid, celluid, explorerChartCode) => ({
        branchuid,
        nodeuid,
        celluid,
        explorerChartCode,
    }), () => ({
        explorer:true
    })
)

export const updateCellYearSelections = createAction(
    types.UPDATE_NODE_YEAR_SELECTIONS, (branchuid, nodeuid, leftyear, rightyear) => ({
        branchuid,
        nodeuid,
        // celluid,
        leftyear,
        rightyear,
    }), () => ({
        explorer:true
    })
)

interface CellDataseriesNameItem {
    celluid: string,
    nodeDataseriesName: string,
}

export const resetLastAction = createAction(
    types.RESET_LAST_ACTION, () => ({

    }), () => ({
        explorer:true
    })
)
    
export const branchMoveUp = createAction(
    types.BRANCH_MOVE_UP, (branchuid) => ({
        branchuid,
    }), () => ({
        explorer:false
    })
)

export const branchMoveDown = createAction(
    types.BRANCH_MOVE_DOWN, (branchuid) => ({
        branchuid,
    }), () => ({
        explorer:false
    })
)
