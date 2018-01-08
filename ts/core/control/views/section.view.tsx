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

        let { title, description, children, style, id } = this.props
        let defaultstyle = {
            maxWidth:'800px',
            paddingBottom:'8px',
            margin:'0 auto 12px auto',
            paddingBotton:'1px',
            backgroundColor: '#d9d9d9',
        }

        return <section id = {id} style = {{...defaultstyle,...style}}>

            {
                title?
                <div style = {{backgroundColor:"#d9d9d9",padding:"8px",borderTop:"4px solid silver"}}>
                    <h1><MarkupLine markup = {title} /></h1>


                    {description?
                        <MarkupBlock markup = {description} />:null}

                </div>:null
            }

            { children }

        </section>
    }

}

export default SectionView
