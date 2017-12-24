// section.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: upgrade to component; use markdown for title/description
*/

'use strict'

import * as React from 'react';

import MarkupLine from './markupline.view'
import MarkupBlock from './markupblock.view'

class SectionView extends React.Component<any,any>{

    render() {

        let { title, description, children, style } = this.props

        return <div style = {style}>

            {
                title?
                <div style = {{backgroundColor:"#d9d9d9",padding:"8px",borderTop:"4px solid silver"}}>
                    <h1><MarkupLine markup = {title} /></h1>


                    {description?
                        <MarkupBlock markup = {description} />:null}

                </div>:null
            }

            { children }

        </div>
    }

}

export default SectionView
