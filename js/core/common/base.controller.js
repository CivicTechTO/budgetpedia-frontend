'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const master_model_1 = require("../../gateway/master.model");
let BaseController = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
        };
        this.master = null;
        this.setStateModel = (self, model) => {
            if (this.master.isPromise(model)) {
                model.then((model) => {
                    model = this.updateModel(self, model);
                    model.children = this.updateChildren(self, model.children);
                    self.setState({
                        model,
                    });
                });
            }
            else {
                model = this.updateModel(self, model);
                model.children = this.updateChildren(self, model.children);
                self.setState({
                    model,
                });
            }
        };
        this.updateChildren = (self, children) => {
            if (!children || children.length == 0)
                return children;
            let output = children.map((child, key) => {
                return this.updateModel(self, child);
            });
            return output;
        };
        this.updateModel = (self, model) => {
            if (model.updated)
                return model;
            if (model.repo) {
                model = this.master.getDocument(model.repo, model.index);
            }
            let props = this.updateProperties(self, model);
            model.properties = props;
            model.updated = true;
            return model;
        };
        this.updateProperties = (self, model) => {
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
                    properties[key] = this.master.getDocument(repo, index);
                }
            }
            return properties;
        };
        this.getChildren = (self, children) => {
            if (!children || children.length == 0)
                return children;
            let output = children.map((child, key) => {
                return self.emitComponent(child, key);
            });
            return output;
        };
        this.wrapComponent = (component, wrapper, key) => {
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
        this.master = master_model_1.default;
    }
};
exports.default = BaseController;
