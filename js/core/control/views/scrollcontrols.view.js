'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ScrollControlsView extends React.Component {
    constructor() {
        super(...arguments);
        this.scroller = null;
    }
    componentWillReceiveProps(next) {
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller;
        }
    }
    render() {
        console.log('scrolls control scroller', this.scroller);
        return (React.createElement("div", null, this.props.children));
    }
}
exports.default = ScrollControlsView;
