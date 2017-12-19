'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const draft_js_buttons_1 = require("draft-js-buttons");
class HeadlinesPicker extends React.Component {
    constructor() {
        super(...arguments);
        this.onWindowClick = () => this.props.onOverrideContent(undefined);
    }
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }
    render() {
        const buttons = [draft_js_buttons_1.HeadlineOneButton, draft_js_buttons_1.HeadlineTwoButton, draft_js_buttons_1.HeadlineThreeButton];
        return (React.createElement("div", null, buttons.map((Button, i) => React.createElement(Button, Object.assign({ key: i }, this.props)))));
    }
}
exports.default = HeadlinesPicker;
