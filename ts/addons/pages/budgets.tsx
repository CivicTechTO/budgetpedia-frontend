// budgets.tsx

import * as React from 'react'

import {Card, CardTitle, CardText} from 'material-ui/Card'

let Budgets = () => {

    let pagetitle = ( 
        <Card> 
            <CardTitle 
                title = {"Budgets"}
                subtitle = {"Budget details"}
            /> 
            <CardTitle 
                title = "2018"
            /> 
        </Card>)

    let budget2018 = (
        <Card initiallyExpanded>
            <CardTitle 
                actAsExpander={true}
                showExpandableButton={true}
                title = "Committee Meetings for the 2018 budget"
            />
            <CardText
                expandable
                style = {{
                    border:"1px solid silver",
                    margin:"0 3px 8px 3px",
                    borderRadius:"8px",
                }}
            > 
                <p>The 2018 budget cycle begins May 11, 2017.</p>
                <p>The <a target="_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=12190">budget committee</a
                > considers the <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.BU32.7">2018 budget directions and schedule</a> on May 11, 2017.
                (<a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=5473">video</a>)</p>
                <p>Highlights:</p>
                <ul>
                    <li>Toronto City Manager lays out rationale for 2018 budget direction -- "Status Quo": <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=15992">video</a></li>
                    <li>Toronto City Manager explains to Councillor DiCiano how 'Value for money' can happen - contracting out, investment in digital and management, reduce 'core businesses', take discretion away from staff: <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=18281">video</a></li>
                    <li>Toronto City Manager says value for money means reduction of 'core businesses' and reduction of staff discretion: <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=18470">video</a></li>
                    <li>Toronto City Manager reveals bias to shrink Municipal Government and Services; proud of reduction of social services: <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=18742">video</a></li>
                    <li>Toronto City Manager stonewalls Councillor Davis on public Service Plan Review and Priority-Setting process: <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=19360">video</a></li>
                    <li>Toronto City Manager blames Councillors for failure of maintaining state of good repair: <a target="_blank" href="https://youtu.be/mnUMDeQOUwA?t=19845">video</a></li>
                </ul>
                <p>The <a target="_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11825">executive committee</a
                > considers the <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18">2018 budget directions and schedule</a> on May 16, 2017.</p>
                <p>Highlights:</p>
                <ul>
                    <li>2018 budget direction: <a target="_blank" href="https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=28381">video</a></li>
                    <li>New Real Estate Division: <a target="_blank" href="https://www.youtube.com/watch?v=hR3gYykKJOw&feature=youtu.be&t=22628">video</a></li>
                </ul>
                <p>The <a target="_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11859">City Council</a
                > considers the <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18">2018 budget directions and schedule</a> on May 24, 2017. <a target="_blank" href="https://www.youtube.com/watch?v=qxzMIKnH4OE">video May 25, 2017, Part 1
                </a>, <a target="_blank" href="https://youtu.be/nv--55vbcb0?t=3341">video May 25, 2017, Part 2, after closed session
                </a>, <a target="_blank" href="https://www.youtube.com/watch?v=-xbjpFsPRNI">video May 26, 2017
                </a> </p>
                <p>Highlights:</p>
                <ul>
                    <li>2018 budget direction: <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18">agenda</a>, <a target="_blank" href="https://youtu.be/qxzMIKnH4OE?t=1235">video</a></li>
                    <li>New Real Estate Division: <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.9">agenda</a></li>
                </ul>
                <p>No further public consultations on the 2018 budget is directed by Council before October 2017. Therefore most decisions will be made by staff behind closed doors.</p>
            </CardText>
            <CardTitle 
                title = "2017"
            /> 
        </Card>)

    let investing = (
        <Card initiallyExpanded >
            <CardTitle title = {'Toronto\'s "Investing in our future" consultations'} 
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable
                style = {{
                    border:"1px solid silver",
                    margin:"0 3px 8px 3px",
                    borderRadius:"8px",
                }}
            >
                <p>Toronto is undertaking a planning process to find additional sources of funding. The 
                website for this initiative is here: <a target="_blank" href="http://www.investinginto.ca/">www.investinginto.ca</a>.
                </p>
                <p>See the first phase report <a target = "_blank" href="https://drive.google.com/open?id=0B208oCU9D8OuV0ZNcUpqYWpzdUE">here</a>.</p>
                <p>See the second phase consultation videos for Governance and Financial Oversight here (April 22, 2017):</p>
                <ul>
                    <li><a target = "_blank" href="https://www.youtube.com/watch?v=xlvL_1GGCjI">Financial and Other Decision-Making Information with Public Discussion</a>.  
                    Josie La Vita's plans for Financial Data Manaagement: scraped <a target="_blank" href="https://drive.google.com/open?id=1jmDAeN2rsG2XQwlAmycqxTmhunfONc1z9zlLZHmEctk">slide deck</a>; <a target="_blank" href="https://youtu.be/xlvL_1GGCjI?t=1812">video portion</a>.</li>
                    <li><a target = "_blank" href="https://www.youtube.com/watch?v=3JuxEPlT4AM">Balancing City Priorities and the Books: Public Debates</a></li>
                    <li><a target = "_blank" href="https://www.youtube.com/watch?v=WRPEKSRtdjc">Public Engagement for Long-Term Goals, Issues and Multi-Year Decision-Making</a></li>
                </ul>
                <p>There is still a public survey available for input <a target="_blank" href="http://www.investinginto.ca/join-the-consultation/governance-survey">here</a> April 22 - May 14.</p>
            </CardText>
        </Card>)

   let budget2017 = (
       <Card initiallyExpanded >
            <CardTitle 
                actAsExpander={true}
                showExpandableButton={true}
                title = "Committee Meetings for the 2017 budget"
            />
            <CardText
                expandable
                style = {{
                    border:"1px solid silver",
                    margin:"0 3px 8px 3px",
                    borderRadius:"8px",
                }}
            > 
            <p>Toronto's 2017 public budget process schedule is published <a 
                target="_blank" href="http://bit.ly/2eKcrfK">here.</a></p>
            <p>Follow events in these committees using the City's <a 
                target = "_blank" href="http://app.toronto.ca/tmmis/index.do">TMMIS
                </a> (Toronto Meeting Management Information System).
            Live streams can be seen <a 
            target="_blank" href="https://www.youtube.com/channel/UCfe2rzOnQzgEDvNzRRPUJsA">here</a>.
             Each committee's agendas, minutes, background documents, and meeting videos can be found through these links:</p>
            <h3>Rate supported budgets (waste, water, parking)</h3>
            <ul>
                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022">
                    Budget Committee</a>
                    : <a target = "_blank" href = "http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11968">November 4</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11968">video</a>)
                    , <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11065">November 18</a> (<a
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11065">video</a>)</li>
                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966">Executive Committee</a>
                        : <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10995">December 1</a> (<a
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=10995">video</a>)
                    </li>
                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961">City Council</a>
                    : <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=10878">December 13, 14, 15</a> (<a
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=10878">video</a>)</li>
            </ul>
            <h3>Tax supported budgets (eveything else)</h3>
            <ul>

                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=1022">Budget Committee</a
                    >: <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11948">December 6</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11948">video</a>)
                    , <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11969">December 16, 19 & 20</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11969">video</a>)
                    , <a target = "_blank" href="http://bit.ly/2eKcrfK">January 5, 9 & 10</a> (deputation videos:
                        Etobicoke Civic Center <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12330">afternoon</a>, <a
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12344">evening</a>; 
                        Scarborough Civic Center <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12324">afternoon</a>, <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12333">evening</a>; 
                        North York Civic Center <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12331">afternoon</a>, <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12345">evening</a>;
                        East York Civic Center <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12326">afternoon</a>, <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12327">evening</a>; 
                        York Civic Center <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12332">afternoon</a>, <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12346">evening</a>;
                        City Hall <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12328">morning</a>, <a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=12329">evening</a>
                        )
                    , <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11816">January 12</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11816">video</a>)
                    , <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11817">January 24</a>  (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11817">video</a>)</li>

                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=966">Executive Committee</a
                    >: <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11819">February 7</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11819">video</a>)</li>
                <li><a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&decisionBodyId=961">City Council</a
                    >: <a target = "_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11852">February 15</a> (<a 
                            target="_blank" href="http://app.toronto.ca/tmmis/video.do?id=11852">video</a>)</li>
            </ul>
            </CardText>
        </Card>)

    return <div>

        {pagetitle}
        {budget2018}
        {investing}
        {budget2017}

    </div>

}

export default Budgets
