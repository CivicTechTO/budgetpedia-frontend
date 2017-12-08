'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const list_controller_1 = require("./list.controller");
const card_controller_1 = require("./card.controller");
const sheet_controller_1 = require("./sheet.controller");
const media_controller_1 = require("./media.controller");
const custom_controller_1 = require("./custom.controller");
let SectionController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
            waiting: false,
        };
        this.emitComponent = (component, key) => {
            let { controller, repo, index, type, description, fields, components, composition, } = component;
            let model = {
                repo,
                index,
                type,
                description,
                fields,
                components,
                composition,
            };
            switch (controller) {
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
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
                }
            }
        };
    }
    componentDidMount() {
        let { model } = this.props;
        this.setState({
            model,
        });
    }
    render() {
        let { model } = this.state;
        let response = this.assertModel(model);
        if (response)
            return response;
        let { index, description, fields, components, composition, } = model;
        if (!components) {
            return React.createElement("div", null, `Section components not fournd for ${index}:${description}`);
        }
        let children = components.map((component, key) => {
            return this.emitComponent(component, key);
        });
        return children;
    }
};
exports.default = SectionController;
