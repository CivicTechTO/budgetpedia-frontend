"use strict";
const React = require('react');
const Card_1 = require('material-ui/Card');
var { Component } = React;
class Announcements extends Component {
    render() {
        return React.createElement("div", null, 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: "Budgetpedia Project Announcements"}), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h3", null, "Key Upcoming Events"), 
                    React.createElement("ul", {style: { marginBottom: "16px" }}, 
                        React.createElement("li", null, 
                            React.createElement("p", null, 
                                React.createElement("strong", null, "Tuesday, November 29 6:30-9:00 pm Budgetpedia v0.1 Launch!"), 
                                React.createElement("br", null), 
                                React.createElement("em", null, "Location:"), 
                                " ", 
                                React.createElement("a", {target: "_blank", href: "https://www.meetup.com/Civic-Tech-Toronto/events/235306439/"}, "Civic Tech Toronto Meetup")), 
                            React.createElement("p", null, 
                                "Join us for the official launch of Budgetpedia version 0.1 at" + ' ' + "Civic Tech's weekly meetup. See Budgetpedia in action, gain insights" + ' ' + "into the city budget and generally celebrate our going live. See the ", 
                                React.createElement("a", {target: "_blank", href: "https://drive.google.com/open?id=1xZyJ6_wk4M6XP8DgrzyNi8oBvzvmzQyV6K23J0OwvZY"}, "slide deck"), 
                                " for the meetup.")), 
                        React.createElement("li", null, 
                            React.createElement("p", null, 
                                React.createElement("strong", null, "Regular Meetups: First Tuesday of each month 6:30-9:00 pm "), 
                                React.createElement("br", null), 
                                React.createElement("em", null, " Location:"), 
                                " ", 
                                React.createElement("a", {target: "_blank", href: "http://www.meetup.com/Civic-Tech-Toronto/"}, "Varies - Check the Meetup page for the next meeting")), 
                            React.createElement("p", null, "Additional meetings may be scheduled. This is where Budgetpedia was born and raised to its current early state." + ' ' + "It's also where a lot of the brainstorming, development and creative" + ' ' + "processes happen." + ' ' + "Anyone with an interest in this project is welcome.  No coding or" + ' ' + "technical skills required!"), 
                            React.createElement("p", null, 
                                "For more details, check out the ", 
                                React.createElement("a", {href: "joinus"}, "Join Us!"), 
                                " page" + ' ' + "of this website, or the ", 
                                React.createElement("a", {target: "_blank", href: "http://www.civictech.ca"}, "Civic Tech website home Page"), 
                                ".")))), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h3", null, "Key Past Events")
                ))
        );
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Announcements;
