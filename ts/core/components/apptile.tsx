// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// navtile.tsx

'use strict'

// required by bundler
import * as React from 'react'

import { GridTile } from 'material-ui/GridList'

export class AppTile extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    transitionTo = (e) => {
        // if (e.target.tagName == 'A') return;
        // used exclusively for transition
        if (this.props.content.disabled) {
            // alert('this page not yet available')
            return
        }
        e.stopPropagation()
        e.preventDefault()
        var _this = this;
        _this.props.transitionTo(_this.props.route)
    }
    
    render() {

        let tile = this

        // console.log('tile props',this.props.content)

        let wrapperstyle = null
        if (this.props.content.disabled) {
            wrapperstyle = {
                opacity: 0.3,
                filter: "alpha(opacity = 30)", /* msie */
                backgroundColor: "#000",
            }
        } else {
            wrapperstyle = {
                pointerEvens:"none"
            }
        }

        return (

            <GridTile 

                style = {
                    {
                        textAlign: "center",
                        backgroundColor:'white',
                        border:'2px solid silver',
                        borderRadius: '8px',
                    }
                }
                onTouchTap={ tile.transitionTo }
                title = {this.props.content.title}
                subtitle = {this.props.content.subtitle}
                cols = {  this.props.content.cols || 1 }
                >
                <div style={wrapperstyle}>
                <div style={{position:"absolute",top:3,left:3,color:"silver",fontStyle:"italic",fontSize:"smaller"}} >
                {this.props.content.category}</div>
                <img src={this.props.content.image} style={{ height: "120px" }}/>
                <div style={{ position: "abolute", height: "30px", bottom: 0, width: "100%" }}></div>
                </div>
            </GridTile>

        )
    }
}

