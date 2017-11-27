// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// reducers.tsx

// TODO: co-locate selectors here: get...(...)

'use strict'

import { combineReducers } from 'redux'
import { isFSA } from 'flux-standard-action'
import { handleActions } from 'redux-actions'; // handleAction doesn't work with combineReducers
import { routerReducer } from 'react-router-redux'
import {reducer as toastrReducer} from 'react-redux-toastr'

// -------------[ app resources ]---------------
import * as Actions from './actions'

import initialstate from "../../settings/initialstate"

// ----------[ app settings ]----------------------
import explorer from '../../addins/explorer/reducers'
// -----------[ system resource reducers ]------------

let theme = (state: any = initialstate.theme) => {
    return state
}

let system = (state:any = initialstate.system) => {
    return state
}

let colors = (state: any = initialstate.colors) => {
    return state
}

let resources = combineReducers({
    theme,
    system,
    colors,
})

// ---------------------[ ui core services reducers ]------------------------

let appnavbar = (state: any = initialstate.appnavbar, action) => {
    return state
}

let ui = combineReducers({
    appnavbar,
})

// ---------------------[ home grid reducers ]------------------------

let homepadding = (state: any = initialstate.homepadding, action) => {
    return state
}

let hometiles = (state: any = initialstate.hometiles, action) => {
    return state
}

let homegrid = combineReducers({
    homepadding,
    hometiles,
})

// ---------------------------[ main reducer ]--------------------------------

let mainReducerCore = //combineReducers(
    { 
        // app data
        explorer,
        // system data
        resources,
        
        router:routerReducer, // import

        // user login management
        homegrid,

        toastr:toastrReducer,

        // ui management
        ui,
        // workingmessagestate,
        // appnavbar,
    }
//)

// let mainReducer = (state,action) => {
//     if (!isFSA( action )) {

//         console.error('System Error: non-FSA action',action)
//         throw 'non-FSA action, see console for details'

//     } else {

//         return mainReducerCore(state,action)
        
//     }
// }

export default mainReducerCore
