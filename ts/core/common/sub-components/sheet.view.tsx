// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

let SheetView = props => (
    <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}}>
        <Paper  zDepth = {3}>
        <div style = {{padding:'16px'}}>Sheet View</div>
        </Paper>
    </div>)

export default SheetView
