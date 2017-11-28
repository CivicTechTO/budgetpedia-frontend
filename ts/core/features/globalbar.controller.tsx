// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// globalbar.controller.tsx

/*
    TODO: 
    - animate and abstract a ui message board
*/

'use strict'

import * as React from 'react' // required by bundler
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose } from 'redux'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'

import { StyleRoot } from 'radium'

import { MenuRow } from '../components/menurow'

let GlobalBar = class extends React.Component<any, any> {

    state = { 
        menusidebaropen: false,
    }

    handleMenuSidebarToggle = (e) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState({ menusidebaropen: !this.state.menusidebaropen })
    }
    
    menutransition = (fn) => {
        this.setState({
            menusidebaropen:false,
        })
        return fn
    }

    doMenuTransition = compose(this.menutransition, this.props.push)

    render() { 

        let { globalbar, theme } = this.props
        let pagetargets = this.props.pagetargets

        let menuitems = pagetargets.map(menutile => {
            return <MenuRow
                pushHistory = { this.doMenuTransition }
                key = { menutile.id}
                primaryText = { menutile.content.title }
                image = {menutile.content.image}
                route = {menutile.route}
                disabled = {menutile.content.disabled}
                />

        })

        let menuhead = [
            <MenuRow 
                pushHistory = { this.doMenuTransition }
                key = {'home'}
                primaryText = "Budgetpedia Home"
                image = '../../public/icons/budgetpedia-logo.png'
                route = '/'
            />,
            <Divider />,
        ]

        let menusidebar = 
            <Drawer
                width={300}
                docked={false}
                disableSwipeToOpen
                onRequestChange={open => this.setState({ menusidebaropen: open, }) }
                open={this.state.menusidebaropen} >

                { menuhead }

                { menuitems }

            </Drawer>

        let menuicon = 
            <IconButton
                onTouchTap = {(e) => { this.handleMenuSidebarToggle(e) } } >

                <FontIcon
                    className = "material-icons"
                    color = {theme.palette.alternateTextColor}
                    style = {{ cursor: "pointer" }} >

                    menu

                </FontIcon>

            </IconButton>

        return (
            <StyleRoot>
                <AppBar
                    onTitleTouchTap = { () => this.props.push('/') }
                    titleStyle = {{cursor:'pointer'}}
                    style={ 
                        { 
                            position: "fixed",
                            backgroundColor:"#336797" 
                        } 
                    }
                    title={ <span>{ globalbar.title }</span> }

                    iconElementLeft={ menuicon }
                    >
                    <div style={{
                        position: "absolute",
                        fontSize: "12px",
                        color: "white",
                        top: 0,
                        right: 0,
                        padding: "3px",
                    }}>
                        contact: <a 
                            style = {{
                                color:'white',
                                ':hover':{
                                    color:'white',
                                    background: 'black',
                                },
                                ':visited':{color:'gold'},
                            }}
                            target="_blank" href="mailto:mail@budgetpedia.ca"
                            >
                                mail@budgetpedia.ca
                            </a>
                    </div>

                    <div style={{
                        position: "absolute",
                        fontSize: "12px",
                        color: "gold",
                        bottom: 0,
                        left: 0,
                        padding: "3px",
                    }}>
                        We're all about government budgets
                    </div>

                    { menusidebar }

                </AppBar>
            </StyleRoot>
        )
    } // render
}

function mapStateToProps(state) {

    let { resources, homepage, ui } = state

    return {

        globalbar:ui.globalbar,
        theme:resources.theme,
        pagetargets:homepage.pagetargets,
    }

}

// if returned as default all is good; of returned by name then
// fails to apply result of mapStateToProps (??)
GlobalBar = connect(
    mapStateToProps, 
    {
        push,
    })(GlobalBar)

export default GlobalBar
