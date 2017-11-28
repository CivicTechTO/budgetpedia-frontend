// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menusidebar.view.tsx

'use strict'

import * as React from 'react' // required by bundler

import { PropTypes } from 'prop-types'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

import { MenuRowView } from './menurow.view'

interface MenuSidebarViewProps {
    headData: PropTypes.Object,
    tailData: PropTypes.Object,
    onSelect: PropTypes.Function
    width: PropTypes.number,
    docked:PropTypes.Boolean,
    disableSwipeToOpen:PropTypes.Boolean,
    onRequestChange:PropTypes.Function,
    open:PropTypes.Boolean,
}

class MenuSidebarView extends React.Component<MenuSidebarViewProps, any> {


    render() {
        let pagetargets = this.props.tailData
        // console.log('pagetargets',pagetargets)
        let menuitems = pagetargets.map(menutile => {
            return <MenuRowView
                onSelect = { this.props.onSelect }
                key = { menutile.id}
                primaryText = { menutile.content.title }
                image = {menutile.content.image}
                route = {menutile.route}
                disabled = {menutile.content.disabled}
            />

        })
        // console.log('headData',this.props.headData)
        let menuhead = [
            <MenuRowView 
                onSelect = { this.props.onSelect }
                {...this.props.headData}
            />,
            <Divider key="divider"/>,
        ]

        // console.log('menuhead, menuitems',menuhead, menuitems)

        return (
            <Drawer
                width={this.props.width}
                docked={this.props.docked}
                disableSwipeToOpen = {this.props.disableSwipeToOpen}
                onRequestChange={ this.props.onRequestChange }
                open={this.props.open} >

                { menuhead }

                { menuitems }

            </Drawer>
        )
    }

}

export { MenuSidebarView }
