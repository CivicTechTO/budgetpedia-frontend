// headlinespicker.view.tsx
'use strict';
import * as React from 'react';
import { HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton, } from 'draft-js-buttons';
// from draft-js-plugins
// copy-paste below
class HeadlinesPicker extends React.Component {
    constructor() {
        super(...arguments);
        this.onWindowClick = () => 
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);
    }
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }
    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }
    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (React.createElement("div", null, buttons.map((Button, i) => // eslint-disable-next-line
         React.createElement(Button, Object.assign({ key: i }, this.props)))));
    }
}
export default HeadlinesPicker;
