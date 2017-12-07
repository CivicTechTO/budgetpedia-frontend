// controller.base.tsx

// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react'

import master from '../../gateway/master.model'

class BaseController<P>  extends React.Component<P, any> {

    constructor(props) {
        super(props)
        this.master = master
    }

    master = null

    settleModelPromise = model => {
        this.setState({
            waiting:true,
        },
            model.then(model => {
                this.setState({
                    waiting:false,
                    model,
                })
            })
        )
    }

    setRepoModel = (repo,index) => {
        let { master } = this
        let model = master.getDocument(repo,index)
        if (master.isPromise(model)) {
            if (!this.state.waiting) {
                this.settleModelPromise(model)
            }
        }
        this.setState({
            model,
        })
    }

    assertModel = model => {
        if ( !model ) {
            return <div>loading...</div>
        }

        // test for repo and acquire data where required
        if (model.repo) {
            this.setRepoModel(model.repo,model.index)
            return <div>waiting...</div>
        }

        return null
    }

}

export default BaseController
