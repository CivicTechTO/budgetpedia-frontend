// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

import  Editor from 'draft-js-plugins-editor'
import { EditorState, RichUtils } from 'draft-js'

import 'draft-js/dist/Draft.css'

const plugins = []

class SheetView extends React.Component<any,any> {

    state = {
      editorState: EditorState.createEmpty(),
    }

    editor

    focus = () => {
        this.editor.focus();
    }

    onEditorChange = (editorState) => this.setState({editorState});

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onEditorChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    render() {

        return (
            <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}} onClick={this.focus}>
                <Paper  zDepth = {3}>
                    <div style = {{padding:'16px'}}>
                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {plugins}
                            handleKeyCommand={this.handleKeyCommand}
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
