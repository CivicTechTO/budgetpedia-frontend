// pagemenu.controller.tsx

// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

class PageMenuController extends React.Component<any,any> {

    render() {
        return <div style = {
            {
                position:"fixed",
                height:"38px",
                borderTop: '3px ridge silver',
                backgroundColor:"#336797",
                bottom:0,
                left:0,
                right:0,
                zIndex:30
            }
        }>
        <div style = {
                {
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflow:"scroll",
                }
            } >
            {this.props.children}
        </div>
        </div>
    }

}

export default PageMenuController