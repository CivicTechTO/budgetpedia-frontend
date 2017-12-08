// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import ListsController from './lists.controller'
import CardsController from './cards.controller'
import SheetsController from './sheets.controller'
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

    render() {

        let { model } = this.state

        let response = this.assertModel(model)
        if (response) return response

        let {
            index,
            description, 
            fields, 
            components, 
            composition,
        } = model

        if (!components) {
            return <div>{`Section components not fournd for ${index}:${description}`}</div>
        }

        let children = components.map((component:ModelImportedBaseProps, key) => {

            let { 
                controller,
                repo, 
                index, 
                type,
                description, 
                fields, 
                components, 
                composition, 
            } = component

            // lose the controller prop
            let model:ModelInheritedBaseProps = {
                repo, 
                index, 
                type,
                description, 
                fields, 
                components, 
                composition, 
            }

            switch (controller) {
                case 'cards': {

                    return <CardsController
                        key = { key }
                        model = { model }
                    />

                }
                case 'lists': {

                    return <ListsController
                        key = { key }
                        model = { model }
                    />

                }
                case 'sheets': {

                    return <SheetsController
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

                    return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

                }
            }
        })

        return children
    }

}

export default SectionController