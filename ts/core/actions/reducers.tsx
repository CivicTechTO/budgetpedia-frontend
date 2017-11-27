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

let homecolsreducer = (state: any = initialstate.homecols, action) => {
    switch (action.type) {
        case Actions.SET_HOMETILECOLS: {

            let mainElement = document.getElementById('main')

            let elementwidth: number = mainElement.getBoundingClientRect().width

            let columns: number;

            // breakpoints should be parameterized
            // if (elementwidth > 960) {

            //     columns = 5
                
            // } else 
            if (elementwidth > 760) {

                columns = 4

            } else 
            if (elementwidth > 480) {
            // if (elementwidth > 620) {

                columns = 2

            // } else if (elementwidth > 200) {

            //     columns = 2

            } else {

                columns = 1

            }

            return columns

        }
        default:

            return state

    }
}

let homecols = handleActions({
    [Actions.SET_HOMETILECOLS]: homecolsreducer,
}, initialstate.homecols)

let homegrid = combineReducers({
    homepadding,
    hometiles,
    homecols,
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
