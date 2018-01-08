// paper.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import PaperView from './views/paper.view'

import coreControllerComposer from './core.controller.composer'

import ListController from './list.controller'
import MarkupBlockView from './views/markupblock.view'
import SheetView from './views/sheet.view'

class PaperControllerClass extends React.Component<any,any> {

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


        let childcomponents = this.toolkit.getChildren(this, children)

        if (childcomponents) {
            childcomponents = [...childcomponents] // work with copy; anticipate change below
        }

        let componentType = null

        switch (type) {
            case 'paper': {
                componentType = PaperView
                break
            }
            case 'markupblock': {
                componentType = MarkupBlockView
                break
            }
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

            case 'paper':{

                return this.emitLocalComponent(model,key)

            }
            case 'sheet': {

                return this.emitLocalComponent(model,key)

            }
            case 'list': {

                return <ListController
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

        if (!model) return <div></div>

        let component = this.emitComponent( model, model.index )

        return component

    }
}

let PaperController = coreControllerComposer(PaperControllerClass) 

export default PaperController
