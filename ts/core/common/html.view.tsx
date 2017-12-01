// html.view.tsx

import * as React from 'react';

let HtmlView = ({html}) => {
    return <div 
       dangerouslySetInnerHTML = {{__html:html}}
    />
}

export default HtmlView