'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_controller_composer_1 = require("./core.controller.composer");
const linklist_view_1 = require("./views/linklist.view");
const nuggetlist_view_1 = require("./views/nuggetlist.view");
const tilelist_view_1 = require("./views/tilelist.view");
class ListControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.toolkit = null;
        this.emitLocalComponent = (component, key) => {
            let { controller, index, wrapper, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'linklist': {
                    componentType = linklist_view_1.default;
                    break;
                }
                case 'nuggetlist': {
                    componentType = nuggetlist_view_1.default;
                    break;
                }
                case 'tilelist': {
                    componentType = tilelist_view_1.default;
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
                case 'list': {
                    return this.emitLocalComponent(model, key);
                }
                default: {
                    let { description } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found in List processor`);
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
        let { index } = model;
        let component = this.emitComponent(model, index);
        return component;
    }
}
let ListController = core_controller_composer_1.default(ListControllerClass);
exports.default = ListController;
