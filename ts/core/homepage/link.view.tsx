// option.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import { Link } from 'react-router-dom'

interface Props {
    key?:any,
    external?:boolean,
    prompt:string,
    icon:string,
    target:string,
    targetText:string,
}

class LinkView extends React.Component<Props, any> {

    render() {
        let { props } = this
        return (
            <li>{ props.prompt }<span
                style = {{whiteSpace:'pre'}} ><img 
                style = {{height:'18px',verticalAlign:'middle'}}
                src={ props.icon }
            />
                {props.external
                    ?<a href = {props.target}
                        target = "_blank">{props.targetText}</a>                    
                    :<Link to= {props.target} >{props.targetText}</Link>}
                </span>
            </li>
        )
    }
}

export default LinkView