// list.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import BaseController from './base.controller'

import LinkListView from './sub-components/linklist.view'
import NuggetListView from './sub-components/nuggetlist.view'

let ListController = class extends BaseController<{model}> {

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

        let childcomponents = this.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'linklist': {
                componentType = LinkListView
                break
            }
            case 'nuggetlist': {
                componentType = NuggetListView
                break
            }
            default: {
                return <div key = {key}>Pending</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output
    }

    emitComponent = (component, key) => {

        let { controller } = component

        if (controller == 'list') {
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

        if (!model) return <div></div>

        let { index } = model

        let component = this.emitLocalComponent(model,index)

        return component

    }
}

export default ListController
