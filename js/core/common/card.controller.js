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
        this.emitLocalComponent = (component, key) => {
            let { index, description, lookups, propComponents, type, properties, children, } = component;
            properties.key = key;
            let childcomponents = this.getChildren(children);
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
                    return React.createElement("div", { key: key }, "Pending");
                }
            }
            let output = React.createElement(componentType, properties, childcomponents);
            return output;
        };
        this.emitComponent = (component, key) => {
            let { controller } = component;
            if (controller == 'card') {
                return this.emitLocalComponent(component, key);
            }
            let model = component;
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
        let { model } = this.props;
        if (this.master.isPromise(model)) {
            model.then((model) => {
                model = this.updateModel(model);
                this.setState({
                    model,
                });
            });
        }
        else {
            model = this.updateModel(model);
            this.setState({
                model,
            });
        }
    }
    render() {
        let { model } = this.state;
        if (!model)
            return null;
        let component = this.emitLocalComponent(model, model.index);
        return component;
    }
};
exports.default = CardController;
