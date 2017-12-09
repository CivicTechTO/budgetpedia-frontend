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
        this.bindingsToInstance = (instance) => {
            this.settleModelPromise.bind(instance);
            this.assertModel.bind(instance);
            this.setRepoModel.bind(instance);
            this.componentDidUpdate.bind(instance);
            this.getChildren.bind(instance);
        };
        this.filterImportedBaseProps = (props) => {
            let { controller, repo, index, description, properties, components, } = props;
            let model = {
                repo,
                index,
                description,
                properties,
                components,
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
                console.log('master is promise');
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
        this.getChildren = (components) => {
            let children = components.map((component, key) => {
                return this.emitComponent(component, key);
            });
            return children;
        };
        this.master = master_model_1.default;
    }
    componentDidUpdate() {
        this.assertModel(this.state.model);
    }
}
exports.default = BaseController;
