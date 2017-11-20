// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// app.tsx
// import * as Addins from '../../addins/addins'
import * as React from 'react'
var { Component } = React
//import { ReactCssTransitionGroup } from 'react-addons-css-transition-group'

class App extends Component<any, any> {
    render() {
        return (
            <div>
                {
                    React.cloneElement(this.props.children as any, { // as any required for typescript 2.6.1
                        key: this.props.location.pathname
                    })
                }
            </div>
        )
    }
}

export default App