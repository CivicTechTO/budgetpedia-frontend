// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// menutile.tsx

'use strict'

// required by bundler
import * as React from 'react'

import MenuItem from 'material-ui/MenuItem'

export class MenuRow extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    pushHistory = (e) => {
        // if (e.target.tagName == 'A') return;
        // used exclusively for transition
        e.stopPropagation()
        e.preventDefault()
        this.props.pushHistory(this.props.route)
    }
    
    render() {

        let tile = this

        return (

            <MenuItem 

                onTouchTap={ tile.pushHistory }
                primaryText = {this.props.primaryText}
                leftIcon = {<img src={this.props.image}/>}
                disabled = {this.props.disabled?true:false}>
                
            </MenuItem>

        )
    }
}

