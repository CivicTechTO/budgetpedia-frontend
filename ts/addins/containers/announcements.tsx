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
    <li><p>
        <strong>Tuesday, November 29 6:30-9:00 pm Budgetpedia v0.1 Launch!</strong><br />
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
        <p>For more details, check out the <a href="joinus">Join Us!</a> page
        of this website, or the <a target = "_blank" href="http://www.civictech.ca">Civic Tech website home Page</a>.</p>
    </li>
</ul>
</CardText>

<CardText>
<h3>Key Past Events</h3>
</CardText>

</Card>
        </div>
    }
}

export default Announcements