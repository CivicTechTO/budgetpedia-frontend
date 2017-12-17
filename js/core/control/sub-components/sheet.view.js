'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
const FloatingActionButton_1 = require("material-ui/FloatingActionButton");
const mode_edit_1 = require("material-ui/svg-icons/editor/mode-edit");
const file_download_1 = require("material-ui/svg-icons/file/file-download");
const draft_js_1 = require("draft-js");
const draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
const draft_js_static_toolbar_plugin_1 = require("draft-js-static-toolbar-plugin");
const draft_js_anchor_plugin_1 = require("draft-js-anchor-plugin");
require("draft-js/dist/Draft.css");
require("draft-js-static-toolbar-plugin/lib/plugin.css");
require("draft-js-anchor-plugin/lib/plugin.css");
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
            editorReadonly: true,
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
        const linkPlugin = draft_js_anchor_plugin_1.default({
            linkTarget: '_blank',
        });
        const toolbarPlugin = draft_js_static_toolbar_plugin_1.default({
            structure: [
                draft_js_buttons_1.BoldButton,
                draft_js_buttons_1.ItalicButton,
                draft_js_buttons_1.UnderlineButton,
                draft_js_buttons_1.CodeButton,
                linkPlugin.LinkButton,
                draft_js_static_toolbar_plugin_1.Separator,
                HeadlinesButton,
                draft_js_buttons_1.UnorderedListButton,
                draft_js_buttons_1.OrderedListButton,
                draft_js_buttons_1.BlockquoteButton,
                draft_js_buttons_1.CodeBlockButton
            ]
        });
        const { Toolbar } = toolbarPlugin;
        const plugins = [toolbarPlugin, linkPlugin];
        this.Toolbar = Toolbar;
        this.plugins = plugins;
    }
    render() {
        let Toolbar = this.Toolbar;
        let plugins = this.plugins;
        return (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
            React.createElement(Paper_1.default, { zDepth: 3 },
                React.createElement("div", { style: { padding: '16px', position: 'relative', }, onClick: this.focus },
                    React.createElement("div", { style: { position: 'absolute', top: '-20px', right: 0 } },
                        React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onTouchTap: () => {
                                this.setState({
                                    editorReadonly: !this.state.editorReadonly
                                });
                            } },
                            React.createElement(mode_edit_1.default, null)),
                        React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onTouchTap: () => {
                                this.setState({
                                    editorReadonly: !this.state.editorReadonly
                                });
                            } },
                            React.createElement(file_download_1.default, null))),
                    React.createElement(draft_js_plugins_editor_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, plugins: plugins, readOnly: this.state.editorReadonly, handleKeyCommand: this.handleKeyCommand, ref: (element) => { this.editor = element; } }),
                    (!this.state.editorReadonly) ? React.createElement(Toolbar, null) : null))));
    }
}
exports.default = SheetView;
