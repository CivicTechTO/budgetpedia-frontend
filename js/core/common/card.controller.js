'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
let CardController = class extends base_controller_1.default {
    constructor(props) {
        super(props);
        this.getChildren.bind(this);
        this.assertModel.bind(this);
        this.setRepoModel.bind(this);
        this.componentDidUpdate.bind(this);
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
        let { index, description, properties, components, } = model;
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
