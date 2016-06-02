// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// class_mainbar.tsx

/*
    TODO: 
    - add name of user under account icon at right. Currently this causes styling problems
    - control account icon color by passed in property
    - change username source to user object
    - clear login form after successful login (form.reset())
    - use getInputDOMNode().value = this.refs.input.getDOMNode(), or getValue()
    - animate and abstract the ui message board

    NOTES:
    - iconStyleRight does not work
    - style on FontIcon does not work
    - iconStyle on iconButton works
*/

// <reference path="../../typings/material-ui/material-ui.d.ts" />
// <reference path="../../typings-custom/material-ui.d.ts" />

'use strict'

import * as React from 'react' // required by bundler
var { Component, PropTypes } = React
// import { connect as injectStore} from 'react-redux'
// import * as Actions from '../actions/actions'
// import { compose } from 'redux'

import AppBar = require('material-ui/lib/app-bar')
import LeftNav = require('material-ui/lib/left-nav')
// import AppTile = require('../components/apptile')

// import { BasicForm, elementProps } from '../components/basicform'

import Card = require('material-ui/lib/card/card')
import CardTitle = require('material-ui/lib/card/card-title')
import CardText = require('material-ui/lib/card/card-text')
import CardActions = require('material-ui/lib/card/card-actions')

import MenuItem = require('material-ui/lib/menus/menu-item')
// import { MenuTile } from '../components/menutile'
import IconButton = require('material-ui/lib/icon-button')
import RaisedButton = require('material-ui/lib/raised-button')
import FontIcon = require('material-ui/lib/font-icon')
import TextField = require('material-ui/lib/text-field')
import Divider = require('material-ui/lib/divider')
import IconMenu = require('material-ui/lib/menus/icon-menu')
// console.log(Colors)
// import FlatButton = require('material-ui/lib/flat-button')

class MainBarClass extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { 
            accountsidebaropen: false, 
            menusidebaropen: false,
            elements:{},
            errors:{password:false,email:false},
        };
    }

    render() { 

        // for login form below

        return (
            <AppBar
                onTitleTouchTap = {e => {}}
                titleStyle = {{cursor:'pointer'}}
                style={ { position: "fixed" } }
                title={ <span>Toronto Budgetpedia</span> }>
                <div style={{
                    position:"absolute",
                    fontSize:"smaller",
                    color:"white",
                    top:0,
                    right:0,
                    padding:"3px",
                }}>
                contact: <a href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a>
                </div>

            </AppBar>
        )
    } // render
}


var MainBar:typeof MainBarClass = MainBarClass

export { MainBar }
