// tribes.tsx
// required by bundler
import * as React from 'react'
var { Component } = React

class NoMatch extends Component<any, any> {
    render() {
        return <div style ={{color:'cornsilk'}} >Sorry... we don't have a page that matches that url</div>
    }
}

export default NoMatch 