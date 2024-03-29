// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menurow.tsx

'use strict'

import * as React from 'react'

import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'

interface Props {
    route: string,
    onSelect: Function,
    primaryText: string,
    image: string,
    disabled?: boolean,
    isDivider?: boolean,
}

export class MenuRowView extends React.Component<Props, any> {

    pushHistory = (e) => {

        e.stopPropagation()
        this.props.onSelect(this.props.route)

    }
    
    render() {

        return ([
            this.props.isDivider?<Divider key="divider"/>:null,
            <MenuItem 

                onClick={ this.pushHistory }
                primaryText = {this.props.primaryText}
                leftIcon = {<img src={this.props.image}/>}
                disabled = {this.props.disabled?true:false}>
                
            </MenuItem>,

        ])
    }
}

