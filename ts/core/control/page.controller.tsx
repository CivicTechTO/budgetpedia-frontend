// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Chip from 'material-ui/Chip'

import { Link } from 'react-router-dom'

let moment = require('moment')

var scrollToElement = require('scroll-to-element')

import coreControllerComposer from './core.controller.composer'
import SectionController from './section.controller'
import PageView from './views/page.view'
import PageMenuView from './views/pagemenu.view'
import AttributionView from './views/attribution.view'
import ToCView from './views/toc.view'

class PageControllerClass extends React.Component<any,any> {

    constructor(props) {
        super(props)
        this.toolkit = props.toolkit
    }

    state = {
        model:null,
        tocdata:null,
    }

    toolkit = null
    noToc = null

    hashlink = window.location.hash.substr(1)

    anchorCallback = () => {
        let self = this
        if (self.noToc) return
        let tocdata = []
        setTimeout(()=>{
            let anchors = document.querySelectorAll('a.hash-anchor')
            anchors.forEach(element => {
                let item = {
                    tag:element.getAttribute('data-level'),
                    slug:element.getAttribute('id'),
                    text:element.getAttribute('data-text'),
                }
                tocdata.push(item)
            })
            self.setState({
                tocdata,
            })
        })
    }

    async componentDidMount() {

        // console.log('page did mount props',this.props)

        try {

            let { match :{ path } } = this.props
            let { master } = this.toolkit
            let index = await master.getPageIndex(path)
            let model = master.getPageModel(index)

            this.noToc = model.noToc

            this.toolkit.setStateModel(this, model, this.anchorCallback)

            // setTimeout(() => {
            //     console.log('model',this.state.model)
            // })

            // console.log('window.location',window.location)
            if (this.hashlink) {
                let id = this.hashlink
                this.hashlink = ''
                setTimeout(() => {
                  const element = document.getElementById(id)
                  // console.log('element',element)
                  if (element) element.scrollIntoView()
                }, 500);
            }
        } catch (e) {
            console.log('error getting model',e)
        }
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

                let attributionview = <AttributionView key = "attribution" attribution = {attribution} />

                if (chips.length || attributionview) {
                    let chipsheader = null
                    let chipsfooter = null
                    if (chips.length) {
                        chipsheader = 
                            <PageMenuView key = "menu">
                                {chips}
                            </PageMenuView>
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
                return <div key = { key } >Illegal component type { type } of { controller } controller</div>
            }
        }

        let output = React.createElement(componentType, properties, childcomponents)

        return output

    }

    getToC = () => {
        return this.state.tocdata
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
                    noToc = { !!this.noToc }
                    getToC = { this.getToC }
                    isToC = { !!this.state.tocdata }
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
