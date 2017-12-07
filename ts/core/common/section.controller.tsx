// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Lists from './lists.controller'
import Cards from './cards.controller'
import Sheets from './sheets.controller'
import Embeds from './embeds.controller'
import Custom from './custom.controller'

interface Props {
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

let Section = class extends React.Component<Props, any> {

    render() {

        let {
            description, 
            fields, 
            components, 
            composition,
        } = this.props

        console.log('section props',this.props)

        components = components?components:[]

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

            // TODO test for repo and acquire data where required

            switch (controller) {
                case 'lists': {

                    return <Lists
                        key = { key }
                        type = { type }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                case 'cards': {

                    return <Cards
                        key = { key }
                        type = { type }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                case 'sheets': {

                    return <Sheets
                        key = { key }
                        type = { type }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                case 'embeds': {

                    return <Embeds
                        key = { key }
                        type = { type }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                case 'custom': {

                    return <Custom
                        key = { key }
                        type = { type }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                default: {

                    return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

                }
            }
        })

        console.log('children',children)

        return children
    }

}

export default Section