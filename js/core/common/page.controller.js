'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const section_controller_1 = require("./section.controller");
const master_model_1 = require("../../gateway/master.model");
let Page = class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
        };
    }
    componentDidMount() {
        let { match } = this.props;
        let { path } = match;
        let index = master_model_1.default.getPageIndex(path);
        let model = master_model_1.default.getPageModel(index);
        this.setState({
            model,
        });
    }
    render() {
        let { model } = this.state;
        if (!model) {
            return React.createElement("div", null, "loading...");
        }
        if (model.repo) {
            model = master_model_1.default.getDocument(model.repo, model.index);
            if (master_model_1.default.isPromise(model)) {
            }
        }
        let { controller, index, repo, description, fields, components, composition } = model;
        let sections = components.map((component, key) => {
            let { controller, repo, index, description, fields, components, composition, } = component;
            switch (controller) {
                case 'section': {
                    return React.createElement(section_controller_1.default, { key: key, description: description, fields: fields, components: components, composition: composition });
                }
                default: {
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found`);
                }
            }
        });
        return (React.createElement("div", null, sections));
    }
};
exports.default = Page;
