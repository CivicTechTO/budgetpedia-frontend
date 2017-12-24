// pagemenu.controller.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

class PageMenuController extends React.Component<any,any> {

    render() {
        return <div style = {
            {display: 'flex',
            flexWrap: 'nowrap',
            position:"fixed",
            height:"38px",
            backgroundColor:"red",
            bottom:0,
            left:0,
            right:0,
            zIndex:30}
        }>
            {this.props.children}
        </div>
    }

}

export default PageMenuController