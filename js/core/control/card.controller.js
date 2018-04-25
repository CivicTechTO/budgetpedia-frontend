// cards.controller.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import coreControllerComposer from './core.controller.composer';
import { Card, CardText, CardActions, CardHeader, CardMedia } from 'material-ui/Card';
import CardTitleView from './views/cardtitle.view';
import HtmlView from './views/html.view';
import ListController from './list.controller';
import MarkupBlockView from './views/markupblock.view';
class CardControllerClass extends React.Component {
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
                case 'card': {
                    componentType = Card;
                    childcomponents = [
                        ...childcomponents,
                        React.createElement("div", { key: 'clear', style: { clear: "both" } }),
                    ];
                    break;
                }
                case 'htmlview': {
                    // console.log('htmlview',component,childcomponents)
                    componentType = HtmlView;
                    break;
                }
                case 'cardtitle': {
                    componentType = CardTitleView;
                    break;
                }
                case 'cardtext': {
                    componentType = CardText;
                    break;
                }
                case 'markupblock': {
                    componentType = MarkupBlockView;
                    break;
                }
                case 'cardactions': {
                    componentType = CardActions;
                    break;
                }
                case 'cardheader': {
                    componentType = CardHeader;
                    break;
                }
                case 'cardmedia': {
                    componentType = CardMedia;
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
                case 'card': {
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
let CardController = coreControllerComposer(CardControllerClass);
export default CardController;
