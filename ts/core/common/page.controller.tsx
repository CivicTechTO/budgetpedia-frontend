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
        let { pages, routes, repos, styles } = master
        let key = routes[path]

        this.repos = repos
        this.styles = styles

        this.setState({
            model:pages[key],
        })
    }

    render() {

        let { model } = this.state

        if (!model) {
            return <div>loading...</div>
        }

        let { type, index, description, fields, components, composition } = model

        let sections = components.map((component, key) => {

            let { type, index, description, fields, components, composition } = model

            // TODO use page fields to populate browser fields - title and description

            switch (component.type) {
                case 'section': {


                    return <Section
                        key = { key }
                        index = { index /* repo index of the item */ }
                        description = { description }
                        fields = { fields }
                        model = { components }
                        composition = { composition }
                    />

                }
                default: {

                    return <div>{ component.type + ' not found'}</div>

                }
            }
        })

        return (
            <div>
                { sections }
            </div>
        )
    }

}

export default Page