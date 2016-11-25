"use strict";
const React = require('react');
var { Component } = React;
const react_redux_1 = require('react-redux');
const Card_1 = require('material-ui/Card');
let RegisterPending = class extends Component {
    render() {
        let registerpendingpage = this;
        let auth = registerpendingpage.props.auth;
        let register = registerpendingpage.props.register;
        let registerpending = auth.isAuthenticated
            ?
                React.createElement("div", null, 
                    React.createElement("p", null, 
                        auth.profile.username, 
                        ", you're already registered and logged in.")
                )
            : register.isRegistered
                ?
                    React.createElement("div", null, 
                        React.createElement("p", null, 
                            "Thanks for registering, ", 
                            register.user.username, 
                            "!"), 
                        React.createElement("p", null, "An email has been sent to" + ' ' + "the email address you used to register. Please follow the instructions in this email" + ' ' + "to authenticate and complete your registration."))
                :
                    React.createElement("div", null, 
                        React.createElement("p", null, "No registration data is available.")
                    );
        return React.createElement(Card_1.Card, {style: { margin: "5px" }}, 
            React.createElement(Card_1.CardTitle, {title: "Registration Pending", style: { paddingBottom: 0 }}), 
            React.createElement(Card_1.CardText, null, registerpending));
    }
}
;
function mapStateToProps(state) {
    let { login } = state;
    return {
        state,
        auth: login.auth,
        register: login.register,
    };
}
RegisterPending = react_redux_1.connect(mapStateToProps)(RegisterPending);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterPending;
