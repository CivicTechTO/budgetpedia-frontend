'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const AppBar_1 = require("material-ui/AppBar");
const Radium = require("radium");
let { StyleRoot } = Radium;
const menusidebar_view_1 = require("./menusidebar.view");
const menuicon_view_1 = require("./menuicon.view");
const tagline_view_1 = require("./tagline.view");
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
        let tagLine = React.createElement(tagline_view_1.default, { text: "We're all about government budgets", style: {
                position: "absolute",
                bottom: 0,
                left: 0,
                color: 'green',
            } });
        let menuicon = React.createElement(menuicon_view_1.default, { onSelect: (e) => { this.handleMenuSidebarToggle(e); }, color: theme.palette.alternateTextColor });
        return (React.createElement(StyleRoot, null,
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
                tagLine,
                React.createElement(menusidebar_view_1.default, { headData: headData, tailData: this.props.pagetargets, onSelect: this.doMenuTransition, width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen }))));
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
