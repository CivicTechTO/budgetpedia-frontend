'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const section_controller_1 = require("./section.controller");
const master_model_1 = require("../../gateway/master.model");
let Page = class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
        };
        this.repos = null;
        this.styles = null;
    }
    componentDidMount() {
        let { match } = this.props;
        let { path } = match;
        let { pages, routes, repos, styles } = master_model_1.default;
        let key = routes[path];
        this.repos = repos;
        this.styles = styles;
        this.setState({
            model: pages[key],
        });
    }
    render() {
        let { model } = this.state;
        if (!model) {
            return React.createElement("div", null, "loading...");
        }
        let { type, index, description, fields, components, composition } = model;
        let sections = components.map((component, key) => {
            let { type, index, description, fields, components, composition } = model;
            switch (component.type) {
                case 'section': {
                    return React.createElement(section_controller_1.default, { key: key, index: index, description: description, fields: fields, model: components, composition: composition });
                }
                default: {
                    return React.createElement("div", null, component.type + ' not found');
                }
            }
        });
        return (React.createElement("div", null, sections));
    }
};
exports.default = Page;
