'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
var { Component } = React;
const TextField_1 = require('material-ui/TextField');
const Card_1 = require('material-ui/Card');
const RaisedButton_1 = require('material-ui/RaisedButton');
class BasicForm extends React.Component {
    constructor() {
        super(...arguments);
        this.textFields = {};
        this.submit = e => {
            e.stopPropagation();
            e.preventDefault();
            this.props.submit(this.textFields);
            return false;
        };
    }
    render() {
        let basicform = this;
        let elements = basicform.props.elements;
        let children = elements.map(element => {
            let attributes = {};
            for (var name in element) {
                if (['index'].indexOf(name) < 0)
                    attributes[name] = element[name];
            }
            let istextbox = (attributes['rows'] && (attributes['rows'] > 1));
            let display = istextbox
                ? 'block'
                : 'inline-block';
            if (istextbox)
                attributes['fullWidth'] = true;
            return (React.createElement("div", {className: "textfieldwrapper", style: {
                display: display,
                marginRight: "5px"
            }, key: element.index}, 
                React.createElement(TextField_1.default, __assign({ref: node => { basicform.textFields[element.index] = node; }}, attributes))
            ));
        });
        return (React.createElement("form", {onSubmit: basicform.submit, action: "javascript:void(0)"}, 
            React.createElement(Card_1.CardText, null, 
                basicform.props.completionMessage
                    ? React.createElement("p", {style: { color: "green" }}, basicform.props.completionMessage)
                    : null, 
                basicform.props.warningMessage
                    ? React.createElement("p", {style: { color: "orange" }}, basicform.props.warningMessage)
                    : null, 
                basicform.props.errorMessage
                    ? React.createElement("p", {style: { color: "red" }}, basicform.props.errorMessage)
                    : null, 
                children), 
            React.createElement(Card_1.CardActions, null, 
                React.createElement(RaisedButton_1.default, {type: "submit", label: basicform.props.submitButtonLabel, className: "button-submit", primary: true})
            )));
    }
}
exports.BasicForm = BasicForm;
