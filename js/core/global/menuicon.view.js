'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const IconButton_1 = require("material-ui/IconButton");
const FontIcon_1 = require("material-ui/FontIcon");
class MenuIconView extends React.Component {
    render() {
        return (React.createElement(IconButton_1.default, { onTouchTap: this.props.onSelect, style: this.props.style },
            React.createElement(FontIcon_1.default, { className: "material-icons", color: this.props.color }, "menu")));
    }
}
exports.default = MenuIconView;
