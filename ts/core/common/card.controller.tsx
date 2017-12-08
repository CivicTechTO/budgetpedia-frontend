// cards.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

import { ModelImportedCardProps, ModelInheritedCardProps, ModelInheritedBaseProps, ModelFinalBaseProps } from './common.interfaces'

let CardController = class extends BaseController<{model:ModelInheritedBaseProps}> {

    state = {
        model:null,
        waiting:false,
    }

    componentDidMount() {

        console.log('cards controller props',this.props)

        let model:ModelInheritedBaseProps = this.props.model

        this.setState({
            model,
        })
    }

    render() {

        let { model } = this.state

        let response = this.assertModel(model)
        if (response) return response

        let {
            index,
            description, 
            fields, 
            components, 
        } = model

        // TODO implement fields display

        console.log('cardscontroller model',model)

        if (!components) components = []

        let children = components.map((component,key) => { //:ModelImportedCardProps, key) => {

            let { controller } = component

            // let { 
            //     controller,
            //     repo, 
            //     index, 
            //     type,
            //     description, 
            //     fields, 
            //     components, 
            // } = component

            // let model = {//:ModelInheritedCardProps = {
            //     repo, 
            //     index, 
            //     type,
            //     description, 
            //     fields, 
            //     components, 
            // }

            switch (controller) {

                case 'card': {

                    return <div>A Card</div>

                }

                default: {

                    return <div key = {'default' + key} >{`${controller} (${description}) not found`}</div>

                }
            }
        })
        return <div>card</div>
    }
}

export default CardController
