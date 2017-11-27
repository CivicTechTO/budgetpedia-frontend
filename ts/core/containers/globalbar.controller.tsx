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
var { Component } = React
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import { compose } from 'redux'

import AppBar from 'material-ui/AppBar'
import LeftNav from 'material-ui/Drawer'
// import AppTile = require('../components/apptile')

// import { BasicForm, elementProps } from '../components/basicform'

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'

import MenuItem from 'material-ui/MenuItem'
import { MenuTile } from '../components/menutile'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'
import IconMenu from 'material-ui/IconMenu'
// import FlatButton = require('material-ui/lib/flat-button')

let GlobalBar = class extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = { 
            accountsidebaropen: false, 
            menusidebaropen: false,
            elements:{},
            errors:{password:false,email:false},
        };
    }

    handleAccountSidebarToggle = () => this.setState({ accountsidebaropen: !this.state.accountsidebaropen });
    handleMenuSidebarToggle = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState({ menusidebaropen: !this.state.menusidebaropen })
    }
    
    close = () => {
        this.setState({ accountsidebaropen: false })
    }

    transitionToHome = () => {
        // consistent with other transition calls...
        this.setState({ accountsidebaropen: false })
        this.props.pushHistory('/')
    }

    transitionToRegister = (e) => {

        this.setState({ accountsidebaropen: false })
        this.props.pushHistory('/register')

    }

    transitionToResetPassword = (e) => {

        this.setState({ accountsidebaropen: false })
        this.props.pushHistory('/resetpassword')

    }

    transitionToProfile = (e) => {
        this.props.pushHistory('/userprofile')
    }

    render() { 
        // console.log('props', this.props)
        let appbar = this
        let { appnavbar, theme } = appbar.props
        let hometiles = this.props.hometiles
        let menutransition = (fn) => {
            this.setState({
                menusidebaropen:false,
            })
            return fn
        }

        let closeicon =
            <IconButton
                style={{
                    top:0,
                    right:0,
                    padding: 0,
                    height: "36px",
                    width: "36px",
                    position: "absolute",
                    zIndex:2,
                }}
                onTouchTap={ appbar.close } >

                <FontIcon
                    className="material-icons"
                    color = {theme.palette.primary3Color}
                    style = {{ cursor: "pointer" }} >

                    close

                </FontIcon>

            </IconButton>

        let registerprompt = 
            <div>
                <CardText>
                    <a href="javascript:void(0);"
                        onClick={appbar.transitionToResetPassword}>
                        Forgot your password?
                    </a>
                </CardText>

                <Divider/>

                <CardText>
                    Not a member? Register:
                </CardText>

                <CardActions>

                    <RaisedButton
                        type="button"
                        label="Register"
                        onTouchTap={appbar.transitionToRegister} />

                </CardActions>
            </div>

        // let transitionToFunc = compose(menutransition, this.props.dispatch, Actions.pushHistory)
        let transitionToFunc = compose(menutransition, this.props.pushHistory)
        let menuitems = hometiles.map(menutile => {
            return <MenuTile
                pushHistory = { transitionToFunc }
                key = { menutile.id}
                primaryText = { menutile.content.title }
                image = {menutile.content.image}
                route = {menutile.route}
                disabled = {menutile.content.disabled}
                />

        })

        let menusidebar = 
            <LeftNav
                width={300}
                docked={false}
                disableSwipeToOpen
                onRequestChange={open => appbar.setState({ menusidebaropen: open, }) }
                open={this.state.menusidebaropen} >

                <MenuTile 
                    pushHistory = { transitionToFunc }
                    key = {'home'}
                    primaryText = "Budgetpedia Home"
                    image = '../../public/icons/budgetpedia-logo.png'
                    route = '/'
                />

                <Divider />

                { menuitems }

            </LeftNav>

        let menuicon = 
            <IconButton
                onTouchTap = {(e) => { appbar.handleMenuSidebarToggle(e) } } >

                <FontIcon
                    className = "material-icons"
                    color = {theme.palette.alternateTextColor}
                    style = {{ cursor: "pointer" }} >

                    menu

                </FontIcon>

            </IconButton>

        return (
            <AppBar
                onTitleTouchTap = { appbar.transitionToHome }
                titleStyle = {{cursor:'pointer'}}
                style={ 
                    { 
                        position: "fixed",
                        backgroundColor:"#336797" 
                    } 
                }
                title={ <span>{ appnavbar.title }</span> }

                iconElementLeft={ menuicon }
                >
                <div style={{
                    position: "absolute",
                    fontSize: "12px",
                    color: "white",
                    top: 0,
                    right: 0,
                    padding: "3px",
                }}>
                    <style> {`
                        #contact:link {
                            color:white
                        }
                        #contact:visited {
                            color:gold
                        }
                        #contact:hover {
                            color:white
                        }
                    `} </style>
                    contact: <a id="contact"
                    target="_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a>
                </div>

                <div style={{
                    position: "absolute",
                    fontSize: "12px",
                    color: "gold",
                    bottom: 0,
                    left: 0,
                    padding: "3px",
                }}>
                    We're all about government budgets
                </div>

                { // username 
                }

                { // loginsidebar 
                }

                { menusidebar }

            </AppBar>
        )
    } // render
}

function mapStateToProps(state) {

    let { resources, login, homegrid, ui } = state

    return {

        appnavbar:ui.appnavbar,
        theme:resources.theme,
        hometiles:homegrid.hometiles,
    }

}

// if returned as default all is good; of returned by name then
// fails to apply result of mapStateToProps (??)
GlobalBar = connect(
    mapStateToProps, 
    {
        pushHistory:Actions.pushHistory,
    })(GlobalBar)

export default GlobalBar
