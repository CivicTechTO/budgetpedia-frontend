// markupblock.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import { Link } from 'react-router-dom'

import HtmlView from './html.view'
let mdit = require('markdown-it')
let mda = require('markdown-it-attrs')
let md = new mdit({html:true})
md.use(mda)

const MarkupBlock = ({markup,style}:{markup:string,style?:object}) => (
    <HtmlView style = {{...style}} html={md.render(markup)} />
)

export default MarkupBlock