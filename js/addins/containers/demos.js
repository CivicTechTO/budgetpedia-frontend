"use strict";
const React = require('react');
const Card_1 = require('material-ui/Card');
var { Component } = React;
class Demos extends Component {
    render() {
        return React.createElement("div", null, 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: "Get a Demo"}), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("ul", {style: { marginTop: "0", marginBottom: "0" }}, 
                        React.createElement("li", null, "Interested in learning more about Budgetpedia?"), 
                        React.createElement("li", null, "Want to get a better understanding of how the budget process" + ' ' + "works in Toronto?"), 
                        React.createElement("li", null, "Have a group that would like a hands-on demonstration of how you can" + ' ' + "use budgetpedia to better understand Toronto's city finances?"))
                ), 
                React.createElement(Card_1.CardText, null, "Get Henrik Bechmann (the project lead) to demo the site for you."), 
                React.createElement(Card_1.CardText, null, "If you've got a group of 10 or more people anywhere in the City of Toronto," + ' ' + "we're happy to come out and provide a brief overview of what Budgetpedia" + ' ' + "is and how you can use it to better understand the city budget and budget-" + ' ' + "making process."), 
                React.createElement(Card_1.CardText, null, "We can provide a brief (10-30 minute) overview of the website and tools," + ' ' + "as well as a chance for your group to explore the tools available on the" + ' ' + "site"), 
                React.createElement(Card_1.CardText, null, 
                    "Note from Henrik: ", 
                    React.createElement("span", {style: { fontStyle: "italic" }}, "My preference is to bicylce" + ' ' + "to my destination, anywhere in downtown Toronto from, say, Dundas West to Logan, not very far" + ' ' + "north of Bloor to the waterfront. Otherwise, please make it close to the subway.")), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("strong", null, "PLUS!"), 
                    " Learn how you can get involved in making Budgetpedia even" + ' ' + "better.  Give us your input on what tools you'd like and how the site" + ' ' + "coulcd better help your organization.  We're still in the early stages and" + ' ' + "are actively looking for input."), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h4", null, 
                        React.createElement("strong", null, "Contact")
                    ), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Email:"), 
                            " ", 
                            React.createElement("a", {href: "mailto:mail@budgetpeida.ca"}, "mail@budgetpedia.ca"))
                    )))
        );
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Demos;
