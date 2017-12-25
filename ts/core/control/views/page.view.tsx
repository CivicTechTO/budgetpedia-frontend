// page.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Helmet from 'react-helmet'

class PageView extends React.Component<any,any> {

    render() {
        return (
            <div>
                {this.props.title?<Helmet>
                    <title>{this.props.title}</title>
                    {this.props.description?<meta name="description" content = {this.props.description} />:null}
                </Helmet>:null}
                {this.props.children}
            </div>
        )
    }
}

export default PageView
