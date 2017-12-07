'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const lists_controller_1 = require("./lists.controller");
const cards_controller_1 = require("./cards.controller");
const sheets_controller_1 = require("./sheets.controller");
const embeds_controller_1 = require("./embeds.controller");
const custom_controller_1 = require("./custom.controller");
let Section = class extends React.Component {
    render() {
        let { description, fields, components, composition, } = this.props;
        components = components ? components : [];
        let children = components.map((component, key) => {
            let { controller, repo, index, type, description, fields, components, composition, } = component;
            switch (controller) {
                case 'lists': {
                    return React.createElement(lists_controller_1.default, { key: key, type: type, description: description, fields: fields, components: components, composition: composition });
                }
                case 'cards': {
                    return React.createElement(cards_controller_1.default, { key: key, type: type, description: description, fields: fields, components: components, composition: composition });
                }
                case 'sheets': {
                    return React.createElement(sheets_controller_1.default, { key: key, type: type, description: description, fields: fields, components: components, composition: composition });
                }
                case 'embeds': {
                    return React.createElement(embeds_controller_1.default, { key: key, type: type, description: description, fields: fields, components: components, composition: composition });
                }
                case 'custom': {
                    return React.createElement(custom_controller_1.default, { key: key, type: type, description: description, fields: fields, components: components, composition: composition });
                }
                default: {
                    return React.createElement("div", { key: 'default' + key }, `${controller} (${description}) not found`);
                }
            }
        });
        console.log('children', children);
        return children;
    }
};
exports.default = Section;
