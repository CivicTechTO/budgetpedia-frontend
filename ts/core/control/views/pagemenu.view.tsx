// pagemenu.controller.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import ScrollControlsView from './scrollcontrols.view'

class PageMenuController extends React.Component<any,any> {

    componentDidMount() {
        this.setState({
            scroller:this.scroller
        })
    }

    state = {
        scroller:null,
    }

    scroller = null

    render() {
        return <nav style = {
            {
                position:"fixed",
                height:"38px",
                borderTop: '3px ridge silver',
                backgroundColor:"#336797",
                bottom:0,
                left:0,
                right:0,
                zIndex:30
            }
        }>
        <ScrollControlsView scroller = {this.state.scroller}>
            <div style = {
                    {
                        display: 'flex',
                        flexWrap: 'nowrap',
                        overflow:"scroll",
                    }
                } 
                    ref = {el => {this.scroller = el}}
            >
                {this.props.children}
            </div>
        </ScrollControlsView>
        </nav>
    }

}

export default PageMenuController