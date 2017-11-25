// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// routes.tsx

'use strict'

import * as React from 'react'
let { Component } = React

import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

let ReactGA = require('react-ga')
ReactGA.initialize('UA-4105209-11')

import HomeTiles from '../containers/hometiles'

// import ResetPassword from '../containers/resetpassword'
// import Register from '../containers/register'
// import RegisterPending from '../containers/registerpending'
// import RegisterConfirm from '../containers/registerconfirm'
// import UserProfile from '../containers/userprofile'
import NoMatch  from '../containers/nomatch'

import approutes from '../../addins/approutes'

let logPageView = (location) => {

    if (window.location.hostname == 'budgetpedia.ca') {
        ReactGA.pageview(location.pathname + location.search);
    }

}

let routedata = [

    // { path: "resetpassword", component: ResetPassword },
    // { path: "register", component: Register },
    // { path: "register/pending", component: RegisterPending },
    // { path: "register/confirm", component: RegisterConfirm },
    // { path: "userprofile", component: UserProfile },
    { path: "*", component: NoMatch }, // must be LAST, or else will pre-empt other paths
]

let coreroutes = routedata.map((item, index) => (
   <Route key = {'coreroute'+index} path={item.path} component = {item.component} />
))

let home = <Route key = 'home' exact path="/" component={ HomeTiles } />

let routes = [home, ...approutes, ...coreroutes]

logPageView(window.location)
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
                    classNames="fade"
                    timeout={2000}
                    appear= {true}
                    exit={false}
                    onEnter = {() => {
                        window.scrollTo(0, 0)
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
