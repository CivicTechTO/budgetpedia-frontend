// page.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Section from './section.controller'

import master from '../../gateway/master.model'

let Page = class extends React.Component<any, any> {

    state = {
        model:null,
    }

    componentDidMount() {
        let { match } = this.props
        let { path } = match
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)
        this.setState({
            model,
        })
    }

    render() {

        let { model } = this.state

        if ( !model ) {
            return <div>loading...</div>
        }

        let { 
            controller, 
            index, 
            repo, 
            description, 
            fields, 
            components, 
            composition 
        } = model

        // TODO test for repo and acquire data where required
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

                    return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

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
