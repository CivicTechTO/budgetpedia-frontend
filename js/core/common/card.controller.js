'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const Card_1 = require("material-ui/Card");
const html_view_1 = require("./sub-components/html.view");
const list_controller_1 = require("./list.controller");
let CardController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.emitLocalComponent = (component, key) => {
            let { controller, index, description, lookups, wrapper, propComponents, type, properties, children, } = component;
            let childcomponents = this.getChildren(this, children);
            if (childcomponents) {
                childcomponents = [...childcomponents];
            }
            let componentType = null;
            switch (type) {
                case 'card': {
                    componentType = Card_1.Card;
                    childcomponents = [
                        ...childcomponents,
                        React.createElement("div", { key: 'clear', style: { clear: "both" } }),
                    ];
                    break;
                }
                case 'htmlview': {
                    componentType = html_view_1.default;
                    break;
                }
                case 'cardtitle': {
                    componentType = Card_1.CardTitle;
                    break;
                }
                case 'cardtext': {
                    componentType = Card_1.CardText;
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
                case 'card': {
                    return this.emitLocalComponent(model, key);
                }
                case 'list': {
                    return React.createElement(list_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { description } = model;
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
        let component = this.emitComponent(model, index);
        return component;
    }
};
exports.default = CardController;
