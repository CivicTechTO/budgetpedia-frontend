'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const Card_1 = require("material-ui/Card");
const html_view_1 = require("../../core/common/sub-components/html.view");
let CardController = class extends base_controller_1.default {
    constructor(props) {
        super(props);
        this.emitLocalComponent = (component, key, children = null) => {
            let { type, index, description, properties, lookups, components, } = component;
            console.log('local component', component);
            let result = React.createElement("div", { key: key }, "Hello");
            if (lookups) {
                for (let key in lookups) {
                    let { repo, index } = lookups[key];
                    properties[key] = this.master.getDocument(repo, index);
                }
            }
            switch (type) {
                case 'card': {
                    return React.createElement(Card_1.Card, { key: key, style: properties.style },
                        children,
                        React.createElement("div", { style: { clear: "both" } }));
                }
                case 'htmlview': {
                    return React.createElement(html_view_1.default, { key: key, html: properties.html });
                }
                case 'cardtitle': {
                    let { title, subtitle, style, titleStyle } = properties;
                    return React.createElement(Card_1.CardTitle, { key: key, title: title, subtitle: subtitle, style: style, titleStyle: titleStyle });
                }
            }
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
        console.log('cards controller props', this.props);
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
        console.log('cardscontroller model', model);
        if (!components)
            components = [];
        let children = this.getChildren(components);
        return this.emitLocalComponent(model, index, children);
    }
};
exports.default = CardController;
