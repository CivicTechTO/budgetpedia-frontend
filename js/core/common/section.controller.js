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
    constructor(props) {
        super(props);
        this.emitComponent = (component, key) => {
            let { controller } = component;
            let model = this.filterImportedBaseProps(component);
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
                    let { description, index } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found`);
                }
            }
        };
        this.baseBindingsToInstance(this);
    }
    componentDidMount() {
        let { model } = this.props;
        this.setState({
            model,
        });
    }
    render() {
        let { model } = this.state;
        if (!model || model.repo)
            return null;
        let { index, description, properties, children, } = model;
        if (!children) {
            return React.createElement("div", null, `Section children not found for ${index}:${description}`);
        }
        let components = this.getChildren(children);
        return (React.createElement("div", null, components));
    }
};
exports.default = SectionController;
