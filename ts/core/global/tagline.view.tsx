// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// tagline.view.tsx

'use strict'

import * as React from 'react'

import * as Radium from 'radium'
let { StyleRoot } = Radium

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
            <StyleRoot>
                <div style={[defaultstyle,this.props.style]}>
                    {this.props.text}
                </div>
            </StyleRoot>
        )

    }

}

export default TaglineView