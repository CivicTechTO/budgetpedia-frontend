// list.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import BaseController from './base.controller'

import LinkListView from './sub-components/linklist.view'
import NuggetListView from './sub-components/nuggetlist.view'
import TileListView from './sub-components/tilelist.view'

let ListController = class extends BaseController<{model}> {

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
            case 'tilelist': {
                componentType = TileListView
                break
            }
            default: {
                return <div key = {key}>Component type { type } not found in { controller } controller</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output
    }

    emitComponent = (model, key) => {

        let { controller } = model

        switch (controller) {

            case 'list': {

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

export default ListController
