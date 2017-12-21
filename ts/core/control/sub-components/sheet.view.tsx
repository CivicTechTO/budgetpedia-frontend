// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
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
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'
// -----------------------------[ plugin compliance ]-------------------------------
// from draft-js-plugins.com
import '../forked-components/sheet.styles.css'
import 'draft-js/dist/Draft.css'
import 'draft-js-static-toolbar-plugin/lib/plugin.css'
import 'draft-js-anchor-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'
import 'draft-js-focus-plugin/lib/plugin.css'

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons'


// --------------------------------[ end of plugins compliance ]---------------------------------

class SheetView extends React.Component<any,any> {

    constructor(props) {
      super(props)

      let { draftdata } = this.props

      let startstate
      if (!draftdata || !Object.keys(draftdata).length) {
        startstate = EditorState.createEmpty()
      } else {
        startstate = EditorState.createWithContent(convertFromRaw(draftdata))
      }

      this.state = {
        editable: (window.location.hostname == 'budgetpedia'), //TODO temporary
        editorState: startstate,
        editorReadonly: true,
        renderPluginTools:false,
        renderEditorTools:true,
      }

      this.assemblePlugins()

    }

    assemblePlugins = () => {

      // core initialization

      let linkPlugin = createLinkPlugin({
        Link:RenderedLink,
        placeholder:'local.link/path, or external url',
      })

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
      this.Toolbar = Toolbar

      let focusPlugin = createFocusPlugin();
      let alignmentPlugin = createAlignmentPlugin();

      let { AlignmentTool } = alignmentPlugin
      this.AlignmentTool = AlignmentTool      

      let resizeablePlugin = createResizeablePlugin()

      let pluginOptions = {
        toolbarPlugin, 
        linkPlugin, 
        alignmentPlugin,
        focusPlugin,
        resizeablePlugin,
        imagePlugin:null
      }

      let imagePlugin = this.assembleImagePlugin(pluginOptions)

      pluginOptions.imagePlugin = imagePlugin

      this.pluginOptions = pluginOptions

      this.plugins = [
        toolbarPlugin, 
        linkPlugin, 
        alignmentPlugin,
        focusPlugin,
        resizeablePlugin,
        imagePlugin,
      ]

    }

    pluginOptions

    imageDecorator

    assembleImagePlugin = (options) => {
      let decorator
      decorator = composeDecorators(
        options.resizeablePlugin.decorator,
        options.alignmentPlugin.decorator,
        options.focusPlugin.decorator,
      )
      this.imageDecorator = decorator
      let imagePlugin = createImagePlugin({
        decorator,
      })
      return imagePlugin
    }

    state = null

    // declarations
    staticToolbarPlugin
    Toolbar
    AlignmentTool
    plugins

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
      if (!this.state.editorReadonly) { // switch to READONLY
        this.setState({
          editorReadonly:true
        },() => {

          setTimeout(()=>{
            this.setState({
              renderPluginTools:false, // unmount plugins
            },() => {

              setTimeout(()=> {
                this.setState({
                  renderEditorTools:false, // unmount editor
                },
                () => {

                    this.setState({
                      renderEditorTools:true, // remount editor
                    })

                })
              })
            })

          })
        })
      } else { // switch to EDIT

        this.setState({
          editorReadonly:false,
        },() => {

          setTimeout(()=> {
            this.setState({
              renderEditorTools:false, // unmount editor
            }, () => {

                this.setState({
                  renderEditorTools:true, // remount editor
                  renderPluginTools:true, // remount plugins
                })
                
            })
          })
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
        (this.state.renderPluginTools)?<AlignmentTool key="alignment"/>:null,
        <div key="clear" style = {{clear:"both"}}></div>,
        (!this.state.editorReadonly)?
            <Toolbar key="toolbar" />
          :null
      ]
    }

    imagecontrol = () => (
      (this.state.renderPluginTools)?
        <ImageAdd 
          editorState={this.state.editorState}
          onChange={this.onEditorChange}
          modifier={this.pluginOptions.imagePlugin.addImage}
        />:null
    )

    render() {

        let styles = {
            outderdiv:{backgroundColor:'#d9d9d9',padding: '16px'},
            innerdiv:{padding:'16px',position:"relative"},
        }

        return (
            <div style = {styles.outderdiv}>
                <Paper zDepth = {3} >

                    <div style = {styles.innerdiv as any} onClick={this.focus} >

                        {this.actionbuttons()}

                        {this.state.renderEditorTools?<Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {this.plugins}
                            readOnly = {this.state.editorReadonly}
                            handleKeyCommand={this.handleKeyCommand}
                            ref={(element) => { this.editor = element }}
                        />:null}

                        {this.state.renderEditorTools?this.editorcontrols():null}

                    </div>
                    {/* ImageAdd must be outside scope of auto-focus */}
                    {this.state.renderEditorTools?this.imagecontrol():null}

                </Paper>
            </div>
        )
    }
}

export default SheetView
