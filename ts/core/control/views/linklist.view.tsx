// optionslist.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import LinkView from './link.view'

interface Props {
    header: string,
    items: any[],
    upperDivider?: boolean,
    lowerDivider?: boolean,
}

let LinkListView = ({header, items, upperDivider, lowerDivider}:Props) => {

    let localitems = items.map((item, index) => {
        return <LinkView 
            external = { item.external }
            key = { index }
            prompt = { item.prompt }
            icon = { item.icon }
            target = { item.target }
            targetText = { item.targetText }
            description = {item.description?item.description:null}
            suffix = {item.suffix?item.suffix:null}
            imageStyle = {item.imageStyle}
        />
    })

    let upperelements = []
    let lowerelements = []

    if (upperDivider) upperelements.push(<hr key = "upper"/>)

    if (lowerDivider) lowerelements.push(<hr key = "lower"/>)

    return (
        <div>
            {[...upperelements,
            <p key = "header" style={{margin:0,padding:0}}>{header}</p>,
            <ul key = "list">
                { localitems }
            </ul>,
            ...lowerelements,
            ]}
        </div>
    )

}

export default LinkListView