'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
let Cards = class extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
            waiting: false,
        };
    }
    componentDidMount() {
        console.log('card props', this.props);
        let { model } = this.props;
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
        console.log('card model', model);
        components = components ? components : [];
        let children = components.map((component, key) => {
            let { controller, repo, index, type, description, fields, components, composition, } = component;
            let model = {
                repo,
                index,
                type,
                description,
                fields,
                components,
                composition,
            };
        });
        return React.createElement("div", null, "cards");
    }
};
exports.default = Cards;
