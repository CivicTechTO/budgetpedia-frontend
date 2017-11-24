// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// configurestore.tsx

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'
// import { browserHistory } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import mainReducer from "../reducers/reducers"

const history = createHistory()

const reduxRouterMiddleware = routerMiddleware(history)

// could be conditional list of middlewares; last first
const middlewares = applyMiddleware(reduxRouterMiddleware,thunkMiddleware)

// console.log('mainReducer',mainReducer)

// TODO: this is an incorrect construct -- the second argument should be for persisted 
// stores; the first argument should be the combined reducers
const store = createStore(
    combineReducers(
        {...mainReducer,router:routerReducer}),
    middlewares // the enhancer has last position
)

const configureStore = () => store

export {configureStore, history}
