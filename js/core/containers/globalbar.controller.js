'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const react_redux_1 = require("react-redux");
const Actions = require("../actions/actions");
const redux_1 = require("redux");
const AppBar_1 = require("material-ui/AppBar");
const Drawer_1 = require("material-ui/Drawer");
const Card_1 = require("material-ui/Card");
const menutile_1 = require("../components/menutile");
const IconButton_1 = require("material-ui/IconButton");
const RaisedButton_1 = require("material-ui/RaisedButton");
const FontIcon_1 = require("material-ui/FontIcon");
const Divider_1 = require("material-ui/Divider");
let GlobalBar = class extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccountSidebarToggle = () => this.setState({ accountsidebaropen: !this.state.accountsidebaropen });
        this.handleMenuSidebarToggle = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({ menusidebaropen: !this.state.menusidebaropen });
        };
        this.close = () => {
            this.setState({ accountsidebaropen: false });
        };
        this.transitionToHome = () => {
            this.setState({ accountsidebaropen: false });
            this.props.pushHistory('/');
        };
        this.transitionToRegister = (e) => {
            this.setState({ accountsidebaropen: false });
            this.props.pushHistory('/register');
        };
        this.transitionToResetPassword = (e) => {
            this.setState({ accountsidebaropen: false });
            this.props.pushHistory('/resetpassword');
        };
        this.transitionToProfile = (e) => {
            this.props.pushHistory('/userprofile');
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
        let { appnavbar, theme } = appbar.props;
        let hometiles = this.props.hometiles;
        let menutransition = (fn) => {
            this.setState({
                menusidebaropen: false,
            });
            return fn;
        };
        let closeicon = React.createElement(IconButton_1.default, { style: {
                top: 0,
                right: 0,
                padding: 0,
                height: "36px",
                width: "36px",
                position: "absolute",
                zIndex: 2,
            }, onTouchTap: appbar.close },
            React.createElement(FontIcon_1.default, { className: "material-icons", color: theme.palette.primary3Color, style: { cursor: "pointer" } }, "close"));
        let registerprompt = React.createElement("div", null,
            React.createElement(Card_1.CardText, null,
                React.createElement("a", { href: "javascript:void(0);", onClick: appbar.transitionToResetPassword }, "Forgot your password?")),
            React.createElement(Divider_1.default, null),
            React.createElement(Card_1.CardText, null, "Not a member? Register:"),
            React.createElement(Card_1.CardActions, null,
                React.createElement(RaisedButton_1.default, { type: "button", label: "Register", onTouchTap: appbar.transitionToRegister })));
        let transitionToFunc = redux_1.compose(menutransition, this.props.pushHistory);
        let menuitems = hometiles.map(menutile => {
            return React.createElement(menutile_1.MenuTile, { pushHistory: transitionToFunc, key: menutile.id, primaryText: menutile.content.title, image: menutile.content.image, route: menutile.route, disabled: menutile.content.disabled });
        });
        let menusidebar = React.createElement(Drawer_1.default, { width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => appbar.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen },
            React.createElement(menutile_1.MenuTile, { pushHistory: transitionToFunc, key: 'home', primaryText: "Budgetpedia Home", image: '../../public/icons/budgetpedia-logo.png', route: '/' }),
            React.createElement(Divider_1.default, null),
            menuitems);
        let menuicon = React.createElement(IconButton_1.default, { onTouchTap: (e) => { appbar.handleMenuSidebarToggle(e); } },
            React.createElement(FontIcon_1.default, { className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" } }, "menu"));
        return (React.createElement(AppBar_1.default, { onTitleTouchTap: appbar.transitionToHome, titleStyle: { cursor: 'pointer' }, style: {
                position: "fixed",
                backgroundColor: "#336797"
            }, title: React.createElement("span", null, appnavbar.title), iconElementLeft: menuicon },
            React.createElement("div", { style: {
                    position: "absolute",
                    fontSize: "12px",
                    color: "white",
                    top: 0,
                    right: 0,
                    padding: "3px",
                } },
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
                React.createElement("a", { id: "contact", target: "_blank", href: "mailto:mail@budgetpedia.ca" }, "mail@budgetpedia.ca")),
            React.createElement("div", { style: {
                    position: "absolute",
                    fontSize: "12px",
                    color: "gold",
                    bottom: 0,
                    left: 0,
                    padding: "3px",
                } }, "We're all about government budgets"),
            menusidebar));
    }
};
function mapStateToProps(state) {
    let { resources, login, homegrid, ui } = state;
    return {
        appnavbar: ui.appnavbar,
        theme: resources.theme,
        hometiles: homegrid.hometiles,
    };
}
GlobalBar = react_redux_1.connect(mapStateToProps, {
    pushHistory: Actions.pushHistory,
})(GlobalBar);
exports.default = GlobalBar;
