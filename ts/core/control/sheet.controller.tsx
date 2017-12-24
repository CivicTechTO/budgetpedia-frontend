// sheet.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import coreControllerComposer from './core.controller.composer'

import SheetView from './views/sheet.view'

class SheetControllerClass extends React.Component<any,any> {
    constructor(props) {
        super(props)
        this.toolkit = props.toolkit
    }

    state = {
        model:null
    }

    toolkit = null

    componentDidMount() {

        let { model } = this.props
        this.toolkit.setStateModel(this,model)

    }

    emitLocalComponent = (component,key) => {

        let {
            controller,
            index,
            wrapper,
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.toolkit.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'sheet': {
                let { lookups } = component
                if (lookups && lookups.draftdata) {
                    properties.draftsource = lookups.draftdata
                }
                componentType = SheetView
                break
            }
            default: {
                return <div key = {key}>Component type { type } not found in { controller } controller</div>
            }
        }

        properties.key = key

        let output = React.createElement(componentType, properties, childcomponents)

        output = this.toolkit.wrapComponent(output,wrapper,key)

        return output
    }

    emitComponent = (model, key) => {

        let { controller } = model

        switch (controller) {

            case 'sheet': {

                return this.emitLocalComponent(model,key)

            }

            default: {

                let { description } = model

                return <div key = {'default' + key} >{`${controller} (${description}) not found in List processor`}</div>

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

let SheetController = coreControllerComposer(SheetControllerClass) 

export default SheetController

