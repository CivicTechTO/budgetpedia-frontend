'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const section_controller_1 = require("./section.controller");
let Page = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
            waiting: false,
        };
    }
    componentDidMount() {
        let { match } = this.props;
        let { path } = match;
        let { master } = this;
        let index = master.getPageIndex(path);
        let model = master.getPageModel(index);
        if (master.isPromise(model)) {
            this.settleModelPromise(model);
        }
        else {
            this.setState({
                model,
            });
        }
    }
    render() {
        let { model } = this.state;
        let response = this.assertModel(model);
        if (response)
            return response;
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
