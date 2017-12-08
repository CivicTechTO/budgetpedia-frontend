'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
let CardController = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
            waiting: false,
        };
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
        let response = this.assertModel(model);
        if (response)
            return response;
        let { index, description, fields, components, composition, } = model;
        console.log('cardscontroller model', model);
        if (!components)
            components = [];
        let children = components.map((component, key) => {
            let { controller } = component;
            switch (controller) {
                case 'card': {
                    return React.createElement("div", null, "A Card");
                }
                default: {
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
                }
            }
        });
        return React.createElement("div", null, "card");
    }
};
exports.default = CardController;
