// markuplist.view.tsx

// TODO allow for sublists = isSublist property in item
// allow for horizontal presentation of fields

import * as React from 'react'

import MarkupBlockView from './markupblock.view'
import MarkupLineView from './markupline.view'
import Chip from 'material-ui/Chip'
let moment = require('moment')

let Fields = ({fields,fieldproperties,fieldmeta}) => {
    let fieldlist = []
    for (let index in fields) {
        let field = fields[index]
        let name
        let content 
        // console.log('index, fields',index, fields)
        if (!fieldproperties.commonstructure) {
            name = field.name
            content = field.content
        } else {
            name = fieldmeta[index].name
            content = field
        }
        if (fieldmeta[index].type == 'date') {
            content = moment(content,fieldmeta[index].layout).format(fieldmeta[index].format)
        }
        let rowstyle = null
        if (fieldproperties.horizontal) {
            rowstyle = 
                {
                    display:'inline',
                    borderRight:'1px solid silver',
                    paddingRight:'8px',
                    marginRight:'8px',
                }
        }
        fieldlist.push(
            <div key = {index} style = {rowstyle}>
                <div style = {{fontStyle:'italic',display:'inline'}} >{name}: </div>
                <MarkupLineView markup = {content} style={{display:'inline'}} />
            </div>
        )
    }
    if (!fieldlist.length) return null
    return <div style = {{marginBottom:'8px'}}>{fieldlist}</div>
}

class MarkupListView extends React.Component<any,any> {

    state = {
        compacted:this.props.compacted,
        expanded:!!this.props.expanded,
    }

    // allow sublist
    // content, fields, suffix, isSublist
    itemcontent = (items, fieldproperties, fieldmeta) => {
        let itemlist = items.map(( item, index ) => {
            return <li key = { index } >
                {item.content?<MarkupBlockView markup = {item.content} />:null}
                {item.fields?<Fields fields = {item.fields} fieldproperties = {fieldproperties} fieldmeta = {fieldmeta} />:null}
                {item.suffix?<MarkupBlockView markup = {item.suffix} />:null}
            </li>
        })
        return (
            <ul>
                {itemlist}
            </ul>
        )
    }

    headercontent = (headermarkup) => {

        return <MarkupBlockView markup = {headermarkup} />

    }


    render() {

        let {fieldproperties,fieldmeta,headermarkup,items} = this.props

        let maxHeight = (this.state.compacted && !this.state.expanded)?'250px':'none'

        let chipstyle =                         
        {
            position:'absolute',
            right:0,
            bottom:0,
            margin:'0 3px 3px 0',
            backgroundColor:'rgba(192,192,192,.4)',
            pointerEvents:'auto',
        }

        let fillerheight = (this.state.compacted && this.state.expanded)?'32px':'none'


        console.log('maxHeight',maxHeight, this.state.compacted, this.state.expanded)

        return <div style = 
            {
                {
                    position:'relative',
                    maxHeight:maxHeight,
                    overflow:'hidden',
                    transition:'max-height .5s'
                }
            } >
            <div>
                {this.headercontent(headermarkup)}
                {this.itemcontent(items, fieldproperties, fieldmeta)}
            </div>
            <div style = {{height:fillerheight,transition:'height .5s'}}>
            </div>
            {this.state.compacted?<div style = {
                {
                    position:'absolute',
                    bottom:0,
                    height:'4.5em',
                    backgroundColor:'red',
                    width:'100%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',          }
                } >
                {!this.state.expanded?<Chip 
                    onClick = {() => {
                        console.log('clicked show more')
                        this.setState({ expanded:true })
                    }}
                    style = {chipstyle as any}><span className="material-icons"
                        style = {{verticalAlign:'middle'}} >keyboard_arrow_down</span> Show more</Chip>
                :<Chip 
                    onClick = {() => {
                        console.log('clicked show less')
                        this.setState({ expanded:false })
                    }}
                    style = { chipstyle as any } >
                        <span className="material-icons"
                        style = {{verticalAlign:'middle'}} >keyboard_arrow_up</span> Show less</Chip>}
            </div>:null}
        </div>
    }
}

export default MarkupListView
