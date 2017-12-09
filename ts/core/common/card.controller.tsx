// cards.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import HtmlView from '../../core/common/sub-components/html.view'
import ListController from './list.controller'

let CardController = class extends BaseController<{model}> {

    constructor(props) {
        super(props)
        this.baseBindingsToInstance(this)
    }

    componentDidMount() {

        let model = this.props.model

        this.setState({
            model,
        })
    }

    emitLocalComponent = (component,key,childprop = null) => {

        let {
            type,
            index,
            description, 
            properties,
            lookups,
            propComponents, 
            components, 
        } = component

        let props = this.updateProperties(properties, lookups, propComponents)

        props.key = key

        if (!childprop) childprop = []

        let children = [...childprop] // work with copy

        let componentType = null

        switch (type) {
            case 'card': {
                componentType = Card
                children = [ 
                    ...children, 
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
            default: {
                return <div key = {key}>Pending</div>
            }
        }

        let output = React.createElement(componentType, props, children)

        return output
    }

    emitComponent = (component, key) => {

        let { controller } = component

        if (controller == 'card') {
            return this.emitLocalComponent(component,key)
        }

        switch (controller) {

            default: {

                let { description } = component

                return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model || model.repo) return null

        let { components, index } = model

        if (!components) components = []

        let children = this.getChildren(components)

        return this.emitLocalComponent(model,index,children)

    }
}

export default CardController
