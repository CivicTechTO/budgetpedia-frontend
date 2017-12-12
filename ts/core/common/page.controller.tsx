// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import BaseController from './base.controller'

import SectionController from './section.controller'

import PageView from './sub-components/page.view'

let PageController = class extends BaseController<any> {

    componentDidMount() {
        let { match :{ path } } = this.props
        let { master } = this
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)

        this.setStateModel(this, model)
    }

    emitLocalComponent = (component,key) => {

        let {
            controller,
            index,
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'page': {
                componentType = PageView
                break
            }

            default: {
                return <div key = { key }>Illegal component type { type } of { controller } controller</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output

    }

    emitComponent = (model,key) => {

        let { controller, description } = model

        switch (controller) {
            case 'page': {
                return this.emitLocalComponent(model,key)
            }
            case 'section': {

                return <SectionController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { index, description } = model

                return <div key = {'default' + key} >{`illegal controller ${controller} (${index}:${description}) of PageController`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return <PageView />

        let component = this.emitComponent(model,model.index)

        return component

    }
}

PageController = connect ( null,
    {
        push,
    } 
) ( PageController )

export default PageController
