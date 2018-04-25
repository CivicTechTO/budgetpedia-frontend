// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// configure the app environment
'use strict';
import * as React from 'react';
import { store, history } from './globaldataconfig.utility';
let state = store.getState(); // get font-family for non material-ui components
let fontFamily = state.resources.theme.fontFamily;
// set default user auth
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme();
import MainView from './main.view';
//TODO: assign version to state (DEVELOPMENT|STAGING|PRODUCTION)
const Main = ({ globalmessage, version }) => (React.createElement(Provider, { store: store },
    React.createElement(MuiThemeProvider, { muiTheme: muiTheme },
        React.createElement(MainView, { history: history, globalmessage: globalmessage, style: { fontFamily } }))));
export default Main;
