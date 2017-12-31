// markuplist.view.tsx

// TODO allow for sublists = isSublist property in item
// allow for horizontal presentation of fields

import * as React from 'react'

import MarkupBlockView from './markupblock.view'
import MarkupLineView from './markupline.view'
let moment = require('moment')

let Fields = ({fields,fieldproperties,fieldmeta}) => {
    let fieldlist = []
    for (let index in fields) {
        let field = fields[index]
        let name
        let content 
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

let MarkupListView = ({fieldproperties,fieldmeta,headermarkup,items}) => {

    let headercontent = () => {

        return <MarkupBlockView markup = {headermarkup} />

    }

    // allow sublist
    // content, fields, suffix, isSublist
    let itemcontent = items => {
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

    return <div>
        {headercontent()}
        {itemcontent(items)}
    </div>
}

export default MarkupListView
