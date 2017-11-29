// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// routes.tsx

// assemble and manage routes

'use strict'

import * as React from 'react'
let { Component } = React

import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

let ReactGA = require('react-ga')
ReactGA.initialize('UA-4105209-11')

import Home from '../homepage/home.controller'

import NoMatch  from '../common/nomatch'

import pageroutes from '../../addins/pageroutes'

let logPageView = (location) => {

    if (window.location.hostname == 'budgetpedia.ca') {
        ReactGA.pageview(location.pathname + location.search);
    }

}

let routedata = [

    { path: "*", component: NoMatch }, // must be LAST, or else will pre-empt other paths
]

let coreroutes = routedata.map((item, index) => (
   <Route key = {'coreroute'+index} path={item.path} component = {item.component} />
))

let home = <Route key = 'home' exact path="/" component={ Home } />

let routes = [home, ...pageroutes, ...coreroutes]

logPageView(window.location) // first hit

let Routes = class extends Component<any,any> { 

    historyListener = (location,action) => {
        logPageView(location)
    }

    compoinentWillMount() {
        
        this.props.history.listen(this.historyListener)        
    }

    render() {
        let location = this.props.router.location || {}
        return (
        <ConnectedRouter history = {this.props.history}>
            <TransitionGroup>
                <CSSTransition
                    key = {location.key}
                    classNames = "fade"
                    timeout = {2000}
                    appear
                    exit = {false}
                    onEnter = {() => {
                        window.scrollTo(0, 0) // adapt to single page app results in arbitray page location after nav
                    }}
                >
                    <Switch location = {location}>
                        { routes }
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </ConnectedRouter>
        )
    }
}

let mapStateToProps = state => {
    let { router } = state
    return { 
        router,
    }
}

Routes = connect(mapStateToProps)(Routes)

export { Routes }
