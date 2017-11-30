// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

// configure the app environment

'use strict'

import * as React from 'react'

import {store, history} from './globaldataconfig.utility'

import { Provider } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MainView from './main.view'

//TODO: assign version to state (DEVELOPMENT|STAGING|PRODUCTION)
const Main = ({globalmessage, version}) => (
    <Provider store={ store }>
        <MuiThemeProvider muiTheme = {getMuiTheme()}>
            <MainView history = {history} globalmessage={globalmessage}/>
        </MuiThemeProvider>
    </Provider>
)

export default Main
