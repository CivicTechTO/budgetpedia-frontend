'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const globalbar_view_1 = require("./globalbar.view");
const menuicon_view_1 = require("./menuicon.view");
const menusidebar_view_1 = require("./menusidebar.view");
const tagline_view_1 = require("./tagline.view");
const contact_view_1 = require("./contact.view");
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
        let taglineView = React.createElement(tagline_view_1.default, { text: this.props.globalbar.tagLine, style: {
                position: "absolute",
                bottom: 0,
                left: 0,
            } });
        let contactView = React.createElement(contact_view_1.default, { style: {
                position: "absolute",
                top: 0,
                right: 0,
            }, contactAddress: this.props.globalbar.contactAddress, contactPrompt: this.props.globalbar.contactPrompt });
        let menuiconView = React.createElement(menuicon_view_1.default, { onSelect: (e) => { this.handleMenuSidebarToggle(e); }, color: theme.palette.alternateTextColor });
        let menuSidebarView = React.createElement(menusidebar_view_1.default, { headData: headData, tailData: this.props.pagetargets, onSelect: this.doMenuTransition, width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen });
        return (React.createElement(globalbar_view_1.default, { onSelect: () => this.props.push('/'), titleStyle: { cursor: 'pointer' }, title: this.props.globalbar.title, iconElementLeft: menuiconView },
            taglineView,
            contactView,
            menuSidebarView));
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
