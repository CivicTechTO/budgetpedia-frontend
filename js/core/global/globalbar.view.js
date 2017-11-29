'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AppBar_1 = require("material-ui/AppBar");
class GlobalBarView extends React.Component {
    render() {
        let defaultStyle = {
            position: "fixed",
            backgroundColor: "#336797"
        };
        let defaultTitleStyle = {
            cursor: 'pointer',
        };
        let titleStyle = this.props.titleStyle || {};
        return (React.createElement(AppBar_1.default, { onTitleTouchTap: () => this.props.onSelect(), titleStyle: Object.assign({}, defaultTitleStyle, titleStyle), style: Object.assign({}, defaultStyle, this.props.style), title: React.createElement("span", null, this.props.title), iconElementLeft: this.props.iconElementLeft }, this.props.children));
    }
}
exports.default = GlobalBarView;
