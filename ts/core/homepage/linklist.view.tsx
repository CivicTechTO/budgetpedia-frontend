// optionslist.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import LinkView from './link.view'

interface Props {
    header: string,
    items: any[],
}

class LinkListView extends React.Component<Props, any> {

    render() {
        let { props } = this

        let items = props.items.map((item, index) => {
            return <LinkView 
                key = {index}
                prompt = {item.prompt}
                icon = { item.icon }
                target = { item.target }
                targetText = { item.targetText }
            />
        })

        return ([
            <p style={{margin:0,padding:0}}>{props.header}</p>,
            <ul>
                { items }
            </ul>
            ]
        )
    }

}

export default LinkListView