'use strict';
const React = require('react');
var { Component } = React;
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
const mainbar_1 = require('./mainbar');
const Card = require('material-ui/lib/card/card');
const CardTitle = require('material-ui/lib/card/card-title');
const CardText = require('material-ui/lib/card/card-text');
let hostname = location.hostname;
let targetdomain = null;
let devdomain = null;
if (hostname == 'budgetpedia') {
    targetdomain = 'http://staging.budgetpedia';
    devdomain = 'http://dev.budgetpedia';
}
else {
    targetdomain = 'http://staging.budgetpedia.ca';
    devdomain = 'http://dev.budgetpedia.ca';
}
class Main extends Component {
    render() {
        return (React.createElement("div", null, React.createElement(mainbar_1.MainBar, null), React.createElement("div", {style: { height: "64px" }}, " "), React.createElement(Card, null, React.createElement(CardTitle, null, "Welcome to the future home of the Budgetpedia project"), React.createElement(CardText, null, "In the meantime see the staging (testing) version of the coming website at ", React.createElement("a", {href: targetdomain}, "staging.budgetpedia.ca"), " (recommended)." + ' ' + "To see what the developers are working on see ", React.createElement("a", {href: devdomain}, "dev.budgetpedia.ca"), " (not recommended for testing, just for the curious)"), React.createElement(CardText, null, "The mission of the budgetpedia project is to support informed debate about the" + ' ' + "Toronto budget. We hope to accomplish this by making the budget, both information" + ' ' + "and process, more accessible to the people of Toronto."), React.createElement(CardText, null, "We also hope to help people with specific budget interests find each other. The long term aim is make this website crowd-sourced and collaborative."), React.createElement(CardText, null, "For more information about this project see ", React.createElement("a", {href: "http://civictech.ca/projects"}, "civictech.ca/projects"), "."))));
    }
}
exports.Main = Main;
