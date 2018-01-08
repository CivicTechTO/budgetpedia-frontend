'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const paper_view_1 = require("./views/paper.view");
const core_controller_composer_1 = require("./core.controller.composer");
const list_controller_1 = require("./list.controller");
const markupblock_view_1 = require("./views/markupblock.view");
const sheet_view_1 = require("./views/sheet.view");
class PaperControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.toolkit = null;
        this.emitLocalComponent = (component, key) => {
            let { controller, index, wrapper, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            if (childcomponents) {
                childcomponents = [...childcomponents];
            }
            let componentType = null;
            switch (type) {
                case 'paper': {
                    componentType = paper_view_1.default;
                    break;
                }
                case 'markupblock': {
                    componentType = markupblock_view_1.default;
                    break;
                }
                case 'sheet': {
                    let { lookups } = component;
                    if (lookups && lookups.draftdata) {
                        properties.draftsource = lookups.draftdata;
                    }
                    componentType = sheet_view_1.default;
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
            output = this.toolkit.wrapComponent(output, wrapper, key);
            return output;
        };
        this.emitComponent = (model, key) => {
            let { controller } = model;
            switch (controller) {
                case 'paper': {
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
        this.toolkit = props.toolkit;
    }
    componentDidMount() {
        let { model } = this.props;
        this.toolkit.setStateModel(this, model);
    }
    render() {
        let { model } = this.state;
        if (!model)
            return React.createElement("div", null);
        let component = this.emitComponent(model, model.index);
        return component;
    }
}
let PaperController = core_controller_composer_1.default(PaperControllerClass);
exports.default = PaperController;
