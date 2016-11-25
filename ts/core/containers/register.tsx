// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// register.tsx

/*
    TODO:
    - disallow registration while logged in. test this
*/

import * as React from 'react' // required by bundler
var { Component, PropTypes } = React
import { connect } from 'react-redux'
import * as Actions from '../actions/actions'

import { BasicForm, elementProps } from '../components/basicform'
import { Card, CardTitle } from 'material-ui/Card'
import { DEFAULT_PARTICIPATION } from '../../local/constants'

let Register = class extends Component<any, any> {
    // respond to login form; assume error correction
    submitRegistration = elements => {

        let profile = {}
        for (var index in elements) {
            profile[index] = elements[index].getValue()
        }

        this.props.registerUser(profile)
    }
    render() {

        let registerpage = this
        let fieldMessages = registerpage.props.register.fieldMessages || {}

        let disabled = registerpage.props.auth.isAuthenticated

        let elements: Array<elementProps> = [
            {
                index: 'email',
                floatingLabelText: 'Email Address',
                hintText: "enter unique email (required)",
                // defaultValue: 'henrik@bechmann.ca',
                type: 'email',
                required: true,
                errorText: fieldMessages['email'],
                disabled,
            },
            {
                index: 'userhandle',
                floatingLabelText: 'User Handle',
                hintText: "the name other members will see",
                type: 'text',
                required: true,
                errorText: fieldMessages['userhandle'],
                disabled,
            },
            {
                index: 'username',
                floatingLabelText: 'User Name',
                hintText: "actual name",
                type: 'text',
                required: true,
                errorText: fieldMessages['username'],
                disabled
            },
            {
                index: 'participation',
                floatingLabelText: 'Participation',
                defaultValue: DEFAULT_PARTICIPATION,
                type: 'text',
                disabled: true,
            },
            {
                index: 'password',
                floatingLabelText: 'Password',
                hintText: "between 6 and 12 characters",
                type: 'password',
                required: true,
                errorText: fieldMessages['password'],
                disabled,
            },
            {
                index: 'password2',
                floatingLabelText: 'Password (Again)',
                hintText: "between 6 and 12 characters",
                type: 'password',
                required: true,
                errorText: fieldMessages['password2'],
                disabled
            },
            {
                index: 'intro',
                floatingLabelText: 'Introduction',
                hintText: "something about yourself for other members (optional)",
                multiLine: true,
                rows: 4,
                errorText: fieldMessages['intro'],
                disabled
            },
        ]
        let registerform =
            <BasicForm
                submit = { registerpage.submitRegistration }
                elements = { elements }
                submitButtonLabel = 'Register'
                errorMessage = { registerpage.props.register.errorMessage }
                />

        return <Card style={{ margin: "5px" }} >

            <CardTitle title = "Register" style={{ paddingBottom: 0 }} />

            { registerpage.props.auth.isAuthenticated
                ? <p>Cannot register while logged in. Please log out to register a new membership.</p>
                : registerform
            }

        </Card>
    }
}

function mapStateToProps(state) {

    let { resources, login } = state

    return {

        state,
        auth:login.auth,
        theme:resources.theme,
        register:login.register,
    }

}

Register = connect(mapStateToProps, {
    registerUser:Actions.registerUser,
})(Register)

export default Register
