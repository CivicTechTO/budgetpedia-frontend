// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// tagline.view.tsx

'use strict'

import * as React from 'react'

interface Props {
    style?:any,
    text: string,
}

class TaglineView extends React.Component<Props, any> {

    render() {

        let defaultstyle = {
                fontSize: "12px",
                color: "gold",
                padding: "3px",
            }
        return  (
            <div style={{...defaultstyle,...this.props.style}}>
                {this.props.text}
            </div>
        )

    }

}

export default TaglineView