'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ScrollControlsView extends React.Component {
    constructor() {
        super(...arguments);
        this.scroller = null;
        this.scrollerData = {
            height: null
        };
    }
    componentWillReceiveProps(next) {
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller;
            this.scrollerData.height = this.scroller.clientHeight;
        }
    }
    render() {
        let verticalpos = null;
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20;
        }
        return (React.createElement("div", { style: { position: 'relative' } },
            this.scroller ? React.createElement("div", { style: {
                    top: verticalpos + 'px',
                    position: 'absolute',
                    left: 0,
                    width: '20px',
                    height: '40px',
                    borderBottomRightRadius: '20px',
                    borderTopRightRadius: '20px',
                    border: '1px solid gray',
                    borderLeft: 0,
                    zIndex: 20,
                    fontSize: '30px',
                    color: 'darkgray',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,215,0,.3)',
                } },
                React.createElement("div", { style: {
                        marginLeft: '-10px',
                        marginTop: '2px',
                        fontSize: '36px',
                        color: 'darkgray'
                    }, className: 'material-icons' }, "chevron_left")) : null,
            this.scroller ? React.createElement("div", { style: {
                    top: verticalpos + 'px',
                    position: 'absolute',
                    right: 0,
                    width: '20px',
                    height: '40px',
                    borderBottomLeftRadius: '20px',
                    borderTopLeftRadius: '20px',
                    border: '1px solid gray',
                    borderRight: 0,
                    zIndex: 20,
                    fontSize: '30px',
                    color: 'darkgray',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,215,0,.3)',
                } },
                React.createElement("div", { style: { marginLeft: '-6px', marginTop: '2px', fontSize: '36px', color: 'darkgray' }, className: 'material-icons' }, "chevron_right")) : null,
            this.props.children));
    }
}
exports.default = ScrollControlsView;
