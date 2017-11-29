// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// globalbar.controller.tsx

/*
    TODO: 
    - animate and abstract a ui message board
*/

'use strict'

import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import GlobalBarView from './globalbar.view'
import MenuIconView from './menuicon.view'
import MenuSidebarView from './menusidebar.view'
import TaglineView from './tagline.view'
import ContactView from './contact.view'

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

        let taglineView = <TaglineView
                text = {this.props.globalbar.tagLine}
                style = {{                
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                }}
            />

        let contactView = 
            <ContactView 
                style = {{
                    position: "absolute",
                    top: 0,
                    right: 0,
                }}
                contactAddress = {this.props.globalbar.contactAddress}
                contactPrompt = {this.props.globalbar.contactPrompt}
            />

        let menuiconView = 
            <MenuIconView 
                onSelect = {(e) => { this.handleMenuSidebarToggle(e) }}
                color = {theme.palette.alternateTextColor}
            />

        let menuSidebarView = 
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

        return (
            <GlobalBarView
                onSelect = { () => this.props.push('/') }
                titleStyle = {{cursor:'pointer'}}
                title= {this.props.globalbar.title}

                iconElementLeft={ menuiconView }
            >

                { taglineView }

                { contactView }

                { menuSidebarView }

            </GlobalBarView>
        )
    }
}

function mapStateToProps(state) {

    let { resources, homepage, ui } = state

    return {

        globalbar:ui.globalbar,
        theme:resources.theme,
        pagetargets:homepage.pagetargets,

    }

}

GlobalBar = connect(
    mapStateToProps, 
    {
        push,
    })(GlobalBar)

export default GlobalBar
