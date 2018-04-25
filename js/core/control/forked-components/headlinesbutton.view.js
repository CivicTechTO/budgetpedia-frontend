// headlinesbutton.view.tsx
'use strict';
import * as React from 'react';
import HeadlinesPicker from './headlinespicker.view';
// from draft-js-plugins
// copy-paste below
// copy-paste below (more or less)
class HeadlinesButton extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => 
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);
    }
    render() {
        return (React.createElement("div", { className: "headlineButtonWrapper" },
            React.createElement("button", { onClick: this.onClick, className: "headlineButton" }, "H")));
    }
}
export default HeadlinesButton;
