// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// app.tsx
// import * as Addins from '../../addins/addins'
import * as React from 'react'
var { Component } = React
//import { ReactCssTransitionGroup } from 'react-addons-css-transition-group'
import ReactCSSTransitionGroup = require('react-addons-css-transition-group')

class App extends Component<any, any> {
    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="mainpage"
                    transitionEnterTimeout={300}
                    transitionLeave={false} >
                    {
                        React.cloneElement(this.props.children, {
                            key: this.props.location.pathname
                        })
                    }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default App