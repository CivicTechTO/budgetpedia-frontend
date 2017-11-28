'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Drawer_1 = require("material-ui/Drawer");
const Divider_1 = require("material-ui/Divider");
const menurow_view_1 = require("./menurow.view");
class MenuSidebarView extends React.Component {
    render() {
        let pagetargets = this.props.tailData;
        let menuitems = pagetargets.map(menutile => {
            return React.createElement(menurow_view_1.MenuRowView, { onSelect: this.props.onSelect, key: menutile.id, primaryText: menutile.content.title, image: menutile.content.image, route: menutile.route, disabled: menutile.content.disabled });
        });
        let menuhead = [
            React.createElement(menurow_view_1.MenuRowView, Object.assign({ onSelect: this.props.onSelect }, this.props.headData)),
            React.createElement(Divider_1.default, { key: "divider" }),
        ];
        return (React.createElement(Drawer_1.default, { width: this.props.width, docked: this.props.docked, disableSwipeToOpen: this.props.disableSwipeToOpen, onRequestChange: this.props.onRequestChange, open: this.props.open },
            menuhead,
            menuitems));
    }
}
exports.MenuSidebarView = MenuSidebarView;
