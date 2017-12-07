// section.controller.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';

interface Props {
    description:string, 
    fields: object, 
    components: object[], 
    composition: object[],
}

let Section = class extends React.Component<Props, any> {

    render() {

        let {
            description, 
            fields, 
            components, 
            composition 
        } = this.props

        return <div>hello</div>
    }

}

export default Section