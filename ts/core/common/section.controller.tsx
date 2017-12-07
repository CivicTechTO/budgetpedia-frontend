// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import Lists from './lists.controller'
import Cards from './cards.controller'
import Sheets from './sheets.controller'
import Media from './media.controller'
import Custom from './custom.controller'

interface Props {
    model: {
        index?:string,
        repo?:string,
        description:string, 
        fields: object, 
        components: {
            controller:string,
            repo:string,
            index?:string,
            type?:string,
            description?:string,
            fields?:object,
            components?:Array<any>,
            composition?:Array<any>,
        }[],
        composition: object[],
    }
}

let Section = class extends BaseController<Props> {

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

        let children = components.map((component, key) => {

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

            let model = {
                repo, 
                index, 
                type,
                description, 
                fields, 
                components, 
                composition, 
            }

            switch (controller) {
                case 'lists': {

                    return <Lists
                        key = { key }
                        model = { model }
                    />

                }
                case 'cards': {

                    return <Cards
                        key = { key }
                        model = { model }
                    />

                }
                case 'sheets': {

                    return <Sheets
                        key = { key }
                        model = { model }
                    />

                }
                case 'media': {

                    return <Media
                        key = { key }
                        model = { model }
                    />

                }
                case 'custom': {

                    return <Custom
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

export default Section