// markupline.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import HtmlView from './html.view'
let mdit = require('markdown-it')
let mda = require('markdown-it-attrs')
let md = new mdit({html:true})
md.use(mda)

const MarkupLine = ({markup,style}:{markup:string,style?:object}) => (
    <HtmlView style = {{display:'inline-block',...style}} html={md.renderInline(markup)} />
)

export default MarkupLine