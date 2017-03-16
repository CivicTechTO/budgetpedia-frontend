// announements.tsx
// required by bundler
import * as React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
var { Component } = React

class Announcements extends Component<any, any> {
    render() {
        return <div>
<Card>
<CardTitle title ="Budgetpedia Project Announcements" />

<CardText>
<h3>Key Upcoming Events</h3>

<ul style = {{marginBottom:"16px"}} >
    <li><p><strong>Regular Meetups: First Tuesday of each month 6:30-9:00 pm </strong><br />
        <em> Location:</em> <a target = "_blank"
        href="http://www.meetup.com/Civic-Tech-Toronto/">
            Varies - Check the Meetup page for the next meeting
        </a>
        </p>
        <p>
        Additional meetings may be scheduled. This is where Budgetpedia was born and raised to its current early state.
        It's also where a lot of the brainstorming, development and creative
        processes happen.
        Anyone with an interest in this project is welcome.  No coding or
        technical skills required!</p>
        <p>For more details, check out the <a href="./teams">Teams</a> page
        of this website, or the <a target = "_blank" href="http://www.civictech.ca">Civic Tech website home Page</a>.</p>
    </li>
</ul>
</CardText>

<CardText>
<h3>Key Past Events</h3>
<ul style = {{marginBottom:"16px"}} >
    <li><p><strong>Saturday, Feb 25, 2017 gave "lightening" (10 minute) talk at  <a target="_blank" 
    href="http://hellocon.net/">Hello Con</a> conference</strong>. See the <a target = "_blank" href="https://www.youtube.com/watch?v=Pn4l9JA1ROg">video</a>.
    </p>
    <p>Highlighted benefits of <em>
    taxonomies, careful data preparation, and reactive programming</em>. See the slide deck <a 
    target="_blank" href="https://drive.google.com/open?id=13tOAln9YE6DOKP_zrGiLzVpeIaZLkd3bWxoBhHj3UUg">here</a>.</p>
    </li>
    <li><p><strong>Monday, Feb 6, 2017 honoured to give budget overview presentation to the <a target="_blank" 
    href="http://thetyc.ca/">toronto youth cabinet</a> budget meeting at City Hall.</strong>
    </p>
    <p>Great conversation ensued between councillors Perks, Wong-Tam, and youth cabinet. Our take: people's narratives
    need to snowball to overcome obstacles. Slide deck we used is <a target="_blank" href="https://drive.google.com/open?id=153RdCnnAlNPGMo7_Ji-V4j_nMFczzgdHWELiyI2cYX0">here</a>.</p>
    </li>
    <li><p><strong>Monday, January 30, 2017 Budgetpedia upgrade v0.1.2 released</strong><br />
        This release adds two new features to the explorer page.</p>
        <p> <em>Latest analyst notes</em> provides access to the 
        latest city capital and operating analyst notes for all divisions and agencies cited in the budget. These are
        available from a button at the top of the page, and also from info buttons on all budget charts. 
        </p>
        <p>Secondly a <em>View</em> button beside the <em>Taxonomy</em> selection shows an hierarchical chart (
            like an org chart) of the currently selected taxonomy. This allows the user to get an overview
            of the currently selected taxonomy. The charts are interactive, allowing the user to hide child 
            cells by double-clicking on parent cells. This allows for focus on selected sections of the hierarchy.
        </p>
    </li>
    <li><p><strong>Monday, January 2, 2017 Budgetpedia upgrade v0.1.1 released</strong><br />
        This release adds a major feature: "select an area of interest" which creates a "storyboard" of 
        charts related to one of the main areas of budget activities, as selected by the user. This is 
        intended to be a precursor to more configurable, narrared user storyboards in the future.
        </p>
    </li>
    <li><p>
        <strong>Tuesday, November 29, 2016 6:30-9:00 pm Budgetpedia v0.1 Launch!</strong><br />
        <em>Location:</em> <a target="_blank" href="https://www.meetup.com/Civic-Tech-Toronto/events/235306439/">Civic Tech Toronto Meetup</a>
        </p>
        <p>
        Join us for the official launch of Budgetpedia version 0.1 at
        Civic Tech's weekly meetup. See Budgetpedia in action, gain insights
        into the city budget and generally celebrate our going live. See the <a
        target="_blank"
        href="https://drive.google.com/open?id=1xZyJ6_wk4M6XP8DgrzyNi8oBvzvmzQyV6K23J0OwvZY"
        >slide deck</a> for the meetup.</p>
    </li>
</ul>
</CardText>

</Card>
        </div>
    }
}

export default Announcements