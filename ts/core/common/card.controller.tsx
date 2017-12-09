// cards.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import HtmlView from '../../core/common/sub-components/html.view'

import { ModelImportedCardProps, ModelInheritedCardProps, ModelInheritedBaseProps, ModelFinalBaseProps } from './common.interfaces'

let CardController = class extends BaseController<{model:ModelInheritedBaseProps}> {

    constructor(props) {
        super(props)
        this.assertModel.bind(this)
        this.setRepoModel.bind(this)
        this.componentDidUpdate.bind(this)
        this.getChildren.bind(this)
    }

    componentDidMount() {

        console.log('cards controller props',this.props)

        let model:ModelInheritedBaseProps = this.props.model

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
            components, 
        } = component

        if (!childprop) childprop = []

        let children = [...childprop]

        console.log('local component',component)

        if (lookups) {
            for (let key in lookups) {
                let {repo, index} = lookups[key]
                properties[key] = this.master.getDocument(repo, index)
            } 
        }

        let props = Object.assign({},properties)
        props.key = key

        let componentType = null

        switch (type) {
            case 'card': {
                componentType = Card
                children = [ ...children, 
                <div key = 'closer' style = {{clear:"both"}}></div>]
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

        let result = React.createElement(componentType, props, children)

        return result
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

        console.log('cardscontroller model',model)

        if (!components) components = []

        let children = this.getChildren(components)

        return this.emitLocalComponent(model,index,children)

    }
}

export default CardController
