'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const master_model_1 = require("../../gateway/master.model");
let setStateModel = (self, model, callback) => {
    if (master_model_1.default.isPromise(model)) {
        model.then((model) => {
            model = updateModel(self, model);
            model.children = updateChildren(self, model.children);
            self.setState({
                model,
            });
        });
    }
    else {
        model = updateModel(self, model);
        model.children = updateChildren(self, model.children);
        self.setState({
            model,
        }, callback);
    }
};
let updateChildren = (self, children) => {
    if (!children || children.length == 0)
        return children;
    let output = children.map((child, key) => {
        if (child.disabled)
            return null;
        return updateModel(self, child);
    });
    let result = output.filter(item => (!!item));
    return result;
};
let updateModel = (self, model) => {
    if (model.updated)
        return model;
    if (model.repo) {
        model = master_model_1.default.getDocument(model.repo, model.index);
    }
    let props = updateProperties(self, model);
    model.properties = props;
    model.updated = true;
    return model;
};
let updateProperties = (self, model) => {
    let { properties, lookups, propComponents, propReferences } = model;
    if (!properties)
        properties = {};
    if (propReferences) {
        for (let key in propReferences) {
            properties[key] = self.props[propReferences[key]];
        }
    }
    if (lookups) {
        for (let key in lookups) {
            let { repo, index } = lookups[key];
            properties[key] = master_model_1.default.getDocument(repo, index);
        }
    }
    return properties;
};
let getChildren = (self, children) => {
    if (!children || children.length == 0)
        return children;
    let output = children.map((child, key) => {
        return self.emitComponent(child, key);
    });
    return output;
};
let wrapComponent = (component, wrapper, key) => {
    if (!wrapper)
        return component;
    let testwrapper = wrapper;
    let output = component;
    while (testwrapper) {
        let { type, properties } = testwrapper;
        properties.key = key;
        output = React.createElement(type, properties, output);
        testwrapper = testwrapper.wrapper;
    }
    return output;
};
let toolkit = {
    master: master_model_1.default,
    setStateModel,
    updateChildren,
    updateModel,
    updateProperties,
    getChildren,
    wrapComponent,
};
let coreControllerComposer = Controller => {
    let ConnectedController = react_redux_1.connect(state => ({ state }), {
        push: react_router_redux_1.push,
    })(Controller);
    class BaseController extends React.Component {
        render() {
            return React.createElement(ConnectedController, Object.assign({ toolkit }, this.props));
        }
    }
    return BaseController;
};
exports.default = coreControllerComposer;
