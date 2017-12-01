// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// navtile.tsx

'use strict'

// required by bundler
import * as React from 'react'

import { push } from 'react-router-redux'

import { GridTile } from 'material-ui/GridList'

class NuggetView extends React.Component<any, any> {

    pushHistory = (e) => {

        if (this.props.content.disabled) {
            return
        }
        e.stopPropagation()
        this.props.onSelect(this.props.route)

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
                        display:'inline-block',
                        textAlign: "center",
                        backgroundColor:'white',
                        border:'2px solid silver',
                        borderRadius: '8px',
                        cursor:'pointer',
                        width:'180px',
                        height:'180px',
                        marginRight:'16px',
                    }
                }
                title = {this.props.content.title}
                subtitle = {this.props.content.subtitle}
                cols = {  this.props.content.cols || 1 }
                >
                <div style={wrapperstyle}
                onClick={ tile.pushHistory }>
                <div style={{position:"absolute",top:3,left:3,color:"silver",fontStyle:"italic",fontSize:"smaller"}} >
                {this.props.content.category}</div>
                <img src={this.props.content.image} style={{ height: "120px" }}/>
                <div style={{ position: "absolute", height: "30px", bottom: 0, width: "100%" }}></div>
                </div>
            </GridTile>

        )
    }
}

export { NuggetView }

