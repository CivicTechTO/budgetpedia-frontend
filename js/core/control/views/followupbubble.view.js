// followupbubble.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import MarkupBlockView from './markupblock.view';
class FollowupBubbleView extends React.Component {
    constructor() {
        super(...arguments);
        this.bubbleStyle = {
            maxWidth: '600px',
            border: '3px outset silver',
            backgroundColor: 'cornsilk',
            margin: '16px 16px 32px 16px',
            borderRadius: '8px',
            padding: '0 16px',
            position: 'relative',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        };
        this.firstArrowStyle = {
            borderStyle: 'solid',
            position: 'absolute',
            borderColor: 'transparent transparent slategray transparent',
            borderWidth: '0px 16px 16px 16px',
            top: '-16px',
            left: '47px',
        };
        this.secondArrowStyle = {
            borderStyle: 'solid',
            position: 'absolute',
            borderColor: 'transparent transparent cornsilk transparent',
            borderWidth: '0px 13px 13px 13px',
            top: '-13px',
            left: '50px',
        };
    }
    render() {
        return React.createElement("aside", { style: this.bubbleStyle },
            React.createElement("div", { style: this.firstArrowStyle }),
            React.createElement("div", { style: this.secondArrowStyle }),
            React.createElement(MarkupBlockView, { markup: this.props.markup }));
    }
}
export default FollowupBubbleView;
