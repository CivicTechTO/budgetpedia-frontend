'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Chip_1 = require("material-ui/Chip");
let moment = require('moment');
var scrollToElement = require('scroll-to-element');
const core_controller_composer_1 = require("./core.controller.composer");
const section_controller_1 = require("./section.controller");
const page_view_1 = require("./views/page.view");
const pagemenu_view_1 = require("./views/pagemenu.view");
const attribution_view_1 = require("./views/attribution.view");
class PageControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null
        };
        this.toolkit = null;
        this.onClickChip = index => {
            scrollToElement('#' + index, { offset: -64 });
        };
        this.assembleChips = children => {
            let chips = children.map((child, index) => {
                if (child.tag) {
                    return (React.createElement(Chip_1.default, { key: index, onClick: (() => this.onClickChip(child.anchor)), style: { margin: '4px' } }, child.tag));
                }
                else {
                    return null;
                }
            });
            chips = chips.filter((chip) => {
                return !!chip;
            });
            return chips;
        };
        this.emitLocalComponent = (component, key) => {
            let { controller, index, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'page': {
                    let chips = this.assembleChips(children);
                    let { attribution } = component;
                    let attributionview = React.createElement(attribution_view_1.default, { key: "attribution", attribution: attribution });
                    if (chips.length || attributionview) {
                        let chipsheader = null;
                        let chipsfooter = null;
                        if (chips.length) {
                            chipsheader =
                                React.createElement(pagemenu_view_1.default, { key: "menu" }, chips);
                            chipsfooter = React.createElement("div", { key: "filler", style: { height: '38px' } });
                        }
                        childcomponents = [
                            chipsheader,
                            ...childcomponents,
                            attributionview,
                            chipsfooter,
                        ];
                    }
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
    myfunc() {
        return __awaiter(this, void 0, void 0, function* () {
        });
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
