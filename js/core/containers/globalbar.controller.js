'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const redux_1 = require("redux");
const AppBar_1 = require("material-ui/AppBar");
const Drawer_1 = require("material-ui/Drawer");
const IconButton_1 = require("material-ui/IconButton");
const FontIcon_1 = require("material-ui/FontIcon");
const Divider_1 = require("material-ui/Divider");
const menurow_1 = require("../components/menurow");
let GlobalBar = class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            menusidebaropen: false,
        };
        this.handleMenuSidebarToggle = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState({ menusidebaropen: !this.state.menusidebaropen });
        };
    }
    render() {
        let { appnavbar, theme } = this.props;
        let hometiles = this.props.hometiles;
        let menutransition = (fn) => {
            this.setState({
                menusidebaropen: false,
            });
            return fn;
        };
        let transitionToFunc = redux_1.compose(menutransition, this.props.push);
        let menuitems = hometiles.map(menutile => {
            return React.createElement(menurow_1.MenuRow, { pushHistory: transitionToFunc, key: menutile.id, primaryText: menutile.content.title, image: menutile.content.image, route: menutile.route, disabled: menutile.content.disabled });
        });
        let menusidebar = React.createElement(Drawer_1.default, { width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen },
            React.createElement(menurow_1.MenuRow, { pushHistory: transitionToFunc, key: 'home', primaryText: "Budgetpedia Home", image: '../../public/icons/budgetpedia-logo.png', route: '/' }),
            React.createElement(Divider_1.default, null),
            menuitems);
        let menuicon = React.createElement(IconButton_1.default, { onTouchTap: (e) => { this.handleMenuSidebarToggle(e); } },
            React.createElement(FontIcon_1.default, { className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" } }, "menu"));
        return (React.createElement(AppBar_1.default, { onTitleTouchTap: () => this.props.push('/'), titleStyle: { cursor: 'pointer' }, style: {
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
    let { resources, homegrid, ui } = state;
    return {
        appnavbar: ui.appnavbar,
        theme: resources.theme,
        hometiles: homegrid.hometiles,
    };
}
GlobalBar = react_redux_1.connect(mapStateToProps, {
    push: react_router_redux_1.push,
})(GlobalBar);
exports.default = GlobalBar;
