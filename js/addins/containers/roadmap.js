"use strict";
const React = require('react');
var { Component } = React;
const Card_1 = require('material-ui/Card');
let moment = require('moment');
class Roadmap extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            roadmap: null
        };
        this.roadmapintro = React.createElement("div", null, 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: "Budget Roadmap", subtitle: "Annual cycle of decision points"}), 
                React.createElement(Card_1.CardTitle, {title: "2017"})), 
            React.createElement(Card_1.Card, {initiallyExpanded: true}, 
                React.createElement(Card_1.CardTitle, {actAsExpander: true, showExpandableButton: true, title: "Committee Meetings for the 2017 budget"}), 
                React.createElement(Card_1.CardText, {expandable: true, style: {
                    border: "1px solid silver",
                    margin: "0 3px 8px 3px",
                    borderRadius: "8px",
                }}, 
                    React.createElement("p", null, 
                        "Toronto's 2017 public budget process schedule is published ", 
                        React.createElement("a", {target: "_blank", href: "http://bit.ly/2eKcrfK"}, "here.")), 
                    React.createElement("p", null, 
                        "Follow events in these committees using the City's ", 
                        React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/index.do"}, "TMMIS"), 
                        " (Toronto Meeting Management Information System)." + ' ' + "Live streams can be seen ", 
                        React.createElement("a", {target: "_blank", href: "https://www.youtube.com/channel/UCfe2rzOnQzgEDvNzRRPUJsA"}, "here"), 
                        ". Each committee's agendas, minutes, and background documents can be found through these links:"), 
                    React.createElement("h3", null, "Rate supported budgets (waste, water, parking)"), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022"}, "Budget Committee"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11968"}, "November 4"), 
                            " (", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11968"}, " video"), 
                            ")" + ' ' + ", ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11065"}, "November 18"), 
                            " (", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11065"}, " video"), 
                            ")"), 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966"}, "Executive Committee"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10995"}, "December 1")), 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961"}, "City Council"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10878"}, "December 13 & 14"))), 
                    React.createElement("h3", null, "Tax supported budgets (eveything else)"), 
                    React.createElement("ul", null, 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022"}, "Budget Committee"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11948"}, "December 2"), 
                            ", ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11969"}, "December 16, 19 & 20, possibly 21"), 
                            ", ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11815"}, "January 5, 9 & 10"), 
                            ", ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11816"}, "January 12"), 
                            ", ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11817"}, "January 24")), 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966"}, "Executive Committee"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11819"}, "February 7")), 
                        React.createElement("li", null, 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961"}, "City Council"), 
                            ": ", 
                            React.createElement("a", {target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11852"}, "February 15, 16, possibly 17"))))), 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: 'Toronto\'s "Investing in our future" consultations', actAsExpander: true, showExpandableButton: true}), 
                React.createElement(Card_1.CardText, {expandable: true, style: {
                    border: "1px solid silver",
                    margin: "0 3px 8px 3px",
                    borderRadius: "8px",
                }}, 
                    React.createElement("p", null, 
                        "Toronto is undertaking a planning process to find additional sources of funding. The" + ' ' + "website for this initiative is here: ", 
                        React.createElement("a", {target: "_blank", href: "http://www.investinginto.ca/"}, "www.investinginto.ca"), 
                        "."), 
                    React.createElement("p", null, 
                        "The public consultation options for this process are outlined ", 
                        React.createElement("a", {target: "_blank", href: "http://www.investinginto.ca/join-the-consultation/"}, "here"), 
                        "." + ' ' + "They include surveys open November 9 - 20 and December 5 - 23, 2015, and public meetings December 5, 6, 7 and 8 for which you have to sign up."), 
                    React.createElement("p", null, "There's a second phase planned - Governance and Financial Oversight - for the winter and spring 2017."))), 
            React.createElement("hr", {style: {
                borderWidth: "4px",
                borderStyle: "outset",
            }}), 
            React.createElement(Card_1.Card, null, 
                React.createElement(Card_1.CardTitle, {title: "2016 sample decision roadmap pattern"}), 
                React.createElement(Card_1.CardText, null, 
                    React.createElement("div", null, "Below is a summary of the program-by-program decision making process used for the Toronto 2016 budget, to provide some insight into the annual cycle."), 
                    React.createElement("div", null, "(A program is a division or an agency)"), 
                    React.createElement("div", null, "The data was gathered through a combination of public sources and interviews with city staff."))));
        this.phases = null;
        this.prepareRoadmap = () => {
            if (!this.state.roadmap)
                return;
            if (this.phases)
                return;
            let roadmap = this.state.roadmap;
            let phases = roadmap.phases;
            let rawevents = roadmap.events;
            let rawevent;
            for (rawevent of rawevents) {
                phases[rawevent.phase].events.push(rawevent);
            }
            let phaselist = [];
            for (let phasename in phases) {
                phaselist.push(phases[phasename]);
            }
            phaselist = phaselist.sort((a, b) => {
                return a.index - b.index;
            });
            this.phases = phaselist;
        };
        this.getEventClusterElement = (eventcode, lookups, eventslist, phasetitle) => {
            return React.createElement(Card_1.CardText, {expandable: true, style: {
                border: "1px solid silver",
                margin: "0 3px 8px 3px",
                borderRadius: "8px",
            }, key: eventcode}, 
                React.createElement("div", {style: {
                    fontStyle: 'italic',
                    marginBottom: "8px"
                }}, 'Part of ' + phasetitle + ' phase: ' + lookups[eventcode]), 
                eventslist);
        };
        this.getEventElement = (event, eventindex) => {
            return React.createElement("div", {key: eventindex, style: {
                border: "1px dashed silver",
                margin: "0 3px 8px 3px",
                padding: "3px",
                borderRadius: "8px",
            }}, 
                React.createElement("div", null, 
                    React.createElement("em", null, "Budget type:"), 
                    " ", 
                    event.budget_type, 
                    " "), 
                React.createElement("div", null, 
                    React.createElement("em", null, "Description:"), 
                    " ", 
                    event.budget_event, 
                    " "), 
                event.date ? React.createElement("div", null, 
                    React.createElement("em", null, "Date:"), 
                    " ", 
                    moment(event.date, 'YYYY-M-D').format('MMMM D, YYYY')) : null, 
                event.location ? React.createElement("div", null, 
                    React.createElement("em", null, "Location:"), 
                    " ", 
                    event.location, 
                    " ") : null, 
                event.notes ? React.createElement("div", null, 
                    React.createElement("em", null, "Notes:"), 
                    " ", 
                    event.notes, 
                    " ") : null, 
                React.createElement("div", null, 
                    React.createElement("em", null, "Public:"), 
                    " ", 
                    event.public, 
                    " "));
        };
        this.getPhaseContent = (events, phasetitle) => {
            let lookups = this.state.roadmap.lookups;
            let eventcode = null;
            let eventClusterElements = [];
            let eventClusterElement = null;
            let eventslist;
            let event = null;
            for (let eventindex in events) {
                event = events[eventindex];
                if (event.budget_event_code !== eventcode) {
                    if (eventcode) {
                        eventClusterElement = this.getEventClusterElement(eventcode, lookups, eventslist, phasetitle);
                        eventClusterElements.push(eventClusterElement);
                    }
                    eventcode = event.budget_event_code;
                    eventslist = [];
                }
                let eventElement = this.getEventElement(event, eventindex);
                eventslist.push(eventElement);
            }
            if (eventcode) {
                eventClusterElement = this.getEventClusterElement(eventcode, lookups, eventslist, phasetitle);
                eventClusterElements.push(eventClusterElement);
            }
            return eventClusterElements;
        };
        this.getRoadmap = () => {
            if (!this.phases)
                return null;
            let phasesinput = this.phases;
            let phases = phasesinput.map((phase, index) => {
                let phasecontent = this.getPhaseContent(phase.events, phase.title);
                let [startdate, enddate] = this.getDateRange(phase.events);
                let phaseElement = React.createElement(Card_1.Card, {key: phase.index}, 
                    React.createElement(Card_1.CardTitle, {actAsExpander: true, showExpandableButton: true, title: phase.title, subtitle: phase.subtitle + ' from ' +
                        moment(startdate, 'YYYY-MM-DD').format('MMMM D, YYYY') + ' to ' +
                        moment(enddate, 'YYYY-MM-DD').format('MMMM D, YYYY')}), 
                    phasecontent);
                return phaseElement;
            });
            return phases;
        };
        this.getDateRange = (events) => {
            let startdate = null;
            let enddate = null;
            for (let event of events) {
                let eventdate = moment(event.date, 'YYYY-M-D').format('YYYY-MM-DD');
                if (!startdate || startdate > eventdate) {
                    startdate = eventdate;
                }
                if (!enddate || enddate < eventdate) {
                    enddate = eventdate;
                }
            }
            return [startdate, enddate];
        };
    }
    componentDidMount() {
        fetch('./db/repositories/toronto/roadmaps/government_events.json').then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log('response error', response);
            }
        }).then(json => {
            this.setState({
                roadmap: json
            });
        }).catch(error => {
            console.log('error', error);
        });
    }
    render() {
        this.prepareRoadmap();
        let roadmap = this.getRoadmap();
        return React.createElement("div", null, 
            this.roadmapintro, 
            roadmap);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Roadmap;
