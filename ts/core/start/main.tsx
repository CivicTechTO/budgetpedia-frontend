// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

// configure the app environment

'use strict'

import * as React from 'react'

import {store, history} from './globaldataconfig'

import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import App from './app'

//TODO: assign version to state (DEVELOPMENT|STAGING|PRODUCTION)
const Main = ({globalmessage, version}) => (
    <Provider store={ store }>
        <MuiThemeProvider muiTheme = {getMuiTheme()}>
            <App history = {history} globalmessage={globalmessage}/>
        </MuiThemeProvider>
    </Provider>
)

export default Main

