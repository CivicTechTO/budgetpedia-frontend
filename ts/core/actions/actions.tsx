// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// actions.tsx

import { createAction } from 'redux-actions';
/*
    https://github.com/acdlite/redux-actions
    actions must be FSA - Flux Standard Actions:
    {
        type
        payload?
        error?
        meta?
    }
    createAction(type, payloadCreator = Identity, ?metaCreator)
*/
import { routerActions } from 'react-router-redux'

import { getQuery } from '../utilities/utilities'

//===============================================
/*------------- tile management -----------*/

export const SET_TILECOLS = 'SET_TILECOLS'
export const SET_HOMETILECOLS = 'SET_HOMETILECOLS'
// the following three to be implemented
export const ADD_TILE = 'ADD_TILE'
export const REMOVE_TILE = 'REMOVE_TILE'
export const UPDATE_TILE = 'UPDATE_TILE'

export const setTileCols = createAction(SET_TILECOLS)

export const setHomeTileCols = createAction(SET_HOMETILECOLS)

export const transitionTo = route => {
    return dispatch => {
        dispatch(routerActions.push(route))
    }
}

//===============================================
/*------------- login management -----------*/

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

let requestLogin = createAction(
    LOGIN_REQUEST,
    creds => { 
        return {
            creds,
        }
    }
) 

let receiveLogin = createAction(
    LOGIN_SUCCESS,
    user => {
        return {
            token: user.token,
            profile: user.profile,
        }
    }
)

let loginError = createAction(
    LOGIN_FAILURE,
    (message, data?) => {
        return {
            message,
            data,
        }
    }
)

// call the api
export const loginUser = (creds, callback) => {

    let config:RequestInit = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded", },
        body: `email=${creds.email}&password=${creds.password}`,
    }
    return dispatch => {
        dispatch(requestLogin(creds))
        fetch('/api/login/credentials', config)
            .then(response => {

                if (response.status >= 500) {
                    throw new Error("Response from server: " +
                        response.statusText + ' (' +
                        response.status + ')')
                }
                return response.text().then(text => {
                    return { text, response }
                })

            })
            .then(({text, response}) => {
                let json, isJson
                try {
                    json = JSON.parse(text)
                    isJson = true

                } catch (e) {
                    isJson = false
                }
                if (!isJson || !response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if (isJson) {
                        // json.data = field level data
                        dispatch(loginError(json.message, json.data))
                    } else {
                        dispatch(loginError(text))
                    }
                    callback(false)
                } else {
                    // save token
                    localStorage.setItem('jsonwebtoken',json.token)
                    // Dispatch the success action
                    dispatch(() => {
                        dispatch(receiveLogin(json))
                    })
                    callback(true) // take success action, like close login form
                }
            })
            .catch(err => {
                dispatch(loginError(err.message))
                callback(false)
            })
    }
}

//===============================================
/*------------- auto login management -----------*/

export const AUTO_LOGIN_REQUEST = 'AUTO_LOGIN_REQUEST'
export const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS'
export const AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE'

let requestAutoLogin = createAction(
    AUTO_LOGIN_REQUEST,
    creds => {
        return {
            creds,
        }
    }
)

let receiveAutoLogin = createAction(
    AUTO_LOGIN_SUCCESS,
    user => {
        return {
            token: user.token,
            profile: user.profile,
        }
    }
)

let autoLoginError = createAction(
    AUTO_LOGIN_FAILURE,
    (message, data?) => {
        return {
            message,
            data,
        }
    }
)

// call the api
export const autoLoginUser = (token, callback?) => {
    let fallback = () => {}
    callback = callback || fallback
    let config: RequestInit = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded", },
        body: `token=${token}`,
    }
    return dispatch => {
        dispatch(requestAutoLogin(token))
        fetch('/api/login/token', config)
            .then(response => {

                if (response.status >= 500) {
                    throw new Error("Response from server: " +
                        response.statusText + ' (' +
                        response.status + ')')
                }
                return response.text().then(text => {
                    return { text, response }
                })
            })
            .then(({text, response}) => {
                let json, isJson
                try {
                    json = JSON.parse(text)
                    isJson = true

                } catch (e) {
                    isJson = false
                }
                if (!isJson || !response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if (isJson) {
                        // json.data = field level data
                        if (json.statusCode == 422) { // should not keep web token for item not found
                            localStorage.removeItem('jsonwebtoken')
                        }
                        dispatch(autoLoginError(json.message, json.data))
                    } else {
                        dispatch(autoLoginError(text))
                    }
                    callback(false)
                } else {
                    // update token
                    localStorage.setItem('jsonwebtoken', json.token)
                    // Dispatch the success action
                    dispatch(() => {
                        dispatch(receiveAutoLogin(json))
                    })
                    callback(true) // take success action
                }
            })
            .catch(err => {
                dispatch(autoLoginError(err.message))
                callback(false) // take fail action
            })
    }
}

