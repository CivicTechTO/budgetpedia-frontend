// paper.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import PaperView from './views/paper.view';
import coreControllerComposer from './core.controller.composer';
import ListController from './list.controller';
import MarkupBlockView from './views/markupblock.view';
import SheetView from './views/sheet.view';
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
                childcomponents = [...childcomponents]; // work with copy; anticipate change below
            }
            let componentType = null;
            switch (type) {
                case 'paper': {
                    componentType = PaperView;
                    break;
                }
                case 'markupblock': {
                    componentType = MarkupBlockView;
                    break;
                }
                case 'sheet': {
                    let { lookups } = component;
                    if (lookups && lookups.draftdata) {
                        properties.draftsource = lookups.draftdata;
                    }
                    componentType = SheetView;
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
                    return React.createElement(ListController, { key: key, model: model });
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
let PaperController = coreControllerComposer(PaperControllerClass);
export default PaperController;
