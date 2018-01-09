'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
const FloatingActionButton_1 = require("material-ui/FloatingActionButton");
const mode_edit_1 = require("material-ui/svg-icons/editor/mode-edit");
const file_download_1 = require("material-ui/svg-icons/file/file-download");
const done_1 = require("material-ui/svg-icons/action/done");
var fileDownload = require('js-file-download');
var stringUtils = require('string');
const renderedlink_view_1 = require("../forked-components/renderedlink.view");
const headlinesbutton_view_1 = require("../forked-components/headlinesbutton.view");
const draft_js_1 = require("draft-js");
const draft_js_plugins_editor_1 = require("draft-js-plugins-editor");
const draft_js_static_toolbar_plugin_1 = require("draft-js-static-toolbar-plugin");
const draft_js_anchor_plugin_1 = require("draft-js-anchor-plugin");
const draft_js_image_plugin_1 = require("draft-js-image-plugin");
const imageadd_view_1 = require("../forked-components/imageadd.view");
const draft_js_alignment_plugin_1 = require("draft-js-alignment-plugin");
const draft_js_focus_plugin_1 = require("draft-js-focus-plugin");
const draft_js_resizeable_plugin_1 = require("draft-js-resizeable-plugin");
const Immutable = require("immutable");
require("../forked-components/sheet.styles.css");
require("draft-js/dist/Draft.css");
require("draft-js-static-toolbar-plugin/lib/plugin.css");
require("draft-js-anchor-plugin/lib/plugin.css");
require("draft-js-image-plugin/lib/plugin.css");
require("draft-js-alignment-plugin/lib/plugin.css");
require("draft-js-focus-plugin/lib/plugin.css");
const draft_js_buttons_1 = require("draft-js-buttons");
let map = {
    'header-one': 'h1',
    'header-two': 'h2',
    'header-three': 'h3',
    'header-four': 'h4',
};
let HeaderWrapper = props => {
    let { text, type } = props.children[0].props.children.props.block;
    let slug = stringUtils(text).slugify().s;
    let hprops = {
        className: 'content-header',
        style: {
            paddingLeft: '16px',
            marginLeft: '-16px',
            position: 'relative',
        },
    };
    let tag = map[type];
    return React.createElement(tag, hprops, [
        props.children,
        React.createElement("a", { key: "permalink", className: "header-anchor draft-anchor", href: "#" + slug, "aria-hidden": "true" }, "\uD83D\uDD17"),
        React.createElement("a", { key: "targetlink", className: "target-anchor", id: slug, "data-text": text, "data-level": tag, "aria-hidden": "true" }),
    ]);
};
class SheetView extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
        this.editor = null;
        this.assemblePlugins = () => {
            let linkPlugin = draft_js_anchor_plugin_1.default({
                Link: renderedlink_view_1.default,
                placeholder: 'local.link/path, or external url',
            });
            let toolbarPlugin = draft_js_static_toolbar_plugin_1.default({
                structure: [
                    draft_js_buttons_1.BoldButton,
                    draft_js_buttons_1.ItalicButton,
                    draft_js_buttons_1.UnderlineButton,
                    draft_js_buttons_1.CodeButton,
                    linkPlugin.LinkButton,
                    draft_js_static_toolbar_plugin_1.Separator,
                    headlinesbutton_view_1.default,
                    draft_js_buttons_1.UnorderedListButton,
                    draft_js_buttons_1.OrderedListButton,
                    draft_js_buttons_1.BlockquoteButton,
                    draft_js_buttons_1.CodeBlockButton
                ]
            });
            let { Toolbar } = toolbarPlugin;
            this.Toolbar = Toolbar;
            let focusPlugin = draft_js_focus_plugin_1.default();
            let alignmentPlugin = draft_js_alignment_plugin_1.default();
            let { AlignmentTool } = alignmentPlugin;
            this.AlignmentTool = AlignmentTool;
            let resizeablePlugin = draft_js_resizeable_plugin_1.default();
            let pluginOptions = {
                toolbarPlugin,
                linkPlugin,
                alignmentPlugin,
                focusPlugin,
                resizeablePlugin,
                imagePlugin: null,
            };
            let imagePlugin = this.assembleImagePlugin(pluginOptions);
            pluginOptions.imagePlugin = imagePlugin;
            this.pluginOptions = pluginOptions;
            this.plugins = [
                toolbarPlugin,
                linkPlugin,
                alignmentPlugin,
                focusPlugin,
                resizeablePlugin,
                imagePlugin,
            ];
        };
        this.assembleImagePlugin = (options) => {
            let decorator;
            decorator = draft_js_plugins_editor_1.composeDecorators(options.resizeablePlugin.decorator, options.alignmentPlugin.decorator, options.focusPlugin.decorator);
            let imagePlugin = draft_js_image_plugin_1.default({
                decorator,
            });
            return imagePlugin;
        };
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
        this.toggleEdit = () => {
            if (!this.state.editorReadonly) {
                this.setState({
                    editorReadonly: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            renderPluginTools: false,
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    renderEditor: false,
                                }, () => {
                                    this.setState({
                                        renderEditor: true,
                                    });
                                });
                            });
                        });
                    });
                });
            }
            else {
                this.setState({
                    editorReadonly: false,
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            renderEditor: false,
                        }, () => {
                            this.setState({
                                renderEditor: true,
                                renderPluginTools: true,
                            });
                        });
                    });
                });
            }
        };
        this.actionbuttons = () => (this.state.editable ? React.createElement("div", { style: { position: 'absolute', top: '-20px', right: 0, zIndex: 5 } },
            React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onClick: this.toggleEdit }, this.state.editorReadonly ? React.createElement(mode_edit_1.default, null) : React.createElement(done_1.default, null)),
            React.createElement(FloatingActionButton_1.default, { mini: true, style: { marginRight: '20px', zIndex: 2 }, onClick: this.onDownload },
                React.createElement(file_download_1.default, null))) : null);
        this.editorcontrols = () => {
            let AlignmentTool = this.AlignmentTool;
            let Toolbar = this.Toolbar;
            return [
                (this.state.renderPluginTools) ? React.createElement(AlignmentTool, { key: "alignment" }) : null,
                React.createElement("div", { key: "clear", style: { clear: "both" } }),
                (this.state.renderPluginTools) ?
                    React.createElement(Toolbar, { key: "toolbar" })
                    : null
            ];
        };
        this.imagecontrol = () => ((this.state.renderPluginTools) ?
            React.createElement(imageadd_view_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, modifier: this.pluginOptions.imagePlugin.addImage }) : null);
        let { draftdata } = this.props;
        let startstate;
        if (!draftdata || !Object.keys(draftdata).length) {
            startstate = draft_js_1.EditorState.createEmpty();
        }
        else {
            startstate = draft_js_1.EditorState.createWithContent(draft_js_1.convertFromRaw(draftdata));
        }
        this.state = {
            editable: (window.location.hostname == 'budgetpedia'),
            editorState: startstate,
            editorReadonly: true,
            renderPluginTools: false,
            renderEditor: true,
        };
        this.assemblePlugins();
    }
    render() {
        const blockRenderMap = draft_js_1.DefaultDraftBlockRenderMap.merge(Immutable.Map({
            'header-one': {
                element: 'div',
                wrapper: React.createElement(HeaderWrapper, null),
            },
            'header-two': {
                element: 'div',
                wrapper: React.createElement(HeaderWrapper, null),
            },
            'header-three': {
                element: 'div',
                wrapper: React.createElement(HeaderWrapper, null),
            },
            'header-four': {
                element: 'div',
                wrapper: React.createElement(HeaderWrapper, null),
            },
        }));
        let styles = {
            outderdiv: { backgroundColor: '#d9d9d9', padding: '16px' },
            innerdiv: { padding: '16px', position: "relative" },
        };
        return (React.createElement("article", { style: styles.outderdiv },
            React.createElement(Paper_1.default, { zDepth: 3, style: {
                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                    borderRadius: '8px',
                } },
                React.createElement("div", { style: styles.innerdiv, onClick: this.focus },
                    this.actionbuttons(),
                    this.state.renderEditor ? React.createElement(draft_js_plugins_editor_1.default, { editorState: this.state.editorState, onChange: this.onEditorChange, plugins: this.plugins, readOnly: this.state.editorReadonly, handleKeyCommand: this.handleKeyCommand, blockRenderMap: blockRenderMap, ref: (element) => { this.editor = element; } }) : null,
                    this.editorcontrols()),
                this.imagecontrol())));
    }
}
exports.default = SheetView;
