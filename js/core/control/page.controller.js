'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Chip_1 = require("material-ui/Chip");
const react_router_dom_1 = require("react-router-dom");
let moment = require('moment');
var scrollToElement = require('scroll-to-element');
const core_controller_composer_1 = require("./core.controller.composer");
const section_controller_1 = require("./section.controller");
const page_view_1 = require("./views/page.view");
const pagemenu_view_1 = require("./views/pagemenu.view");
let Attributions = ({ name, link }) => {
    let content = null;
    if (link) {
        if (link.substr(0, 1) == '/') {
            content = React.createElement(react_router_dom_1.Link, { to: link }, name);
        }
        else {
            content = React.createElement("a", { href: link, target: '_blank' }, name);
        }
    }
    else {
        content = React.createElement("span", null, name);
    }
    return React.createElement("div", { style: { display: 'inline-block' } },
        content,
        ".\u00A0");
};
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
        this.getAttributionView = attribution => {
            let { custodian, authority, creator, updater, contact, dates } = attribution;
            if (!(custodian || authority || creator || updater || contact || dates))
                return null;
            return (React.createElement("div", { key: "attribution", style: {
                    padding: '8px',
                    margin: '8px',
                    borderRadius: '8px',
                    border: '3px solid silver',
                    backgroundColor: 'gainsboro',
                    fontSize: 'smaller',
                } },
                React.createElement("span", null, "For this page: "),
                contact ? [
                    React.createElement("span", { key: "prompt" }, "Please forward comments, questions, or corrections to "),
                    React.createElement(Attributions, { key: "attr", name: contact.name, link: contact.link })
                ]
                    : null,
                custodian ? [
                    React.createElement("span", { key: "prompt" }, "Custodian: "),
                    React.createElement(Attributions, { key: "attr", name: custodian.name, link: custodian.link })
                ]
                    : null,
                authority ? [
                    React.createElement("span", { key: "prompt" }, "Authority: "),
                    React.createElement(Attributions, { key: "attr", name: authority.name, link: authority.link })
                ]
                    : null,
                creator ? [
                    React.createElement("span", { key: "prompt" }, "Authority: "),
                    React.createElement(Attributions, { key: "attr", name: creator.name, link: creator.link })
                ]
                    : null,
                updater ? [
                    React.createElement("span", { key: "prompt" }, "Last updated by: "),
                    React.createElement(Attributions, { key: "attr", name: updater.name, link: updater.link })
                ]
                    : null,
                dates ? [
                    (dates.created ? React.createElement("span", { key: "prompt1" },
                        "Created: ",
                        moment(dates.created, 'DD-MM-YYYY').format('LL'),
                        ". ") : null),
                    (dates.updated ? React.createElement("span", { key: "prompt2" },
                        "Updated: ",
                        moment(dates.updated, 'DD-MM-YYYY').format('LL'),
                        ". ") : null),
                ]
                    : null));
        };
        this.emitLocalComponent = (component, key) => {
            let { controller, index, type, properties, children, } = component;
            let childcomponents = this.toolkit.getChildren(this, children);
            let componentType = null;
            switch (type) {
                case 'page': {
                    let chips = this.assembleChips(children);
                    let { attribution } = component;
                    let attributionview = this.getAttributionView(attribution);
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
