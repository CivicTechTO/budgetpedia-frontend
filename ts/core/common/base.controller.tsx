// controller.base.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import master from '../../gateway/master.model'

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

    baseBindingsToInstance = (instance) => {
        this.settleModelPromise.bind(instance)
        this.assertModel.bind(instance)
        this.setRepoModel.bind(instance)
        this.componentDidUpdate.bind(instance)
        this.getChildren.bind(instance)        
    }

    componentDidUpdate() {
        this.assertModel(this.state.model)
    }

    // TODO: implement import of propComponents
    updateProperties = (properties, lookups, propComponents) => {
        let props = Object.assign({},properties) // work with copy
        if (lookups) {
            for (let key in lookups) {
                let {repo, index} = lookups[key]
                props[key] = this.master.getDocument(repo, index)
            } 
        }
        return props
    }

    filterImportedBaseProps = (component) => {
        let { 
            controller,
            repo, 
            index, 
            description, 
            type,
            properties, 
            children, 
        } = component

        // lose controller property
        let model = {
            repo, 
            index, 
            description, 
            type,
            properties, 
            children, 
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
            console.log('model is a promise', model)
            if (!this.state.waiting) {
                this.settleModelPromise(model)
            }
        } else {
            this.setState({
                model,
            })
        }
    }

    // return false if not model
    assertModel = model => {
        if ( !model ) {
            return false
        }

        // test for repo and acquire data where required
        if (model.repo) {
            this.setRepoModel(model.repo,model.index)
            return false
        }

        return true
    }

    // placeholder for compiler; unused
    emitComponent = (component, key) => {}

    // bound to instances by instances
    getChildren = (children) => {

        let output = children.map((child, key) => {

            return this.emitComponent(child,key)

        })

        return output

    }
}

export default BaseController
