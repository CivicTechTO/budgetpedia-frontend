'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const master_model_1 = require("../../gateway/master.model");
class BaseController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
        };
        this.master = null;
        this.setStateModel = (self, model) => {
            if (this.master.isPromise(model)) {
                model.then((model) => {
                    model = this.updateModel(model);
                    self.setState({
                        model,
                    });
                });
            }
            else {
                model = this.updateModel(model);
                self.setState({
                    model,
                });
            }
        };
        this.updateProperties = (properties, lookups, propComponents) => {
            let props = Object.assign({}, properties);
            if (lookups) {
                for (let key in lookups) {
                    let { repo, index } = lookups[key];
                    props[key] = this.master.getDocument(repo, index);
                }
            }
            return props;
        };
        this.updateModel = (model) => {
            if (model.repo) {
                model = this.master.getDocument(model.repo, model.index);
            }
            let { properties, lookups, propComponents } = model;
            let props = this.updateProperties(properties, lookups, propComponents);
            model.properties = props;
            return model;
        };
        this.getChildren = (self, children) => {
            if (!children || children.length == 0)
                return children;
            let output = children.map((child, key) => {
                return self.emitComponent(child, key);
            });
            return output;
        };
        this.master = master_model_1.default;
    }
}
exports.default = BaseController;
