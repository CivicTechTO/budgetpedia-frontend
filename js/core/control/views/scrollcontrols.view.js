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
        this.onResize = () => {
            this.onScroll();
        };
        this.onScroll = () => {
            let { scroller, scrollerData } = this;
            let { scrollLeft } = scroller;
            scrollerData.offsetLeft = scrollLeft;
            scrollerData.offsetRight = this.calcScrollRight();
            this.updateControlVisibility();
        };
        this.updateControlVisibility = () => {
            let { leftcontrol, rightcontrol } = this.refs;
            if (!leftcontrol || !rightcontrol)
                return;
            let leftOpacity = Number(leftcontrol['style'].opacity);
            let rightOpacity = Number(rightcontrol['style'].opacity);
            let { offsetLeft, offsetRight } = this.scrollerData;
            if (!!offsetLeft && !leftOpacity) {
                leftcontrol['style'].opacity = 1;
            }
            if (!offsetLeft && !!leftOpacity) {
                leftcontrol['style'].opacity = 0;
            }
            if (!!offsetRight && !rightOpacity) {
                rightcontrol['style'].opacity = 1;
            }
            if (!offsetRight && !!rightOpacity) {
                rightcontrol['style'].opacity = 0;
            }
        };
        this.scrollToLeft = () => {
            let original = this.scroller.scrollLeft;
            if (original == 0)
                return;
            let scrollleft = original - this.scroller.clientWidth;
            this.smoothScroll(scrollleft);
        };
        this.scrollToRight = () => {
            let original = this.scroller.scrollLeft;
            let clientWidth = this.scroller.clientWidth;
            let scrollWidth = this.scroller.scrollWidth;
            if (original == (scrollWidth - clientWidth))
                return;
            let scrollright = original + clientWidth;
            this.smoothScroll(scrollright);
        };
        this.smoothScroll = incoming => {
            let scroller = this.scroller;
            let original = scroller.scrollLeft;
            let target = incoming;
            let ms = 500;
            let fps = 60;
            let frames = fps / (1000 / ms);
            if (target < 0)
                target = 0;
            let rightmax = scroller.scrollwidth - scroller.clientwidth;
            if (target > rightmax)
                target = rightmax;
            try {
                let poschange = target - original;
                let msperinterval = ms / frames;
                let tickslimit = ms / msperinterval;
                let pospertick = poschange / tickslimit;
                let ticks = 0;
                let timer = setInterval(() => {
                    if ((ticks * msperinterval) > ms) {
                        clearInterval(timer);
                        return;
                    }
                    ticks++;
                    let span = ticks * pospertick;
                    let next = original + span;
                    scroller.scrollLeft = next;
                }, msperinterval);
            }
            catch (e) {
            }
        };
        this.arrowStyle = {
            position: 'absolute',
            width: '20px',
            height: '40px',
            border: '1px solid gray',
            zIndex: 20,
            fontSize: '30px',
            color: 'darkslategray',
            overflow: 'hidden',
            backgroundColor: 'rgba(240,248,255,.7)',
            opacity: 0,
            transition: 'opacity 1s',
            cursor: 'pointer',
        };
        this.leftArrowStyle = Object.assign({}, this.arrowStyle, { left: 0, borderBottomRightRadius: '20px', borderTopRightRadius: '20px', borderLeft: 0 });
        this.rightArrowStyle = Object.assign({}, this.arrowStyle, { right: 0, borderBottomLeftRadius: '20px', borderTopLeftRadius: '20px', borderRight: 0 });
    }
    componentWillReceiveProps(next) {
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller;
            this.scrollerData.height = this.scroller.clientHeight;
            this.scrollerData.offsetLeft = this.scroller.scrollLeft;
            this.scrollerData.offsetRight = this.calcScrollRight();
            this.scroller.addEventListener('scroll', this.onScroll);
            window.addEventListener('resize', this.onResize);
        }
    }
    componentWillUnmount() {
        this.scroller.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onResize);
    }
    render() {
        let verticalpos = null;
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20;
        }
        let leftStyle = Object.assign({}, this.leftArrowStyle, { top: verticalpos + 'px' });
        let rightStyle = Object.assign({}, this.rightArrowStyle, { top: verticalpos + 'px' });
        this.updateControlVisibility();
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement("div", { style: leftStyle, ref: "leftcontrol" },
                React.createElement("div", { style: {
                        marginLeft: '-10px',
                        marginTop: '2px',
                    }, onClick: this.scrollToLeft },
                    React.createElement("div", { style: {
                            fontSize: '36px',
                        }, className: 'material-icons' }, "chevron_left"))),
            React.createElement("div", { style: rightStyle, ref: "rightcontrol" },
                React.createElement("div", { style: {
                        marginLeft: '-6px',
                        marginTop: '2px',
                    }, onClick: this.scrollToRight },
                    React.createElement("div", { style: {
                            fontSize: '36px',
                        }, className: 'material-icons' }, "chevron_right"))),
            this.props.children));
    }
}
exports.default = ScrollControlsView;
