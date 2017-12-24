'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class PageMenuController extends React.Component {
    render() {
        return React.createElement("div", { style: {
                position: "fixed",
                height: "38px",
                borderTop: '3px ridge silver',
                backgroundColor: "#336797",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 30
            } },
            React.createElement("div", { style: {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflow: "scroll",
                } }, this.props.children));
    }
}
exports.default = PageMenuController;
