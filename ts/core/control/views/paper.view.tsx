// paper.view.tsx

import * as React from 'react'

import Paper from 'material-ui/Paper'

let PaperView = ({children}) => {

    let styles = {
        outderdiv:{backgroundColor:'#d9d9d9',padding: '0 16px 16px 16px'},
        innerdiv:{padding:'16px',position:"relative"},
    }

    return (
        <article style = {styles.outderdiv}>
            <Paper zDepth = {3}
                style = {
                    {
                        boxShadow:'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                        borderRadius:'8px',
                    }
                }
            >
                <div style = {styles.innerdiv as any}>

                    {children}

                <div style = {{clear:'both'}}></div>
                </div>
            </Paper>
        </article>
    )
}

export default PaperView