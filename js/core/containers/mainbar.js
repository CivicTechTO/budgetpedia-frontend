'use strict';
const React = require('react');
var { Component, PropTypes } = React;
const react_redux_1 = require('react-redux');
const Actions = require('../actions/actions');
const redux_1 = require('redux');
const AppBar_1 = require('material-ui/AppBar');
const Drawer_1 = require('material-ui/Drawer');
const basicform_1 = require('../components/basicform');
const Card_1 = require('material-ui/Card');
const MenuItem_1 = require('material-ui/MenuItem');
const menutile_1 = require('../components/menutile');
const IconButton_1 = require('material-ui/IconButton');
const RaisedButton_1 = require('material-ui/RaisedButton');
const FontIcon_1 = require('material-ui/FontIcon');
const Divider_1 = require('material-ui/Divider');
const IconMenu_1 = require('material-ui/IconMenu');
let MainBar = class extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccountSidebarToggle = () => this.setState({ accountsidebaropen: !this.state.accountsidebaropen });
        this.handleMenuSidebarToggle = () => this.setState({ menusidebaropen: !this.state.menusidebaropen });
        this.close = () => {
            this.setState({ accountsidebaropen: false });
        };
        this.transitionToHome = () => {
            this.setState({ accountsidebaropen: false });
            this.props.transitionTo('/');
        };
        this.transitionToRegister = (e) => {
            this.setState({ accountsidebaropen: false });
            this.props.transitionTo('/register');
        };
        this.transitionToResetPassword = (e) => {
            this.setState({ accountsidebaropen: false });
            this.props.transitionTo('/resetpassword');
        };
        this.transitionToProfile = (e) => {
            this.props.transitionTo('/userprofile');
        };
        this.submitLogin = (elements) => {
            let creds = {};
            for (var index in elements) {
                creds[index] = elements[index].getValue();
            }
            let appbar = this;
            let callback = (result) => {
                if (result) {
                    appbar.setState({
                        accountsidebaropen: false
                    });
                }
            };
            this.props.loginUser(creds, callback);
        };
        this.logout = () => {
            this.props.logoutUser();
        };
        this.componentDidMount = () => {
            let auth = this.props.auth;
            if (auth.isAuthenticated && (!auth.isFetching) && this.state.accountsidebaropen) {
                this.setState({ accountsidebaropen: false });
            }
        };
        this.state = {
            accountsidebaropen: false,
            menusidebaropen: false,
            elements: {},
            errors: { password: false, email: false },
        };
    }
    render() {
        let appbar = this;
        let { appnavbar, theme, auth } = appbar.props;
        let fieldMessages = appbar.props.auth.fieldMessages || {};
        let hometiles = this.props.hometiles;
        let menutransition = (fn) => {
            this.setState({
                menusidebaropen: false,
            });
            return fn;
        };
        let closeicon = React.createElement(IconButton_1.default, {style: {
            top: 0,
            right: 0,
            padding: 0,
            height: "36px",
            width: "36px",
            position: "absolute",
            zIndex: 2,
        }, onTouchTap: appbar.close}, 
            React.createElement(FontIcon_1.default, {className: "material-icons", color: theme.palette.primary3Color, style: { cursor: "pointer" }}, "close")
        );
        let elements = [
            {
                index: 'email',
                floatingLabelText: 'Email Address',
                hintText: "enter unique email (required)",
                type: 'email',
                required: true,
                errorText: fieldMessages['email'],
            },
            {
                index: 'password',
                floatingLabelText: 'Password',
                hintText: "enter password (required)",
                type: 'password',
                maxLength: 16,
                minLength: 6,
                required: true,
                errorText: fieldMessages['password'],
            },
        ];
        let loginform = React.createElement(basicform_1.BasicForm, {submit: appbar.submitLogin, elements: elements, submitButtonLabel: 'Sign in', errorMessage: appbar.props.auth.errorMessage});
        let registerprompt = React.createElement("div", null, 
            React.createElement(Card_1.CardText, null, 
                React.createElement("a", {href: "javascript:void(0);", onTouchTap: appbar.transitionToResetPassword}, "Forgot your password?")
            ), 
            React.createElement(Divider_1.default, null), 
            React.createElement(Card_1.CardText, null, "Not a member? Register:"), 
            React.createElement(Card_1.CardActions, null, 
                React.createElement(RaisedButton_1.default, {type: "button", label: "Register", onTouchTap: appbar.transitionToRegister})
            ));
        let loginsidebar = React.createElement(Drawer_1.default, {width: 300, disableSwipeToOpen: true, docked: false, openRight: true, onRequestChange: open => appbar.setState({ accountsidebaropen: open, }), open: appbar.state.accountsidebaropen}, 
            React.createElement(Card_1.Card, {style: { margin: "5px" }}, 
                closeicon, 
                React.createElement(Card_1.CardTitle, {title: "Member Sign In", style: { paddingBottom: 0 }}), 
                loginform, 
                registerprompt)
        );
        let transitionToFunc = redux_1.compose(menutransition, this.props.transitionTo);
        let menuitems = hometiles.map(menutile => {
            return React.createElement(menutile_1.MenuTile, {transitionTo: transitionToFunc, key: menutile.id, primaryText: menutile.content.title, image: menutile.content.image, route: menutile.route, disabled: menutile.content.disabled});
        });
        let menusidebar = React.createElement(Drawer_1.default, {width: 300, docked: false, openRight: false, disableSwipeToOpen: true, onRequestChange: open => appbar.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen}, 
            React.createElement(menutile_1.MenuTile, {transitionTo: transitionToFunc, key: 'home', primaryText: "Budgetpedia Home", image: '../../public/icons/budgetpedia-logo.png', route: '/'}), 
            React.createElement(Divider_1.default, null), 
            menuitems);
        let menuicon = React.createElement(IconButton_1.default, {onTouchTap: () => { appbar.handleMenuSidebarToggle(); }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" }}, "menu")
        );
        let accountmenu = React.createElement(IconMenu_1.default, {iconButtonElement: React.createElement(IconButton_1.default, null, 
            React.createElement(FontIcon_1.default, {className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" }}, "account_circle")
        ), targetOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'top' }}, 
            React.createElement(MenuItem_1.default, {onTouchTap: appbar.transitionToProfile, primaryText: "Profile"}), 
            React.createElement(MenuItem_1.default, {onTouchTap: appbar.logout, primaryText: "Sign out"}));
        let accounticon = React.createElement(IconButton_1.default, {onTouchTap: () => { appbar.handleAccountSidebarToggle(); }}, 
            React.createElement(FontIcon_1.default, {className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" }}, "account_circle")
        );
        let username = React.createElement("div", {style: {
            position: "absolute",
            bottom: 0,
            right: 0,
            fontSize: "small",
            padding: "3px",
            color: theme.palette.alternateTextColor,
        }}, auth.isAuthenticated ? auth.profile.userhandle : appnavbar.username);
        let workingmessagestate = this.props.workingmessagestate;
        return (React.createElement(AppBar_1.default, {onTitleTouchTap: appbar.transitionToHome, titleStyle: { cursor: 'pointer' }, style: {
            position: "fixed",
            backgroundColor: "#336797"
        }, title: React.createElement("span", null, appnavbar.title), iconElementLeft: menuicon}, 
            React.createElement("div", {style: {
                position: "absolute",
                fontSize: "12px",
                color: "white",
                top: 0,
                right: 0,
                padding: "3px",
            }}, 
                React.createElement("style", null, 
                    " ", 
                    `
                        #contact:link {
                            color:white
                        }
                        #contact:visited {
                            color:gold
                        }
                        #contact:hover {
                            color:white
                        }
                    `, 
                    " "), 
                "contact: ", 
                React.createElement("a", {id: "contact", target: "_blank", href: "mailto:mail@budgetpedia.ca"}, "mail@budgetpedia.ca")), 
            React.createElement("div", {style: {
                position: "absolute",
                fontSize: "12px",
                color: "gold",
                bottom: 0,
                left: 0,
                padding: "3px",
            }}, "We're all about government budgets"), 
            menusidebar, 
            workingmessagestate
                ? React.createElement("div", {style: {
                    position: "absolute",
                    top: "54px",
                    left: 0,
                    textAlign: "center",
                    width: "100%",
                }}, 
                    React.createElement("div", {style: {
                        display: "inline-block", color: "green",
                        backgroundColor: "beige",
                        fontSize: "12px",
                        padding: "3px",
                        border: "1px solid silver",
                        borderRadius: "10%"
                    }}, "Working...")
                )
                : null));
    }
}
;
function mapStateToProps(state) {
    let { resources, login, homegrid, ui } = state;
    return {
        state,
        auth: login.auth,
        appnavbar: ui.appnavbar,
        theme: resources.theme,
        hometiles: homegrid.hometiles,
        workingmessagestate: ui.workingmessagestate,
    };
}
MainBar = react_redux_1.connect(mapStateToProps, {
    transitionTo: Actions.transitionTo,
    loginUser: Actions.loginUser,
    logoutUser: Actions.logoutUser,
})(MainBar);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainBar;
