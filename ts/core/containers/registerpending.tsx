// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// register.tsx

import * as React from 'react' // required by bundler
var { Component } = React
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

import {Card, CardText, CardTitle} from 'material-ui/Card'

let RegisterPending = class extends Component<any,any> {
    // respond to login form; assume error correction
    render() {

        let registerpendingpage = this
        let auth = registerpendingpage.props.auth
        let register = registerpendingpage.props.register
        let registerpending = 
            auth.isAuthenticated
            ? 
            <div>
                <p>
                    {auth.profile.username}, you're already registered and logged in.
                </p>
            </div >
            : register.isRegistered
            ? 
            <div>
                <p>
                    Thanks for registering, {register.user.username}!
                </p>
                <p>
                    An email has been sent to
                    the email address you used to register. Please follow the instructions in this email
                    to authenticate and complete your registration.
                </p>
            </div>
            : 
            <div>
                <p>
                    No registration data is available.
                </p>
            </div>
        return <Card style={{ margin: "5px" }} >

            <CardTitle title = "Registration Pending" style={{ paddingBottom: 0 }} />
            <CardText>

                { registerpending }

            </CardText>
        </Card>
    }
}

function mapStateToProps(state) {

    let { login } = state

    return {

        state,
        auth:login.auth,
        register:login.register,
    }

}

RegisterPending = connect(mapStateToProps)(RegisterPending)

export default RegisterPending
