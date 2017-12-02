// option.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import { Link } from 'react-router-dom'

interface Props {
    key?:any,
    external?:boolean,
    prompt?:string,
    icon:string,
    target:string,
    targetText:string,
    description?:string,
}

class LinkView extends React.Component<Props, any> {

    render() {
        let { props } = this
        return (
            <li>{ props.prompt }&nbsp;<span
                style = {{whiteSpace:'pre'}} ><img 
                style = {{height:'18px',verticalAlign:'middle'}}
                src={ props.icon }
            />
                {props.external
                    ?<a href = {props.target}
                        target = "_blank">{props.targetText}</a>                    
                    :<Link to= {props.target} >{props.targetText}</Link>}
                </span>
                {props.description?<p style = {{fontStyle:'italic', margin:'0'}}>{props.description}</p>:null}
            </li>
        )
    }
}

export default LinkView