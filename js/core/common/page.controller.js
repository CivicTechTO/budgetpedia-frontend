'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const base_controller_1 = require("./base.controller");
const section_controller_1 = require("./section.controller");
let PageController = class extends base_controller_1.default {
    constructor(props) {
        super(props);
        this.emitComponent = (component, key) => {
            let { type } = component;
            let model = component;
            switch (type) {
                case 'section': {
                    return React.createElement(section_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { index, description } = model;
                    return React.createElement("div", { key: 'default' + key }, `${type} (${index}:${description}) not found`);
                }
            }
        };
        this.baseBindingsToInstance(this);
    }
    componentDidMount() {
        let { match } = this.props;
        let { path } = match;
        let { master } = this;
        let index = master.getPageIndex(path);
        let model = master.getPageModel(index);
        model = this.updateModel(model);
        this.setState({
            model,
        });
    }
    render() {
        let { model } = this.state;
        if (!model)
            return null;
        let children = this.getChildren(model.children);
        return (React.createElement("div", null, children));
    }
};
exports.default = PageController;
