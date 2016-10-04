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
let devdomain = null
if (hostname == 'budgetpedia') {
    targetdomain = 'http://staging.budgetpedia'
    devdomain = 'http://dev.budgetpedia'
} else {
    targetdomain = 'http://staging.budgetpedia.ca'
    devdomain = 'http://dev.budgetpedia.ca'
}

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
                    Welcome to the future home of the Budgetpedia project -- civic budget analytics and support
                </CardTitle>
                <CardText style={{backgroundColor:'LemonChiffon'}}>
                    We're looking for feedback on what webpages (just a few) this website should contain upon
                    launch around Dec 1, 2015, and what those pages should say. For details, see some <a 
                    target="_blank" href= "https://drive.google.com/open?id=1IFayiKuA8t-J_Ef2x4okiRYLRAbefPlaiIIrghn3F0c">notes for our
                    October 4 hackathon</a>. Send feedback to <a target="_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a>
                </CardText>
                <CardText>
                    While we're under development see the staging (testing) version of the coming website at <a href={targetdomain}>staging.budgetpedia.ca</a> (recommended).
                    To see what the developers are working on see <a href={devdomain}>dev.budgetpedia.ca</a> (not recommended for testing, just for the curious)
                </CardText>
                <CardText>
                The mission of the budgetpedia project is to support informed debate about the 
                Toronto budget. We hope to accomplish this by making the budget, both information
                and process, more accessible to the people of Toronto.
                </CardText>
                <CardText>
                    We also hope to help people with specific budget interests find each other. The long term aim is make this website crowd-sourced and collaborative.
                </CardText>
                <CardText>
                    For more information about this project see <a href="http://civictech.ca/projects">civictech.ca/projects</a>.
                </CardText>

                <CardText>
<iframe src="http://free.timeanddate.com/countdown/i5eghkcz/n250/cf12/cm0/cu4/ct0/cs0/ca0/cr0/ss0/cac000/cpc000/pcfff/tcfff/fs100/szw320/szh135/tatTime%20left%20before%20launch%20of%20website%20v0.1/tac000/tptTime%20since%20Event%20started%20in/tpc000/mac000/mpc000/iso2016-11-29T17:00:00" allowTransparency="true" frameborder="0" width="349" height="69"></iframe>
                </CardText>
<iframe src="https://calendar.google.com/calendar/embed?title=Budgetpedia%20Media%20Schedule&mode=AGENDA&height=600&wkst=1&bgcolor=%23FFFFFF&src=j43lip15uv9ojnejpre09tqpsc%40group.calendar.google.com&color=%236B3304&ctz=America%2FNew_York" style={{borderWidth:0}} width="500" height="600" frameBorder="0" scrolling="no"></iframe>
                <CardText>
                </CardText>
                </Card>

            </div>
        )
    }
    
}

// <div style={{ height: "64px" }} > {/* space for bottom fixed toolbar */}
// </div>
// <MainToolbar />
