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
            index,
            description, 
            lookups,
            propComponents, 
            type,
            properties,
            children, 
        } = component


        properties.key = key

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
                return <div key = {key}>Pending</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output
    }

    emitComponent = (model, key) => {

        let { controller } = model

        if (controller == 'card') {
            return this.emitLocalComponent(model,key)
        }

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

        let component = this.emitLocalComponent(model,model.index)

        return component

    }
}

export default CardController
