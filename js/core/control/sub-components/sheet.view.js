'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const Paper_1 = require("material-ui/Paper");
const FloatingActionButton_1 = require("material-ui/FloatingActionButton");
const mode_edit_1 = require("material-ui/svg-icons/editor/mode-edit");
const file_download_1 = require("material-ui/svg-icons/file/file-download");
var fileDownload = require('js-file-download');
const draft_js_1 = require("draft-js");
const draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
const draft_js_static_toolbar_plugin_1 = require("draft-js-static-toolbar-plugin");
const draft_js_anchor_plugin_1 = require("draft-js-anchor-plugin");
const draft_js_image_plugin_1 = require("draft-js-image-plugin");
const imageadd_view_1 = require("./imageadd.view");
require("./sheet.styles.css");
require("draft-js/dist/Draft.css");
require("draft-js-static-toolbar-plugin/lib/plugin.css");
require("draft-js-anchor-plugin/lib/plugin.css");
require("draft-js-image-plugin/lib/plugin.css");
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
const RenderedLink = ({ children, className, entityKey, getEditorState, target, }) => {
    const entity = getEditorState().getCurrentContent().getEntity(entityKey);
    const entityData = entity ? entity.get('data') : undefined;
    const href = (entityData && entityData.url) || undefined;
    let test = 'local.link';
    let pos = href.indexOf(test);
    if (pos != -1) {
        let to = href.substring(pos + test.length);
        if (!to)
            to = '/';
        return React.createElement(react_router_dom_1.Link, { className: className, to: to }, children);
    }
    return (React.createElement("a", { className: className, title: href, href: href, target: '_blank', rel: "noopener noreferrer" }, children));
};
class SheetView extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
        this.editor = null;
        this.focus = () => {
            this.editor.focus();
        };
        this.onEditorChange = (editorState) => this.setState({ editorState });
        this.onDownload = () => {
            let { draftsource } = this.props;
            if (!draftsource)
                return;
            let { index } = draftsource;
            if (!index)
                return;
            let content = this.state.editorState.getCurrentContent();
            let rawcontent = draft_js_1.convertToRaw(content);
            let json = JSON.stringify(rawcontent);
            fileDownload(json, index + '.json');
        };
        this.handleKeyCommand = (command, editorState) => {
            const newState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this.onEditorChange(newState);
                return 'handled';
            }
            return 'not-handled';
        };
        const linkPlugin = draft_js_anchor_plugin_1.default({
            Link: RenderedLink,
            placeholder: 'local.link/path, or external url',
        });
        const imagePlugin = draft_js_image_plugin_1.default();
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
        const plugins = [
            toolbarPlugin,
            linkPlugin,
            imagePlugin
        ];
        let { draftdata } = this.props;
        let startstate;
        if (!draftdata || !Object.keys(draftdata).length) {
            startstate = draft_js_1.EditorState.createEmpty();
        }
        else {
            startstate = draft_js_1.EditorState.createWithContent(draft_js_1.convertFromRaw(draftdata));
        }
        this.state = {
            editorState: startstate,
            editorReadonly: true,
            editable: (window.location.hostname == 'budgetpedia')
        };
        this.Toolbar = Toolbar;
        this.imagePlugin = imagePlugin;
        this.plugins = plugins;
    }
    render() {
        let Toolbar = this.Toolbar;
        let plugins = this.plugins;
        return (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
            React.createElement(Paper_1.default, { zDepth: 3 },
                React.createElement("div", { style: { padding: '16px', position: 'relative', }, onClick: this.focus },
                    this.state.editable ? React.createElement("div", { style: { position: 'absolute', top: '-20px', right: 0 } },
                        React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onTouchTap: () => {
                                this.setState({
                                    editorReadonly: !this.state.editorReadonly
                                });
                            } },
                            React.createElement(mode_edit_1.default, null)),
                        React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onTouchTap: this.onDownload },
                            React.createElement(file_download_1.default, null)),
                        React.createElement(imageadd_view_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, modifier: this.imagePlugin.addImage })) : null,
                    React.createElement(draft_js_plugins_editor_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, plugins: plugins, readOnly: this.state.editorReadonly, handleKeyCommand: this.handleKeyCommand, ref: (element) => { this.editor = element; } }),
                    (!this.state.editorReadonly) ? React.createElement(Toolbar, null) : null))));
    }
}
exports.default = SheetView;
