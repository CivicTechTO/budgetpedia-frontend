// scrollcontrols.view.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import * as ReactDom from 'react-dom'

class ScrollControlsView extends React.Component<any,any> {

    scroller = null

    componentWillReceiveProps(next) {
        // received on second render
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller
        }
    }

    render() {
        console.log('scrolls control scroller',this.scroller)
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default ScrollControlsView

