// followupbubble.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import MarkupBlockView from './markupblock.view'

class FollowupBubbleView extends React.Component<any,any> {

    bubbleStyle = {
        maxWidth:'600px',
        border:'3px outset silver',
        backgroundColor:'cornsilk',
        margin:'16px 8px 32px 8px',
        borderRadius: '8px',
        padding: '0 3px',
        position:'relative',
    }

    firstArrowStyle = {

        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'transparent transparent slategray transparent',
        borderWidth: '0px 16px 16px 16px',
        top: '-16px',
        left: '47px',

    }

    secondArrowStyle = {

        borderStyle: 'solid',
        position: 'absolute',
        borderColor: 'transparent transparent cornsilk transparent',
        borderWidth: '0px 13px 13px 13px',
        top: '-13px',
        left:'50px',

    }
    render() {
        return <div style = {this.bubbleStyle as any} >
            <div style = {this.firstArrowStyle as any} ></div>
            <div style = {this.secondArrowStyle as any }></div>
            <MarkupBlockView markup = {this.props.markup} />
        </div>
    }

}

export default FollowupBubbleView