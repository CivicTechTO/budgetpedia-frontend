'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Drawer_1 = require("material-ui/Drawer");
const Divider_1 = require("material-ui/Divider");
const menurow_view_1 = require("./menurow.view");
class MenuSidebarView extends React.Component {
    render() {
        let tailtargets = this.props.tailData;
        let menuitems = tailtargets.map(menurow => {
            return React.createElement(menurow_view_1.MenuRowView, { onSelect: this.props.onSelect, key: menurow.id, primaryText: menurow.content.title, image: menurow.content.image, route: menurow.route, disabled: menurow.content.disabled });
        });
        let { headData } = this.props;
        let { key, primaryText, image, route, disabled } = headData;
        let menuhead = [
            React.createElement(menurow_view_1.MenuRowView, { onSelect: this.props.onSelect, key: key, primaryText: primaryText, image: image, route: route, disabled: disabled }),
            React.createElement(Divider_1.default, { key: "divider" }),
        ];
        return (React.createElement(Drawer_1.default, { width: this.props.width, docked: this.props.docked, disableSwipeToOpen: this.props.disableSwipeToOpen, onRequestChange: this.props.onRequestChange, open: this.props.open },
            menuhead,
            menuitems));
    }
}
exports.default = MenuSidebarView;
