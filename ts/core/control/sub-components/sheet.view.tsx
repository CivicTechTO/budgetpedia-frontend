// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'
import { Link } from 'react-router-dom'

import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit'
import FileDownload from 'material-ui/svg-icons/file/file-download'

var fileDownload = require('js-file-download')

import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import  Editor from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createLinkPlugin from 'draft-js-anchor-plugin'


// -----------------------------[ plugin compliance ]-------------------------------
// from draft-js-plugins.com
import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-anchor-plugin/lib/plugin.css'
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
} from 'draft-js-buttons'

// copy-paste below
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

// copy-paste below (more or less)
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

// --------------------------------[ end of plugins compliance ]---------------------------------

// RenderedLink taken after 
// https://github.com/draft-js-plugins/draft-js-plugins/blob/master/draft-js-anchor-plugin/src/components/Link/index.js
// modified by adding conditional for when user enters 'local.link/somepath' 
// that generates a router Link instead of an anchor link
const RenderedLink = ({
  children,
  className,
  entityKey,
  getEditorState,
  target,
}) => {

  const entity = getEditorState().getCurrentContent().getEntity(entityKey);
  const entityData = entity ? entity.get('data') : undefined;
  const href = (entityData && entityData.url) || undefined;

  // conditional added by HB
  let test = 'local.link'
  let pos = href.indexOf(test)
  if (pos != -1) {
    let to = href.substring(pos + test.length)
    if (!to) to = '/'
    // TODO not sure about className -- needs testing
    return <Link className = {className} to = {to}>{children}</Link>
  }
  // end of conditional

  return (
    <a
      className={className}
      title={href}
      href={href}
      target='_blank'
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )

}

class SheetView extends React.Component<any,any> {

    constructor(props) {
      super(props)

      const linkPlugin = createLinkPlugin({
        Link:RenderedLink,
      })

      const toolbarPlugin = createToolbarPlugin({
        structure: [
          BoldButton,
          ItalicButton,
          UnderlineButton,
          CodeButton,
          linkPlugin.LinkButton,
          Separator,
          HeadlinesButton,
          UnorderedListButton,
          OrderedListButton,
          BlockquoteButton,
          CodeBlockButton
        ]
      });
      const { Toolbar } = toolbarPlugin;
      const plugins = [toolbarPlugin, linkPlugin];


      let { draftdata } = this.props

      let startstate
      if (!draftdata || !Object.keys(draftdata).length) {
        startstate = EditorState.createEmpty()
      } else {
        startstate = EditorState.createWithContent(convertFromRaw(draftdata))
      }

      this.state = {
        editorState: startstate,
        editorReadonly: true
      }

      this.Toolbar = Toolbar

      this.plugins = plugins
    }

    state = null

    staticToolbarPlugin
    Toolbar
    plugins

    editor = null

    focus = () => {
        this.editor.focus();
    }

    onEditorChange = (editorState) => this.setState({editorState});

    // workaround until back end is set up. 
    // Downloads rawContent, which dev than has to save to model/data/draft/ 
    onDownload = () => {

      let { draftsource } = this.props
      if (!draftsource) return
      let { index } =  draftsource
      if (!index) return

      let content = this.state.editorState.getCurrentContent()
      let rawcontent = convertToRaw(content)
      let json = JSON.stringify(rawcontent)
      fileDownload(json,index + '.json')

    }

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
                    <div style = {{padding:'16px',position:'relative',}} onClick={this.focus}>
                        <div style = {{position:'absolute',top:'-20px',right:0}} >
                            <FloatingActionButton 
                                mini={true} 
                                style={{marginRight:'20px',zIndex:2}}
                                onTouchTap = { () => 
                                    {
                                        this.setState({
                                            editorReadonly: !this.state.editorReadonly
                                        })
                                    }
                                }
                            >
                                <ContentEdit />
                            </FloatingActionButton>
                            <FloatingActionButton 
                                mini={true} 
                                style={{marginRight:'20px',zIndex:2}}
                                onTouchTap = { this.onDownload }
                            >
                                <FileDownload />
                            </FloatingActionButton>
                        </div>
                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {plugins}
                            readOnly = {this.state.editorReadonly}
                            handleKeyCommand={this.handleKeyCommand}
                            ref={(element) => { this.editor = element; }}
                        />
                        {(!this.state.editorReadonly)?<Toolbar />:null}
                    </div>
                </Paper>
            </div>
        )
    }
}

export default SheetView
