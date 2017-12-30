'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const core_controller_composer_1 = require("./core.controller.composer");
const Card_1 = require("material-ui/Card");
const html_view_1 = require("./views/html.view");
const list_controller_1 = require("./list.controller");
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
                childcomponents = [...childcomponents];
            }
            let componentType = null;
            switch (type) {
                case 'card': {
                    componentType = Card_1.Card;
                    childcomponents = [
                        ...childcomponents,
                        React.createElement("div", { key: 'clear', style: { clear: "both" } }),
                    ];
                    break;
                }
                case 'htmlview': {
                    componentType = html_view_1.default;
                    break;
                }
                case 'cardtitle': {
                    componentType = Card_1.CardTitle;
                    break;
                }
                case 'cardtext': {
                    componentType = Card_1.CardText;
                    break;
                }
                case 'cardactions': {
                    componentType = Card_1.CardActions;
                    break;
                }
                case 'cardheader': {
                    componentType = Card_1.CardHeader;
                    break;
                }
                case 'cardmedia': {
                    componentType = Card_1.CardMedia;
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
                    return React.createElement(list_controller_1.default, { key: key, model: model });
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
let CardController = core_controller_composer_1.default(CardControllerClass);
exports.default = CardController;
