'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const list_controller_1 = require("./list.controller");
const card_controller_1 = require("./card.controller");
const sheet_controller_1 = require("./sheet.controller");
const media_controller_1 = require("./media.controller");
const custom_controller_1 = require("./custom.controller");
const section_view_1 = require("./sub-components/section.view");
let SectionController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { controller, index, description, lookups, propComponents, type, properties, children, } = component;
            let childcomponents = this.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'section': {
                    componentType = section_view_1.default;
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
        this.emitComponent = (component, key) => {
            let { controller } = component;
            let model = component;
            switch (controller) {
                case 'section': {
                    return this.emitLocalComponent(component, key);
                }
                case 'card': {
                    return React.createElement(card_controller_1.default, { key: key, model: model });
                }
                case 'list': {
                    return React.createElement(list_controller_1.default, { key: key, model: model });
                }
                case 'sheet': {
                    return React.createElement(sheet_controller_1.default, { key: key, model: model });
                }
                case 'media': {
                    return React.createElement(media_controller_1.default, { key: key, model: model });
                }
                case 'custom': {
                    return React.createElement(custom_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { description, index } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found`);
                }
            }
        };
    }
    componentDidMount() {
        let { model } = this.props;
        this.setStateModel(this, model);
    }
    render() {
        let { model } = this.state;
        if (!model)
            return React.createElement("div", null);
        let { index } = model;
        let component = this.emitComponent(model, index);
        return component;
    }
};
exports.default = SectionController;
