// sheet.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import Done from 'material-ui/svg-icons/action/done'

var fileDownload = require('js-file-download')
var stringUtils = require('string')

import RenderedLink from '../forked-components/renderedlink.view'
import HeadlinesButton from '../forked-components/headlinesbutton.view'

import { EditorState, RichUtils, convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap } from 'draft-js'
import  Editor, { composeDecorators } from 'draft-js-plugins-editor'
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin'
import createLinkPlugin from 'draft-js-anchor-plugin'
import createImagePlugin from 'draft-js-image-plugin'
import ImageAdd from '../forked-components/imageadd.view'
import createAlignmentPlugin from 'draft-js-alignment-plugin'
import createFocusPlugin from 'draft-js-focus-plugin'
import createResizeablePlugin from 'draft-js-resizeable-plugin'

import * as Immutable from 'immutable'
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

let map = {
  'header-one':'h1',
  'header-two':'h2',
  'header-three':'h3',
  'header-four':'h4',
}

let HeaderWrapper = props => {

  let text = props.children[0].props.children.props.block.text
  let type = props.children[0].props.children.props.block.type
  let slug = stringUtils(text).slugify().s
  let hprops = {
    className:'content-header',
    style:{
      paddingLeft:'16px',
      marginLeft:'-16px',
      position:'relative',
    },
  }

  let tag = map[type]

  return React.createElement(tag,hprops,[props.children,
    <a key = "permalink" className="header-anchor draft-anchor" href={"#" + slug} aria-hidden="true">🔗</a>,
    <a key = "targetlink" className="target-anchor" id={slug} data-text={text} data-level = {tag} aria-hidden="true"></a>,
    ])

 }


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
        renderEditor:true,
      }

      this.assemblePlugins()

    }
   
    // declarations
    state = null
    pluginOptions
    plugins
    Toolbar
    AlignmentTool
    editor = null // element ref

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
        imagePlugin:null,
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

    assembleImagePlugin = (options) => {
      let decorator
      decorator = composeDecorators(
        options.resizeablePlugin.decorator,
        options.alignmentPlugin.decorator,
        options.focusPlugin.decorator,
      )
      let imagePlugin = createImagePlugin({
        decorator,
      })
      return imagePlugin
    }

    focus = () => {
        this.editor.focus();
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
                  renderEditor:false, // unmount editor
                },() => {

                  this.setState({
                    renderEditor:true, // remount editor
                  })

                })
              }) // setTimeout

            })

          }) // setTimeout
        })
      } else { // switch to EDIT

        this.setState({
          editorReadonly:false,
        },() => {

          setTimeout(()=> {
            this.setState({
              renderEditor:false, // unmount editor
            },() => {

              this.setState({
                renderEditor:true, // remount editor
                renderPluginTools:true, // remount plugins
              })
                
            })
          })
        }) // setTimeout
      }      
    }

    actionbuttons = () => (
      this.state.editable?<div style = {{position:'absolute',top:'-20px',right:0, zIndex:5}} >
          <FloatingActionButton 
              mini={true} 
              style={{marginRight:'20px',zIndex:2}}
              onClick = { this.toggleEdit }
          >
              {this.state.editorReadonly?<ContentEdit />:<Done />}
          </FloatingActionButton>
          <FloatingActionButton 
              mini={true} 
              style={{marginRight:'20px',zIndex:2}}
              onClick = { this.onDownload }
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
        (this.state.renderPluginTools)?
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

        const blockRenderMap = DefaultDraftBlockRenderMap.merge(
          Immutable.Map({
            'header-one': { 
              element: 'div',
              wrapper: <HeaderWrapper />,
            },
            'header-two': { 
              element: 'div',
              wrapper: <HeaderWrapper />,
            },
            'header-three': { 
              element: 'div',
              wrapper: <HeaderWrapper />,
            },
            'header-four': { 
              element: 'div',
              wrapper: <HeaderWrapper />,
            },
          })
        );

        let styles = {
            outderdiv:{backgroundColor:'#d9d9d9',padding: '16px'},
            innerdiv:{padding:'16px',position:"relative"},
        }

        return (
            <div style = {styles.outderdiv}>
                <Paper zDepth = {3} >

                    <div style = {styles.innerdiv as any} onClick={ this.focus } >

                        {this.actionbuttons()}

                        {this.state.renderEditor?<Editor 
                            editorState = {this.state.editorState} 
                            onChange = {this.onEditorChange}
                            plugins = {this.plugins}
                            readOnly = {this.state.editorReadonly}
                            handleKeyCommand={this.handleKeyCommand}
                            blockRenderMap = { blockRenderMap }
                            ref={(element) => { this.editor = element }}
                        />:null}

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
