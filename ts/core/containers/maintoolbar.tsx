// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// maintoolbar.tsx

// add scrolling prompt region above buttons, with:
// http://stackoverflow.com/questions/19466750/scrolling-element-without-scrollbar-with-css

import * as React from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

function mapStateToProps(state) {

    let { toolsnavbar, resources } = state

    return {

        toolsnavbar,
        theme:resources.theme,

    }

}

let MainToolbar = class extends React.Component<any, any> {

    transitionToHome = () => {
        this.props.transitionTo('/')
    }

    render() {
        let { appnavbar, theme } = this.props

        return (
            <Toolbar style={{ 
                position: "fixed", 
                bottom: 0, 
                display: "flex", 
                justifyContent: "center", 
                borderTop:"2px solid silver" 
            }}>
                <ToolbarGroup style={{ 
                    float: "none", 
                    width: "70%", 
                    display: "flex", 
                    justifyContent: "space-around" 
                }} >
                    <IconButton disabled><FontIcon className="material-icons">arrow_back</FontIcon></IconButton>
                    <IconButton onTouchTap = { this.transitionToHome }><FontIcon className="material-icons">radio_button_unchecked</FontIcon></IconButton>
                    <IconButton disabled><FontIcon className="material-icons">check_box_outline_blank</FontIcon></IconButton>
                    <IconButton disabled><FontIcon className="material-icons">help_outline</FontIcon></IconButton>
                    <IconButton disabled><FontIcon className="material-icons">arrow_forward</FontIcon></IconButton>
                </ToolbarGroup>
            </Toolbar>
        )
    } // render
}

MainToolbar = connect(mapStateToProps,
    {
        transitionTo:Actions.transitionTo
    })(MainToolbar)

export default MainToolbar
