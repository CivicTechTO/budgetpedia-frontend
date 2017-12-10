'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const master_model_1 = require("../../gateway/master.model");
class BaseController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
            waiting: false,
        };
        this.master = null;
        this.baseBindingsToInstance = (instance) => {
            this.settleModelPromise.bind(instance);
            this.assertModel.bind(instance);
            this.setRepoModel.bind(instance);
            this.componentDidUpdate.bind(instance);
            this.getChildren.bind(instance);
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
        this.filterImportedBaseProps = (component) => {
            let { controller, repo, index, description, type, properties, children, } = component;
            let model = {
                repo,
                index,
                description,
                type,
                properties,
                children,
            };
            return model;
        };
        this.settleModelPromise = model => {
            this.setState({
                waiting: true,
            }, model.then((model) => {
                this.setState({
                    waiting: false,
                    model,
                });
            }));
        };
        this.setRepoModel = (repo, index) => {
            let { master } = this;
            let model = master.getDocument(repo, index);
            if (master.isPromise(model)) {
                console.log('model is a promise', model);
                if (!this.state.waiting) {
                    this.settleModelPromise(model);
                }
            }
            else {
                this.setState({
                    model,
                });
            }
        };
        this.assertModel = model => {
            if (!model) {
                return false;
            }
            if (model.repo) {
                this.setRepoModel(model.repo, model.index);
                return false;
            }
            return true;
        };
        this.emitComponent = (component, key) => { };
        this.getChildren = (children) => {
            if (!children || children.length == 0)
                return children;
            let output = children.map((child, key) => {
                return this.emitComponent(child, key);
            });
            return output;
        };
        this.master = master_model_1.default;
    }
    componentDidUpdate() {
        this.assertModel(this.state.model);
    }
}
exports.default = BaseController;
