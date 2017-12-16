'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
const draft_js_1 = require("draft-js");
const draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
const draft_js_static_toolbar_plugin_1 = require("draft-js-static-toolbar-plugin");
require("draft-js/dist/Draft.css");
require("draft-js-static-toolbar-plugin/lib/plugin.css");
require("./editorstyles.css");
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
class HeadlinesButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => this.props.onOverrideContent(HeadlinesPicker);
    }
    render() {
        return (React.createElement("div", { className: "headlineButtonWrapper" },
            React.createElement("button", { onClick: this.onClick, className: "headlineButton" }, "H")));
    }
}
class SheetView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: draft_js_1.EditorState.createEmpty(),
        };
        this.editor = null;
        this.focus = () => {
            this.editor.focus();
        };
        this.onEditorChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = (command, editorState) => {
            const newState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this.onEditorChange(newState);
                return 'handled';
            }
            return 'not-handled';
        };
        const toolbarPlugin = draft_js_static_toolbar_plugin_1.default({
            structure: [
                draft_js_buttons_1.BoldButton,
                draft_js_buttons_1.ItalicButton,
                draft_js_buttons_1.UnderlineButton,
                draft_js_buttons_1.CodeButton,
                draft_js_static_toolbar_plugin_1.Separator,
                HeadlinesButton,
                draft_js_buttons_1.UnorderedListButton,
                draft_js_buttons_1.OrderedListButton,
                draft_js_buttons_1.BlockquoteButton,
                draft_js_buttons_1.CodeBlockButton
            ]
        });
        const { Toolbar } = toolbarPlugin;
        const plugins = [toolbarPlugin];
        this.Toolbar = Toolbar;
        this.plugins = plugins;
    }
    render() {
        let Toolbar = this.Toolbar;
        let plugins = this.plugins;
        return (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
            React.createElement(Paper_1.default, { zDepth: 3 },
                React.createElement("div", { style: { padding: '16px' }, onClick: this.focus },
                    React.createElement(draft_js_plugins_editor_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, plugins: plugins, readOnly: false, handleKeyCommand: this.handleKeyCommand, ref: (element) => { this.editor = element; } }),
                    React.createElement(Toolbar, null)))));
    }
}
exports.default = SheetView;
