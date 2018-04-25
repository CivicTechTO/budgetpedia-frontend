// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// tagline.view.tsx
'use strict';
import * as React from 'react';
class TaglineView extends React.Component {
    render() {
        let defaultstyle = {
            fontSize: "12px",
            color: "gold",
            padding: "3px",
        };
        return (React.createElement("div", { style: Object.assign({}, defaultstyle, this.props.style) }, this.props.text));
    }
}
export default TaglineView;
