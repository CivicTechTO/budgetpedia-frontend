// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Chip from 'material-ui/Chip'

import coreControllerComposer from './core.controller.composer'

import SectionController from './section.controller'

import PageView from './views/page.view'

import PageMenuController from './pagemenu.controller'

class PageControllerClass extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.toolkit = props.toolkit
    }

    state = {
        model:null
    }

    toolkit = null

    componentDidMount() {
        let { match :{ path } } = this.props
        let { master } = this.toolkit
        let index = master.getPageIndex(path)
        let model = master.getPageModel(index)

        this.toolkit.setStateModel(this, model)
    }

    emitLocalComponent = (component,key) => {

        let {
            controller,
            index,
            type,
            properties,
            children, 
        } = component

        let childcomponents = this.toolkit.getChildren(this,children)

        console.log('children, childcompoonents',children, childcomponents)

        let componentType = null

        switch (type) {
            case 'page': {
                let chips = children.map((child, index) => {
                    if (child.tag) {
                        return <Chip key = {index} style = {{margin:'4px'}}>{child.tag}</Chip>
                    }
                })
                console.log('chips pre filter',chips)
                chips = chips.filter((chip) => {
                    return !!chip
                })
                console.log('chips post filter',chips)
                childcomponents = [<PageMenuController>{chips}</PageMenuController>,...childcomponents,<div style = {{height:'30px'}}></div>]
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

let PageController = coreControllerComposer(PageControllerClass) 

export default PageController
