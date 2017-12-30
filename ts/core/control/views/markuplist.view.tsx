// markuplist.view.tsx

import * as React from 'react'

import MarkupBlockView from './markupblock.view'
import MarkupLineView from './markupline.view'

let MarkupListView = ({headermarkup,items}) => {

    console.log('headermarkup, items',headermarkup, items)

    let headercontent = () => {

        return <MarkupBlockView markup = {headermarkup} />

    }

    // allow sublist
    // content, fields, suffix, isSublist
    let itemcontent = items => {
        let itemlist = items.map((item,index) => {
            return <li>
                <MarkupBlockView markup = {item.content} />
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