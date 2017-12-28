// nuggetlist.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import NuggetView from './nugget.view'

import ScrollControlsView from './scrollcontrols.view'

import HtmlView from './html.view'
let mdit = require('markdown-it')
let mda = require('markdown-it-attrs')
let md = new mdit({html:true})
md.use(mda)


interface Props {
    nuggets: {
        image?:string,
        style?:object,
        kickerStyle?:object
        prefix?:string,
        infix?:string,
        suffix?:string,
        contrast?:boolean,
    }[],
    image?: string,
    title?: string,
    style?: object,
    contrast?: boolean,
}

class NuggetList extends React.Component< Props, any > {

    componentDidMount() {
        this.setState({
            scroller:this.scroller
        })
    }

    state = {
        scroller:null,
    }

    scroller = null

    render() {

        let { nuggets:nuggetdata, image, title, style, contrast } = this.props

        let defaultstyle = {
            position:'relative',
            backgroundColor: image?'none':'green',
            backgroundImage: image?`url(${image})`:'none',
            backgroundSize: image?'cover':'auto',
            marginBottom:'30px',
        }

        let defaultScrollBlockstyle = {
            padding:"16px",
            display: 'block',
            overflowX: 'scroll',             
        }

        let nuggets = nuggetdata.map ( function ( data, index ) {

            return (
                <NuggetView 
                    key     = { index } 
                    image  = { data.image }
                    style = { data.style }
                    prefix = { data.prefix } 
                    infix = { data.infix }
                    suffix = { data.suffix }
                    contrast = { data.contrast }
                />
            )
        })
        return (
            <div style = {{...defaultstyle,...style}} >
                <div style = {
                    {
                        position:'absolute',
                        left:'0',
                        top:'0',
                        padding:'8px 3px',
                        zIndex:2,
                    }
                }>

                    <div style = {
                        {
                            display:'inline-block',
                            color:'white',
                            verticalAlign:'top',
                        }
                    }>{ <HtmlView html={md.renderInline(title)} /> }
                    </div>

                </div>
                <ScrollControlsView scroller = {this.state.scroller}>
                <div 
                    style = {defaultScrollBlockstyle as any /*ts typing issue*/}
                    ref = { el => {this.scroller = el}}
                >
                    <div
                        style = {
                            {
                                display: 'block',
                                whiteSpace:'nowrap',
                                position:'relative',
                                marginTop:'20px',
                            }
                        }>
                        { nuggets }
                    </div>
                </div>
                </ScrollControlsView>
            </div>
        )
    }
}

export default NuggetList