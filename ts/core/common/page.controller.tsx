// page.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

import Section from './section.controller'

import master from '../../gateway/master.model'

let Page = class extends React.Component<any, any> {

    state = {
        model:null,
    }

    componentHasMounted() {
        let { match } = this.props
        let { path } = match
        let { pages, routes, repos, styles } = master
        let key = routes[path]
        this.setState({
            model:pages[key],
        })
    }

    render() {
        return <div>hello</div>
    }

}

export default Page