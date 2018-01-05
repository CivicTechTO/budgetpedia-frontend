// markuplist.view.tsx

/*
    TODO 
        - allow for sublists = isSublist property in item
        - allow for horizontal presentation of fields
        - offset close list with window scroll
*/
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
        outerheight:'auto',
        opaque:(this.props.compacted && !this.props.expanded)
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

    outernode = null
    innernode = null

    onExpand = () => {
        this.setState(
            { 
                outerheight:this.outernode.clientHeight + 'px',
                expanded:true,
                opaque:false,
            },() => {
                this.setState(
                    {
                        outerheight:this.innernode.offsetHeight + 'px',
                    },() => {
                        setTimeout(()=>{
                            this.setState({
                                outerheight:'auto',
                            })
                        },600)
                    }
                )
            }
        )
    }

    onContract = () => {
        this.setState(
            { 
                outerheight:this.outernode.offsetHeight + 'px',
                opaque:true,
            },() => {
                setTimeout(()=>{
                    this.setState({
                        outerheight:'250px',
                    },() => {
                        setTimeout( ()=>{
                            this.setState(
                                {
                                    expanded:false,
                                    outerheight:'auto',
                                }
                            )
                        },600)
                    })
                })
            }
        )
    }

    render() {

        let {fieldproperties,fieldmeta,headermarkup,items} = this.props

        let maxHeight = (this.state.compacted && !this.state.expanded)?'250px':'none'

        let chipstyle =                         
        {
            float:'right',
            margin:'-24px 3px 3px 3px',
            backgroundColor:'rgba(192,192,192,.2)',
            fontSize:'x-small',
            fontStyle:'italic',
        }

        let opacity = (this.state.compacted && !this.state.opaque)?0:1

        let outerstyle = 
            {
                position:'relative',
                height:this.state.outerheight,
                maxHeight:maxHeight,
                overflow:'hidden',
                transition:'height .5s'
            }

        return (

        <div 
            ref = {node => {this.outernode = node}}
            style = { outerstyle as any }
        >
            {/* the div has a hidden border to protect from outside height influences per expand animation */}
            <div
                style = {{border:'1px solid white'}}
                ref = {node => {this.innernode = node}}
            >
                {this.headercontent(headermarkup)}

                {this.state.compacted?
                    !this.state.expanded?<Chip 
                        onClick = {this.onExpand}
                        style = {chipstyle as any}><span className="material-icons"
                            style = {{verticalAlign:'middle'}} >keyboard_arrow_down</span> Show more</Chip>
                    :<Chip 
                        onClick = {this.onContract}
                        style = { chipstyle as any } >
                            <span className="material-icons"
                            style = {{verticalAlign:'middle'}} >keyboard_arrow_up</span> Show less</Chip>
                :null
                }
                {this.itemcontent(items, fieldproperties, fieldmeta)}
            </div>
            {this.state.compacted?<div style = {
                {
                    opacity:opacity,
                    transition:'opacity .5s',
                    position:'absolute',
                    bottom:0,
                    height:'4.5em',
                    width:'100%',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',          }
                } >
            </div>:null}
        </div>
        )
    }
}

export default MarkupListView
