// scrollcontrols.view.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

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

            let scroller = this.scroller = next.scroller
            let { scrollerData } = this

            scrollerData.height = scroller.clientHeight
            scrollerData.offsetLeft = scroller.scrollLeft
            scrollerData.offsetRight = this.calcScrollRight()

            scroller.addEventListener('scroll',this.onScroll)
            window.addEventListener('resize',this.onResize)

        }
    }

    componentWillUnmount() {

        this.scroller.removeEventListener('scroll',this.onScroll)        
        window.removeEventListener('resize',this.onResize)

    }

    calcScrollRight = () => {

        let { scrollLeft, scrollWidth, clientWidth } = this.scroller
        return ( scrollWidth - (scrollLeft + clientWidth) )

    }

    onResize = () => {

        this.onScroll()

    }

    onScroll = () => {

        let { scroller, scrollerData } = this
        let { scrollLeft } = scroller

        scrollerData.offsetLeft = scrollLeft
        scrollerData.offsetRight = this.calcScrollRight()

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
        } else 
        if (!offsetLeft && !!leftOpacity) {
            leftcontrol['style'].opacity = 0
        }

        if (!!offsetRight && !rightOpacity) {
            rightcontrol['style'].opacity = 1
        } else
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
    private smoothScroll = incomingtarget => {

        let scroller = this.scroller
        let original = scroller.scrollLeft
        let target = incomingtarget
        let ms = 500
        let fps = 60
        let frames = fps/(1000/ms)

        if (target < 0) target = 0
        let rightmax = scroller.scrollwidth - scroller.clientwidth
        if (target > rightmax) target = rightmax

        try {

            let poschange = target - original
            let msperinterval = ms/frames // desired time; frames per half second
            let tickslimit = ms/msperinterval
            let pospertick = poschange/tickslimit

            let ticks = 0
            let timer = setInterval(

                ()=>{

                    if ((ticks * msperinterval) > ms) {
                        clearInterval(timer)
                        return
                    }

                    ticks ++

                    let span = ticks * pospertick
                    let next = original + span

                    scroller.scrollLeft = next

                }, msperinterval
            )

        } catch (e) {
            // abandon
        }
    }

    arrowStyle = {

        position:'absolute',
        width: '20px',
        height: '40px',
        border: '1px solid gray',
        zIndex: 20,
        fontSize: '30px',
        color:'darkslategray',
        overflow:'hidden',
        backgroundColor:'rgba(240,248,255,.7)',
        opacity:0,
        transition: 'opacity 1s',
        cursor:'pointer',

    }

    leftArrowStyle = {

        ...this.arrowStyle,
        left:0,
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
        borderLeft: 0,

    }

    rightArrowStyle = {

        ...this.arrowStyle,
        right:0,
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
        borderRight: 0,

    }

    render() {

        let verticalpos = null
        if (this.scroller) {
            verticalpos = (this.scrollerData.height / 2) - 20
        }

        let leftStyle = {...this.leftArrowStyle,top: verticalpos + 'px',}
        let rightStyle = {...this.rightArrowStyle,top: verticalpos + 'px',}

        this.updateControlVisibility()

        return (

            <div style = {{ position:'relative' }}>{/* frame */}

                { /* left control */ }
                <div 
                    style = { leftStyle as any }
                    ref = "leftcontrol"
                    onClick = { this.scrollToLeft }
                >

                    <div 
                        style = {{
                            marginLeft: '-10px', 
                            marginTop: '2px',
                        }}
                    >

                        <div 
                            style={{
                                fontSize:'36px', // over-ride material-icons
                            }} 
                            className = 'material-icons'
                        >
                        
                            chevron_left

                        </div>

                   </div>

                </div>

                { /* right control */ }
                <div 
                    style = { rightStyle as any }
                    ref = "rightcontrol"
                    onClick = { this.scrollToRight }
                >

                    <div 
                        style = {{
                            marginLeft: '-6px', 
                            marginTop: '2px',
                        }}
                    >

                        <div 
                            style={{
                                fontSize:'36px',
                            }} 
                            className = 'material-icons'
                        >

                            chevron_right

                        </div>

                    </div>

                </div>

                { /* contents */ }
                {this.props.children}

            </div>
        )
    }
}

export default ScrollControlsView

