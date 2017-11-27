// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// class_mainbar.tsx

/*
    TODO: 
    - animate and abstract a ui message board
*/

'use strict'

import * as React from 'react' // required by bundler
var { Component } = React
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
    
    render() { 
        // console.log('props', this.props)
        let { globalbar, theme } = this.props
        let hometiles = this.props.hometiles
        let menutransition = (fn) => {
            this.setState({
                menusidebaropen:false,
            })
            return fn
        }

        let transitionToFunc = compose(menutransition, this.props.push)
        let menuitems = hometiles.map(menutile => {
            return <MenuRow
                pushHistory = { transitionToFunc }
                key = { menutile.id}
                primaryText = { menutile.content.title }
                image = {menutile.content.image}
                route = {menutile.route}
                disabled = {menutile.content.disabled}
                />

        })

        let menusidebar = 
            <Drawer
                width={300}
                docked={false}
                disableSwipeToOpen
                onRequestChange={open => this.setState({ menusidebaropen: open, }) }
                open={this.state.menusidebaropen} >

                <MenuRow 
                    pushHistory = { transitionToFunc }
                    key = {'home'}
                    primaryText = "Budgetpedia Home"
                    image = '../../public/icons/budgetpedia-logo.png'
                    route = '/'
                />

                <Divider />

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

    let { resources, homegrid, ui } = state

    return {

        globalbar:ui.globalbar,
        theme:resources.theme,
        hometiles:homegrid.hometiles,
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
