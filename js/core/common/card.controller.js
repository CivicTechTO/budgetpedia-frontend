'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const Card_1 = require("material-ui/Card");
const html_view_1 = require("../../core/common/sub-components/html.view");
let CardController = class extends base_controller_1.default {
    constructor(props) {
        super(props);
        this.emitLocalComponent = (component, key, childprop = null) => {
            let { type, index, description, properties, lookups, components, } = component;
            if (!childprop)
                childprop = [];
            let children = [...childprop];
            if (lookups) {
                for (let key in lookups) {
                    let { repo, index } = lookups[key];
                    properties[key] = this.master.getDocument(repo, index);
                }
            }
            let props = Object.assign({}, properties);
            props.key = key;
            let componentType = null;
            switch (type) {
                case 'card': {
                    componentType = Card_1.Card;
                    children = [...children,
                        React.createElement("div", { key: 'clear', style: { clear: "both" } })];
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
                default: {
                    return React.createElement("div", { key: key }, "Pending");
                }
            }
            let result = React.createElement(componentType, props, children);
            return result;
        };
        this.emitComponent = (component, key) => {
            let { controller } = component;
            if (controller == 'card') {
                return this.emitLocalComponent(component, key);
            }
            switch (controller) {
                default: {
                    let { description } = component;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
                }
            }
        };
        this.assertModel.bind(this);
        this.setRepoModel.bind(this);
        this.componentDidUpdate.bind(this);
        this.getChildren.bind(this);
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
        let { components, index } = model;
        if (!components)
            components = [];
        let children = this.getChildren(components);
        return this.emitLocalComponent(model, index, children);
    }
};
exports.default = CardController;
