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
    imageStyle?:any,
}

class LinkView extends React.Component<Props, any> {

    render() {
        let { props } = this
        let defaultImageStyle = {height:'18px',verticalAlign:'middle'}
        return (
            <li>{ props.prompt }&nbsp;<span
                style = {{whiteSpace:'pre'}} ><img 
                style = {{...defaultImageStyle,...props.imageStyle}}
                src={ props.icon }
                />&nbsp;
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