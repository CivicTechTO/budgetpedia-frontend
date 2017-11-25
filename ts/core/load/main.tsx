// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import {configureStore, history} from './configurestore'
import Root from './app'

const store = configureStore()

// console.log('store',store, store.getState())

//TODO: assign version to state (DEVELOPMENT|STAGING|PRODUCTION)
const Main = ({globalmessage, version}) => (
    <Root store={store} history = {history} globalmessage={globalmessage}/>
)

export default Main

// import { autoLoginUser } from '../actions/actions'

// let { auth } = store.getState().login

// if (!auth.isAuthenticated) {
//     let token = localStorage.getItem('jsonwebtoken')
//     if (token) {
//         store.dispatch(autoLoginUser(token))
//     }
// }
