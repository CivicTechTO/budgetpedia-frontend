// about.tsx
import * as React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
var { Component } = React;
class About extends Component {
    render() {
        return React.createElement("div", null,
            React.createElement(Card, { initiallyExpanded: true },
                React.createElement(CardTitle, { title: "About Us", actAsExpander: true, showExpandableButton: true }),
                React.createElement(CardText, null,
                    "For some more background, see the ",
                    React.createElement("a", { target: "_blank", href: "https://docs.google.com/presentation/d/1xZyJ6_wk4M6XP8DgrzyNi8oBvzvmzQyV6K23J0OwvZY" }, "slide deck"),
                    " that was used for out launch Nov 29, 2016, or the ",
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=Wd7-g9ox-90" }, "video"),
                    " of that presentation.")),
            React.createElement(Card, { initiallyExpanded: true },
                React.createElement(CardTitle, { title: "1. The Start", actAsExpander: true, showExpandableButton: true }),
                React.createElement(CardText, { expandable: true },
                    React.createElement("p", null, "The founding mission of the budgetpedia.ca project is to make the Toronto budget more accessible to the people of Toronto, by supporting informed debate about the budget."),
                    React.createElement("p", null,
                        "The project was fostered by ",
                        React.createElement("a", { target: "_blank", href: "http://civictech.ca/" }, "Civic Tech Toronto"),
                        ", as part of its weekly ",
                        React.createElement("a", { target: "_blank", href: "https://en.wikipedia.org/wiki/Civic_technology" }, "hacknights"),
                        ", beginning in July of 2015. Several people from ",
                        React.createElement("a", { target: "_blank", href: "http://www.betterbudget.ca/" }, "betterbudget.ca"),
                        ", and others, were convened weekly by ",
                        React.createElement("a", { target: "_blank", href: "https://www.linkedin.com/in/henrikbechmann" }, "Henrik Bechmann"),
                        ", a software developer and occasional civic activist who had an interest in city budgets. After 16 of these meetings, much more volunteer input, and a formal workshop, a series of guiding principles for the project emerged. These included"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "use of clear terminology (clarity)"),
                        React.createElement("li", null, "availability of full context"),
                        React.createElement("li", null, "support for collaboration"),
                        React.createElement("li", null, "ability to influence budget process")))),
            React.createElement(Card, null,
                React.createElement(CardTitle, { title: "2. Development", actAsExpander: true, showExpandableButton: true }),
                React.createElement(CardText, { expandable: true },
                    React.createElement("p", null, "Based on this, some plans were laid, and in December 2015 budgetpedia.ca became an open source software project. Henrik ended up doing almost all of the coding so far, but many people, over 60, contributed content, design, guidance, data assembly, research, and all kinds of support."),
                    React.createElement("p", null, "Now Budgetpedia.ca as a project has a lot of assets, including"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "extensive ",
                            React.createElement("a", { target: "_blank", href: "https://drive.google.com/open?id=1wWpF1HU-YFKFJoZmqlvNx9xDnRHer12XoGS0QR6W198" }, "repositories"),
                            " of notes and code"),
                        React.createElement("li", null, "an ever growing set of datasets"),
                        React.createElement("li", null, "this website"),
                        React.createElement("li", null, "a collection of social media assets"),
                        React.createElement("li", null, "a very cool network of friends")),
                    React.createElement("p", null, "We learned some basic lessons:"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "for the core data, we're in the world of ",
                            React.createElement("a", { target: "_blank", href: "https://en.wikipedia.org/wiki/Analytics" }, "analytics")),
                        React.createElement("li", null, "people want granular data details - geolocated City 'cost centre' data"),
                        React.createElement("li", null, "The data has to be there, but the narrative is more important than the data")),
                    React.createElement("p", null, "Lots of people have an interest in city budgets, including"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Curious citizens"),
                        React.createElement("li", null, "Civil society organizations"),
                        React.createElement("li", null, "Concerned citizens"),
                        React.createElement("li", null, "City councillors"),
                        React.createElement("li", null, "Neighbourhood groups"),
                        React.createElement("li", null, "Councillor staff"),
                        React.createElement("li", null,
                            React.createElement("strong", null,
                                React.createElement("em", null, "Motivated activists"))),
                        React.createElement("li", null, "City staff"),
                        React.createElement("li", null, "Students"),
                        React.createElement("li", null, "Businesses"),
                        React.createElement("li", null, "Educators"),
                        React.createElement("li", null, "Journalists")),
                    React.createElement("p", null,
                        "The ",
                        React.createElement("em", null, "motivated activist"),
                        " is our iconic target audience"),
                    React.createElement("p", null, "We all share in these goals:"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Confidence in government"),
                        React.createElement("li", null, "Trust in government"),
                        React.createElement("li", null,
                            React.createElement("strong", null,
                                React.createElement("em", null, "Engagement"))),
                        React.createElement("li", null, "Insight"),
                        React.createElement("li", null, "Information"),
                        React.createElement("li", null, "Prepare for impending disruptions"),
                        React.createElement("li", null, "Democracy!"),
                        React.createElement("li", null, "We want to avoid dogmatic distrust of government"),
                        React.createElement("li", null,
                            React.createElement("strong", null,
                                React.createElement("em", null, "Better outcomes"))),
                        React.createElement("li", null, "Open government"),
                        React.createElement("li", null, "Open data")))),
            React.createElement(Card, null,
                React.createElement(CardTitle, { title: "3. Community", actAsExpander: true, showExpandableButton: true }),
                React.createElement(CardText, { expandable: true },
                    React.createElement("p", null, "The first version of the website (v 0.1) was released November 29, 2016. This represents a new phase."),
                    React.createElement("p", null,
                        "Now, in a sense the project belongs to everyone who uses it, or who gets involved. It's still a classic ",
                        React.createElement("a", { target: "_blank", href: "https://en.wikipedia.org/wiki/Open-source_software_development" }, "open source"),
                        " project, but is heading toward a ",
                        React.createElement("a", { target: "_blank", href: "https://en.wikipedia.org/wiki/Civil_society" }, "civil society"),
                        " organization. We're in transition."),
                    React.createElement("p", null, "We have a basic platform, some basic analytics, and a scaffold for adding services that users want. More collaboration, and easier access to more detailed, contextual information around specific issues is in our future. In short greater usability for activists is our goal, based on user research, user stories, use cases, and a focus on usefulness. We'll get better the more the project is used."),
                    React.createElement("p", null, "There are several things we can do to make these improvements:"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "attract volunteers: writers, researchers, developers, communicators, organizers"),
                        React.createElement("li", null, "collaborate with governments (coproduction)"),
                        React.createElement("li", null, "get staff (developers, researchers, communications, government relations, managers)"),
                        React.createElement("li", null, "get money (grants or service, to pay for the staff)"),
                        React.createElement("li", null, "get more data! at a highly granular level (local, geocoded, cost-centre level, staffing with classifications - union affiliations, work classifications, permanent/temp)"),
                        React.createElement("li", null, "expand into providing information on capital budgets (!)"),
                        React.createElement("li", null, "expand our scope (more governments)")),
                    React.createElement("p", null,
                        "We might even try to morph into something like the ",
                        React.createElement("em", null, "Canadian Centre for Open Budgets"),
                        ", with four teams and an advisory board:"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            "Research Team:",
                            React.createElement("ul", null,
                                React.createElement("li", null, "Research plan"),
                                React.createElement("li", null, "Data acquisition and processing"),
                                React.createElement("li", null, "Data QA"))),
                        React.createElement("li", null,
                            "Communications Team:",
                            React.createElement("ul", null,
                                React.createElement("li", null, "Communications plan"),
                                React.createElement("li", null, "Budget literacy programs"),
                                React.createElement("li", null, "Collaboration support"))),
                        React.createElement("li", null,
                            "Software Development Team:",
                            React.createElement("ul", null,
                                React.createElement("li", null, "Software development plan"),
                                React.createElement("li", null, "Backend migration to database"),
                                React.createElement("li", null, "Frontend enhancements"))),
                        React.createElement("li", null,
                            "Management Team:",
                            React.createElement("ul", null,
                                React.createElement("li", null, "Organizational development"),
                                React.createElement("li", null, "Funding"),
                                React.createElement("li", null, "Government relations"))),
                        React.createElement("li", null,
                            "Advisory Board",
                            React.createElement("ul", null,
                                React.createElement("li", null, "people who can offer guidance, and attract interest in the project")))),
                    React.createElement("p", null, "As a final word, we're expanding our mandate to promote the practice of open data with governments."),
                    React.createElement("p", null,
                        "Share  your thoughts with us! ",
                        React.createElement("a", { target: "_blank", href: "mailto:mail@budgetpedia.ca" }, "mail@budgetpedia.ca")))));
    }
}
export default About;
