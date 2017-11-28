'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const redux_1 = require("redux");
const AppBar_1 = require("material-ui/AppBar");
const Drawer_1 = require("material-ui/Drawer");
const IconButton_1 = require("material-ui/IconButton");
const FontIcon_1 = require("material-ui/FontIcon");
const Divider_1 = require("material-ui/Divider");
const radium_1 = require("radium");
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
        this.menutransition = (fn) => {
            this.setState({
                menusidebaropen: false,
            });
            return fn;
        };
        this.doMenuTransition = redux_1.compose(this.menutransition, this.props.push);
    }
    render() {
        let { globalbar, theme } = this.props;
        let pagetargets = this.props.pagetargets;
        let menuitems = pagetargets.map(menutile => {
            return React.createElement(menurow_1.MenuRow, { pushHistory: this.doMenuTransition, key: menutile.id, primaryText: menutile.content.title, image: menutile.content.image, route: menutile.route, disabled: menutile.content.disabled });
        });
        let menuhead = [
            React.createElement(menurow_1.MenuRow, { pushHistory: this.doMenuTransition, key: 'home', primaryText: "Budgetpedia Home", image: '../../public/icons/budgetpedia-logo.png', route: '/' }),
            React.createElement(Divider_1.default, null),
        ];
        let menusidebar = React.createElement(Drawer_1.default, { width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen },
            menuhead,
            menuitems);
        let menuicon = React.createElement(IconButton_1.default, { onTouchTap: (e) => { this.handleMenuSidebarToggle(e); } },
            React.createElement(FontIcon_1.default, { className: "material-icons", color: theme.palette.alternateTextColor, style: { cursor: "pointer" } }, "menu"));
        return (React.createElement(radium_1.StyleRoot, null,
            React.createElement(AppBar_1.default, { onTitleTouchTap: () => this.props.push('/'), titleStyle: { cursor: 'pointer' }, style: {
                    position: "fixed",
                    backgroundColor: "#336797"
                }, title: React.createElement("span", null, globalbar.title), iconElementLeft: menuicon },
                React.createElement("div", { style: {
                        position: "absolute",
                        fontSize: "12px",
                        color: "white",
                        top: 0,
                        right: 0,
                        padding: "3px",
                    } },
                    "contact: ",
                    React.createElement("a", { style: {
                            color: 'white',
                            ':hover': {
                                color: 'white',
                                background: 'black',
                            },
                            ':visited': { color: 'gold' },
                        }, target: "_blank", href: "mailto:mail@budgetpedia.ca" }, "mail@budgetpedia.ca")),
                React.createElement("div", { style: {
                        position: "absolute",
                        fontSize: "12px",
                        color: "gold",
                        bottom: 0,
                        left: 0,
                        padding: "3px",
                    } }, "We're all about government budgets"),
                menusidebar)));
    }
};
function mapStateToProps(state) {
    let { resources, homepage, ui } = state;
    return {
        globalbar: ui.globalbar,
        theme: resources.theme,
        pagetargets: homepage.pagetargets,
    };
}
GlobalBar = react_redux_1.connect(mapStateToProps, {
    push: react_router_redux_1.push,
})(GlobalBar);
exports.default = GlobalBar;
