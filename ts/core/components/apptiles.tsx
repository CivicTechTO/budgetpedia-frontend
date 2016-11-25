// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// navtiles.tsx

'use strict'

// required by bundler
import * as React from 'react'
var { Component } = React

import { GridList } from 'material-ui/GridList'

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
    transitionTo: Function,
    cellHeight?: number,

}

class AppTiles extends Component< AppTilesProps, any > {

    render() {

        let { tiles, tilecols, padding, tilecolors, style, system, route, transitionTo, cellHeight } = this.props
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
                    transitionTo = { transitionTo } 
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
                    transitionTo = { transitionTo } 
                    />
            )
        })
// 152    102    103   #986667 
        return (
            <div>
                <div
                style = {{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around', 
                    backgroundColor: '#749261',               
                }}
                >
                <GridList 

                    style       = { style }
                    children    = { primarytiles } 
                    cols        = { tilecols } 
                    padding     = { padding }
                    cellHeight  = { cellHeight } />
                </div>
                <div
                style = {{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around', 
                    backgroundColor: '#986667 ',               
                }}
                >
                <GridList 

                    style       = { style }
                    children    = { secondarytiles } 
                    cols        = { tilecols } 
                    padding     = { padding }
                    cellHeight  = { cellHeight } />
                </div>
            </div>
        )
    }
}

export { AppTiles }
