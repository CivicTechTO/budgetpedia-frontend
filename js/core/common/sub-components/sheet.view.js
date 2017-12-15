'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
const draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
const draft_js_1 = require("draft-js");
const draft_js_hashtag_plugin_1 = require("draft-js-hashtag-plugin");
const draft_js_linkify_plugin_1 = require("draft-js-linkify-plugin");
require("draft-js-linkify-plugin/lib/plugin.css");
require("draft-js-hashtag-plugin/lib/plugin.css");
require("draft-js/dist/Draft.css");
const hashtagPlugin = draft_js_hashtag_plugin_1.default();
const linkifyPlugin = draft_js_linkify_plugin_1.default();
const plugins = [
    linkifyPlugin,
    hashtagPlugin,
];
class SheetView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            editorState: draft_js_1.EditorState.createEmpty(),
        };
        this.onEditorChange = (editorState) => this.setState({ editorState });
    }
    render() {
        return (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
            React.createElement(Paper_1.default, { zDepth: 3 },
                React.createElement("div", { style: { padding: '16px' } },
                    React.createElement(draft_js_plugins_editor_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, plugins: plugins, readOnly: false, ref: (element) => { this.editor = element; } })))));
    }
}
exports.default = SheetView;
