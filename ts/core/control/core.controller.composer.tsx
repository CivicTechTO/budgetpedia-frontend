// core.controller.composer.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: update all code to async requirements
    puzzle: route /, page home, and linklists x 3 are only data loaded on go back to page
*/

'use strict'

import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import master from '../../gateway/master.model'

let setStateModel = (self, model, callback) => {

    if (master.isPromise(model)) {
        model.then((model) => {
            model = updateModel(self,model)
            model.children = updateChildren(self,model.children)
            self.setState({
                model,
            })
        })
    } else {
        model = updateModel(self,model)
        model.children = updateChildren(self,model.children)
        self.setState({
            model,
        },callback)
    }
}

let updateChildren = (self,children) => {

    if (!children || children.length == 0) return children

    let output = children.map((child, key) => {

        if (child.disabled) return null
        return updateModel(self,child)

    })

    let result = output.filter(item => (!!item)) // filter screened items

    return result

}

let updateModel = (self,model) => {
    if (model.updated) return model
    if (model.repo) {
        model = master.getDocument(model.repo,model.index)
    }
    let props = updateProperties(self,model)
    model.properties = props
    model.updated = true
    return model        
}

// TODO: implement import of propComponents
let updateProperties = (self,model) => {
    let { properties, lookups, propComponents, propReferences } = model
    // let props = Object.assign({},properties) // work with copy
    if (!properties) properties = {}
    if (propReferences) {
        for (let key in propReferences) {
            properties[key] = self.props[propReferences[key]]
        }
    }
    if (lookups) {
        // console.log('lookups',lookups)
        for (let key in lookups) {
            let {repo, index} = lookups[key]
            properties[key] = master.getDocument(repo, index)
        } 
    }
    return properties
}

let getChildren = (self, children) => {

    if (!children || children.length == 0) return children

    let output = children.map((child, key) => {

        return self.emitComponent(child,key)

    })

    return output

}

let wrapComponent = (component,wrapper,key) => {
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

let toolkit = {
    master,
    setStateModel,
    updateChildren,
    updateModel,
    updateProperties,
    getChildren,
    wrapComponent,
}

let coreControllerComposer = Controller => {

    let ConnectedController = connect(
        state =>(
            {state}
        ),
        {
            push,
        }
    )(Controller)

    class BaseController extends React.Component<any,any> {

        render() {
            return React.createElement(ConnectedController, {toolkit,...this.props})
        }    
    }

    return BaseController

}

export default coreControllerComposer

