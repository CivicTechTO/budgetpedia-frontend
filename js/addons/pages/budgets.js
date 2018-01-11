"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Card_1 = require("material-ui/Card");
let Budgets = () => {
    let pagetitle = (React.createElement(Card_1.Card, null,
        React.createElement(Card_1.CardTitle, { title: "Budgets", subtitle: "Budget details" }),
        React.createElement(Card_1.CardTitle, { title: "2018" })));
    let budget2018 = (React.createElement(Card_1.Card, { initiallyExpanded: true },
        React.createElement(Card_1.CardTitle, { actAsExpander: true, showExpandableButton: true, title: "Committee Meetings for the 2018 budget" }),
        React.createElement(Card_1.CardText, { expandable: true, style: {
                border: "1px solid silver",
                margin: "0 3px 8px 3px",
                borderRadius: "8px",
            } },
            React.createElement("p", null, "The 2018 budget cycle begins May 11, 2017."),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12190" }, "budget committee"),
                " considers the ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU32.7" }, "2018 budget directions and schedule"),
                " on May 11, 2017. (",
                React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=5473" }, "video"),
                ")"),
            React.createElement("p", null, "Highlights:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Toronto City Manager lays out rationale for 2018 budget direction -- \"Status Quo\": ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=15992" }, "video")),
                React.createElement("li", null,
                    "Toronto City Manager explains to Councillor DiCiano how 'Value for money' can happen - contracting out, investment in digital and management, reduce 'core businesses', take discretion away from staff: ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=18281" }, "video")),
                React.createElement("li", null,
                    "Toronto City Manager says value for money means reduction of 'core businesses' and reduction of staff discretion: ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=18470" }, "video")),
                React.createElement("li", null,
                    "Toronto City Manager reveals bias to shrink Municipal Government and Services; proud of reduction of social services: ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=18742" }, "video")),
                React.createElement("li", null,
                    "Toronto City Manager stonewalls Councillor Davis on public Service Plan Review and Priority-Setting process: ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=19360" }, "video")),
                React.createElement("li", null,
                    "Toronto City Manager blames Councillors for failure of maintaining state of good repair: ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/mnUMDeQOUwA?t=19845" }, "video"))),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11825" }, "executive committee"),
                " considers the ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18" }, "2018 budget directions and schedule"),
                " on May 16, 2017."),
            React.createElement("p", null, "Highlights:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "2018 budget direction: ",
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=28381" }, "video")),
                React.createElement("li", null,
                    "New Real Estate Division: ",
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=22628" }, "video"))),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11859" }, "City Council"),
                " considers the ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18" }, "2018 budget directions and schedule"),
                " on May 24, 2017. ",
                React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=qxzMIKnH4OE" }, "video May 25, 2017, Part 1"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://youtu.be/nv--55vbcb0?t=3341" }, "video May 25, 2017, Part 2, after closed session"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=-xbjpFsPRNI" }, "video May 26, 2017"),
                " "),
            React.createElement("p", null, "Highlights:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "2018 budget direction: ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18" }, "agenda"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/qxzMIKnH4OE?t=1235" }, "video")),
                React.createElement("li", null,
                    "New Real Estate Division: ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.9" }, "agenda"))),
            React.createElement("p", null, "No further public consultations on the 2018 budget is directed by Council before October 2017. Therefore most decisions will be made by staff behind closed doors.")),
        React.createElement(Card_1.CardTitle, { title: "2017" })));
    let investing = (React.createElement(Card_1.Card, { initiallyExpanded: true },
        React.createElement(Card_1.CardTitle, { title: 'Toronto\'s "Investing in our future" consultations', actAsExpander: true, showExpandableButton: true }),
        React.createElement(Card_1.CardText, { expandable: true, style: {
                border: "1px solid silver",
                margin: "0 3px 8px 3px",
                borderRadius: "8px",
            } },
            React.createElement("p", null,
                "Toronto is undertaking a planning process to find additional sources of funding. The website for this initiative is here: ",
                React.createElement("a", { target: "_blank", href: "http://www.investinginto.ca/" }, "www.investinginto.ca"),
                "."),
            React.createElement("p", null,
                "See the first phase report ",
                React.createElement("a", { target: "_blank", href: "https://drive.google.com/open?id=0B208oCU9D8OuV0ZNcUpqYWpzdUE" }, "here"),
                "."),
            React.createElement("p", null, "See the second phase consultation videos for Governance and Financial Oversight here (April 22, 2017):"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=xlvL_1GGCjI" }, "Financial and Other Decision-Making Information with Public Discussion"),
                    ". Josie La Vita's plans for Financial Data Manaagement: scraped ",
                    React.createElement("a", { target: "_blank", href: "https://drive.google.com/open?id=1jmDAeN2rsG2XQwlAmycqxTmhunfONc1z9zlLZHmEctk" }, "slide deck"),
                    "; ",
                    React.createElement("a", { target: "_blank", href: "https://youtu.be/xlvL_1GGCjI?t=1812" }, "video portion"),
                    "."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=3JuxEPlT4AM" }, "Balancing City Priorities and the Books: Public Debates")),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://www.youtube.com/watch?v=WRPEKSRtdjc" }, "Public Engagement for Long-Term Goals, Issues and Multi-Year Decision-Making"))),
            React.createElement("p", null,
                "There is still a public survey available for input ",
                React.createElement("a", { target: "_blank", href: "http://www.investinginto.ca/join-the-consultation/governance-survey" }, "here"),
                " April 22 - May 14."))));
    let budget2017 = (React.createElement(Card_1.Card, { initiallyExpanded: true },
        React.createElement(Card_1.CardTitle, { actAsExpander: true, showExpandableButton: true, title: "Committee Meetings for the 2017 budget" }),
        React.createElement(Card_1.CardText, { expandable: true, style: {
                border: "1px solid silver",
                margin: "0 3px 8px 3px",
                borderRadius: "8px",
            } },
            React.createElement("p", null,
                "Toronto's 2017 public budget process schedule is published ",
                React.createElement("a", { target: "_blank", href: "http://bit.ly/2eKcrfK" }, "here.")),
            React.createElement("p", null,
                "Follow events in these committees using the City's ",
                React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/index.do" }, "TMMIS"),
                " (Toronto Meeting Management Information System). Live streams can be seen ",
                React.createElement("a", { target: "_blank", href: "https://www.youtube.com/channel/UCfe2rzOnQzgEDvNzRRPUJsA" }, "here"),
                ". Each committee's agendas, minutes, background documents, and meeting videos can be found through these links:"),
            React.createElement("h3", null, "Rate supported budgets (waste, water, parking)"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022" }, "Budget Committee"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11968" }, "November 4"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11968" }, "video"),
                    ") , ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11065" }, "November 18"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11065" }, "video"),
                    ")"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966" }, "Executive Committee"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10995" }, "December 1"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=10995" }, "video"),
                    ")"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961" }, "City Council"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10878" }, "December 13, 14, 15"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=10878" }, "video"),
                    ")")),
            React.createElement("h3", null, "Tax supported budgets (eveything else)"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022" }, "Budget Committee"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11948" }, "December 6"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11948" }, "video"),
                    ") , ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11969" }, "December 16, 19 & 20"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11969" }, "video"),
                    ") , ",
                    React.createElement("a", { target: "_blank", href: "http://bit.ly/2eKcrfK" }, "January 5, 9 & 10"),
                    " (deputation videos: Etobicoke Civic Center ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12330" }, "afternoon"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12344" }, "evening"),
                    "; Scarborough Civic Center ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12324" }, "afternoon"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12333" }, "evening"),
                    "; North York Civic Center ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12331" }, "afternoon"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12345" }, "evening"),
                    "; East York Civic Center ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12326" }, "afternoon"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12327" }, "evening"),
                    "; York Civic Center ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12332" }, "afternoon"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12346" }, "evening"),
                    "; City Hall ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12328" }, "morning"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=12329" }, "evening"),
                    ") , ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11816" }, "January 12"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11816" }, "video"),
                    ") , ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11817" }, "January 24"),
                    "  (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11817" }, "video"),
                    ")"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966" }, "Executive Committee"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11819" }, "February 7"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11819" }, "video"),
                    ")"),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961" }, "City Council"),
                    ": ",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11852" }, "February 15"),
                    " (",
                    React.createElement("a", { target: "_blank", href: "http://app.toronto.ca/tmmis/video.do?id=11852" }, "video"),
                    ")")))));
    return React.createElement("div", null,
        pagetitle,
        budget2018,
        investing,
        budget2017);
};
exports.default = Budgets;
