'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_controller_composer_1 = require("./core.controller.composer");
const narrationbubble_view_1 = require("./views/narrationbubble.view");
const followupbubble_view_1 = require("./views/followupbubble.view");
const card_controller_1 = require("./card.controller");
const list_controller_1 = require("./list.controller");
const paper_controller_1 = require("./paper.controller");
const media_controller_1 = require("./media.controller");
const custom_controller_1 = require("./custom.controller");
const toc_view_1 = require("./views/toc.view");
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
                case 'toc': {
                    return React.createElement(toc_view_1.default, { key: index, tocdata: this.props.getToC() });
                }
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
        this.assembleCommentary = commentary => {
            let comments = {};
            for (let index in commentary) {
                let spec = index.split(':');
                let controller = spec[0];
                let narrative_index = spec[1];
                if (!comments[controller]) {
                    comments[controller] = {};
                }
                comments[controller][narrative_index] = commentary[index];
            }
            return comments;
        };
        this.narratives = null;
        this.followups = null;
        this.emitComponent = (model, key) => {
            let { controller, index, narrative, followup } = model;
            let controllerclass = null;
            switch (controller) {
                case 'section': {
                    let narratives = {};
                    if (narrative) {
                        narratives = this.assembleCommentary(narrative);
                    }
                    this.narratives = narratives;
                    let followups = {};
                    if (followup) {
                        followups = this.assembleCommentary(followup);
                    }
                    this.followups = followups;
                    let output = this.emitLocalComponent(model, key);
                    return output;
                }
                case 'card': {
                    controllerclass = React.createElement(card_controller_1.default, { key: key, model: model });
                    break;
                }
                case 'list': {
                    controllerclass = React.createElement(list_controller_1.default, { key: key, model: model });
                    break;
                }
                case 'media': {
                    controllerclass = React.createElement(media_controller_1.default, { key: key, model: model });
                    break;
                }
                case 'paper': {
                    controllerclass = React.createElement(paper_controller_1.default, { key: key, model: model });
                    break;
                }
                case 'custom': {
                    controllerclass = React.createElement(custom_controller_1.default, { key: key, model: model });
                    break;
                }
                default: {
                    let { description, index } = model;
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${index}:${description}) not found in Section controller`);
                }
            }
            let output = null;
            let narratives = this.narratives;
            let followups = this.followups;
            let isNarratives = narratives && narratives[controller] && narratives[controller][index];
            let isFollowups = followups && followups[controller] && followups[controller][index];
            if (isNarratives || isFollowups) {
                output = React.createElement("div", { key: key },
                    isNarratives ? React.createElement(narrationbubble_view_1.default, { markup: narratives[controller][index] }) : null,
                    controllerclass,
                    isFollowups ? React.createElement(followupbubble_view_1.default, { markup: followups[controller][index] }) : null);
            }
            else {
                output = controllerclass;
            }
            return output;
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
