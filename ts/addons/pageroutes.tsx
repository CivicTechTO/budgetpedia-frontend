// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// pageroutes.tsx

'use strict'

import * as React from 'react'

import { Route } from 'react-router-dom'

import PageController from '../core/control/page.controller'

import About from './pages/about'
import Deputations from './pages/deputations'
import Explorer from './explorer/explorer'
import Communities from './pages/communities'
import SocialMedia from './pages/socialmedia'
import Newsletter from './pages/newsletter'
import Resources from './pages/resources'
import Teams from './pages/teams'
import Stories from './pages/stories'
import Announcements from './pages/announcements'
import Pathways from './pages/pathways'

let routedata = [
    { path: "/about", component: About },
    { path: "/overview", component: PageController },
    { path: "/budgets", component: PageController },
    { path: "/roadmap", component: PageController },
    { path: "/deputations", component: Deputations },
    { path: "/explorer", component: Explorer },
    { path: "/communities", component: Communities },
    { path: "/socialmedia", component: SocialMedia },
    { path: "/newsletter", component: Newsletter },
    { path: "/resources", component: Resources },
    { path: "/teams", component: Teams },
    { path: "/stories", component: Stories },
    { path: "/announcements", component: Announcements },
    { path: "/pathways", component: Pathways },
]

const pageroutes = routedata.map((item, index) => (
   <Route key = { 'pageroute'+ index } path={item.path} component = {item.component} />
))

export default pageroutes