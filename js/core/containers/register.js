"use strict";
const React = require('react');
var { Component, PropTypes } = React;
const react_redux_1 = require('react-redux');
const Actions = require('../actions/actions');
const basicform_1 = require('../components/basicform');
const Card_1 = require('material-ui/Card');
const constants_1 = require('../../local/constants');
let Register = class extends Component {
    constructor() {
        super(...arguments);
        this.submitRegistration = elements => {
            let profile = {};
            for (var index in elements) {
                profile[index] = elements[index].getValue();
            }
            this.props.registerUser(profile);
        };
    }
    render() {
        let registerpage = this;
        let fieldMessages = registerpage.props.register.fieldMessages || {};
        let disabled = registerpage.props.auth.isAuthenticated;
        let elements = [
            {
                index: 'email',
                floatingLabelText: 'Email Address',
                hintText: "enter unique email (required)",
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
                defaultValue: constants_1.DEFAULT_PARTICIPATION,
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
        ];
        let registerform = React.createElement(basicform_1.BasicForm, {submit: registerpage.submitRegistration, elements: elements, submitButtonLabel: 'Register', errorMessage: registerpage.props.register.errorMessage});
        return React.createElement(Card_1.Card, {style: { margin: "5px" }}, 
            React.createElement(Card_1.CardTitle, {title: "Register", style: { paddingBottom: 0 }}), 
            registerpage.props.auth.isAuthenticated
                ? React.createElement("p", null, "Cannot register while logged in. Please log out to register a new membership.")
                : registerform);
    }
}
;
function mapStateToProps(state) {
    let { resources, login } = state;
    return {
        state,
        auth: login.auth,
        theme: resources.theme,
        register: login.register,
    };
}
Register = react_redux_1.connect(mapStateToProps, {
    registerUser: Actions.registerUser,
})(Register);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Register;
