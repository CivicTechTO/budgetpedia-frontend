// section.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import coreControllerComposer from './core.controller.composer'

import NarrationBubbleView from './views/narrationbubble.view'
import FollowupBubbleView from './views/followupbubble.view'

// legal components
import CardController from './card.controller'
import ListController from './list.controller'
import PaperController from './paper.controller'
import MediaController from './media.controller'
import CustomController from './custom.controller'
import PageController from './page.controller'
import ToCView from './views/toc.view'

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
            case 'toc': {
                if (this.props.notToc) return null //<div key = {index}></div>

                return <ToCView key = {index} tocdata = { this.props.getToC() } />
            }
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

    assembleCommentary = commentary => {
        let comments = {}

        for (let index in commentary) {
            let spec = index.split(':')
            let controller = spec[0]
            let narrative_index = spec[1]
            if (!comments[controller]) {
                comments[controller] = {}
            }
            comments[controller][narrative_index] = commentary[index]
        }

        return comments
    }

    narratives = null
    followups = null

    emitComponent = (model,key) => {

        let { controller, index, narrative, followup } = model
        let controllerclass = null

        switch (controller) {
            case 'section': {

                let narratives = {}
                if (narrative) {
                    narratives = this.assembleCommentary(narrative)
                }
                this.narratives = narratives

                let followups = {}
                if (followup) {
                    followups = this.assembleCommentary(followup)
                }
                this.followups = followups

                let output = this.emitLocalComponent(model,key)

                return output

            }
            case 'card': {

                controllerclass =  <CardController
                    key = { key }
                    model = { model }
                />

                break

            }
            case 'list': {

                controllerclass = <ListController
                    key = { key }
                    model = { model }
                />

                break

            }
            case 'media': {

                controllerclass = <MediaController
                    key = { key }
                    model = { model }
                />

                break

            }
            case 'paper': {

                controllerclass = <PaperController
                    key = { key }
                    model = { model }
                />

                break

            }
            case 'custom': {

                controllerclass =  <CustomController
                    key = { key }
                    model = { model }
                />

                break

            }
            default: {

                let { description, index } = model

                return <div key = {'default' + key} >{`${controller} (${index}:${description}) not found in Section controller`}</div>
            }
        }

        let output = null
        let narratives = this.narratives
        let followups = this.followups

        let isNarratives = narratives && narratives[controller] && narratives[controller][index]
        let isFollowups = followups && followups[controller] && followups[controller][index]

        if (isNarratives || isFollowups) {
            output = <div key = {key}>
                {isNarratives?<NarrationBubbleView markup = {narratives[controller][index]} />:null}
                {controllerclass}
                {isFollowups?<FollowupBubbleView markup = {followups[controller][index]} />:null}
            </div>
        } else {
            output = controllerclass
        }

        return output
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
