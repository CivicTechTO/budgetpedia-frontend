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

        // console.log('globalbar.controller props',this.props)

        let { globalbar, theme } = this.props
        
        let { pagetargets, homepage} = this.props

        let {title:primaryText, image} = homepage.content
        let {route} = homepage

        let headData = {
            primaryText,
            image,
            route,
        }

        let taglineView = 
            <TaglineView
                text = {globalbar.tagLine}
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
                contactAddress = {globalbar.contactAddress}
                contactPrompt = {globalbar.contactPrompt}
            />

        let menuiconView = 
            <MenuIconView 
                onSelect = {(e) => { this.handleMenuSidebarToggle(e) }}
                color = {theme.palette.alternateTextColor}
            />

        let menuSidebarView = 
            <MenuSidebarView 
                headData = { headData }
                tailData = { pagetargets }
                onSelect = { this.doMenuTransition }
                width = {300}
                docked = {false}
                disableSwipeToOpen
                onRequestChange = {open => this.setState({ menusidebaropen: open, }) }
                open = { this.state.menusidebaropen }
            />

        return (
            <GlobalBarView
                onSelect = { () => this.props.push(homepage.route) }
                titleStyle = {{cursor:'pointer'}}
                title= {globalbar.title}

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

    let { resources, pages, global } = state

    return {

        globalbar:global.globalbar,
        theme:resources.theme,
        pagetargets:pages.pagetargets,
        homepage:pages.homepage,
    }

}

GlobalBar = connect(
    mapStateToProps, 
    {
        push,
    })(GlobalBar)

export default GlobalBar
