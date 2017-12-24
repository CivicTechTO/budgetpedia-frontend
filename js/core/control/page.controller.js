'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_controller_composer_1 = require("./core.controller.composer");
const section_controller_1 = require("./section.controller");
const page_view_1 = require("./views/page.view");
const pagemenu_controller_1 = require("./pagemenu.controller");
class PageControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.toolkit = null;
        this.emitLocalComponent = (component, key) => {
            let { controller, index, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'page': {
                    childcomponents = [React.createElement(pagemenu_controller_1.default, null), ...childcomponents];
                    componentType = page_view_1.default;
                    break;
                }
                default: {
                    return React.createElement("div", { key: key },
                        "Illegal component type ",
                        type,
                        " of ",
                        controller,
                        " controller");
                }
            }
            let output = React.createElement(componentType, properties, childcomponents);
            return output;
        };
        this.emitComponent = (model, key) => {
            let { controller, description } = model;
            switch (controller) {
                case 'page': {
                    return this.emitLocalComponent(model, key);
                }
                case 'section': {
                    return React.createElement(section_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { index, description } = model;
                    return React.createElement("div", { key: 'default' + key }, `illegal controller ${controller} (${index}:${description}) of PageController`);
                }
            }
        };
        this.toolkit = props.toolkit;
    }
    componentDidMount() {
        let { match: { path } } = this.props;
        let { master } = this.toolkit;
        let index = master.getPageIndex(path);
        let model = master.getPageModel(index);
        this.toolkit.setStateModel(this, model);
    }
    render() {
        let { model } = this.state;
        if (!model)
            return React.createElement(page_view_1.default, null);
        let component = this.emitComponent(model, model.index);
        return component;
    }
}
let PageController = core_controller_composer_1.default(PageControllerClass);
exports.default = PageController;
