'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const section_controller_1 = require("./section.controller");
const page_view_1 = require("./sub-components/page.view");
let PageController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { controller, index, type, properties, children, } = component;
            let childcomponents = this.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'page': {
                    componentType = page_view_1.default;
                    break;
                }
                default: {
                    return React.createElement("div", { key: key },
                        "Component type ",
                        type,
                        " not found in ",
                        controller,
                        " controller");
                }
            }
            let output = React.createElement(componentType, properties, childcomponents);
            return output;
        };
        this.emitComponent = (model, key) => {
            let { controller, description } = model;
            switch (controller) {
                case 'page': {
                    return this.emitLocalComponent(model, key);
                }
                case 'section': {
                    return React.createElement(section_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { index, description } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found`);
                }
            }
        };
    }
    componentDidMount() {
        let { match } = this.props;
        let { path } = match;
        let { master } = this;
        let index = master.getPageIndex(path);
        let model = master.getPageModel(index);
        this.setStateModel(this, model);
    }
    render() {
        let { model } = this.state;
        if (!model)
            return React.createElement("div", null);
        let component = this.emitComponent(model, model.index);
        return component;
    }
};
exports.default = PageController;
