'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class PageMenuController extends React.Component {
    render() {
        return React.createElement("div", { style: { display: 'flex',
                flexWrap: 'nowrap',
                position: "fixed",
                height: "38px",
                backgroundColor: "red",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 30 } }, this.props.children);
    }
}
exports.default = PageMenuController;
