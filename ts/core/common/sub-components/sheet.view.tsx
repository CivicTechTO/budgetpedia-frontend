// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

import  Editor from 'draft-js-plugins-editor'

import { EditorState } from 'draft-js'

import createHashtagPlugin from 'draft-js-hashtag-plugin'
import createLinkifyPlugin from 'draft-js-linkify-plugin'
import 'draft-js-linkify-plugin/lib/plugin.css'
import 'draft-js-hashtag-plugin/lib/plugin.css'
import 'draft-js/dist/Draft.css'

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const plugins = [
  linkifyPlugin,
  hashtagPlugin,
];


class SheetView extends React.Component<any,any> {

    state = {
      editorState: EditorState.createEmpty(),
    }

    editor

    onEditorChange = (editorState) => this.setState({editorState});

    render() {

        return (
            <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}}>
                <Paper  zDepth = {3}>
                    <div style = {{padding:'16px'}}>
                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {plugins}
                            readOnly = {false}
                            ref={(element) => { this.editor = element; }}
                        />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SheetView
