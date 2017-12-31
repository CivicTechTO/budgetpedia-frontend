// markuplist.view.tsx

// TODO allow for sublists = isSublist property in item

import * as React from 'react'

import MarkupBlockView from './markupblock.view'
import MarkupLineView from './markupline.view'

let Fields = ({fields}) => {
    let fieldlist = []
    for (let index in fields) {
        let field = fields[index]
        let {name, content} = field
        fieldlist.push(
            <div key = {index} >
                <span style = {{fontStyle:'italic'}} >{name}: </span>
                <MarkupLineView markup = {content} />
            </div>
        )
    }
    if (!fieldlist.length) return null
    return <div>{fieldlist}</div>
}

let MarkupListView = ({headermarkup,items}) => {

    let headercontent = () => {

        return <MarkupBlockView markup = {headermarkup} />

    }

    // allow sublist
    // content, fields, suffix, isSublist
    let itemcontent = items => {
        let itemlist = items.map(( item, index ) => {
            return <li key = { index } >
                {item.content?<MarkupBlockView markup = {item.content} />:null}
                {item.fields?<Fields fields = {item.fields} />:null}
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
