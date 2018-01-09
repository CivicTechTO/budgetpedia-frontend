// cardtitle.view.tsx
// copyright (c) 2018 Henrik Bechmann, Toronto, MIT Licence

// this is a wrapper for CardTitle to include anchors, and integrate markdown

'use strict'

import * as React from 'react';

import { CardTitle } from 'material-ui/Card'

import MarkupLine from './markupline.view'

const removeMd = require('remove-markdown')
var stringUtils = require('string')

let CardTitleView = (props) => {

    let localprops = Object.assign({},props)

    let { title, subtitle } = localprops
    let titletext = null
    let slug = null
    let tag = 'h2' // notional

    if (title) {
        titletext = removeMd(title)
        title = <MarkupLine markup = {title} />
        localprops.title = title
        slug = stringUtils(titletext).slugify().s
    }

    if (subtitle) {
        subtitle = <MarkupLine markup = {subtitle} />
        localprops.subtitle = subtitle
    }

    let cardtitle = React.createElement(CardTitle,localprops)

    return <div className = 'content-header' style = {{position:'relative'}} >

        { cardtitle }
        <a className="header-anchor cardtitle-anchor" href={"#" + slug} aria-hidden="true">🔗</a>
        <a className="cardtitle-target-anchor" id={slug} data-text={titletext} data-level = {tag} aria-hidden="true"></a>
        
    </div>

}

export default CardTitleView