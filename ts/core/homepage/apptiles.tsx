// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// navtiles.tsx

'use strict'

// required by bundler
import * as React from 'react'
var { Component } = React

import { AppTile } from "./apptile"

interface NavTilesData {

    id:         number,
    content:    Object,
    route:     string,
    index: number,
    tier: string,

}

interface AppTilesProps extends React.Props< AppTiles > {

    tiles:      Array< NavTilesData >,
    tilecols?:  number,
    padding?:   number,
    style?:     Object,
    tilecolors: Object,
    system:     Object,
    route?:     string,
    pushHistory: Function,
    cellHeight?: number,

}

class AppTiles extends Component< AppTilesProps, any > {

    render() {

        let { tiles, tilecols, padding, tilecolors, style, system, route, pushHistory, cellHeight } = this.props
        let primarytiledata = []
        let secondarytiledata = []
        for (let tiledata of tiles) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata)
            } else {
                secondarytiledata.push(tiledata)
            }
        }

        let primarytiles = primarytiledata.map ( function ( data ) {

            return (
                <AppTile 
                    key     = { data.id } 
                    content  = { data.content }
                    tilecolors = { tilecolors }
                    system = { system }
                    route = { data.route }
                    pushHistory = { pushHistory } 
                    />
            )
        })
        let secondarytiles = secondarytiledata.map ( function ( data ) {

            return (
                <AppTile 
                    key     = { data.id } 
                    content  = { data.content }
                    tilecolors = { tilecolors }
                    system = { system }
                    route = { data.route }
                    pushHistory = { pushHistory } 
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
                        fontFamily:style['fontFamily'],
                        color:'white',
                    }
                }>Main website pages (scroll &lt;--&gt;)
                </div>
                <div
                style = { style }
                >
                    <div

                        style       = {
                            {
                                display: 'block',
                                whiteSpace:'nowrap',
                                position:'relative',
                            }
                        }>
                        { primarytiles }
                        { secondarytiles }
                    </div>
                </div>
            </div>
        )
    }
}

export { AppTiles }
