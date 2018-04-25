// list.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import coreControllerComposer from './core.controller.composer';
import LinkListView from './views/linklist.view';
import NuggetListView from './views/nuggetlist.view';
import TileListView from './views/tilelist.view';
import MarkupListView from './views/markuplist.view';
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
                    componentType = LinkListView;
                    break;
                }
                case 'nuggetlist': {
                    componentType = NuggetListView;
                    break;
                }
                case 'tilelist': {
                    componentType = TileListView;
                    break;
                }
                case 'markuplist': {
                    componentType = MarkupListView;
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
let ListController = coreControllerComposer(ListControllerClass);
export default ListController;
