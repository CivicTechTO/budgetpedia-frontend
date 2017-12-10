// controller.base.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

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
    }

    master = null

    setStateModel = (self, model) => {

        if (this.master.isPromise(model)) {
            model.then((model) => {
                model = this.updateModel(model)
                self.setState({
                    model,
                })
            })
        } else {
            model = this.updateModel(model)
            self.setState({
                model,
            })
        }
    }

    private updateModel = (model) => {
        if (model.repo) {
            model = this.master.getDocument(model.repo,model.index)
        }
        let { properties, lookups, propComponents } = model
        let props = this.updateProperties(properties, lookups, propComponents)
        model.properties = props
        return model        
    }

    // TODO: implement import of propComponents
    private updateProperties = (properties, lookups, propComponents) => {
        let props = Object.assign({},properties) // work with copy
        if (lookups) {
            for (let key in lookups) {
                let {repo, index} = lookups[key]
                props[key] = this.master.getDocument(repo, index)
            } 
        }
        return props
    }

    getChildren = (self, children) => {

        if (!children || children.length == 0) return children

        let output = children.map((child, key) => {

            return self.emitComponent(child,key)

        })

        return output

    }
}

export default BaseController
