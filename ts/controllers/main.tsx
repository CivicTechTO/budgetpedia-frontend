// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

// required by bundler
import * as React from 'react'
var { Component } = React

// required by material-ui
import injectTapEventPlugin = require( 'react-tap-event-plugin' )
injectTapEventPlugin()

// import * as ReactDom from 'react-dom'
import { render } from 'react-dom'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import { browserHistory } from 'react-router'
// import { routerMiddleware } from 'react-router-redux'
// import  thunkMiddleware from 'redux-thunk'
// //====================================
// import { mainReducer } from "../reducers/reducers"
import { MainBar } from './mainbar'
// import { MainToolbar } from './maintoolbar'
// import { routes } from '../apps/routes'
// import * as Actions from '../actions/actions'
import Card = require('material-ui/lib/card/card')
import CardTitle = require('material-ui/lib/card/card-title')
import CardText = require('material-ui/lib/card/card-text')

let hostname = location.hostname
let targetdomain = null
if (hostname == 'budgetpedia')
    targetdomain = 'http://dev.budgetpedia'
else 
    targetdomain = 'http://dev.budgetpedia.ca'

// const reduxRouterMiddleware = routerMiddleware( browserHistory )

// const store = createStore(
//     mainReducer,
//     applyMiddleware(reduxRouterMiddleware, thunkMiddleware)
// )

// let state = store.getState()
// let auth = state.auth
// var token
// if (!auth.isAuthenticated) {
//     token = localStorage.getItem('jsonwebtoken')
//     if (token) {
//         let callback = result => {
//             // no action required
//         }
//         store.dispatch(Actions.autoLoginUser(token,callback))
//     }
// }

export class Main extends Component<any, any> {

    render() {
        // store made available to children through connect = injectStore
        return (
            <div >
                <MainBar />
                <div style={{ height: "64px" }} > {/* space for top fixed appbar */}
                </div>
                <Card>
                <CardTitle>
                    Welcome to the future home of the Budgetpedia project
                </CardTitle>
                <CardText>
                    In the meantime see the development version of the coming website at <a href={targetdomain}>dev.budgetpedia.ca</a>
                </CardText>
                <CardText>
                The mission of the budgetpedia project is to support informed debate about the 
                Toronto budget. We hope to accomplish this by making the budget, both information
                and process, more accessible to the people of Toronto.
                </CardText>
                <CardText>
                    We also hope to help people find each other. The long term aim is make this website crowd-sourced and collaborative.
                </CardText>
                <CardText>
                    For more information about this project see <a href="http://civictech.ca/projects">civictech.ca/projects</a>.
                </CardText>
                </Card>
            </div>
        )
    }
    
}

// <div style={{ height: "64px" }} > {/* space for bottom fixed toolbar */}
// </div>
// <MainToolbar />
