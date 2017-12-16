// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import Paper from 'material-ui/Paper'

import { EditorState, RichUtils } from 'draft-js'
import  Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'

import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import './editorstyles.css'

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

class HeadlinesPicker extends React.Component<any,any> {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component<any,any> {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={"headlineButtonWrapper"}>
        <button onClick={this.onClick} className={"headlineButton"}>
          H
        </button>
      </div>
    );
  }
}

class SheetView extends React.Component<any,any> {

    constructor(props) {
      super(props)


        const toolbarPlugin = createToolbarPlugin({
          structure: [
            BoldButton,
            ItalicButton,
            UnderlineButton,
            CodeButton,
            Separator,
            HeadlinesButton,
            UnorderedListButton,
            OrderedListButton,
            BlockquoteButton,
            CodeBlockButton
          ]
        });
        const { Toolbar } = toolbarPlugin;
        const plugins = [toolbarPlugin];

      this.Toolbar = Toolbar

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
