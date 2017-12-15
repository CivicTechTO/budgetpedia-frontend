'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
const draft_js_1 = require("draft-js");
const sampleMarkup = '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
    '<a href="http://www.facebook.com">Example link</a>';
const blocksFromHTML = draft_js_1.convertFromHTML(sampleMarkup);
console.log('blocksFromHTML', blocksFromHTML);
const state = draft_js_1.ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (entityKey !== null &&
            contentState.getEntity(entityKey).getType() === 'LINK');
    }, callback);
}
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (React.createElement("a", { href: url, target: '_blank' }, props.children));
};
const decorator = new draft_js_1.CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
]);
class SheetView extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            editorState: draft_js_1.EditorState.createWithContent(state, decorator),
        };
        this.onEditorChange = (editorState) => this.setState({ editorState });
    }
    componentDidMount() {
        console.log('sheet props', this.props);
    }
    render() {
        return (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
            React.createElement(Paper_1.default, { zDepth: 3 },
                React.createElement("div", { style: { padding: '16px' } },
                    React.createElement(draft_js_1.Editor, { editorState: this.state.editorState, onChange: this.onEditorChange, readOnly: true })))));
    }
}
exports.default = SheetView;
