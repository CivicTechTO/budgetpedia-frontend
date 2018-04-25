// tribes.tsx
// required by bundler
import * as React from 'react';
var { Component } = React;
class NoMatch extends Component {
    render() {
        return React.createElement("div", { style: { color: 'cornsilk' } }, "Sorry... we don't have a page that matches that url");
    }
}
export default NoMatch;
