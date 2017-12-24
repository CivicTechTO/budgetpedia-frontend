// list.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import coreControllerComposer from './core.controller.composer'

import LinkListView from './views/linklist.view'
import NuggetListView from './views/nuggetlist.view'
import TileListView from './views/tilelist.view'

class ListControllerClass extends React.Component<any,any> {

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

        let childcomponents = this.toolkit.getChildren(this,children)

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

        properties.key = key

        let output = React.createElement(componentType, properties, childcomponents)

        output = this.toolkit.wrapComponent(output,wrapper,key)

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

let ListController = coreControllerComposer(ListControllerClass) 

export default ListController
