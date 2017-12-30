// paper.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Paper from 'material-ui/Paper'

import coreControllerComposer from './core.controller.composer'

import ListController from './list.controller'
import MarkupBlockView from './views/markupblock.view'

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
                componentType = Paper

                if (!properties.zDepth) properties.zDepth = 3
                    
                childcomponents = [ 
                    ...childcomponents, 
                    <div key = 'clear' style = {{clear:"both"}}></div>,
                 ]
                break
            }
            case 'markupblock': {
                componentType = MarkupBlockView
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