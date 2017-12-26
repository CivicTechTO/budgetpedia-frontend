// section.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import coreControllerComposer from './core.controller.composer'

import NarrationBubbleView from './views/narrationbubble.view'

// legal components
import ListController from './list.controller'
import CardController from './card.controller'
import SheetController from './sheet.controller'
import MediaController from './media.controller'
import CustomController from './custom.controller'

import SectionView from './views/section.view'

class SectionControllerClass extends React.Component<any,any> {

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
            anchor,
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.toolkit.getChildren(this,children)

        let componentType = null

        switch (type) {
            case 'section': {
                properties.id = anchor
                componentType = SectionView
                break
            }

            default: {
                return <div key = {key}>Component type { type } not found in { controller } controller</div>
            }
        }

        properties.key = key

        let output = React.createElement(componentType, properties, childcomponents)

        return output

    }

    assembleNarratives = narrative => {
        let narratives = {}

        for (let index in narrative) {
            let spec = index.split(':')
            let controller = spec[0]
            let narrative_index = spec[1]
            if (!narratives[controller]) {
                narratives[controller] = {}
            }
            narratives[controller][narrative_index] = narrative[index]
        }

        return narratives
    }

    narratives = null

    emitComponent = (model,key) => {

        let { controller, index, narrative } = model

        switch (controller) {
            case 'section': {
                let narratives = null
                if (narrative) {
                    narratives = this.assembleNarratives(narrative)
                } else {
                    narratives = {}
                }
                this.narratives = narratives

                return this.emitLocalComponent(model,key)
            }
            case 'card': {

                return <CardController
                    key = { key }
                    model = { model }
                />

            }
            case 'list': {

                let narratives = this.narratives
                let listcontroller = <ListController
                    key = { key }
                    model = { model }
                />
                let output = null

                if (narratives[controller] && narratives[controller][index]) {
                    output = <div key = {key}>
                        {<NarrationBubbleView markup = {narratives[controller][index]} />}
                        {listcontroller}
                    </div>
                } else {
                    output = listcontroller
                }

                return output

            }
            case 'sheet': {

                return <SheetController
                    key = { key }
                    model = { model }
                />

            }
            case 'media': {

                return <MediaController
                    key = { key }
                    model = { model }
                />

            }
            case 'custom': {

                return <CustomController
                    key = { key }
                    model = { model }
                />

            }
            default: {

                let { description, index } = model

                return <div key = {'default' + key} >{`${controller} (${index}:${description}) not found in Section controller`}</div>

            }
        }
    }

    render() {

        let { model } = this.state

        if (!model) return <SectionView />

        let component = this.emitComponent(model,model.index)

        return component
    }

}

let SectionController = coreControllerComposer(SectionControllerClass) 

export default SectionController
