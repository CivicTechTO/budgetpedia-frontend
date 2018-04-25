// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// globalbar.controller.tsx
/*
    TODO:
    - animate and abstract a ui message board
*/
'use strict';
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import GlobalBarView from './globalbar.view';
import MenuIconView from './menuicon.view';
import MenuSidebarView from './menusidebar.view';
import TaglineView from './tagline.view';
import ContactView from './contact.view';
let GlobalBarController = class extends React.Component {
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
        this.doMenuTransition = compose(this.menutransition, this.props.push);
    }
    render() {
        let { globalbar, theme } = this.props;
        let { pagetargets, homepage } = this.props;
        let { title: primaryText, image } = homepage.content;
        let { route } = homepage;
        let headData = {
            primaryText,
            image,
            route,
        };
        let taglineView = React.createElement(TaglineView, { text: globalbar.tagLine, style: {
                position: "absolute",
                bottom: 0,
                left: '62px',
            } });
        let contactView = React.createElement(ContactView, { style: {
                position: "absolute",
                top: 0,
                right: 0,
            }, contactAddress: globalbar.contactAddress, contactPrompt: globalbar.contactPrompt });
        let menuiconView = React.createElement(MenuIconView, { onSelect: (e) => { this.handleMenuSidebarToggle(e); }, color: theme.palette.alternateTextColor });
        let menuSidebarView = React.createElement(MenuSidebarView, { headData: headData, tailData: pagetargets, onSelect: this.doMenuTransition, width: 300, docked: false, disableSwipeToOpen: true, onRequestChange: open => this.setState({ menusidebaropen: open, }), open: this.state.menusidebaropen });
        return (React.createElement(GlobalBarView, { onSelect: () => this.props.push(homepage.route), titleStyle: { cursor: 'pointer' }, title: globalbar.title, iconElementLeft: menuiconView },
            taglineView,
            contactView,
            menuSidebarView));
    }
};
function mapStateToProps(state) {
    let { resources, pages, global } = state;
    return {
        globalbar: global.globalbar,
        theme: resources.theme,
        pagetargets: pages.pagetargets,
        homepage: pages.homepage,
    };
}
GlobalBarController = connect(mapStateToProps, {
    push,
})(GlobalBarController);
export default GlobalBarController;
