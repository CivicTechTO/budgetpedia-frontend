// narrationbubble.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import MarkupBlockView from './markupblock.view'

class NarrationBubbleView extends React.Component<any,any> {

    bubbleStyle = {
        maxWidth:'600px',
        border:'3px outset silver',
        backgroundColor:'lightcyan',
        margin:'8px 16px 16px 16px',
        borderRadius: '8px',
        padding: '0 16px',
        position:'relative',
        boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
    }

    firstArrowStyle = {

        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'slategray transparent transparent transparent',
        borderWidth: '16px 16px 0px 16px',
        bottom: '-16px',
        left: '47px',
    }

    secondArrowStyle = {

        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'lightcyan transparent transparent transparent',
        borderWidth: '13px 13px 0px 13px',
        bottom: '-13px',
        left:'50px',

    }
    render() {
        return <div style = {this.bubbleStyle as any} >
            <MarkupBlockView markup = {this.props.markup} />
            <div style = {this.firstArrowStyle as any} ></div>
            <div style = {this.secondArrowStyle as any }></div>
        </div>
    }

}

export default NarrationBubbleView
