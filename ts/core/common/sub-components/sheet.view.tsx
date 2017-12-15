// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

import { Editor, EditorState, ContentState, convertFromHTML, convertFromRaw, CompositeDecorator } from 'draft-js'

/*
    outer div = frameStyles
    inner dif = linerStyles
*/

const sampleMarkup =
  '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
  '<a href="http://www.facebook.com">Example link</a>'

const blocksFromHTML = convertFromHTML(sampleMarkup)
console.log('blocksFromHTML',blocksFromHTML)
const state = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
)

function findLinkEntities(contentBlock, callback, contentState) {
contentBlock.findEntityRanges(
  (character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  },
  callback
);
}
const Link = (props) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a href={url} target = '_blank'>
        {props.children}
      </a>
    );
};

const decorator = new CompositeDecorator([
{
  strategy: findLinkEntities,
  component: Link,
},
// {
//   strategy: findImageEntities,
//   component: Image,
// },
])


class SheetView extends React.Component<any,any> {

    state = {
      editorState: EditorState.createWithContent(state,decorator),
    }

    onEditorChange = (editorState) => this.setState({editorState});

    componentDidMount() {
        console.log('sheet props',this.props)
    }

    render() {

        return (
            <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}}>
                <Paper  zDepth = {3}>
                    <div style = {{padding:'16px'}}>
                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            readOnly = {true}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SheetView
