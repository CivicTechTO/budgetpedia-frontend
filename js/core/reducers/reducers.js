'use strict';
const redux_1 = require('redux');
const flux_standard_action_1 = require('flux-standard-action');
const redux_actions_1 = require('redux-actions');
const react_router_redux_1 = require('react-router-redux');
const react_redux_toastr_1 = require('react-redux-toastr');
const Actions = require('../actions/actions');
const initialstate_1 = require("../../local/initialstate");
const reducers_1 = require('../../addins/explorer/reducers');
let theme = (state = initialstate_1.default.theme) => {
    return state;
};
let system = (state = initialstate_1.default.system) => {
    return state;
};
let colors = (state = initialstate_1.default.colors) => {
    return state;
};
let resources = redux_1.combineReducers({
    theme,
    system,
    colors,
});
let appnavbar = (state = initialstate_1.default.appnavbar, action) => {
    return state;
};
let workingmessagestate = (state = initialstate_1.default.workingmessagestate, action) => {
    switch (action.type) {
        case Actions.SHOW_WORKING_MESSAGE: {
            return true;
        }
        case Actions.HIDE_WORKING_MESSAGE: {
            return false;
        }
        default:
            return state;
    }
};
let ui = redux_1.combineReducers({
    appnavbar,
    workingmessagestate,
});
let homepadding = (state = initialstate_1.default.homepadding, action) => {
    return state;
};
let hometiles = (state = initialstate_1.default.hometiles, action) => {
    return state;
};
let homecolsreducer = (state = initialstate_1.default.homecols, action) => {
    switch (action.type) {
        case Actions.SET_HOMETILECOLS: {
            let mainElement = document.getElementById('main');
            let elementwidth = mainElement.getBoundingClientRect().width;
            let columns;
            if (elementwidth > 760) {
                columns = 4;
            }
            else if (elementwidth > 480) {
                columns = 2;
            }
            else {
                columns = 1;
            }
            return columns;
        }
        default:
            return state;
    }
};
let homecols = redux_actions_1.handleActions({
    [Actions.SET_HOMETILECOLS]: homecolsreducer,
}, initialstate_1.default.homecols);
let homegrid = redux_1.combineReducers({
    homepadding,
    hometiles,
    homecols,
});
let { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, AUTO_LOGIN_REQUEST, AUTO_LOGIN_SUCCESS, AUTO_LOGIN_FAILURE, } = Actions;
function auth(state = {
        isFetching: false,
        isAuthenticated: false,
    }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
        case AUTO_LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.payload.creds,
                token: null,
                fieldMessages: null,
                errorMessage: '',
                profile: null,
            });
        case LOGIN_SUCCESS:
        case AUTO_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: null,
                token: action.payload.token,
                profile: action.payload.profile,
                isFetching: false,
                isAuthenticated: true,
            });
        case AUTO_LOGIN_FAILURE:
            return state;
        case LOGIN_FAILURE:
            let fieldMessages = {};
            let data = action.payload.data || [];
            let i, message = null;
            for (i = 0; i < data.length; i++) {
                fieldMessages[data[i].key] = data[i].message;
            }
            if (action.payload.data) {
                action.payload.message = null;
            }
            return Object.assign({}, state, {
                isFetching: false,
                fieldMessages,
                errorMessage: action.payload.message,
                user: null,
                token: null,
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                profile: null,
                token: null,
            });
        default:
            return state;
    }
}
let { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, } = Actions;
function register(state = {
        isFetching: false,
        isRegistered: false
    }, action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isRegistered: false,
                user: action.payload.profile,
                errorMessage: null,
                fieldMessages: null,
            });
        case REGISTER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isRegistered: true,
                user: action.payload.profile,
            });
        case REGISTER_FAILURE:
            let fieldMessages = {};
            let data = action.payload.data || [];
            let i, message = null;
            for (i = 0; i < data.length; i++) {
                fieldMessages[data[i].key] = data[i].message;
            }
            if (action.payload.data) {
                action.payload.message = null;
            }
            return Object.assign({}, state, {
                isFetching: false,
                fieldMessages,
                errorMessage: action.payload.message,
                user: null,
            });
        default:
            return state;
    }
}
let { REGISTER_CONFIRM_REQUEST, REGISTER_CONFIRM_SUCCESS, REGISTER_CONFIRM_FAILURE, } = Actions;
function registerconfirm(state = {
        isFetching: false,
        isConfirmed: false
    }, action) {
    switch (action.type) {
        case REGISTER_CONFIRM_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isConfirmed: false,
                confirmtoken: action.payload.confirmtoken,
                errorMessage: null,
                user: null,
            });
        case REGISTER_CONFIRM_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isConfirmed: true,
                user: action.payload.data,
            });
        case REGISTER_CONFIRM_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.payload.message || action.payload,
            });
        default:
            return state;
    }
}
let login = redux_1.combineReducers({
    auth,
    register,
    registerconfirm,
});
let mainReducerCore = redux_1.combineReducers({
    explorer: reducers_1.default,
    resources,
    routing: react_router_redux_1.routerReducer,
    login,
    homegrid,
    toastr: react_redux_toastr_1.reducer,
    ui,
});
let mainReducer = (state, action) => {
    if (!flux_standard_action_1.isFSA(action)) {
        console.error('System Error: non-FSA action', action);
        throw 'non-FSA action, see console for details';
    }
    else {
        return mainReducerCore(state, action);
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mainReducer;
