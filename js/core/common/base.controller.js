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
                if (!this.state.waiting) {
                    this.settleModelPromise(model);
                }
            }
            else {
                setTimeout(() => {
                    this.setState({
                        model,
                    });
                });
            }
        };
        this.assertModel = model => {
            if (!model) {
                return React.createElement("div", null, "loading...");
            }
            if (model.repo) {
                this.setRepoModel(model.repo, model.index);
                return React.createElement("div", null, "waiting...");
            }
            return null;
        };
        this.master = master_model_1.default;
    }
}
exports.default = BaseController;
