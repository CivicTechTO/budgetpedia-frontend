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
        style['width'] = '100%'
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
                    style = {{width:'80px'}}
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
            <div>
                <div
                style = {{
                    display: 'block',
                    backgroundColor: '#749261',               
                    overflowX: 'auto', 
                    width: '100%',
                }}
                >
                    <div

                        style       = {
                            {
                                display: 'block',
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
