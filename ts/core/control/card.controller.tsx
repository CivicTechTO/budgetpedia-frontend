// cards.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import coreControllerComposer from './core.controller.composer'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import HtmlView from './views/html.view'
import ListController from './list.controller'

class CardControllerClass extends React.Component<any,any> {

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
            case 'card': {
                componentType = Card
                childcomponents = [ 
                    ...childcomponents, 
                    <div key = 'clear' style = {{clear:"both"}}></div>,
                 ]
                break
            }
            case 'htmlview': {
                // console.log('htmlview',component,childcomponents)
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

        output = this.toolkit.wrapComponent(output,wrapper,key)

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

        let component = this.emitComponent( model, model.index )

        return component

    }
}

let CardController = coreControllerComposer(CardControllerClass) 

export default CardController
