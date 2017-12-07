// page.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import Section from './section.controller'

let Page = class extends BaseController<any> {

    state = {
        model:null,
        waiting:false,
    }

    componentDidMount() {
        let { match } = this.props
        let { path } = match
        let { master } = this
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)
        if (master.isPromise(model)) {
            this.settleModelPromise(model)
        } else {
            this.setState({
                model,
            })
        }
    }

    render() {

        let { model } = this.state

        let response = this.assertModel(model)
        if (response) return response

        let { 
            controller, 
            index, 
            repo, 
            description, 
            fields, 
            components, 
            composition 
        } = model

        // TODO use page fields to populate browser fields - title and description

        let sections = components.map((component, key) => {

            let { 
                controller,
                repo, 
                index, 
                description, 
                fields, 
                components, 
                composition, 
            }:
            {
                controller:string,
                repo:string,
                index:string,
                description?:string,
                fields?:object,
                components?:Array<any>,
                composition?:Array<any>,
            } = component

            // TODO test for repo and acquire data where required

            switch (controller) {
                case 'section': {

                    return <Section
                        key = { key }
                        description = { description }
                        fields = { fields }
                        components = { components }
                        composition = { composition }
                    />

                }
                default: {

                    return <div key = {'default' + key} >{`${controller} (${index}:${description}) not found`}</div>

                }
            }
        }) // components map

        return (
            <div>

                { sections }

            </div>
        )
    }
}

export default Page
