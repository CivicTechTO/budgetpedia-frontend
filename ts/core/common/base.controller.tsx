// controller.base.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import master from '../../gateway/master.model'

import { ModelImportedBaseProps, ModelInheritedBaseProps } from './common.interfaces'

class BaseController<P>  extends React.Component<P, any> {

    constructor(props) {
        super(props)
        this.master = master
    }

    state = {
        model:null,
        waiting:false,
    }

    master = null

    filterImportedBaseProps = (props:ModelImportedBaseProps) => {
        let { 
            controller,
            repo, 
            index, 
            description, 
            properties, 
            components, 
        } = props

        // lose controller property
        let model:ModelInheritedBaseProps = {
            repo, 
            index, 
            description, 
            properties, 
            components, 
        }

        return model
    } 

    settleModelPromise = model => {
        this.setState({
            waiting:true,
        },
            model.then((model) => {
                this.setState({
                    waiting:false,
                    model,
                })
            })
        )
    }

    setRepoModel = (repo,index) => {
        let { master } = this
        let model = master.getDocument(repo,index)
        if (master.isPromise(model)) {
            if (!this.state.waiting) {
                this.settleModelPromise(model)
            }
        } else {
            setTimeout(() => {
                this.setState({
                    model,
                })
            })
        }
    }

    // return false if not model?
    assertModel = model => {
        if ( !model ) {
            return <div>loading...</div>
        }

        // test for repo and acquire data where required
        if (model.repo) {
            this.setRepoModel(model.repo,model.index)
            return <div>waiting...</div>
        }

        return null
    }

    emitComponent = (component, key) => {} // placeholder unused

    // bound to instances by instances
    getChildren = (components) => {

        let children = components.map((component:ModelImportedBaseProps, key) => {

            return this.emitComponent(component,key)

        })

        return children

    }
}

export default BaseController
