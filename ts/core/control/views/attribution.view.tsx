// attribution.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'
import { Link } from 'react-router-dom'
let moment = require('moment')

let Attributions = ({name, link}) => {
    
    let content = null
    if (link) {
        if (link.substr(0,1) == '/') {
            content = <Link to = {link}>{name}</Link>
        } else {
            content = <a href = {link} target = '_blank'>{name}</a> 
        }
    } else {
        content = <span>{name}</span>
    }

    return <div style = {{display:'inline-block'}}>
        {content}.&nbsp;
    </div>
}

let AttributionView = ({attribution}) => {

    let { custodian, authority, creator, updater, contact, dates } = attribution
    if (!( custodian || authority || creator || updater || contact || dates )) return null
    return (
        <div 
            style = {
                {
                    padding:'8px',
                    margin:'8px',
                    borderRadius:'8px',
                    border: '3px solid silver',
                    backgroundColor: 'gainsboro',
                    fontSize:'smaller',
                }
            }
        >
            <span>For this page: </span>
            {
                contact?[
                    <span key = "prompt">Please forward comments, questions, or corrections to </span>,
                    <Attributions key = "attr" name = {contact.name} link = {contact.link} />
                ]
                :null
            }
            {
                custodian?[
                    <span key = "prompt">Custodian: </span>,
                    <Attributions key = "attr" name = {custodian.name} link = {custodian.link} />
                ]
                :null
            }
            {
                authority?[
                    <span key = "prompt">Authority: </span>,
                    <Attributions key = "attr" name = {authority.name} link = {authority.link} />
                ]
                :null
            }
            {
                creator?[
                    <span key = "prompt">Authority: </span>,
                    <Attributions key = "attr" name = {creator.name} link = {creator.link} />
                ]
                :null
            }
            {
                updater?[
                    <span key = "prompt">Last updated by: </span>,
                    <Attributions key = "attr" name = {updater.name} link = {updater.link} />
                ]
                :null
            }
            {
                dates?[
                    (dates.created?<span key = "prompt1">Created: {moment(dates.created,'DD-MM-YYYY').format('LL')}. </span>:null),
                    (dates.updated?<span key = "prompt2">Updated: {moment(dates.updated,'DD-MM-YYYY').format('LL')}. </span>:null),
                ]
                :null
            }
        </div>
    )

}

export default AttributionView