// section.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

/*
    TODO: upgrade to component; use markdown for title/description
*/

'use strict'

import * as React from 'react';

let SectionView = (props) => (
    <div>

    {props.title?<div style = {{backgroundColor:"#d9d9d9",padding:"8px",borderTop:"4px solid silver"}}>
        {props.title?<h1>{props.title}</h1>:null}

        {props.description?<p>{props.description}</p>:null}
        </div>:null
    }

        { props.children }

    </div>
    )

export default SectionView
