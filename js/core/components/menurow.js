'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const MenuItem_1 = require("material-ui/MenuItem");
class MenuRow extends React.Component {
    constructor(props) {
        super(props);
        this.pushHistory = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.pushHistory(this.props.route);
        };
    }
    render() {
        let tile = this;
        return (React.createElement(MenuItem_1.default, { onTouchTap: tile.pushHistory, primaryText: this.props.primaryText, leftIcon: React.createElement("img", { src: this.props.image }), disabled: this.props.disabled ? true : false }));
    }
}
exports.MenuRow = MenuRow;
