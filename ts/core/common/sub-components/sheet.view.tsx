// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

import { EditorState, RichUtils } from 'draft-js'
import  Editor from 'draft-js-plugins-editor'
import createToolbarPlugin from 'draft-js-static-toolbar-plugin'

import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import './editorstyles.css'

class SheetView extends React.Component<any,any> {

    constructor(props) {
      super(props)
      let staticToolbarPlugin = createToolbarPlugin()

      let { Toolbar } = staticToolbarPlugin
      this.Toolbar = Toolbar

      let plugins = [staticToolbarPlugin]
      this.plugins = plugins
    }

    state = {
      editorState: EditorState.createEmpty(),
    }

    staticToolbarPlugin
    Toolbar
    plugins

    editor = null

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

        let Toolbar = this.Toolbar

        let plugins = this.plugins

        return (
            <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}}>
                <Paper  zDepth = {3} >
                    <div style = {{padding:'16px'}} onClick={this.focus}>
                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {plugins}
                            readOnly = {false}
                            handleKeyCommand={this.handleKeyCommand}
                            ref={(element) => { this.editor = element; }}
                        />
                        <Toolbar />
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SheetView
