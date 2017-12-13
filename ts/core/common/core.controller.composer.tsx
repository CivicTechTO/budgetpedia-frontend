// core.controller.composer.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: update all code to async requirements
    puzzle: route /, page home, and linklists x 3 are only data loaded on go back to page

    TODO: resolve issue of making redux state values available to propReferences in the right context
    - research copmosition
    - create a higher order component that passes redux state
*/

'use strict'

import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

let hoistNonReactStatics = require('hoist-non-react-statics')

import master from '../../gateway/master.model'

let setStateModel = (self, model) => {

    if (master.isPromise(model)) {
        model.then((model) => {
            model = this.updateModel(self,model)
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
        })
    }
}

let updateChildren = (self,children) => {

    if (!children || children.length == 0) return children

    let output = children.map((child, key) => {

        return updateModel(self,child)

    })

    return output

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
        // properties.propReferences = null
    }
    if (lookups) {
        // console.log('lookups',lookups)
        for (let key in lookups) {
            let {repo, index} = lookups[key]
            properties[key] = master.getDocument(repo, index)
        } 
        // properties.lookups = null
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

let coreController = (Controller) => {

    let ConnectedController = connect(
        state =>(
            {state}
        ),
        {
            push,
        }
    )(Controller)

    let BaseController = class extends React.Component<any,any> {

        toolkit = {
            master,
            setStateModel,
            updateChildren,
            updateModel,
            updateProperties,
            getChildren,
            wrapComponent,
        }

        render() {
            // return React.createElement(ConnectedController,{toolkit,...this.props})
            return <ConnectedController toolkit = {this.toolkit} {...this.props} />
        }    
    }

    hoistNonReactStatics(BaseController,ConnectedController)

    return BaseController

}

export default coreController

