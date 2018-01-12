// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// tilelist.controller.tsx

'use strict'

import * as React from 'react'

import ScrollControlsView from './scrollcontrols.view'

import TileView from "./tile.view"

import MarkupLine from './markupline.view'
import HashAnchorWrapper from './hashanchorwrapper.view'

interface TileData {

    id: number,
    content: Object,
    route: string,
    index: number,
    tier: string,
    imageStyle?:any,

}

interface Props extends React.Props< TileListController > {

    tiles: Array< TileData >,
    style?: Object,
    onSelect: Function,
    title?:string,

}

class TileListController extends React.Component< Props, any > {

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

        let { tiles:tilelist, style, onSelect, title } = this.props
        let primarytiledata = []
        let secondarytiledata = []
        for (let tiledata of tilelist) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata)
            } else {
                secondarytiledata.push(tiledata)
            }
        }

        let tiledata = [...primarytiledata,...secondarytiledata]

        let tiles = tiledata.map ( function ( data ) {

            return (
                <TileView 
                    key     = { data.id } 
                    content  = { data.content }
                    route = { data.route }
                    imageStyle = { data.imageStyle }
                    onSelect = { onSelect } 
                />
            )
        })
// 152    102    103   #986667 
        return (
            <article style = {
                {
                    position:'relative', 
                    margin:'0 16px',
                    borderRadius:'8px',
                    backgroundColor: "#749261",
                    boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                }
            } >
                <div style = {
                    {
                        position:'absolute',
                        left:'0',
                        top:'0',
                        padding:'8px 16px',
                        zIndex:2,
                    }
                }>

                    <HashAnchorWrapper tag = 'h2' title = {title} style = {
                        {
                            display:'inline-block',
                            color:'white',
                            verticalAlign:'bottom',
                            marginRight:'8px'
                        }
                    } /> 

                </div>
                <ScrollControlsView scroller = {this.state.scroller}>
                    <div
                        style = { style }
                        ref = {el => {this.scroller = el}}
                    >
                        <div

                            style = {
                                {
                                    display: 'block',
                                    whiteSpace:'nowrap',
                                    position:'relative',
                                }
                            }>
                            { tiles }
                        </div>
                    </div>
                </ScrollControlsView>
            </article>
        )
    }
}

export default TileListController

// <div style = {
//     {
//         position:'absolute',
//         left:'0',
//         top:'0',
//         fontSize:'12px',
//         padding:'0 3px',
//         color:'white',
//     }
// }>{ title }
// </div>

