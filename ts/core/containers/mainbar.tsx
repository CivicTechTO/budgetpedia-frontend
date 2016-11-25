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
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'
import { compose } from 'redux'

import AppBar from 'material-ui/AppBar'
import LeftNav from 'material-ui/Drawer'
// import AppTile = require('../components/apptile')

import { BasicForm, elementProps } from '../components/basicform'

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

let MainBar = class extends React.Component<any, any> {

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
    handleMenuSidebarToggle = () => this.setState({ menusidebaropen: !this.state.menusidebaropen });
    
    close = () => {
        this.setState({ accountsidebaropen: false })
    }

    transitionToHome = () => {
        // consistent with other transition calls...
        this.setState({ accountsidebaropen: false })
        this.props.transitionTo('/')
    }

    transitionToRegister = (e) => {

        this.setState({ accountsidebaropen: false })
        this.props.transitionTo('/register')

    }

    transitionToResetPassword = (e) => {

        this.setState({ accountsidebaropen: false })
        this.props.transitionTo('/resetpassword')

    }

    transitionToProfile = (e) => {
        this.props.transitionTo('/userprofile')
    }

    // respond to login form; assume error correction
    submitLogin = ( elements ) => {

        let creds = {}
        for (var index in elements) {
            creds[index] = elements[index].getValue()
        }

        let appbar = this
        let callback = (result) => {
            if (result) {
                appbar.setState({
                    accountsidebaropen: false
                })
            }
        }

        this.props.loginUser(creds,callback)
    }

    logout = () => {
        this.props.logoutUser()
    }

    componentDidMount = () => {
        let auth = this.props.auth
        // close login sidebar after login
        if (auth.isAuthenticated && (!auth.isFetching) && this.state.accountsidebaropen) {
            this.setState({accountsidebaropen:false})
        }
    }

    render() { 
        let appbar = this
        let { appnavbar, theme, auth } = appbar.props
        let fieldMessages = appbar.props.auth.fieldMessages || {}
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

        // for login form below
        let elements:Array<elementProps> = [
            { 
                index: 'email',
                floatingLabelText: 'Email Address',
                hintText:"enter unique email (required)",
                // defaultValue: 'henrik@bechmann.ca',
                type: 'email',
                required: true,
                errorText: fieldMessages['email'],
            },
            {
                index: 'password',
                floatingLabelText: 'Password',
                hintText:"enter password (required)",
                type: 'password',
                maxLength:16,
                minLength:6,
                required: true,
                errorText: fieldMessages['password'],
            },
        ]

        let loginform = 
            <BasicForm 
                submit = { appbar.submitLogin }
                elements = { elements }
                submitButtonLabel = 'Sign in'
                errorMessage = { appbar.props.auth.errorMessage } 
            />

        let registerprompt = 
            <div>
                <CardText>
                    <a href="javascript:void(0);"
                        onTouchTap={appbar.transitionToResetPassword}>
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

        let loginsidebar = 
            <LeftNav
                width = { 300} 
                disableSwipeToOpen
                docked = { false}
                openRight = { true } 
                onRequestChange = { open => appbar.setState({ accountsidebaropen: open, }) }
                open = { appbar.state.accountsidebaropen } >

                <Card style={{ margin: "5px" }} >

                    { closeicon }

                    <CardTitle title="Member Sign In" style={{ paddingBottom: 0 }} />

                    { loginform }

                    { registerprompt }
                    
                </Card>
            </LeftNav >

        // let transitionToFunc = compose(menutransition, this.props.dispatch, Actions.transitionTo)
        let transitionToFunc = compose(menutransition, this.props.transitionTo)
        let menuitems = hometiles.map(menutile => {
            return <MenuTile
                transitionTo = { transitionToFunc }
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
                openRight={false}
                disableSwipeToOpen
                onRequestChange={open => appbar.setState({ menusidebaropen: open, }) }
                open={this.state.menusidebaropen} >

                <MenuTile 
                    transitionTo = { transitionToFunc }
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
                onTouchTap = {() => { appbar.handleMenuSidebarToggle() } } >

                <FontIcon
                    className = "material-icons"
                    color = {theme.palette.alternateTextColor}
                    style = {{ cursor: "pointer" }} >

                    menu

                </FontIcon>

            </IconButton>

        let accountmenu = 
            <IconMenu
                iconButtonElement={
                    <IconButton>
                        <FontIcon
                            className = "material-icons"
                            color = {theme.palette.alternateTextColor}
                            style = {{ cursor: "pointer" }} >

                            account_circle

                        </FontIcon>
                    </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                <MenuItem 
                    onTouchTap = { appbar.transitionToProfile }
                    primaryText = "Profile" />
                <MenuItem 
                    onTouchTap = { appbar.logout }
                    primaryText = "Sign out" />
            </IconMenu>

        let accounticon = 
            <IconButton
                onTouchTap= {() => { appbar.handleAccountSidebarToggle() } } >

                <FontIcon
                    className = "material-icons"
                    color = {theme.palette.alternateTextColor}
                    style = {{ cursor: "pointer" }} >

                    account_circle

                </FontIcon>

            </IconButton> 

        let username = 
            <div style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                fontSize: "small",
                padding: "3px",
                color: theme.palette.alternateTextColor,
            }} >

                { auth.isAuthenticated? auth.profile.userhandle: appnavbar.username }

            </div>

        // main components
        let workingmessagestate = this.props.workingmessagestate

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
                // iconElementRight={ 
                    //appbar.props.auth.isAuthenticated
                    //? accountmenu
                    //: accounticon 
                // } 
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

                {
                    workingmessagestate
                        ? <div
                            style={
                                {
                                    position: "absolute",
                                    top: "54px",
                                    left:0,
                                    textAlign: "center",
                                    width: "100%",
                                }
                            }
                            ><div style={{
                                display: "inline-block", color: "green",
                                backgroundColor: "beige",
                                fontSize:"12px",
                                padding: "3px",
                                border: "1px solid silver",
                                borderRadius: "10%"
                            }}>Working...</div></div>
                        : null
                }
            </AppBar>
        )
    } // render
}

function mapStateToProps(state) {

    let { resources, login, homegrid, ui } = state

    return {

        state,
        auth:login.auth,
        appnavbar:ui.appnavbar,
        theme:resources.theme,
        hometiles:homegrid.hometiles,
        workingmessagestate:ui.workingmessagestate,
    }

}

// if returned as default all is good; of returned by name then
// fails to apply result of mapStateToProps (??)
MainBar = connect(
    mapStateToProps, 
    {
        transitionTo:Actions.transitionTo,
        loginUser:Actions.loginUser,
        logoutUser:Actions.logoutUser,
    })(MainBar)

export default MainBar
