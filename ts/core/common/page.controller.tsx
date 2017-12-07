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

    repos:object = null

    styles:object = null

    componentDidMount() {
        let { match } = this.props
        let { path } = match
        let { pages, routes, repos, styles } = master // static
        let key = routes[path]

        this.repos = repos
        this.styles = styles

        this.setState({
            model:pages[key],
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
                description:string,
                fields:object,
                components:object[],
                composition:object[]
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
