// paper.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

let ToCView = ({tocdata}) => {

    let styles = {
        outderdiv:{backgroundColor:'#d9d9d9',padding: '0 16px 16px 16px'},
        innerdiv:{padding:'16px',position:"relative"},
    }

    let toc = []

    if (tocdata) {
        toc = tocdata.map((item,index) => {
            return <div key = {index} ><a href={'#' + item.slug}>{item.text}</a></div>
        })
    }

    console.log('tocdata, toc in ToCView',tocdata, toc)

    return (
        <nav style = {styles.outderdiv}>
            <Paper zDepth = {3}
                style = {
                    {
                        boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                        borderRadius:'8px',
                    }
                }
            >
                <div style = {styles.innerdiv as any}>
                    <h1>Page Contents</h1>
                    { toc }

                <div style = {{clear:'both'}}></div>
                </div>
            </Paper>
        </nav>
    )
}

export default ToCView