"use strict";
const React = require('react');
var { Component } = React;
const react_redux_1 = require('react-redux');
const Actions = require('../actions/actions');
const Card_1 = require('material-ui/Card');
let RegisterConfirm = class extends Component {
    constructor() {
        super(...arguments);
        this.componentWillMount = () => {
            this.props.confirmUser();
        };
    }
    render() {
        let registerconfirmpage = this;
        let auth = registerconfirmpage.props.auth;
        let registerconfirm = registerconfirmpage.props.registerconfirm;
        let registerconfirmview = React.createElement("div", null, 
            (registerconfirm.isFetching || registerconfirm.isConfirmed)
                ?
                    React.createElement("div", null, 
                        React.createElement("p", null, "Confirming registration...")
                    )
                : '', 
            registerconfirm.isConfirmed
                ? React.createElement("div", null, 
                    React.createElement("p", null, 
                        "Registration succeeded ", 
                        registerconfirm.user.username, 
                        "!")
                )
                : '', 
            registerconfirm.errorMessage
                ?
                    React.createElement("div", null, 
                        React.createElement("p", null, 
                            "The registration confirmation returned the following error message:", 
                            React.createElement("span", {style: { fontStyle: "italic" }}, registerconfirm.errorMessage))
                    ) : '', 
            (registerconfirm.isConfirmed && auth.isAuthenticated)
                ?
                    React.createElement("div", null, 
                        React.createElement("p", null, 
                            auth.profile.username, 
                            ", you have been automatically logged in.")
                    )
                : '');
        return React.createElement(Card_1.Card, {style: { margin: "5px" }}, 
            React.createElement(Card_1.CardTitle, {title: "Registration Confirmation", style: { paddingBottom: 0 }}), 
            React.createElement(Card_1.CardText, null, registerconfirmview));
    }
}
;
function mapStateToProps(state) {
    let { login } = state;
    return {
        state,
        auth: login.auth,
        registerconfirm: login.registerconfirm,
    };
}
RegisterConfirm = react_redux_1.connect(mapStateToProps, {
    confirmUser: Actions.confirmUser,
})(RegisterConfirm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegisterConfirm;
