// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// routes.tsx

'use strict'

import * as React from 'react'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './app'

// TODO: isolate hometiles as plugin
import HomeTiles from '../containers/hometiles'

import ResetPassword from '../containers/resetpassword'
import Register from '../containers/register'
import RegisterPending from '../containers/registerpending'
import RegisterConfirm from '../containers/registerconfirm'
import UserProfile from '../containers/userprofile'
import NoMatch  from '../containers/nomatch'

import approutes from '../../addins/approutes'

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
// TODO: see https://github.com/reactjs/react-router-redux
//    for enhanced history link
let routes = (
    <Router history={ browserHistory }>
        <Route path="/" component={ App } >
            <IndexRoute component={ HomeTiles } />
            {approutes}
            {coreroutes}
        </Route>
    </Router>)

export default routes
