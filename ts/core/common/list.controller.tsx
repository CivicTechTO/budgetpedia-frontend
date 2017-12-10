// list.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import BaseController from './base.controller'

import LinkListView from './sub-components/linklist.view'
import NuggetListView from './sub-components/nuggetlist.view'

let ListController = class extends BaseController<{model}> {

    constructor(props) {
        super(props)
        this.baseBindingsToInstance(this)
    }

    componentDidMount() {

        let { model } = this.props

        if (this.master.isPromise(model)) {
            model.then((model) => {
                model = this.updateModel(model)
                this.setState({
                    model,
                })
            })
        } else {
            model = this.updateModel(model)
            this.setState({
                model,
            })
        }
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

        let childcomponents = this.getChildren(children)

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

        let model = this.filterImportedBaseProps(component)

        switch (controller) {

            default: {

                let { description } = component

                return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return null

        let { index } = model

        return this.emitLocalComponent(model,index)

    }
}

export default ListController
