// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import ListController from './list.controller'
import CardController from './card.controller'
import SheetController from './sheet.controller'
import MediaController from './media.controller'
import CustomController from './custom.controller'

import { ModelImportedBaseProps, ModelInheritedBaseProps, ModelFinalBaseProps } from './common.interfaces'

let SectionController = class extends BaseController<{model:ModelInheritedBaseProps}> {

    state = {
        model:null,
        waiting:false,
    }

    componentDidMount() {
        let { model } = this.props

        this.setState({
            model,
        })
    }

    getChildren = components => {

        let children = components.map((component:ModelImportedBaseProps, key) => {

            return this.emitComponent(component,key)

        })

        return children

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

                let { description } = model

                return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

            }
        }

    }

    render() {

        let { model } = this.state

        let response = this.assertModel(model)
        if (response) return response

        let finalmodel:ModelFinalBaseProps = model

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