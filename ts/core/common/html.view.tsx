// html.view.tsx

import * as React from 'react';

let HtmlView = (props) => {
    let { style, html } = props
    return <div style = {style}
       dangerouslySetInnerHTML = {{__html:html}}
    />
}

export default HtmlView