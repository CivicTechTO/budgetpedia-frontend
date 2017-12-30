// markuplist.view.tsx

import * as React from 'react'

let MarkupListView = ({headermarkup,items}) => {

    let headercontent = () => {
        return <div>
        </div>
    }

    // allow sublist
    // content, fields, suffix, isSublist
    let itemcontent = items => {
        let itemlist = []
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