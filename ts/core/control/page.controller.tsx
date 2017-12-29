// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: add handling and animation for anchors -- in-page and url anchors, around titles
*/

'use strict'

import * as React from 'react';

import Chip from 'material-ui/Chip'

var scrollToElement = require('scroll-to-element')

import coreControllerComposer from './core.controller.composer'
import SectionController from './section.controller'
import PageView from './views/page.view'
import PageMenuController from './views/pagemenu.view'

class PageControllerClass extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.toolkit = props.toolkit
    }

    state = {
        model:null
    }

    toolkit = null

    componentDidMount() {
        let { match :{ path } } = this.props
        let { master } = this.toolkit
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)

        this.toolkit.setStateModel(this, model)
    }

    onClickChip = index => {
        scrollToElement('#'+index,{offset:-64}) // space for global toolbar
    }

    assembleChips = children => {
        let chips = children.map((child, index) => {
            if (child.tag) {
                return (
                <Chip 
                    key = {index} 
                    onClick = {(
                        () => this.onClickChip(child.anchor)
                    )}
                    style = {{ margin:'4px' }}
                >
                    {child.tag}
                </Chip>)
            } else {
                return null
            }
        })
        chips = chips.filter((chip) => {
            return !!chip
        })
        return chips       
    }

    emitLocalComponent = (component,key) => {

        let {
            controller,
            index,
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.toolkit.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'page': {

                let chips = this.assembleChips(children)

                if (chips.length) {
                    childcomponents = [
                        <PageMenuController key = "menu">
                            {chips}
                        </PageMenuController>,
                        ...childcomponents,
                        <div key = "filler" style = {{height:'38px'}}></div>
                    ]
                }
                
                componentType = PageView

                break
            }

            default: {
                return <div key = { key }>Illegal component type { type } of { controller } controller</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output

    }

    emitComponent = (model,key) => {

        let { controller, description } = model

        switch (controller) {
            case 'page': {
                return this.emitLocalComponent(model,key)
            }
            case 'section': {

                return <SectionController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { index, description } = model

                return <div key = {'default' + key} >{`illegal controller ${controller} (${index}:${description}) of PageController`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return <PageView />

        let component = this.emitComponent(model,model.index)

        return component

    }
}

let PageController = coreControllerComposer(PageControllerClass) 

export default PageController
