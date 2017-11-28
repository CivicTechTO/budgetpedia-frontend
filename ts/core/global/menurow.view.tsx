// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menurow.tsx

'use strict'

import * as React from 'react'

import MenuItem from 'material-ui/MenuItem'

interface MenuRowViewProps {
    route: string,
    onSelect: Function,
    primaryText: string,
    image: string,
    disabled?: boolean,
}

export class MenuRowView extends React.Component<MenuRowViewProps, any> {

    pushHistory = (e) => {

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

