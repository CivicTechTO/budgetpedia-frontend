'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const base_controller_1 = require("./base.controller");
const linklist_view_1 = require("./sub-components/linklist.view");
const nuggetlist_view_1 = require("./sub-components/nuggetlist.view");
const tilelist_view_1 = require("./sub-components/tilelist.view");
let ListController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { controller, index, wrapper, type, properties, children, } = component;
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
                case 'tilelist': {
                    componentType = tilelist_view_1.default;
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
                case 'list': {
                    return this.emitLocalComponent(model, key);
                }
                default: {
                    let { description } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found in List processor`);
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
ListController = react_redux_1.connect(null, {
    push: react_router_redux_1.push,
})(ListController);
exports.default = ListController;
