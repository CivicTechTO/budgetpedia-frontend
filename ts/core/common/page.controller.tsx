// page.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import SectionController from './section.controller'

import { ModelImportedBaseProps, ModelInheritedBaseProps } from './common.interfaces'

let PageController = class extends BaseController<any> {

    componentDidMount() {
        let { match } = this.props
        let { path } = match
        let { master } = this
        let index = master.getPageIndex(path)
        let model:ModelImportedBaseProps = master.getPageModel(index)
        if (master.isPromise(model)) {
            this.settleModelPromise(model)
        } else {
            this.setState({
                model,
            })
        }
    }

    emitComponent = (component,key) => {

        let { controller } = component

        let model = this.filterImportedBaseProps(component)

        switch (controller) {
            case 'section': {

                return <SectionController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { index, description } = model

                return <div key = {'default' + key} >{`${controller} (${index}:${description}) not found`}</div>

            }
        }
    }

    render() {

        let { model }:{ model:ModelInheritedBaseProps } = this.state

        let response = this.assertModel(model)
        if (response) return response

        let { components } = model

        // TODO use page properties to populate browser properties - title and description

        let sections = components.map((component:ModelImportedBaseProps, key) => {

            return this.emitComponent(component, key)

        })

        return (
            <div>

                { sections }
                { /* add section menu */ }

            </div>
        )
    }
}

export default PageController
