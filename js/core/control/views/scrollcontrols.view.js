'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class ScrollControlsView extends React.Component {
    constructor() {
        super(...arguments);
        this.scroller = null;
        this.scrollerData = {
            height: null,
            offsetLeft: null,
            offsetRight: null,
        };
        this.calcScrollRight = () => {
            let { scrollLeft, scrollWidth, clientWidth } = this.scroller;
            return (scrollWidth - (scrollLeft + clientWidth));
        };
        this.onScroll = () => {
            let scroller = this.scroller;
            let { scrollLeft } = scroller;
            this.scrollerData.offsetLeft = scrollLeft;
            this.scrollerData.offsetRight = this.calcScrollRight();
            this.updateControlVisibility();
        };
        this.updateControlVisibility = () => {
            let { leftcontrol, rightcontrol } = this.refs;
            if (!leftcontrol || !rightcontrol)
                return;
            let leftOpacity = Number(leftcontrol['style'].opacity);
            let rightOpacity = Number(rightcontrol['style'].opacity);
            let { offsetLeft, offsetRight } = this.scrollerData;
            if (!!offsetLeft && !leftOpacity)
                leftcontrol['style'].opacity = 1;
            if (!offsetLeft && !!leftOpacity)
                leftcontrol['style'].opacity = 0;
            if (!!offsetRight && !rightOpacity)
                rightcontrol['style'].opacity = 1;
            if (!offsetRight && !!rightOpacity)
                rightcontrol['style'].opacity = 0;
        };
    }
    componentWillReceiveProps(next) {
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller;
            this.scrollerData.height = this.scroller.clientHeight;
            this.scrollerData.offsetLeft = this.scroller.scrollLeft;
            this.scrollerData.offsetRight = this.calcScrollRight();
            this.scroller.addEventListener('scroll', this.onScroll);
        }
    }
    render() {
        let verticalpos = null;
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20;
        }
        this.updateControlVisibility();
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement("div", { style: {
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
                    opacity: 0,
                    transition: 'opacity 1s',
                }, ref: "leftcontrol" },
                React.createElement("div", { style: {
                        marginLeft: '-10px',
                        marginTop: '2px',
                        fontSize: '36px',
                        color: 'darkgray'
                    }, className: 'material-icons' }, "chevron_left")),
            React.createElement("div", { style: {
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
                    opacity: 0,
                    transition: 'opacity 1s',
                }, ref: "rightcontrol" },
                React.createElement("div", { style: { marginLeft: '-6px', marginTop: '2px', fontSize: '36px', color: 'darkgray' }, className: 'material-icons' }, "chevron_right")),
            this.props.children));
    }
}
exports.default = ScrollControlsView;