//===============================================
/*------------- logout management -----------*/

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

let requestLogout = createAction(
    LOGOUT_REQUEST,
    () => {
        return {
        }
    }
)

let receiveLogout = createAction(
    LOGOUT_SUCCESS,
    () => {
        return {}
    }
)

// Logs the user out
export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('jsonwebtoken')
        dispatch(receiveLogout())
    }
}

//===================================================
//------------- REGISTRATION MANAGEMENT -------------

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

let requestRegister = createAction(
    REGISTER_REQUEST,
    profile => {
        return {
            profile,
        }
    }
)

let receiveRegister = createAction(
    REGISTER_SUCCESS,
    profile => {
        return {
            profile,
        }
    }
)

let registerError = createAction(
    REGISTER_FAILURE,
    (message, data?) => {
        return {
            message,
            data,
        }
    }
)

// call the api
export const registerUser = profile => {

    let data = {
        profile,
        origin: location.origin,
    }

    let config: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        // timeout: 3000, // TODO: test this!
    }
    return dispatch => {
        dispatch(requestRegister(data))
        fetch('/api/register/new', config)
            .then(response => {

                if (response.status >= 500) {
                    throw new Error("Response from server: " +
                        response.statusText + ' (' +
                        response.status + ')')
                }
                return response.text().then(text => {
                    return { text, response }
                })
            })
            .then(({text, response}) => {
                let json, isJson
                try {
                    json = JSON.parse(text)
                    isJson = true

                } catch (e) {
                    isJson = false
                }
                if (!isJson || !response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if (isJson) {
                        // json.data = field level data
                        dispatch(registerError(json.message, json.data))
                    } else {
                        dispatch(registerError(text))
                    }
                    // return Promise.reject(user) // ???
                } else {
                    // Dispatch the success action
                    dispatch(() => { 
                        dispatch(receiveRegister(json))
                        return Promise.resolve() // experimenting with thunks...
                    }).then(() => {
                        // switch to pending page
                        dispatch(transitionTo('/register/pending'))
                    })
                }
            })
            .catch(err => {

                dispatch(registerError(err.message))

            })
    }
}
// ===============================================================
// -------------[ WAITING MESSAGE STATE ]------------------------

export const SHOW_WORKING_MESSAGE = 'SHOW_WORKING_MESSAGE'
export const HIDE_WORKING_MESSAGE = 'HIDE_WORKING_MESSAGE'

export let showWaitingMessage = createAction(
        SHOW_WORKING_MESSAGE
    )

export let hideWaitingMessage = createAction(
        HIDE_WORKING_MESSAGE
    )

//================================================================
//------------- REGISTRATION CONFIRMATION MANAGEMENT -------------

export const REGISTER_CONFIRM_REQUEST = 'REGISTER_CONFIRM_REQUEST'
export const REGISTER_CONFIRM_SUCCESS = 'REGISTER_CONFIRM_SUCCESS'
export const REGISTER_CONFIRM_FAILURE = 'REGISTER_CONFIRM_FAILURE'

let requestConfirmRegister = createAction(
    REGISTER_CONFIRM_REQUEST,
    data => {
        return {
            confirmtoken:data.token,
        }
    }
)

let receiveConfirmRegister = createAction(
    REGISTER_CONFIRM_SUCCESS,
    data => {
        return {
            data,
        }
    }
)

let registerConfirmError = createAction(
    REGISTER_CONFIRM_FAILURE,
    (message) => {
        return {
            message,
        }
    }
)

export const confirmUser = () => {

    let uri = location.href
    let query = getQuery(uri)
    let data = {
        token: query['token']
    }

    return (dispatch,getState) => {
        if (!data.token) {
            dispatch(registerConfirmError('No registration token is available'))
        } else {

            let config: RequestInit = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }

            dispatch(requestConfirmRegister(data))
            fetch('/api/register/confirm', config)
            .then(response => {

                if (response.status >= 500) {
                    throw new Error("Response from server: " +
                        response.statusText + ' (' +
                        response.status + ')')
                }
                return response.text().then(text => {
                    return { text, response }
                })
            })
            .then(({text, response}) => {
                let json, isJson
                try {
                    json = JSON.parse(text)
                    isJson = true
                } catch (e) {
                    isJson = false
                }
                if (!isJson || !response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if (isJson) {
                        // json.data = field level data
                        dispatch(registerConfirmError(json.message || json.error))
                    } else {
                        dispatch(registerConfirmError(text))
                    }
                } else {
                    // Dispatch the success action
                    dispatch(receiveConfirmRegister(json))

                    // auto-login
                    let state = getState()
                    let token = state.registerconfirm.confirmtoken
                    if (token) {
                        dispatch(autoLoginUser(token, result => { }))
                    }
                }
            })
            .catch(err => {

                dispatch(registerConfirmError(err.message))

            })
        }

    }
    
}
