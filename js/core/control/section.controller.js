'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_controller_composer_1 = require("./core.controller.composer");
const narrationbubble_view_1 = require("./views/narrationbubble.view");
const list_controller_1 = require("./list.controller");
const card_controller_1 = require("./card.controller");
const sheet_controller_1 = require("./sheet.controller");
const media_controller_1 = require("./media.controller");
const custom_controller_1 = require("./custom.controller");
const section_view_1 = require("./views/section.view");
class SectionControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.toolkit = null;
        this.emitLocalComponent = (component, key) => {
            let { controller, index, anchor, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'section': {
                    properties.id = anchor;
                    componentType = section_view_1.default;
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
            return output;
        };
        this.assembleNarratives = narrative => {
            let narratives = {};
            for (let index in narrative) {
                let spec = index.split(':');
                let controller = spec[0];
                let narrative_index = spec[1];
                if (!narratives[controller]) {
                    narratives[controller] = {};
                }
                narratives[controller][narrative_index] = narrative[index];
            }
            return narratives;
        };
        this.narratives = null;
        this.emitComponent = (model, key) => {
            let { controller, index, narrative } = model;
            switch (controller) {
                case 'section': {
                    let narratives = null;
                    if (narrative) {
                        narratives = this.assembleNarratives(narrative);
                    }
                    else {
                        narratives = {};
                    }
                    this.narratives = narratives;
                    return this.emitLocalComponent(model, key);
                }
                case 'card': {
                    return React.createElement(card_controller_1.default, { key: key, model: model });
                }
                case 'list': {
                    let narratives = this.narratives;
                    let listcontroller = React.createElement(list_controller_1.default, { key: key, model: model });
                    let output = null;
                    if (narratives[controller] && narratives[controller][index]) {
                        output = React.createElement("div", { key: key },
                            React.createElement(narrationbubble_view_1.default, { markup: narratives[controller][index] }),
                            listcontroller);
                    }
                    else {
                        output = listcontroller;
                    }
                    return output;
                }
                case 'sheet': {
                    return React.createElement(sheet_controller_1.default, { key: key, model: model });
                }
                case 'media': {
                    return React.createElement(media_controller_1.default, { key: key, model: model });
                }
                case 'custom': {
                    return React.createElement(custom_controller_1.default, { key: key, model: model });
                }
                default: {
                    let { description, index } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found in Section controller`);
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
            return React.createElement(section_view_1.default, null);
        let component = this.emitComponent(model, model.index);
        return component;
    }
}
let SectionController = core_controller_composer_1.default(SectionControllerClass);
exports.default = SectionController;
