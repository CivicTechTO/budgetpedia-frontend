// narrationbubble.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import MarkupBlockView from './markupblock.view';
let NarrationBubbleView = ({ markup }) => {
    let bubbleStyle = {
        maxWidth: '600px',
        border: '3px outset silver',
        backgroundColor: 'lightcyan',
        margin: '8px 16px 16px 16px',
        borderRadius: '8px',
        padding: '0 16px',
        position: 'relative',
        boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
    };
    let firstArrowStyle = {
        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'slategray transparent transparent transparent',
        borderWidth: '16px 16px 0px 16px',
        bottom: '-16px',
        left: '47px',
    };
    let secondArrowStyle = {
        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'lightcyan transparent transparent transparent',
        borderWidth: '13px 13px 0px 13px',
        bottom: '-13px',
        left: '50px',
    };
    return React.createElement("aside", { style: bubbleStyle },
        React.createElement(MarkupBlockView, { markup: markup }),
        React.createElement("div", { style: firstArrowStyle }),
        React.createElement("div", { style: secondArrowStyle }));
};
export default NarrationBubbleView;
