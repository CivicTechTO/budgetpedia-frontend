'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const scrollcontrols_view_1 = require("./scrollcontrols.view");
class PageMenuController extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            scroller: null,
        };
        this.scroller = null;
    }
    componentDidMount() {
        this.setState({
            scroller: this.scroller
        });
    }
    render() {
        return React.createElement("nav", { style: {
                position: "fixed",
                height: "38px",
                borderTop: '3px ridge silver',
                backgroundColor: "#336797",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 30
            } },
            React.createElement(scrollcontrols_view_1.default, { scroller: this.state.scroller },
                React.createElement("div", { style: {
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflowX: "scroll",
                    }, ref: el => { this.scroller = el; } }, this.props.children)));
    }
}
exports.default = PageMenuController;
