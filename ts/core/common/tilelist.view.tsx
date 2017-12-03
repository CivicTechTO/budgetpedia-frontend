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
    onSelect: Function,
    title?:string,

}

class TileList extends React.Component< Props, any > {

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
                }>{ title }
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
                        { tiles }
                    </div>
                </div>
            </div>
        )
    }
}

export default TileList
