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
            this.scrollerData.offsetLeft = this.scroller.scrollLeft
            this.scrollerData.offsetRight = this.calcScrollRight()
            this.scroller.addEventListener('scroll',this.onScroll)

        }
    }

    calcScrollRight = () => {

        let { scrollLeft, scrollWidth, clientWidth } = this.scroller
        return ( scrollWidth - (scrollLeft + clientWidth) )

    }

    onScroll = () => {

        let { scroller } = this
        let { scrollLeft } = scroller

        this.scrollerData.offsetLeft = scrollLeft
        this.scrollerData.offsetRight = this.calcScrollRight()

        this.updateControlVisibility()

    }

    updateControlVisibility = () => {
        let { leftcontrol, rightcontrol } = this.refs

        if (!leftcontrol || !rightcontrol ) return

        let leftOpacity = Number(leftcontrol['style'].opacity)
        let rightOpacity = Number(rightcontrol['style'].opacity)

        let { offsetLeft, offsetRight } = this.scrollerData

        if (!!offsetLeft && !leftOpacity) {
            leftcontrol['style'].opacity = 1
        }
        if (!offsetLeft && !!leftOpacity) {
            leftcontrol['style'].opacity = 0
        }
        if (!!offsetRight && !rightOpacity) {
            rightcontrol['style'].opacity = 1
        }
        if (!offsetRight && !!rightOpacity) {
            rightcontrol['style'].opacity = 0
        }

    }

    scrollToLeft = () => {
        let original = this.scroller.scrollLeft

        if (original == 0) return

        let scrollleft = original - this.scroller.clientWidth
        this.smoothScroll(scrollleft)
    }

    scrollToRight = () => {
        let original = this.scroller.scrollLeft
        let clientWidth = this.scroller.clientWidth
        let scrollWidth = this.scroller.scrollWidth

        if (original == (scrollWidth - clientWidth)) return

        let scrollright = original + clientWidth
        this.smoothScroll(scrollright)
    }

    // TODO apply some kind of easing; simplify, use requestAnimationFrame
    private smoothScroll = incoming => {
        let scroller = this.scroller
        let original = scroller.scrollLeft
        let target = incoming

        if (target < 0) target = 0
        let rightmax = scroller.scrollwidth - scroller.clientwidth
        if (target > rightmax) target = rightmax

        try {
            let poschange = target - original
            let msperinterval = 500/30 // desired time; frames per half second
            let tickslimit = 500/msperinterval
            let pospertick = poschange/tickslimit
            let ticks = 0
            let timer = setInterval(
                ()=>{
                    if ((ticks * msperinterval) > 500) {
                        clearInterval(timer)
                        return
                    }
                    ticks ++

                    let span = ticks * pospertick
                    let next = original + span

                    scroller.scrollLeft = next

                },msperinterval
            )
        } catch (e) {
            // abandon
        }
    }

    render() {
        let verticalpos = null
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20
        }

        this.updateControlVisibility()

        return (
            <div style = {{position:'relative'}}>
                <div style = {{ // left arrow

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
                    color:'darkslategray',
                    overflow:'hidden',
                    backgroundColor:'rgba(240,248,255,.7)',
                    opacity:0,
                    transition: 'opacity 1s',
                    cursor:'pointer',

                }}
                ref = "leftcontrol"
                >
                    <div style = {
                        {
                            marginLeft: '-10px', 
                            marginTop: '2px',
                            fontSize:'36px', 
                        }}
                        onClick = {this.scrollToLeft}
                        >
                        <div style={
                            {
                                marginTop: '2px',
                                fontSize:'36px',
                            }
                        } className = 'material-icons'>chevron_left</div>
                   </div>
                </div>
                <div style = {{

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
                    color:'darkslategray',
                    overflow:'hidden',
                    backgroundColor:'rgba(240,248,255,.7)',
                    opacity:0,
                    transition: 'opacity 1s',
                    cursor:'pointer',

                }}
                ref = "rightcontrol"
                >
                    <div style = {
                        {
                            marginLeft: '-6px', 
                            marginTop: '2px',
                            fontSize:'36px',
                        }}
                        onClick = {this.scrollToRight}
                        >
                        <div style={
                            {
                                marginTop: '2px',
                                fontSize:'36px',
                            }
                        } className = 'material-icons'>chevron_right</div>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default ScrollControlsView

