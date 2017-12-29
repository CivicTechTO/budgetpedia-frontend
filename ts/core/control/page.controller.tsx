// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: add handling and animation for anchors -- in-page and url anchors, around titles
*/

'use strict'

import * as React from 'react';

import Chip from 'material-ui/Chip'

import { Link } from 'react-router-dom'

let moment = require('moment')

var scrollToElement = require('scroll-to-element')

import coreControllerComposer from './core.controller.composer'
import SectionController from './section.controller'
import PageView from './views/page.view'
import PageMenuController from './views/pagemenu.view'

let Attributions = ({name, link}) => {
    
    let content = null
    if (link) {
        if (link.substr(0,1) == '/') {
            content = <Link to = {link}>{name}</Link>
        } else {
            content = <a href = {link} target = '_blank'>{name}</a> 
        }
    } else {
        content = <span>{name}</span>
    }

    return <div style = {{display:'inline-block'}}>
        {content}.&nbsp;
    </div>
}

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

    onClickChip = index => {
        scrollToElement('#'+index,{offset:-64}) // space for global toolbar
    }

    assembleChips = children => {
        let chips = children.map((child, index) => {
            if (child.tag) {
                return (
                <Chip 
                    key = {index} 
                    onClick = {(
                        () => this.onClickChip(child.anchor)
                    )}
                    style = {{ margin:'4px' }}
                >
                    {child.tag}
                </Chip>)
            } else {
                return null
            }
        })
        chips = chips.filter((chip) => {
            return !!chip
        })
        return chips       
    }

    getAttributionView = attribution => {

        let { custodian, authority, creator, updater, contact, dates } = attribution
        if (!( custodian || authority || creator || updater || contact || dates )) return null
        return (
            <div 
                key="attribution"
                style = {
                    {
                        padding:'8px',
                        margin:'8px',
                        borderRadius:'8px',
                        border: '3px solid silver',
                        backgroundColor: 'gainsboro',
                        fontSize:'smaller',
                    }
                }
            >
                <span>For this page: </span>
                {
                    contact?[
                        <span key = "prompt">Please forward comments, questions, or corrections to </span>,
                        <Attributions key = "attr" name = {contact.name} link = {contact.link} />
                    ]
                    :null
                }
                {
                    custodian?[
                        <span key = "prompt">Custodian: </span>,
                        <Attributions key = "attr" name = {custodian.name} link = {custodian.link} />
                    ]
                    :null
                }
                {
                    authority?[
                        <span key = "prompt">Authority: </span>,
                        <Attributions key = "attr" name = {authority.name} link = {authority.link} />
                    ]
                    :null
                }
                {
                    creator?[
                        <span key = "prompt">Authority: </span>,
                        <Attributions key = "attr" name = {creator.name} link = {creator.link} />
                    ]
                    :null
                }
                {
                    updater?[
                        <span key = "prompt">Last updated by: </span>,
                        <Attributions key = "attr" name = {updater.name} link = {updater.link} />
                    ]
                    :null
                }
                {
                    dates?[
                        (dates.created?<span key = "prompt1">Created: {moment(dates.created,'DD-MM-YYYY').format('LL')}. </span>:null),
                        (dates.updated?<span key = "prompt2">Updated: {moment(dates.updated,'DD-MM-YYYY').format('LL')}. </span>:null),
                    ]
                    :null
                }
            </div>
        )

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

        let componentType = null

        switch (type) {
            case 'page': {

                let chips = this.assembleChips(children)

                let { attribution } = component

                let attributionview = this.getAttributionView(attribution)

                if (chips.length || attributionview) {
                    let chipsheader = null
                    let chipsfooter = null
                    if (chips.length) {
                        chipsheader = 
                            <PageMenuController key = "menu">
                                {chips}
                            </PageMenuController>
                        chipsfooter = <div key = "filler" style = {{height:'38px'}}></div>
                    }
                    childcomponents = [
                        chipsheader,
                        ...childcomponents,
                        attributionview,
                        chipsfooter,
                    ]
                }
                
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
