// hashanchorheader.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import MarkupLine from './markupline.view'

const removeMd = require('remove-markdown')
var stringUtils = require('string')

let HashAnchorHeader = ({tag,title}) => {

    let props = {
        className:'content-header',
        style:{
            position:'relative',
            paddingLeft:'16px',
            marginLeft:'-16px',
        },
    }

    let titletext = removeMd(title)
    let slug = stringUtils(titletext).slugify().s
    let titlenode = <MarkupLine key="title" markup = {title} />

    let permalink = <a key = "permalink" className="header-anchor markup-anchor" href={"#" + slug} aria-hidden="true">🔗</a>
    let hashtarget = <a key = "hashtarget" className="target-anchor hash-anchor" id={slug} data-text={titletext} data-level = {tag} aria-hidden="true"></a>
    let children = [titlenode,permalink,hashtarget]

    return React.createElement(tag, props, children)

}

export default HashAnchorHeader