// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// menurow.tsx

'use strict'

// required by bundler
import * as React from 'react'

import MenuItem from 'material-ui/MenuItem'

import { PropTypes } from 'prop-types'

interface MenuRowProps {
    onSelect:PropTypes.Function,
    primaryText: PropTypes.string,
    image: PropTypes.string,
    route: PropTypes.string,
    disabled?: PropTypes.Boolean,
}

export class MenuRowView extends React.Component<MenuRowProps, any> {

    pushHistory = (e) => {
        // if (e.target.tagName == 'A') return;
        // used exclusively for transition
        e.stopPropagation()
        e.preventDefault()
        this.props.onSelect(this.props.route)
    }
    
    render() {

        return (

            <MenuItem 

                onTouchTap={ this.pushHistory }
                primaryText = {this.props.primaryText}
                leftIcon = {<img src={this.props.image}/>}
                disabled = {this.props.disabled?true:false}>
                
            </MenuItem>

        )
    }
}

