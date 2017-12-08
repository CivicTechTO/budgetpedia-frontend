'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const lists_controller_1 = require("./lists.controller");
const cards_controller_1 = require("./cards.controller");
const sheets_controller_1 = require("./sheets.controller");
const media_controller_1 = require("./media.controller");
const custom_controller_1 = require("./custom.controller");
let SectionController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
            waiting: false,
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
                case 'cards': {
                    return React.createElement(cards_controller_1.default, { key: key, model: model });
                }
                case 'lists': {
                    return React.createElement(lists_controller_1.default, { key: key, model: model });
                }
                case 'sheets': {
                    return React.createElement(sheets_controller_1.default, { key: key, model: model });
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
        });
        return children;
    }
};
exports.default = SectionController;
