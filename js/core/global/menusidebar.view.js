// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menusidebar.view.tsx
'use strict';
import * as React from 'react'; // required by bundler
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { MenuRowView } from './menurow.view';
class MenuSidebarView extends React.Component {
    render() {
        let tailtargets = this.props.tailData;
        // console.log('pagetargets',pagetargets)
        let menuitems = tailtargets.map(menurow => {
            return React.createElement(MenuRowView, { onSelect: this.props.onSelect, key: menurow.id, primaryText: menurow.content.title, image: menurow.content.image, route: menurow.route, disabled: menurow.content.disabled });
        });
        let { headData } = this.props;
        let { primaryText, image, route, disabled } = headData;
        let menuhead = [
            React.createElement(MenuRowView, { onSelect: this.props.onSelect, key: 'home', primaryText: primaryText, image: image, route: route, disabled: disabled }),
            React.createElement(Divider, { key: "divider" }),
        ];
        return (React.createElement(Drawer, { width: this.props.width, docked: this.props.docked, disableSwipeToOpen: this.props.disableSwipeToOpen, onRequestChange: this.props.onRequestChange, open: this.props.open },
            menuhead,
            menuitems));
    }
}
export default MenuSidebarView;
