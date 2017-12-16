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
        let staticToolbarPlugin = draft_js_static_toolbar_plugin_1.default();
        let { Toolbar } = staticToolbarPlugin;
        this.Toolbar = Toolbar;
        let plugins = [staticToolbarPlugin];
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
