// nugget.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

interface Props {
    image?:string,
    style?: object,
    kickerStyle?:object,
    prefix?:string,
    kicker?:string,
    suffix?:string,
    contrast?: boolean,
}

class Nugget extends React.Component< Props, any > {

    render() {

        let { image, style, kickerStyle, contrast, prefix, kicker, suffix } = this.props

        let defaultstyle = {
            display:'inline-block',
            textAlign: 'center',
            borderRadius: '50%',
            backgroundColor: 'rgba(77,77,77,0.6)',
            backgroundImage: image?`url(${image})`:'none',
            backgroundSize: image?'cover':'auto',
            color:contrast?'white':null,
            width:'180px',
            height:'180px',
            marginRight:'16px',
            overflow:'clip',
            position:'relative',
        }
        let defaultkickerstyle = {
            fontSize:'2.5em',
            color:'#f1c40f'
        }


        return <div style = {{...defaultstyle,...style}}>
            <div>{ prefix }</div>
            <div style = {{...defaultkickerstyle, ...kickerStyle}}>{ kicker }</div>
            <div>{ suffix }</div>
        </div>
    }
}

export default Nugget