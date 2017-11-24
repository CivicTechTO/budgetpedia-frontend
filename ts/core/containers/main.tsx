// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'


// TODO move inject.. and isomorphic.. to index.tsx
// required by material-ui
import injectTapEventPlugin = require( 'react-tap-event-plugin' )
injectTapEventPlugin()
require('isomorphic-fetch')

import {configureStore, history} from '../common/configurestore'
import Root from '../common/root'

import { autoLoginUser } from '../actions/actions'

const store = configureStore()

// console.log('store',store, store.getState())

// let { auth } = store.getState().login

// if (!auth.isAuthenticated) {
//     let token = localStorage.getItem('jsonwebtoken')
//     if (token) {
//         store.dispatch(autoLoginUser(token))
//     }
// }

//TODO: assign version to state (DEVELOPMENT|STAGING|PRODUCTION)
const Main = ({globalmessage, version}) => (
    <Root store={store} globalmessage={globalmessage} history = {history}/>
)

export default Main

