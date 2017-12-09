// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

// legal components
import ListController from './list.controller'
import CardController from './card.controller'
import SheetController from './sheet.controller'
import MediaController from './media.controller'
import CustomController from './custom.controller'

let SectionController = class extends BaseController<{model}> {

    constructor(props) {
        super(props)
        this.baseBindingsToInstance(this)
    }

    componentDidMount() {
        let { model } = this.props

        this.setState({
            model,
        })
    }

    emitComponent = (component,key) => {

        let { controller } = component

        let model = this.filterImportedBaseProps(component)

        switch (controller) {
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

        if (!model || model.repo) return null

        let finalmodel = model

        let {
            index,
            description, 
            properties, 
            components, 
        } = finalmodel

        if (!components) {
            return <div>{`Section components not found for ${index}:${description}`}</div>
        }

        let children = this.getChildren(components)

        return (
            <div>
                { /* header properties */ }
                { children }
            </div>
        )
    }

}

export default SectionController