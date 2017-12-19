// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit'
import FileDownload from 'material-ui/svg-icons/file/file-download'

var fileDownload = require('js-file-download')

import RenderedLink from '../forked-components/renderedlink.view'
import HeadlinesButton from '../forked-components/headlinesbutton.view'

import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import  Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createLinkPlugin from 'draft-js-anchor-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import ImageAdd from '../forked-components/imageadd.view'
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
// -----------------------------[ plugin compliance ]-------------------------------
// from draft-js-plugins.com
import './sheet.styles.css'
import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-anchor-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';

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


// --------------------------------[ end of plugins compliance ]---------------------------------

class SheetView extends React.Component<any,any> {

    constructor(props) {
      super(props)

      let linkPlugin = createLinkPlugin({
        Link:RenderedLink,
        placeholder:'local.link/path, or external url',
      })

      let focusPlugin = createFocusPlugin();
      let resizeablePlugin = createResizeablePlugin();
      let alignmentPlugin = createAlignmentPlugin();
      let { AlignmentTool } = alignmentPlugin;

      let decorator = composeDecorators(
        resizeablePlugin.decorator,
        alignmentPlugin.decorator,
        focusPlugin.decorator,
      );
      let imagePlugin = createImagePlugin({
        decorator,
      });

      let toolbarPlugin = createToolbarPlugin({
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
      })

      let { Toolbar } = toolbarPlugin

      let plugins = [
        toolbarPlugin, 
        linkPlugin, 
        focusPlugin,
        alignmentPlugin,
        resizeablePlugin,
        imagePlugin,
      ]

      let { draftdata } = this.props

      let startstate
      if (!draftdata || !Object.keys(draftdata).length) {
        startstate = EditorState.createEmpty()
      } else {
        startstate = EditorState.createWithContent(convertFromRaw(draftdata))
      }

      this.state = {
        editorState: startstate,
        editorReadonly: false,
        editable: (window.location.hostname == 'budgetpedia'), //TODO temporary
        renderImageTools:true
      }

      this.Toolbar = Toolbar

      this.imagePlugin = imagePlugin

      this.AlignmentTool = AlignmentTool

      this.plugins = plugins
    }

    state = null

    // declarations
    staticToolbarPlugin
    Toolbar
    AlignmentTool
    plugins
    imagePlugin

    editor = null // element ref

    focus = () => {
        this.editor.focus();
    }

    blur = () => {
        this.editor.blur();
    }

    onEditorChange = (editorState) => this.setState({editorState});

    // workaround until back end is set up. 
    // Downloads rawContent, which dev than has to save to model/data/draft/, and recompile :-(
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

    toggleEdit = () => {
      if (!this.state.editorReadonly) {
        console.log('readonly true')
        this.blur()
        this.focus() // for AlignmentTool
        this.setState({
          editorReadonly:true
        },() => {
          setTimeout(()=>{
            this.setState({
              renderImageTools:false
            })
          })
        })
      } else {
        console.log('readonly false')
        this.setState({
          editorReadonly:false,
          renderImageTools:true,
        })
      }      
    }

    actionbuttons = () => (
      this.state.editable?<div style = {{position:'absolute',top:'-20px',right:0}} >
          <FloatingActionButton 
              mini={true} 
              style={{marginRight:'20px',zIndex:2}}
              onTouchTap = { this.toggleEdit }
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
      </div>:null )

    editorcontrols = () => {
      let AlignmentTool = this.AlignmentTool
      let Toolbar = this.Toolbar
      return [
        ((this.state.renderImageTools)?<AlignmentTool key="alignment"/>:null),
        <div key="clear" style = {{clear:"both"}}></div>,
        (!this.state.editorReadonly)?
            <Toolbar key="toolbar" />
          :null
      ]
    }

    imagecontrol = () => (
      (this.state.renderImageTools)?
        <ImageAdd 
          editorState={this.state.editorState}
          onChange={this.onEditorChange}
          modifier={this.imagePlugin.addImage}
        />:null
    )

    render() {

        let Toolbar = this.Toolbar

        let AlignmentTool = this.AlignmentTool

        let plugins = this.plugins

        return (
            <div style = {{backgroundColor:'#d9d9d9',padding: '16px'}}>
                <Paper zDepth = {3} >
                    <div style = {{padding:'16px',position:'relative',}} onClick={this.focus}>

                        {this.actionbuttons()}

                        <Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {plugins}
                            readOnly = {this.state.editorReadonly}
                            handleKeyCommand={this.handleKeyCommand}
                            ref={(element) => { this.editor = element }}
                        />

                        {this.editorcontrols()}

                    </div>
                    {/* ImageAdd must be outside scope of auto-focus */}

                    {this.imagecontrol()}

                </Paper>
            </div>
        )
    }
}

export default SheetView
