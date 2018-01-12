// page.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Helmet from 'react-helmet'

let PageView = props => {

    return (
        <div>
            {props.title?<Helmet>
                <title>{props.title}</title>
                {props.description?<meta name="description" content = {props.description} />:null}
            </Helmet>:null}
            {props.children}
        </div>
    )
}

export default PageView
