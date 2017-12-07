// html.view.tsx

import * as React from 'react';

let HtmlView = ({ style, html }:{style?:object,html:string}) => (
    <div style = {style}
       dangerouslySetInnerHTML = {{__html:html}}
    />
)

export default HtmlView