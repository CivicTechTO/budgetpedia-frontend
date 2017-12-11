// cards.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import HtmlView from './sub-components/html.view'
import ListController from './list.controller'

let CardController = class extends BaseController<{model}> {

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
            wrapper,
            propComponents, 
            type,
            properties,
            children, 
        } = component


        let childcomponents = this.getChildren(this,children)

        if (childcomponents) {
            childcomponents = [...childcomponents] // work with copy; anticipate change below
        }

        let componentType = null

        switch (type) {
            case 'card': {
                componentType = Card
                childcomponents = [ 
                    ...childcomponents, 
                    <div key = 'clear' style = {{clear:"both"}}></div>,
                 ]
                break
            }
            case 'htmlview': {
                componentType = HtmlView
                break
            }
            case 'cardtitle': {
                componentType = CardTitle
                break
            }
            case 'cardtext': {
                componentType = CardText
                break
            }
            default: {
                return <div key = {key}>Component type { type } not found in { controller } controller</div>
            }
        }

        properties.key = key

        let output = React.createElement(componentType, properties, childcomponents)

        output = this.wrapComponent(output,wrapper,key)

        return output
    }

    emitComponent = (model, key) => {

        let { controller } = model


        switch (controller) {

            case 'card':{

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

        let { index } = model

        let component = this.emitComponent(model,index)

        return component

    }
}

export default CardController
