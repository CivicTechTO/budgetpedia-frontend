'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const linklist_view_1 = require("./sub-components/linklist.view");
const nuggetlist_view_1 = require("./sub-components/nuggetlist.view");
let ListController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { index, description, lookups, propComponents, type, properties, children, } = component;
            let childcomponents = this.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'linklist': {
                    componentType = linklist_view_1.default;
                    break;
                }
                case 'nuggetlist': {
                    componentType = nuggetlist_view_1.default;
                    break;
                }
                default: {
                    return React.createElement("div", { key: key }, "Pending");
                }
            }
            let output = React.createElement(componentType, properties, childcomponents);
            return output;
        };
        this.emitComponent = (component, key) => {
            let { controller } = component;
            if (controller == 'list') {
                return this.emitLocalComponent(component, key);
            }
            switch (controller) {
                default: {
                    let { description } = component;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
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
        let component = this.emitLocalComponent(model, index);
        return component;
    }
};
exports.default = ListController;
