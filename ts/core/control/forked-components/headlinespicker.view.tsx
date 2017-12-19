// headlinespicker.view.tsx

'use strict'

import * as React from 'react'

import {
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
} from 'draft-js-buttons'

// from draft-js-plugins
// copy-paste below
class HeadlinesPicker extends React.Component<any,any> {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

export default HeadlinesPicker
