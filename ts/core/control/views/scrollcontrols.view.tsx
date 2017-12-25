// scrollcontrols.view.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import * as ReactDom from 'react-dom'

class ScrollControlsView extends React.Component<any,any> {

    scroller = null
    scrollerData = {
        height:null,
        offsetLeft:null,
        offsetRight:null,
    }

    componentWillReceiveProps(next) {
        // received on second render
        if (!this.scroller && next.scroller) {
            this.scroller = next.scroller
            this.scrollerData.height = this.scroller.clientHeight
        }
    }

    render() {
        let verticalpos = null
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20
        }
        return (
            <div style = {{position:'relative'}}>
                {this.scroller?<div style = {{

                    top: verticalpos + 'px',
                    position:'absolute',
                    left:0,
                    width: '20px',
                    height: '40px',
                    borderBottomRightRadius: '20px',
                    borderTopRightRadius: '20px',
                    border: '1px solid gray',
                    borderLeft: 0,
                    zIndex: 20,
                    fontSize: '30px',
                    color:'darkgray',
                    overflow:'hidden',
                    backgroundColor:'rgba(255,215,0,.3)',

                }}>
                    <div style = {
                        {
                            marginLeft: '-10px', 
                            marginTop: '2px',
                            fontSize:'36px', 
                            color:'darkgray'}
                        } 
                        className = 'material-icons'
                    >
                        chevron_left
                    </div>
                </div>:null}
                {this.scroller?<div style = {{

                    top: verticalpos + 'px',
                    position:'absolute',
                    right:0,
                    width: '20px',
                    height: '40px',
                    borderBottomLeftRadius: '20px',
                    borderTopLeftRadius: '20px',
                    border: '1px solid gray',
                    borderRight: 0,
                    zIndex: 20,
                    fontSize: '30px',
                    color:'darkgray',
                    overflow:'hidden',
                    backgroundColor:'rgba(255,215,0,.3)',

                }}>
                    <div style = {{marginLeft: '-6px', marginTop: '2px',fontSize:'36px', color:'darkgray'}} className = 'material-icons'>chevron_right</div>
                </div>:null}
                {this.props.children}
            </div>
        )
    }
}

export default ScrollControlsView

