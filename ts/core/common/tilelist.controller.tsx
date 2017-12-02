// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// nuggestlist.controller.tsx

'use strict'

import * as React from 'react'

import TileView from "./tile.view"

interface TileData {

    id: number,
    content: Object,
    route: string,
    index: number,
    tier: string,
    imageStyle?:any,

}

interface Props extends React.Props< TileList > {

    tiles: Array< TileData >,
    style?: Object,
    route?: string,
    onSelect: Function,
    cellHeight?: number,

}

class TileList extends React.Component< Props, any > {

    render() {

        let { tiles, style, route, onSelect, cellHeight } = this.props
        let primarytiledata = []
        let secondarytiledata = []
        for (let tiledata of tiles) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata)
            } else {
                secondarytiledata.push(tiledata)
            }
        }

        let nuggetsdata = [...primarytiledata,...secondarytiledata]

        let nuggets = nuggetsdata.map ( function ( data ) {

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
            <div style = {{position:'relative'}} >
                <div style = {
                    {
                        position:'absolute',
                        left:'0',
                        top:'0',
                        fontSize:'12px',
                        padding:'0 3px',
                        color:'white',
                    }
                }>Main website pages (scroll &lt;--&gt;)
                </div>
                <div
                style = { style }
                >
                    <div

                        style = {
                            {
                                display: 'block',
                                whiteSpace:'nowrap',
                                position:'relative',
                            }
                        }>
                        { nuggets }
                    </div>
                </div>
            </div>
        )
    }
}

export default TileList
