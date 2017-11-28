'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const redux_1 = require("redux");
const AppBar_1 = require("material-ui/AppBar");
const IconButton_1 = require("material-ui/IconButton");
const FontIcon_1 = require("material-ui/FontIcon");
const radium_1 = require("radium");
const menusidebar_view_1 = require("./menusidebar.view");
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
        let headData = {
            key: 'home',
            primaryText: "Budgetpedia Home",
            image: '../../public/icons/budgetpedia-logo.png',
            route: '/',
        };
        let tagLine = "We're all about government budgets";
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
                React.createElement(menusidebar_view_1.MenuSidebarView, { headData: headData, tailData: this.props.pagetargets, onSelect: this.doMenuTransition, width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen }))));
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
