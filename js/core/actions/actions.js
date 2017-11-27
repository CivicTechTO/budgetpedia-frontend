"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
const react_router_redux_1 = require("react-router-redux");
exports.SET_TILECOLS = 'SET_TILECOLS';
exports.SET_HOMETILECOLS = 'SET_HOMETILECOLS';
exports.ADD_TILE = 'ADD_TILE';
exports.REMOVE_TILE = 'REMOVE_TILE';
exports.UPDATE_TILE = 'UPDATE_TILE';
exports.setTileCols = redux_actions_1.createAction(exports.SET_TILECOLS);
exports.setHomeTileCols = redux_actions_1.createAction(exports.SET_HOMETILECOLS);
exports.pushHistory = route => {
    return dispatch => {
        dispatch(react_router_redux_1.routerActions.push(route));
    };
};
exports.LOGIN_REQUEST = 'LOGIN_REQUEST';
exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
exports.LOGIN_FAILURE = 'LOGIN_FAILURE';
let requestLogin = redux_actions_1.createAction(exports.LOGIN_REQUEST, creds => {
    return {
        creds,
    };
});
let receiveLogin = redux_actions_1.createAction(exports.LOGIN_SUCCESS, user => {
    return {
        token: user.token,
        profile: user.profile,
    };
});
let loginError = redux_actions_1.createAction(exports.LOGIN_FAILURE, (message, data) => {
    return {
        message,
        data,
    };
});
exports.loginUser = (creds, callback) => {
    let config = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded", },
        body: `email=${creds.email}&password=${creds.password}`,
    };
    return dispatch => {
        dispatch(requestLogin(creds));
        fetch('/api/login/credentials', config)
            .then(response => {
            if (response.status >= 500) {
                throw new Error("Response from server: " +
                    response.statusText + ' (' +
                    response.status + ')');
            }
            return response.text().then(text => {
                return { text, response };
            });
        })
            .then(({ text, response }) => {
            let json, isJson;
            try {
                json = JSON.parse(text);
                isJson = true;
            }
            catch (e) {
                isJson = false;
            }
            if (!isJson || !response.ok) {
                if (isJson) {
                    dispatch(loginError(json.message, json.data));
                }
                else {
                    dispatch(loginError(text));
                }
                callback(false);
            }
            else {
                localStorage.setItem('jsonwebtoken', json.token);
                dispatch(() => {
                    dispatch(receiveLogin(json));
                });
                callback(true);
            }
        })
            .catch(err => {
            dispatch(loginError(err.message));
            callback(false);
        });
    };
};
