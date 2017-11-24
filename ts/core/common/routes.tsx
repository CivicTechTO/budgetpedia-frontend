// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// routes.tsx

'use strict'

import * as React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
let ReactGA = require('react-ga')
ReactGA.initialize('UA-4105209-11')

// import createHistory from 'history/createBrowserHistory'
// TODO: isolate hometiles as plugin
import HomeTiles from '../containers/hometiles'

import ResetPassword from '../containers/resetpassword'
import Register from '../containers/register'
import RegisterPending from '../containers/registerpending'
import RegisterConfirm from '../containers/registerconfirm'
import UserProfile from '../containers/userprofile'
import NoMatch  from '../containers/nomatch'

import approutes from '../../addins/approutes'

let logPageView = (location) => {
        console.log('calling ', location, window.location)
    if (window.location.hostname == 'budgetpedia.ca') {
        console.log('tracking ', location, window.location)
        // ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname + location.search);
    }
}

let routedata = [

    { path: "resetpassword", component: ResetPassword },
    { path: "register", component: Register },
    { path: "register/pending", component: RegisterPending },
    { path: "register/confirm", component: RegisterConfirm },
    { path: "userprofile", component: UserProfile },
    { path: "*", component: NoMatch }, // must be LAST, or else will pre-empt other paths
]

let coreroutes = routedata.map((item, index) => (
   <Route key = {'coreroute'+index} path={item.path} component = {item.component} />
))

let home = <Route key = 'home' exact path="/" component={ HomeTiles } />

let routes = [home,...approutes, ...coreroutes]

// console.log('routes',routes)

// let history = createHistory()
// onUpdate={ () => 
//         { 
//             window.scrollTo(0, 0)
//             logPageView()
//         }
//     }
// TODO: rename routes to router
logPageView(window.location)
let Routes = ({history}) => {
    history.listen( location => {
        logPageView(location)
    })
    return <ConnectedRouter history = {history}>
        <Switch>
        { routes }
        </Switch>
    </ConnectedRouter>}

export { Routes }
