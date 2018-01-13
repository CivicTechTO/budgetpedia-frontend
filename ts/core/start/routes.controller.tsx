// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// routes.tsx

// assemble and manage routes

/*
    TODO: transition fails with redirect for forcing trailing slash
    the goal is to force initial url to end in /# to avoid reload of page on first permalink
*/

'use strict'

import * as React from 'react'
let { Component } = React

import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

let ReactGA = require('react-ga')
ReactGA.initialize('UA-4105209-11')

import HomeController from '../../legacy/homepage/home.controller'
import PageController from '../control/page.controller'
import NoMatch  from '../../legacy/nomatch'

import pageroutes from '../../addons/pageroutes'

let logPageView = (location) => {

    // console.log('hostname',window.location)
    if (window.location.hostname == 'budgetpedia.ca') {
        // console.log('logging',location.pathname + location.search)
        ReactGA.pageview(location.pathname + location.search);
    }

}

let routedata = [
    { path: "/dev", component: PageController }, // must be LAST, or else will pre-empt other paths
    { path: "*", component: NoMatch }, // must be LAST, or else will pre-empt other paths
]

let coreroutes = routedata.map((item, index) => (
   <Route key = {'coreroute'+index} path={item.path} component = {item.component} />
))

let home = <Route key = 'home' exact path="/" component={ PageController } /> // HomeController } />
// let redirect = <Route key = "redirect" exact strict path="/:url*" render={props => <Redirect to={`${props.location.pathname}/`}/>} />
let routes = [home, ...pageroutes, ...coreroutes]

logPageView(window.location) // first hit

let RoutesController = class extends Component<any,any> { 

    historyListener = (location,action) => {
        // console.log('history',location,action)
        logPageView(location)
    }

    componentWillMount() {

        this.props.history.listen(this.historyListener)        
        // global function to deal with markdown local links
        window['storybuilder_global'] = {
            navigateViaRouter :(event) => {
                // console.log('navigating from storybuilder_global')
                let target = event.currentTarget
                let path = target.getAttribute('href') // limited to original '/somepath'
                event.preventDefault()
                // this.props.history.push(event.currentTarget.href) // includes protocol prefix - 'http://'
                this.props.history.push(path)
                // push(path)
            }
        } 

    }

    componentWillUnmount() {

        delete window['storybuilder_global']

    }

        // <ConnectedRouter history = {this.props.history}>
        // </ConnectedRouter>
    render() {
        let location = this.props.router.location || {}
        return (
            <ConnectedRouter history = {this.props.history}>
                <Switch location = {location}>
                    { routes }
                </Switch>
            </ConnectedRouter>
        )
    }
}

// transitions were causing trouble, particularly with table of contents. 
// router causes page reload for first toc selection on roadmap
            // <TransitionGroup>
            //     <CSSTransition
            //         key = {location.key}
            //         classNames = "fade"
            //         timeout = {1000}
            //         appear
            //         exit = {false}
            //         onEnter = {() => {
            //             window.scrollTo(0, 0) // adapt to single page app results in arbitray page location after nav
            //         }}
            //     >
            //  ** switch controller goes here
            //     </CSSTransition>
            // </TransitionGroup>

let mapStateToProps = state => {
    let { router } = state
    return { 
        router,
    }
}

RoutesController = connect(mapStateToProps)(RoutesController)

export { RoutesController }
