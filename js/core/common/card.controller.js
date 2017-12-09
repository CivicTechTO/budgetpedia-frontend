'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const Card_1 = require("material-ui/Card");
const html_view_1 = require("./sub-components/html.view");
const list_controller_1 = require("./list.controller");
let CardController = class extends base_controller_1.default {
    constructor(props) {
        super(props);
        this.emitLocalComponent = (component, key, childrenarg = null) => {
            let { type, index, description, properties, lookups, propComponents, children, } = component;
            let props = this.updateProperties(properties, lookups, propComponents);
            props.key = key;
            if (!childrenarg)
                childrenarg = [];
            let childcomponents = [...childrenarg];
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
                    childcomponents = this.getChildren(component.children);
                    break;
                }
                default: {
                    return React.createElement("div", { key: key }, "Pending");
                }
            }
            let output = React.createElement(componentType, props, childcomponents);
            return output;
        };
        this.emitComponent = (component, key) => {
            let { controller } = component;
            if (controller == 'card') {
                return this.emitLocalComponent(component, key);
            }
            let model = this.filterImportedBaseProps(component);
            switch (controller) {
                case 'list': {
                    return React.createElement(list_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { description } = component;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
                }
            }
        };
        this.baseBindingsToInstance(this);
    }
    componentDidMount() {
        let model = this.props.model;
        this.setState({
            model,
        });
    }
    render() {
        let { model } = this.state;
        if (!model || model.repo)
            return null;
        let { children, index } = model;
        if (!children)
            children = [];
        let components = this.getChildren(children);
        return this.emitLocalComponent(model, index, components);
    }
};
exports.default = CardController;
