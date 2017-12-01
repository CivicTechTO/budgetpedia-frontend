// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menuicon.view.tsx

/*
    Note: FontIcon style seems to be ignored when nested in IconButton

*/

'use strict'

import * as React from 'react' // required by bundler

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'

// import * as Radium from 'radium'
// let { StyleRoot } = Radium

// let IconButton = Radium(IconButtonClass) // anticipate merging styles

interface Props {
    style?:any,
    onSelect: any,
    color: any,
}

class MenuIconView extends React.Component<Props, any> {

    render() {

        return (
            
                <IconButton
                    onTouchTap = {this.props.onSelect} 
                    style = {this.props.style} 
                >

                    <FontIcon
                        className = "material-icons"
                        color = {this.props.color}
                        >

                        menu

                    </FontIcon>

                </IconButton>

        )

    }

}

export default MenuIconView