'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const master_model_1 = require("../../gateway/master.model");
let Page = class extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            model: null,
        };
    }
    componentHasMounted() {
        let { match } = this.props;
        let { path } = match;
        let { pages, routes, repos, styles } = master_model_1.default;
        let key = routes[path];
        this.setState({
            model: pages[key],
        });
    }
    render() {
        return React.createElement("div", null, "hello");
    }
};
exports.default = Page;
