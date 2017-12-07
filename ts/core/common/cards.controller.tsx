// cards.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import BaseController from './base.controller'

interface Props {
    model: {
        index?:string,
        repo?:string,
        description:string, 
        fields: object, 
        components: {
            controller:string,
            repo:string,
            index?:string,
            type?:string,
            description?:string,
            fields?:object,
            components?:Array<any>,
            composition?:Array<any>,
        }[],
        composition: object[],
    }
}

let Cards = class extends BaseController<Props> {

    state = {
        model:null,
        waiting:false,
    }

    componentDidMount() {

        console.log('card props',this.props)

        let { model } = this.props

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
            composition,
        } = model

        console.log('card model',model)

        components = components?components:[]

        let children = components.map((component, key) => {

            let { 
                controller,
                repo, 
                index, 
                type,
                description, 
                fields, 
                components, 
                composition, 
            } = component

            let model = {
                repo, 
                index, 
                type,
                description, 
                fields, 
                components, 
                composition, 
            }
        })
        return <div>cards</div>
    }
}

export default Cards
