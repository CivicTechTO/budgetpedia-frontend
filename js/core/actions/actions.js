"use strict";
const redux_actions_1 = require('redux-actions');
const react_router_redux_1 = require('react-router-redux');
const utilities_1 = require('../utilities/utilities');
exports.SET_TILECOLS = 'SET_TILECOLS';
exports.SET_HOMETILECOLS = 'SET_HOMETILECOLS';
exports.ADD_TILE = 'ADD_TILE';
exports.REMOVE_TILE = 'REMOVE_TILE';
exports.UPDATE_TILE = 'UPDATE_TILE';
exports.setTileCols = redux_actions_1.createAction(exports.SET_TILECOLS);
exports.setHomeTileCols = redux_actions_1.createAction(exports.SET_HOMETILECOLS);
exports.transitionTo = route => {
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
exports.AUTO_LOGIN_REQUEST = 'AUTO_LOGIN_REQUEST';
exports.AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
exports.AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';
let requestAutoLogin = redux_actions_1.createAction(exports.AUTO_LOGIN_REQUEST, creds => {
    return {
        creds,
    };
});
let receiveAutoLogin = redux_actions_1.createAction(exports.AUTO_LOGIN_SUCCESS, user => {
    return {
        token: user.token,
        profile: user.profile,
    };
});
let autoLoginError = redux_actions_1.createAction(exports.AUTO_LOGIN_FAILURE, (message, data) => {
    return {
        message,
        data,
    };
});
exports.autoLoginUser = (token, callback) => {
    let fallback = () => { };
    callback = callback || fallback;
    let config = {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded", },
        body: `token=${token}`,
    };
    return dispatch => {
        dispatch(requestAutoLogin(token));
        fetch('/api/login/token', config)
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
                    if (json.statusCode == 422) {
                        localStorage.removeItem('jsonwebtoken');
                    }
                    dispatch(autoLoginError(json.message, json.data));
                }
                else {
                    dispatch(autoLoginError(text));
                }
                callback(false);
            }
            else {
                localStorage.setItem('jsonwebtoken', json.token);
                dispatch(() => {
                    dispatch(receiveAutoLogin(json));
                });
                callback(true);
            }
        })
            .catch(err => {
            dispatch(autoLoginError(err.message));
            callback(false);
        });
    };
};
exports.LOGOUT_REQUEST = 'LOGOUT_REQUEST';
exports.LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
exports.LOGOUT_FAILURE = 'LOGOUT_FAILURE';
let requestLogout = redux_actions_1.createAction(exports.LOGOUT_REQUEST, () => {
    return {};
});
let receiveLogout = redux_actions_1.createAction(exports.LOGOUT_SUCCESS, () => {
    return {};
});
exports.logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('jsonwebtoken');
        dispatch(receiveLogout());
    };
};
exports.REGISTER_REQUEST = 'REGISTER_REQUEST';
exports.REGISTER_SUCCESS = 'REGISTER_SUCCESS';
exports.REGISTER_FAILURE = 'REGISTER_FAILURE';
let requestRegister = redux_actions_1.createAction(exports.REGISTER_REQUEST, profile => {
    return {
        profile,
    };
});
let receiveRegister = redux_actions_1.createAction(exports.REGISTER_SUCCESS, profile => {
    return {
        profile,
    };
});
let registerError = redux_actions_1.createAction(exports.REGISTER_FAILURE, (message, data) => {
    return {
        message,
        data,
    };
});
exports.registerUser = profile => {
    let data = {
        profile,
        origin: location.origin,
    };
    let config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    return dispatch => {
        dispatch(requestRegister(data));
        fetch('/api/register/new', config)
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
                    dispatch(registerError(json.message, json.data));
                }
                else {
                    dispatch(registerError(text));
                }
            }
            else {
                dispatch(() => {
                    dispatch(receiveRegister(json));
                    return Promise.resolve();
                }).then(() => {
                    dispatch(exports.transitionTo('/register/pending'));
                });
            }
        })
            .catch(err => {
            dispatch(registerError(err.message));
        });
    };
};
exports.SHOW_WORKING_MESSAGE = 'SHOW_WORKING_MESSAGE';
exports.HIDE_WORKING_MESSAGE = 'HIDE_WORKING_MESSAGE';
exports.showWaitingMessage = redux_actions_1.createAction(exports.SHOW_WORKING_MESSAGE);
exports.hideWaitingMessage = redux_actions_1.createAction(exports.HIDE_WORKING_MESSAGE);
exports.REGISTER_CONFIRM_REQUEST = 'REGISTER_CONFIRM_REQUEST';
exports.REGISTER_CONFIRM_SUCCESS = 'REGISTER_CONFIRM_SUCCESS';
exports.REGISTER_CONFIRM_FAILURE = 'REGISTER_CONFIRM_FAILURE';
let requestConfirmRegister = redux_actions_1.createAction(exports.REGISTER_CONFIRM_REQUEST, data => {
    return {
        confirmtoken: data.token,
    };
});
let receiveConfirmRegister = redux_actions_1.createAction(exports.REGISTER_CONFIRM_SUCCESS, data => {
    return {
        data,
    };
});
let registerConfirmError = redux_actions_1.createAction(exports.REGISTER_CONFIRM_FAILURE, (message) => {
    return {
        message,
    };
});
exports.confirmUser = () => {
    let uri = location.href;
    let query = utilities_1.getQuery(uri);
    let data = {
        token: query['token']
    };
    return (dispatch, getState) => {
        if (!data.token) {
            dispatch(registerConfirmError('No registration token is available'));
        }
        else {
            let config = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
            dispatch(requestConfirmRegister(data));
            fetch('/api/register/confirm', config)
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
                        dispatch(registerConfirmError(json.message || json.error));
                    }
                    else {
                        dispatch(registerConfirmError(text));
                    }
                }
                else {
                    dispatch(receiveConfirmRegister(json));
                    let state = getState();
                    let token = state.registerconfirm.confirmtoken;
                    if (token) {
                        dispatch(exports.autoLoginUser(token, result => { }));
                    }
                }
            })
                .catch(err => {
                dispatch(registerConfirmError(err.message));
            });
        }
    };
};
