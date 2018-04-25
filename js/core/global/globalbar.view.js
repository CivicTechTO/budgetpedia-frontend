// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// globalbar.view.tsx
'use strict';
import * as React from 'react'; // required by bundler
import AppBar from 'material-ui/AppBar';
class GlobalBarView extends React.Component {
    render() {
        let defaultStyle = {
            position: "fixed",
            backgroundColor: "#336797"
        };
        let defaultTitleStyle = {
            cursor: 'pointer',
        };
        let titleStyle = this.props.titleStyle || {};
        let style = this.props.style || {};
        return (React.createElement(AppBar, { onTitleClick: () => this.props.onSelect(), titleStyle: Object.assign({}, defaultTitleStyle, titleStyle), style: Object.assign({}, defaultStyle, style), title: React.createElement("span", null, this.props.title), iconElementLeft: this.props.iconElementLeft }, this.props.children));
    }
}
export default GlobalBarView;
