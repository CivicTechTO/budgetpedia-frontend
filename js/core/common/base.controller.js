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
                    model = this.updateModel(self, model);
                    self.setState({
                        model,
                    });
                });
            }
            else {
                model = this.updateModel(self, model);
                self.setState({
                    model,
                });
            }
        };
        this.updateModel = (self, model) => {
            if (model.repo) {
                model = this.master.getDocument(model.repo, model.index);
            }
            let props = this.updateProperties(self, model);
            model.properties = props;
            return model;
        };
        this.updateProperties = (self, model) => {
            let { properties, lookups, propComponents, propReferences } = model;
            let props = Object.assign({}, properties);
            if (propReferences) {
                for (let key in propReferences) {
                    props[key] = self.props[propReferences[key]];
                }
            }
            if (lookups) {
                for (let key in lookups) {
                    let { repo, index } = lookups[key];
                    props[key] = this.master.getDocument(repo, index);
                }
            }
            return props;
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
