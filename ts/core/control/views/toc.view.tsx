// paper.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

// import { HashLink as Link } from 'react-router-hash-link'

import Paper from 'material-ui/Paper'

import HashAnchorHeader from './hashanchorheader.view'

let paddingMap = {
    h1:3,
    h2:16,
    h3:32,
    h4:48,
}

let levelMap = {
    h1:1,
    h2:2,
    h3:3,
    h4:4,
}

                   // <a href={window.location.pathname + '#' + item.slug}>

                   //      {indexnumber + ' ' + item.text}

                   //  </a>

let ToCView = ({tocdata}) => {

    let styles = {
        outderdiv:{backgroundColor:'#d9d9d9',margin: '16px',},
        innerdiv:{padding:'16px',position:"relative"},
    }

    let toc = []

    let numbering = [0]

    if (tocdata) {
        toc = tocdata.map((item,index) => {
            let { tag } = item
            let level = levelMap[tag]
            numbering.splice(level)
            numbering[level - 1] = numbering[level - 1]?numbering[level - 1]+1:1
            let indexnumber = ''
            for (let i = 0;i<level;i++) {
                indexnumber += (numbering[i] || 1)
                indexnumber += '.'
            }
            let paddingLeft = paddingMap[tag] + 'px'
            let marginTop
            let backgroundColor
            if (level == 1) {
                backgroundColor = '#d9d9d9'
            } else {
                backgroundColor = 'transparent'
            }
            if (level == 1 && index > 0) {
                marginTop = '8px'
            } else {
                marginTop = '0px'
            }
            return (

                <div 
                    key = {index} 
                    style = {
                        {
                            borderRadius:'6px',
                            paddingLeft,
                            marginTop,
                            backgroundColor,
                        }
                    } 
                >
                   <a href={'#' + item.slug}>

                        {indexnumber + ' ' + item.text}

                    </a>

                </div>
            )
        })
    }

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
                    <HashAnchorHeader title = 'Page Contents' tag = 'h2' />
                    <div style = {{columns:'2 300px',columnRule:'1px solid silver', columnGap:'24px'}} >
                        { toc }
                    </div>

                    <div style = {{clear:'both'}}></div>

                </div>
            </Paper>
        </nav>
    )
}

export default ToCView