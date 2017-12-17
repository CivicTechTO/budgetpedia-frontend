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

class LinkListView extends React.Component<Props, any> {

    render() {
        let { props } = this

        let items = props.items.map((item, index) => {
            return <LinkView 
                external = { item.external }
                key = { index }
                prompt = { item.prompt }
                icon = { item.icon }
                target = { item.target }
                targetText = { item.targetText }
                description = {item.description?item.description:null}
                imageStyle = {item.imageStyle}
            />
        })

        let upperelements = []
        let lowerelements = []

        if (props.upperDivider) upperelements.push(<hr key = "upper"/>)

        if (props.lowerDivider) lowerelements.push(<hr key = "lower"/>)

        return ([...upperelements,
            <p key = "header" style={{margin:0,padding:0}}>{props.header}</p>,
            <ul key = "list">
                { items }
            </ul>,
            ...lowerelements,
            ]
        )
    }

}

export default LinkListView