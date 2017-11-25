// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// configurestore.tsx

import { createStore, applyMiddleware, combineReducers } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import mainReducers from "../reducers"


// assemble reducers
const reducers = combineReducers({...mainReducers,router:routerReducer})

// assemble middleware
const history = createHistory()
const reduxRouterMiddleware = routerMiddleware(history)
const middleware = applyMiddleware(reduxRouterMiddleware,thunkMiddleware)

// create store
const store = createStore(
    reducers,
    middleware
)

const configureStore = () => store

export {configureStore, history}
