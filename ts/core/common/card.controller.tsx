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

    emitLocalComponent = (component,key,children = null) => {

        let {
            type,
            index,
            description, 
            properties,
            lookups, 
            components, 
        } = component

        console.log('local component',component)

        let result = <div key = {key}>Hello</div>

        if (lookups) {
            for (let key in lookups) {
                let {repo, index} = lookups[key]
                properties[key] = this.master.getDocument(repo, index)
            } 
        }

        switch (type) {
            case 'card': {
                return <Card key = {key} style = {properties.style}>
                    { children }
                    <div style = {{clear:"both"}}></div>                    
                </Card>
            }
            case 'htmlview': {
                return <HtmlView key = {key} html = {properties.html} />
            }
            case 'cardtitle': {
                let { title, subtitle, style, titleStyle } = properties
                return <CardTitle 
                    key = {key}
                    title = {title} 
                    subtitle = {subtitle}
                    style = {style}
                    titleStyle = { titleStyle }
                />
            }
        }

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
