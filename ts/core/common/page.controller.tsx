// page.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import SectionController from './section.controller'

let PageController = class extends BaseController<any> {

    constructor(props) {
        super(props)
        this.baseBindingsToInstance(this)
    }

    componentDidMount() {
        let { match } = this.props
        let { path } = match
        let { master } = this
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)

        this.setStateModel(this, model)
    }

    emitComponent = (component,key) => {

        let { type } = component

        // let model = this.filterImportedBaseProps(component)
        let model = component

        switch (type) {
            case 'section': {

                return <SectionController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { index, description } = model

                return <div key = {'default' + key} >{`${type} (${index}:${description}) not found`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return <div></div>

        let children = this.getChildren(model.children)

        return (
            <div>

                { children }
                { /* TODO add section menu */ }

            </div>
        )
    }
}

export default PageController
