// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// globalbar.view.tsx

'use strict'

import * as React from 'react' // required by bundler

import AppBar from 'material-ui/AppBar'

interface Props {
    titleStyle?:any,
    style?:any,
    onSelect:any,
    title:string,
    iconElementLeft:JSX.Element,
}

class GlobalBarView extends React.Component<Props, any> {

    render() {

        let defaultStyle = {
            position: "fixed",
            backgroundColor:"#336797" 
        }

        let defaultTitleStyle = {
            cursor:'pointer',
        }

        let titleStyle = this.props.titleStyle || {}

        let style = this.props.style || {}

        return (
            <AppBar
                onTitleClick = { () => this.props.onSelect() }
                titleStyle = {{
                    ...defaultTitleStyle,
                    ...titleStyle
                }}
                style={{
                    ...defaultStyle,...style
                }}
                title={ <span>{ this.props.title }</span> }

                iconElementLeft={ this.props.iconElementLeft }
                >

                { this.props.children }

            </AppBar>
        )
    }

}

export default GlobalBarView