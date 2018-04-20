// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// contact.view.tsx

'use strict'

import * as React from 'react' // required by bundler

// TODO: replace radium with css classes

import * as Radium from 'radium'
let { StyleRoot } = Radium

interface Props {
    style?:any,
    contactStyle?:any,
    contactAddress:string,
    contactPrompt: string,
}

class ContactView extends React.Component<Props, any> {

    render() {
        
        let defaultStyle = {
            fontSize: "12px",
            color: "white",
            padding: "3px",
        }

        return (

            <StyleRoot>
                <div style={[defaultStyle,this.props.style] as any}>
                    contact: <a 
                        style = {[{
                            color:'white',
                            ':hover':{
                                color:'white',
                                background: 'black',
                            },
                            ':visited':{color:'gold'},
                        },this.props.contactStyle] as any}
                        target="_blank" href={this.props.contactAddress}
                        >
                            {this.props.contactPrompt}
                        </a>
                </div>
            </StyleRoot>
        )

    }

}

export default ContactView