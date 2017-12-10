// section.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

// legal components
import ListController from './list.controller'
import CardController from './card.controller'
import SheetController from './sheet.controller'
import MediaController from './media.controller'
import CustomController from './custom.controller'

import SectionView from './sub-components/section.view'

let SectionController = class extends BaseController<{model}> {

    componentDidMount() {

        let { model } = this.props
        this.setStateModel(this,model)

    }

    emitLocalComponent = (component,key) => {

        let {
            controller,
            index,
            description, 
            lookups,
            propComponents, 
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'section': {
                componentType = SectionView
                break
            }

            default: {
                return <div key = {key}>Component type { type } not found in { controller } controller</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output

    }

    emitComponent = (component,key) => {

        let { controller } = component

        let model = component

        switch (controller) {
            case 'section': {
                return this.emitLocalComponent(component,key)
            }
            case 'card': {

                return <CardController
                    key = { key }
                    model = { model }
                />

            }
            case 'list': {

                return <ListController
                    key = { key }
                    model = { model }
                />

            }
            case 'sheet': {

                return <SheetController
                    key = { key }
                    model = { model }
                />

            }
            case 'media': {

                return <MediaController
                    key = { key }
                    model = { model }
                />

            }
            case 'custom': {

                return <CustomController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { description, index } = model

                return <div key = {'default' + key} >{`${controller} (${index}:${description}) not found`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return <div></div>

        let { index } = model

        let component = this.emitComponent(model,index)

        return component
    }

}

export default SectionController