// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// approutes.tsx

'use strict'

import * as React from 'react'

import { Route } from 'react-router'

import About from './containers/about'
import Roadmap from './containers/roadmap'
import Deputations from './containers/deputations'
import Explorer from './explorer/explorer'
import Communities from './containers/communities'
import SocialMedia from './containers/socialmedia'
import Newsletter from './containers/newsletter'
import Resources from './containers/resources'
import JoinUs from './containers/joinus'
import Stories from './containers/stories'
import Demos from './containers/demos'
import Announcements from './containers/announcements'
import Pathways from './containers/pathways'

let routedata = [
    { path: "about", component: About },
    { path: "roadmap", component: Roadmap },
    { path: "deputations", component: Deputations },
    { path: "explorer", component: Explorer },
    { path: "communities", component: Communities },
    { path: "socialmedia", component: SocialMedia },
    { path: "newsletter", component: Newsletter },
    { path: "resources", component: Resources },
    { path: "joinus", component: JoinUs },
    { path: "stories", component: Stories },
    { path: "demos", component: Demos },
    { path: "announcements", component: Announcements },
    { path: "pathways", component: Pathways },
]

const approutes = routedata.map((item, index) => (
   <Route key = { 'approute'+ index } path={item.path} component = {item.component} />
))

export default approutes