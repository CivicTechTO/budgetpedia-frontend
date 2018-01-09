'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const markupblock_view_1 = require("./markupblock.view");
class NarrationBubbleView extends React.Component {
    constructor() {
        super(...arguments);
        this.bubbleStyle = {
            maxWidth: '600px',
            border: '3px outset silver',
            backgroundColor: 'lightcyan',
            margin: '8px 16px 16px 16px',
            borderRadius: '8px',
            padding: '0 16px',
            position: 'relative',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        };
        this.firstArrowStyle = {
            borderStyle: 'solid',
            position: 'absolute',
            borderColor: 'slategray transparent transparent transparent',
            borderWidth: '16px 16px 0px 16px',
            bottom: '-16px',
            left: '47px',
        };
        this.secondArrowStyle = {
            borderStyle: 'solid',
            position: 'absolute',
            borderColor: 'lightcyan transparent transparent transparent',
            borderWidth: '13px 13px 0px 13px',
            bottom: '-13px',
            left: '50px',
        };
    }
    render() {
        return React.createElement("div", { style: this.bubbleStyle },
            React.createElement(markupblock_view_1.default, { markup: this.props.markup }),
            React.createElement("div", { style: this.firstArrowStyle }),
            React.createElement("div", { style: this.secondArrowStyle }));
    }
}
exports.default = NarrationBubbleView;
