// markupblock.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import HtmlView from './html.view'
let mdit = require('markdown-it')
let mda = require('markdown-it-attrs')
let mdt = require('markdown-it-modify-token')
let mdf = require('markdown-it-implicit-figures') // ??
let mdislugs = require('../forked-components/markdown-it-anchor')
let md = new mdit({html:true,
  modifyToken: function (token, env) {
    // see API https://markdown-it.github.io/markdown-it/#Token
    // token will also have an attrObj property added for convenience
    // which allows easy get and set of attribute values.
    // It is prepopulated with the current attr values.
    // Values returned in token.attrObj will override existing attr values.
    // env will contain any properties passed to markdown-it's render
    // Token can be modified in place, no return is necessary
    switch (token.type) {
    case 'link_open': {
      if (token.attrObj.href.substr(0,1) == "/") {
          token.attrObj.onclick = 'storybuilder_global.navigateViaRouter(event)'
      } else {
          token.attrObj.target = '_blank'; // set all links to open in new window
      }
      break;
      }
    }
  }
})

let anchorcallback = (token, data) => {
  console.log('token, data', token, data)
}

md.use(mda).use(mdt).use(mdf,{figcaption:true}).use(mdislugs,
  {
    level:[1,2,3,4],
    permalink:true, 
    permalinkSymbol:'&#128279;',
    useTargetlink:true,
    permalinkBefore: true,
    // callback:anchorcallback,
  })

const MarkupBlock = ({markup,style}:{markup:string,style?:object}) => (
    <HtmlView style = {{...style}} html={md.render(markup)} />
)

export default MarkupBlock