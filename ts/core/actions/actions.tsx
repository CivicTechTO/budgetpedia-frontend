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

// the following three to be implemented
export const ADD_TILE = 'ADD_TILE'
export const REMOVE_TILE = 'REMOVE_TILE'
export const UPDATE_TILE = 'UPDATE_TILE'

export const pushHistory = route => {
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

interface RequestInit {
    method:string,
    headers: any,
    body:string,
}


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

