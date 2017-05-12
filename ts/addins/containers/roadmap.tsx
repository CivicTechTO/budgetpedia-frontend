// tribes.tsx
// required by bundler
import * as React from 'react'
var { Component } = React
import {Card, CardTitle, CardText} from 'material-ui/Card'
let moment = require('moment')

interface Phase {
    index: number,
    events:any[],
    title:string,
    subtitle?:string,
}

interface BudgetEvent {
    budget_event:string,
    budget_event_code: string,
    budget_type: string,
    category: string,
    location: string,
    date:string,
    notes:string,
    phase:string,
    public: string,
}

interface Roadmap {
    events:any[],
    phases:Phase[],
}

interface State {
    roadmap:any // Roadmap
}

class Roadmap extends Component<any, State> {

    state = {
        roadmap:null
    }

    componentDidMount() {

        fetch('./db/repositories/toronto/roadmaps/government_events.json').then( response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log('response error',response)
            }
        }).then( json => {
            this.setState({
                roadmap:json
            })
        }).catch( error => {
            console.log('error',error)
        })

    }

    // <h3>Rate supported budgets (waste, water, parking)</h3>
    // <ul>
    // </ul>
    // <h3>Tax supported budgets (eveything else)</h3>
    // <ul>
    // </ul>

    roadmapintro = <div>
        <Card> 
            <CardTitle 
                title = {"Budget Roadmap"}
                subtitle = {"Annual cycle of decision points"}
            /> 
            <CardTitle 
                title = "2018"
            /> 
        </Card>
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
                <p> Next event: The <a target="_blank" href="http://app.toronto.ca/tmmis/decisionBodyProfile.do?function=doPrepare&meetingId=11825">executive committee</a
                > considers the <a target="_blank" href="http://app.toronto.ca/tmmis/viewAgendaItemHistory.do?item=2017.EX25.18">2018 budget directions and schedule</a> on May 16, 2017.</p>
            </CardText>
            <CardTitle 
                title = "2017"
            /> 
        </Card>
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
        </Card>
        <Card >
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
        </Card>
        <hr style = {
            {
                borderWidth:"4px",
                borderStyle:"outset",
            }
        }
        />
        <Card>
            <CardTitle 
                title = "2016"
            /> 
            <CardTitle 
                title = "2016 sample decision roadmap pattern"
            /> 
            <CardText>
            <div>Below is a summary of the program-by-program decision making process used for the Toronto 2016 budget, to provide some insight into the annual cycle.</div>
            <div>(A program is a division or an agency)</div>
            <div>The data was gathered through a combination of public sources and interviews with city staff.</div>
            </CardText>
        </Card>
        </div>

    phases:Phase[] = null

    prepareRoadmap = () => {

        if (!this.state.roadmap) return
        if (this.phases) return
        let roadmap = this.state.roadmap
        let phases = roadmap.phases
        let rawevents = roadmap.events as Object[]
        let rawevent:any

        for (rawevent of rawevents) {
            phases[rawevent.phase].events.push(rawevent)
        }

        let phaselist:Phase[] = []
        for (let phasename in phases) {
            phaselist.push(phases[phasename])
        }

        phaselist = phaselist.sort((a,b) => {
            return a.index - b.index
        })

        this.phases = phaselist

    }

    getEventClusterElement = (
        eventcode, 
        lookups, 
        eventslist, 
        phasetitle) => {

        return <CardText
            expandable = {true}
            style = {{
                border:"1px solid silver",
                margin:"0 3px 8px 3px",
                borderRadius:"8px",
            }}
            key = {eventcode}
        > 
            <div style={
                {
                    fontStyle:'italic',
                    marginBottom:"8px"
                }
            }>

                { 'Part of ' + phasetitle + ' phase: ' + lookups[eventcode] }

            </div>

            { eventslist }

        </CardText>
    }

    getEventElement = (event:BudgetEvent,eventindex) => {

        return <div
            key = {eventindex}
            style = {{
                border:"1px dashed silver",
                margin:"0 3px 8px 3px",
                padding:"3px",
                borderRadius:"8px",
            }}
        >

            <div><em>Budget type:</em> { event.budget_type } </div>
            <div><em>Description:</em> { event.budget_event } </div>
            {event.date?<div><em>Date:</em> { moment(event.date,'YYYY-M-D').format('MMMM D, YYYY') }</div>:null }
            {event.location?<div><em>Location:</em> { event.location } </div>:null}
            {event.notes?<div><em>Notes:</em> { event.notes } </div>:null}
            <div><em>Public:</em> { event.public } </div>

        </div>

    }

    getPhaseContent = (events, phasetitle) => {

        let lookups = this.state.roadmap.lookups
        let eventcode = null
        let eventClusterElements = []
        let eventClusterElement = null
        let eventslist
        let event:BudgetEvent = null

        for (let eventindex in events) {

            event = events[eventindex]
            if (event.budget_event_code !== eventcode) {
                if (eventcode) {
                    eventClusterElement = this.getEventClusterElement(
                        eventcode,lookups,eventslist,phasetitle)
                    eventClusterElements.push(eventClusterElement)
                }
                eventcode = event.budget_event_code
                eventslist = []
            }
            let eventElement = this.getEventElement(event, eventindex)
            eventslist.push(eventElement)

        }

        // tail settlement
        if (eventcode) {

            eventClusterElement = this.getEventClusterElement(
                eventcode,lookups,eventslist,phasetitle)
            eventClusterElements.push(eventClusterElement)

        }

        return eventClusterElements

    }

    getRoadmap = () => {

        if (!this.phases) return null

        let phasesinput = this.phases
        let phases = phasesinput.map((phase,index) => {

            let phasecontent = this.getPhaseContent(phase.events, phase.title)
            let [startdate, enddate] = this.getDateRange(phase.events)
            let phaseElement = <Card
                    key = {phase.index}
                >
                <CardTitle 
                    actAsExpander={true}
                    showExpandableButton={true}
                    title = { phase.title }
                    subtitle = {phase.subtitle + ' from ' + 
                        moment(startdate,'YYYY-MM-DD').format('MMMM D, YYYY') + ' to ' + 
                        moment(enddate,'YYYY-MM-DD').format('MMMM D, YYYY')
                    }
                />

                { phasecontent }

            </Card>

            return phaseElement

        })

        return phases

    }

    getDateRange = (events) => {

        let startdate = null
        let enddate = null
        for (let event of events) {

            let eventdate = moment(event.date,'YYYY-M-D').format('YYYY-MM-DD')

            if (!startdate || startdate > eventdate) {
                startdate = eventdate
            }

            if (!enddate || enddate < eventdate) {
                enddate = eventdate
            }

        }

        return [startdate,enddate]

    }

    render() {

        this.prepareRoadmap()
        let roadmap = this.getRoadmap()

        return <div>

            { this.roadmapintro }

            { roadmap }

        </div>

    }
}

export default Roadmap