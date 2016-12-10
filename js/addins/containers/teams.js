"use strict";
const React = require('react');
const Card_1 = require('material-ui/Card');
var { Component } = React;
const FontIcon_1 = require('material-ui/FontIcon');
class Teams extends Component {
    render() {
        return React.createElement("div", null, 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: "Our Teams. Join Us! Help us Make Budgetpedia Better."}), 
                React.createElement(Card_1.CardText, null, "Budgetpedia is a volunteer-driven project.  We've gotten where we are thanks" + ' ' + "to people with a wide variety of backgrounds and expertise.  If you're" + ' ' + "interested in democratizing information on municipal budgets in Ontario," + ' ' + "we'd love to have you join us."), 
                React.createElement(Card_1.CardTitle, {title: "Getting Involved"}), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h3", null, "Where and when"), 
                    "We have regular meetings at Civic Tech Toronto Hacknights. We'll be there the first" + ' ' + "Tuesday of the month (and possibly other Tuesdays as well). Never hurts to check at ", 
                    React.createElement("a", {target: "_blank", href: "mailto:mail@budgetpedia.ca"}, "mail@budgetpedia.ca"), 
                    " though" + ' ' + "just to make sure. Check with Civic Tech TO ", 
                    React.createElement("a", {target: "_blank", href: "http://www.meetup.com/Civic-Tech-Toronto/"}, "meetup"), 
                    " for locations." + ' ' + "Or just email us your interests and we'll take it from there."), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h3", null, "Our Teams"), 
                    React.createElement("p", null, "These are the main working groups we've set up. Feel free to get involved" + ' ' + "with one of them.  Or suggest something else you'd like to do.  We're" + ' ' + "pretty flexible."), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Research"), 
                            React.createElement("br", null), 
                            React.createElement("p", null, "Like data?  Interested in sifting through municipal budgets and" + ' ' + "open data sets?  This is a key area we can use help. "), 
                            React.createElement("p", null, "Specific things we could use help with:"), 
                            React.createElement("ul", {style: { marginBottom: "16px" }}, 
                                React.createElement("li", null, "Research planning"), 
                                React.createElement("li", null, "Identifying, sifting through, and preparing muncipal data sets"), 
                                React.createElement("li", null, "Validating and verifying the data (QA); eventually arranging for an audit"), 
                                React.createElement("li", null, "Helping explain municipal budget data"), 
                                React.createElement("li", null, "Visualization"))), 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Web Development"), 
                            React.createElement("p", null, 
                                "Budgetpedia is an open source project, and we welcome contributions." + ' ' + "The codebase is on ", 
                                React.createElement("a", {href: "https://github.com/CivicTechTO/budgetpedia-dev-frontend"}, "Github"), 
                                "." + ' ' + "The main areas of work are:"), 
                            React.createElement("ul", {style: { marginBottom: "16px" }}, 
                                React.createElement("li", null, "Developing and maintaining a software development plan."), 
                                React.createElement("li", null, "Enhancing the front-end (it really needs an admin interface for example)"), 
                                React.createElement("li", null, "Enhancing the backend, starting with migrating the data from source files to databases;" + ' ' + "supporting login, logout, and content management")), 
                            React.createElement("p", null, "Technical details are as follows:"), 
                            React.createElement("ul", {style: { marginBottom: "16px" }}, 
                                React.createElement("li", null, 
                                    "Main frontend components:", 
                                    React.createElement("ul", {style: { marginBottom: "8px" }}, 
                                        React.createElement("li", null, "typescript (language - es6 superset, strongly typed)"), 
                                        React.createElement("li", null, "reactjs (rendering)"), 
                                        React.createElement("li", null, "redux (model/state manager)"), 
                                        React.createElement("li", null, "fetch (ajax)"), 
                                        React.createElement("li", null, "material-ui for widgets, a Google Material Design implementation"))), 
                                React.createElement("li", null, 
                                    "Main backend components (for next phase):", 
                                    React.createElement("ul", {style: { marginBottom: "8px" }}, 
                                        React.createElement("li", null, "nodejs environment on server"), 
                                        React.createElement("li", null, "nginx for web server"), 
                                        React.createElement("li", null, "hapijs for api handler"), 
                                        React.createElement("li", null, "available databases: mariadb (relational), mongodb (aggregates), neo4j (graphs)"))))), 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Communications"), 
                            React.createElement("br", null), 
                            React.createElement("p", null, "Numbers are nice but it's the stories that matter to most people."), 
                            React.createElement("p", null, "Help us explain what's going on in the budget;" + ' ' + "Help spread the word about budgetpedia;" + ' ' + "Help us build partnerships with other people and organizations who care" + ' ' + "about municipal budgets."), 
                            React.createElement("p", null, "Some of the specific things we're working on include:"), 
                            React.createElement("ul", {style: { marginBottom: "16px" }}, 
                                React.createElement("li", null, "Social media communication and outreach"), 
                                React.createElement("li", null, "Developing budget literacy programs"), 
                                React.createElement("li", null, "Supporting collaboartion among users"), 
                                React.createElement("li", null, "Content generation: blogs, long-form prose, etc.  Pull apart" + ' ' + "the budget and show us the stories that are there.  Let your" + ' ' + "inner Nate Silver shine!"))), 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Management"), 
                            React.createElement("br", null), 
                            React.createElement("p", null, "This is the group tasked with looking after Budgetpedia's future."), 
                            React.createElement("ul", {style: { marginBottom: "16px" }}, 
                                React.createElement("li", null, "Developing a management plan"), 
                                React.createElement("li", null, "Organizational development"), 
                                React.createElement("li", null, "Government relations"), 
                                React.createElement("li", null, "Funding, including grants and possibly a service-for-fee plan"))), 
                        React.createElement("li", null, 
                            React.createElement("strong", null, "Advisory Group"), 
                            React.createElement("br", null), 
                            React.createElement("p", null, "We're working on organizing an advisory group to help guide the project, and develop connections among user groups.")))), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("h3", null, "People"), 
                    React.createElement("p", null, 
                        "These are just a few of the people involved in Budgetpedia (alphabetical).  If you've got" + ' ' + "questions, or want to know more, please reach out to one of us at ", 
                        React.createElement("a", {target: "_blank", href: "mailto:mail@budgetpedia.ca"}, "mail@budgetpedia.ca"), 
                        " ."), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/donaltman.jpg", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Don Altman is with our advisory group, and has just retired from being the Manager of Corporate Financial Strategies at the City of Toronto."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/HenrikHeadshotSquare.jpg", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Henrik Bechmann is the project lead and co-lead of our software team."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/kejobuchanan.png", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Kejo Buchanan is with our advisory group, and an expert at resource and information structures and access."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/chrisgraham.png", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Christopher Graham is our product champion, and is involved with research and project development."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement(FontIcon_1.default, {className: "material-icons", style: { borderRadius: "50%", float: "left", height: "40px", fontSize: '40px', margin: "6px", color: 'rgba(0,0,0,0.4)' }}, "person"), 
                        React.createElement("p", null, "Arthur Gron is a writer and one of our Medium publication editors."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/robertjarvis.jpg", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Robert Jarvis has a background in international management and is co-lead of our management team."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/amadoukebe.png", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Amadou Kebe is a policy and communications advisor who is involved with our communications team."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/kiramccutcheon.png", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Kira McCutcheon is involved with content development, communications, and project development, and is co-lead of our management team."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement(FontIcon_1.default, {className: "material-icons", style: { borderRadius: "50%", float: "left", height: "40px", fontSize: '40px', margin: "6px", color: 'rgba(0,0,0,0.4)' }}, "person"), 
                        React.createElement("p", null, "Jim Rootham is a computer scientist, has taken on the challenge of reviewing the current codebase to prepare for the next development phase, and is co-lead of our software team."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/asherzafar.jpg", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Asher Zafar is an economist, strategy and analytics professional, currently helping us with data analysis, and is with our advisory group."), 
                        React.createElement("div", {style: { clear: "left" }})), 
                    React.createElement("h3", null, "Past Helpers"), 
                    React.createElement("div", {style: { border: "1px solid silver", margin: "6px 3px", padding: "3px", borderRadius: "8px" }}, 
                        React.createElement("img", {src: "./public/avatars/lindadow.png", style: { borderRadius: "50%", float: "left", height: "40px", margin: "6px" }}), 
                        React.createElement("p", null, "Lindamarleny Dow was the project's communications lead."), 
                        React.createElement("div", {style: { clear: "left" }}))))
        );
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Teams;
