// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// globalbar.controller.tsx

/*
    TODO: 
    - animate and abstract a ui message board
*/

'use strict'

import * as React from 'react' // required by bundler
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import AppBar from 'material-ui/AppBar'

import * as Radium from 'radium'
let { StyleRoot } = Radium

import MenuSidebarView from './menusidebar.view'
import MenuIconView from './menuicon.view'
import TaglineView from './tagline.view'

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

        // should be imported
        let headData = {
            key:'home',
            primaryText:"Budgetpedia Home",
            image:'../../public/icons/budgetpedia-logo.png',
            route: '/',
        }

        let tagLine = <TaglineView
                text = "We're all about government budgets"
                style = {{                
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    color:'green',
                }}
            />

        let menuicon = 
            <MenuIconView 
                onSelect = {(e) => { this.handleMenuSidebarToggle(e) }}
                color = {theme.palette.alternateTextColor}
            />

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

                    { tagLine }

                    <MenuSidebarView 
                        headData = { headData }
                        tailData = { this.props.pagetargets }
                        onSelect = { this.doMenuTransition }
                        width = {300}
                        docked = {false}
                        disableSwipeToOpen
                        onRequestChange = {open => this.setState({ menusidebaropen: open, }) }
                        open = { this.state.menusidebaropen }
                    />

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
