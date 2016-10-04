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
        return (React.createElement("div", null, React.createElement(mainbar_1.MainBar, null), React.createElement("div", {style: { height: "64px" }}, " "), React.createElement(Card, null, React.createElement(CardTitle, null, "Welcome to the future home of the Budgetpedia project -- civic budget analytics and support"), React.createElement(CardText, {style: { backgroundColor: 'LemonChiffon' }}, "We're looking for feedback on what webpages (just a few) this website should contain upon" + ' ' + "launch around Dec 1, 2015, and what those pages should say. For details, see some ", React.createElement("a", {target: "_blank", href: "https://drive.google.com/open?id=1IFayiKuA8t-J_Ef2x4okiRYLRAbefPlaiIIrghn3F0c"}, "notes for our" + ' ' + "October 4 hackathon"), ". Send feedback to ", React.createElement("a", {target: "_blank", href: "mailto:mail@budgetpedia.ca"}, "mail@budgetpedia.ca")), React.createElement(CardText, null, "While we're under development see the staging (testing) version of the coming website at ", React.createElement("a", {href: targetdomain}, "staging.budgetpedia.ca"), " (recommended)." + ' ' + "To see what the developers are working on see ", React.createElement("a", {href: devdomain}, "dev.budgetpedia.ca"), " (not recommended for testing, just for the curious)"), React.createElement(CardText, null, "The mission of the budgetpedia project is to support informed debate about the" + ' ' + "Toronto budget. We hope to accomplish this by making the budget, both information" + ' ' + "and process, more accessible to the people of Toronto."), React.createElement(CardText, null, "We also hope to help people with specific budget interests find each other. The long term aim is make this website crowd-sourced and collaborative."), React.createElement(CardText, null, "For more information about this project see ", React.createElement("a", {href: "http://civictech.ca/projects"}, "civictech.ca/projects"), ".")), React.createElement("iframe", {src: "https://calendar.google.com/calendar/embed?title=Budgetpedia%20Media%20Schedule&mode=AGENDA&height=600&wkst=1&bgcolor=%23FFFFFF&src=j43lip15uv9ojnejpre09tqpsc%40group.calendar.google.com&color=%236B3304&ctz=America%2FNew_York", style: { borderWidth: 0 }, width: "500", height: "600", frameBorder: "0", scrolling: "no"}), "            "));
    }
}
exports.Main = Main;
