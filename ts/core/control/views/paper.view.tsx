// paper.view.tsx

import * as React from 'react'

import Paper from 'material-ui/Paper'

let PaperView = ({children}) => {

    let styles = {
        outderdiv:{backgroundColor:'#d9d9d9',padding: '0 16px 16px 16px'},
        innerdiv:{padding:'16px',position:"relative"},
    }

    return (
        <div style = {styles.outderdiv}>
            <Paper zDepth = {3} >
                <div style = {styles.innerdiv as any}>

                    {children}

                <div style = {{clear:'both'}}></div>
                </div>
            </Paper>
        </div>
    )
}

export default PaperView