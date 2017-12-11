'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const react_twitter_widgets_1 = require("react-twitter-widgets");
let MediaController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { controller, index, description, lookups, propComponents, type, properties, children, wrapper, } = component;
            let childcomponents = this.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'timeline': {
                    componentType = react_twitter_widgets_1.Timeline;
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
            properties.key = key;
            let output = React.createElement(componentType, properties, childcomponents);
            output = this.wrapComponent(output, wrapper, key);
            return output;
        };
        this.emitComponent = (model, key) => {
            let { controller } = model;
            switch (controller) {
                case 'media': {
                    return this.emitLocalComponent(model, key);
                }
                default: {
                    let { description } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found in Media processor`);
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
exports.default = MediaController;
