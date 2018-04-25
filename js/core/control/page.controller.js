// page.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as tslib_1 from "tslib";
import * as React from 'react';
import Chip from 'material-ui/Chip';
let moment = require('moment');
var scrollToElement = require('scroll-to-element');
import coreControllerComposer from './core.controller.composer';
import SectionController from './section.controller';
import PageView from './views/page.view';
import PageMenuView from './views/pagemenu.view';
import AttributionView from './views/attribution.view';
class PageControllerClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
            tocdata: null,
        };
        this.toolkit = null;
        this.noToc = null;
        this.anchorCallback = () => {
            let self = this;
            if (self.noToc)
                return;
            let tocdata = [];
            setTimeout(() => {
                let anchors = document.querySelectorAll('a.hash-anchor');
                anchors.forEach(element => {
                    let item = {
                        tag: element.getAttribute('data-level'),
                        slug: element.getAttribute('id'),
                        text: element.getAttribute('data-text'),
                    };
                    tocdata.push(item);
                });
                self.setState({
                    tocdata,
                });
            });
        };
        this.onClickChip = index => {
            scrollToElement('#' + index, { offset: -64 }); // space for global toolbar
        };
        this.assembleChips = children => {
            let chips = children.map((child, index) => {
                if (child.tag) {
                    return (React.createElement(Chip, { key: index, onClick: (() => this.onClickChip(child.anchor)), style: { margin: '4px' } }, child.tag));
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
                    let attributionview = React.createElement(AttributionView, { key: "attribution", attribution: attribution });
                    if (chips.length || attributionview) {
                        let chipsheader = null;
                        let chipsfooter = null;
                        if (chips.length) {
                            chipsheader =
                                React.createElement(PageMenuView, { key: "menu" }, chips);
                            chipsfooter = React.createElement("div", { key: "filler", style: { height: '38px' } });
                        }
                        childcomponents = [
                            chipsheader,
                            ...childcomponents,
                            attributionview,
                            chipsfooter,
                        ];
                    }
                    componentType = PageView;
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
        this.getToC = () => {
            return this.state.tocdata;
        };
        this.emitComponent = (model, key) => {
            let { controller, description } = model;
            switch (controller) {
                case 'page': {
                    return this.emitLocalComponent(model, key);
                }
                case 'section': {
                    return React.createElement(SectionController, { key: key, model: model, noToc: !!this.noToc, getToC: this.getToC, isToC: !!this.state.tocdata });
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // console.log('page did mount props',this.props)
            try {
                let { match: { path } } = this.props;
                let { master } = this.toolkit;
                let index = yield master.getPageIndex(path);
                let model = master.getPageModel(index);
                this.noToc = model.noToc;
                this.toolkit.setStateModel(this, model, this.anchorCallback);
                // setTimeout(() => {
                //     console.log('model',this.state.model)
                // })
            }
            catch (e) {
                console.log('error getting model', e);
            }
        });
    }
    render() {
        let { model } = this.state;
        if (!model)
            return React.createElement(PageView, null);
        let component = this.emitComponent(model, model.index);
        return component;
    }
}
let PageController = coreControllerComposer(PageControllerClass);
export default PageController;
