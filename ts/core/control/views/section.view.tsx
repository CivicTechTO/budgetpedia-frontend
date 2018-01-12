// section.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: upgrade to component; use markdown for title/description
*/

'use strict'

import * as React from 'react';

import MarkupBlock from './markupblock.view'
import HashAnchorHeader from './hashanchorheader.view'

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
                <header style = {{backgroundColor:"#d9d9d9",padding:"0px 16px 1px",borderTop:"4px solid silver"}}>

                    <HashAnchorHeader tag = 'h1' title = {title} />

                    { description?<MarkupBlock markup = {description} />:null }

                </header>:null
            }
            <main>
                { children }
            </main>

        </section>
    }

}

export default SectionView
