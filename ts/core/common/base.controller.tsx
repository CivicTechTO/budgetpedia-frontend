// controller.base.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: update all code to async requirements
    puzzle: route /, page home, and linklists x 3 are only data loaded on go back to page
*/

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
                model = this.updateModel(self,model)
                model.children = this.updateChildren(self,model.children)
                self.setState({
                    model,
                })
            })
        } else {
            model = this.updateModel(self,model)
            model.children = this.updateChildren(self,model.children)
            self.setState({
                model,
            })
        }
    }

    private updateChildren = (self,children) => {

        if (!children || children.length == 0) return children

        let output = children.map((child, key) => {

            return this.updateModel(self,child)

        })

        return output

    }

    updateModel = (self,model) => {
        if (model.updated) return model
        if (model.repo) {
            model = this.master.getDocument(model.repo,model.index)
        }
        let props = this.updateProperties(self,model)
        model.properties = props
        model.updated = true
        return model        
    }

    // TODO: implement import of propComponents
    private updateProperties = (self,model) => {
        let { properties, lookups, propComponents, propReferences } = model
        // let props = Object.assign({},properties) // work with copy
        if (!properties) properties = {}
        if (propReferences) {
            for (let key in propReferences) {
                properties[key] = self.props[propReferences[key]]
            }
            // properties.propReferences = null
        }
        if (lookups) {
            // console.log('lookups',lookups)
            for (let key in lookups) {
                let {repo, index} = lookups[key]
                properties[key] = this.master.getDocument(repo, index)
            } 
            // properties.lookups = null
        }
        return properties
    }

    getChildren = (self, children) => {

        if (!children || children.length == 0) return children

        let output = children.map((child, key) => {

            return self.emitComponent(child,key)

        })

        return output

    }

    wrapComponent = (component,wrapper,key) => {
        if (!wrapper) return component
        let testwrapper = wrapper
        let output = component
        while (testwrapper) {
            let { type, properties } = testwrapper
            properties.key = key
            output = React.createElement( type, properties, output )
            testwrapper = testwrapper.wrapper
        }
        return output
    }
}

export default BaseController
