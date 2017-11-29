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

import masterModel from "../../settings/master.model"

// ----------[ app settings ]----------------------
import explorer from '../../addins/explorer/reducers'
// -----------[ system resource reducers ]------------

let theme = (state: any = masterModel.theme) => {
    return state
}

let system = (state:any = masterModel.system) => {
    return state
}

let colors = (state: any = masterModel.colors) => {
    return state
}

let resources = combineReducers({
    theme,
    system,
    colors,
})

// ---------------------[ ui core services reducers ]------------------------

let globalbar = (state: any = masterModel.globalbar, action) => {
    return state
}

let ui = combineReducers({
    globalbar,
})

// ---------------------[ home grid reducers ]------------------------

let homepage = (state:any = masterModel.homepage,action) => {
    return state
}

let pagetargets = (state: any = masterModel.pagetargets, action) => {
    return state
}

let pages = combineReducers({
    homepage,
    pagetargets,
})

// ---------------------------[ main reducer ]--------------------------------

let mainReducerCore = 
    { 
        // app data
        explorer,
        // system data
        resources,
        
        router:routerReducer, // import

        // user login management
        pages,

        toastr:toastrReducer,

        // ui management
        ui,
    }

export default mainReducerCore
