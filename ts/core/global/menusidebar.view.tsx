// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menusidebar.view.tsx

'use strict'

import * as React from 'react' // required by bundler

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

import { MenuRowView } from './menurow.view'

interface Props {
    tailData: {
        id:any, 
        content:any, 
        route:string,
        isDivider?:boolean,
    }[],
    onSelect: Function,
    headData: {
        primaryText: string, 
        image: string, 
        route: string, 
        disabled?:boolean,
    },
    width: any,
    docked: boolean,
    disableSwipeToOpen: boolean,
    onRequestChange: any,
    open: boolean,
}

class MenuSidebarView extends React.Component<Props, any> {

    render() {
        let tailtargets = this.props.tailData
        // console.log('pagetargets',pagetargets)
        let menuitems = tailtargets.map(menurow => {
            return <MenuRowView
                onSelect = { this.props.onSelect }
                key = { menurow.id}
                primaryText = { menurow.content.title }
                image = {menurow.content.image}
                route = {menurow.route}
                disabled = {menurow.content.disabled}
                isDivider = {menurow.isDivider}
            />

        })

        let { headData } = this.props

        let { primaryText, image, route, disabled } = headData

        let menuhead = [
            <MenuRowView 
                onSelect = { this.props.onSelect }
                key = { 'home' }
                primaryText = { primaryText }
                image = { image }
                route = { route }
                disabled = { disabled }
            />,
            <Divider key="divider"/>,
        ]

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

export default MenuSidebarView
