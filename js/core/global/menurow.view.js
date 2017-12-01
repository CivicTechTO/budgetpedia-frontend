'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem_1 = require("material-ui/MenuItem");
class MenuRowView extends React.Component {
    constructor() {
        super(...arguments);
        this.pushHistory = (e) => {
            e.stopPropagation();
            this.props.onSelect(this.props.route);
        };
    }
    render() {
        return (React.createElement(MenuItem_1.default, { onTouchTap: this.pushHistory, primaryText: this.props.primaryText, leftIcon: React.createElement("img", { src: this.props.image }), disabled: this.props.disabled ? true : false }));
    }
}
exports.MenuRowView = MenuRowView;
