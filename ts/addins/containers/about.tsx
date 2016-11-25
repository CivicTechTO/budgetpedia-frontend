// about.tsx
import * as React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
var { Component } = React

class About extends Component<any, any> {
    render() { return <div>
    <Card initiallyExpanded>
<CardTitle 
    title = "1. The Start"
    actAsExpander={true}
    showExpandableButton={true}
/>
<CardText expandable>

<p>The founding mission of the budgetpedia.ca project is to make the Toronto budget more accessible to the people of Toronto, by supporting informed debate about the budget.</p>

<p>The project was fostered by <a target="_blank" href="http://civictech.ca/">Civic Tech Toronto</a>, as part of its weekly <a traget="_blank" href="https://en.wikipedia.org/wiki/Civic_technology">hacknights</a>, beginning in July of 2015. Several people from <a target="_blank" href="http://www.betterbudget.ca/">betterbudget.ca</a>, and others, were convened weekly by <a target="_blank" href="https://www.linkedin.com/in/henrikbechmann">Henrik Bechmann</a>, a software developer and occasional civic activist who had an interest in city budgets. After 16 of these meetings, much more volunteer input, and a formal workshop, a series of guiding principles for the project emerged. These included</p>

<ul>
    <li>use of clear terminology (clarity)</li>
    <li>availability of full context</li>
    <li>support for collaboration</li>
    <li>ability to influence budget process</li>
</ul>

 </CardText>

    </Card>
    <Card>

<CardTitle 
    title = "2. Development"
    actAsExpander={true}
    showExpandableButton={true}
/>

<CardText expandable>

<p>Based on this, some plans were laid, and in December 2015 budgetpedia.ca became an open source software project. Henrik ended up doing almost all of the coding so far, but many people, over 60, contributed content, design, guidance, data assembly, research, and all kinds of support.</p>

<p>Now Budgetpedia.ca as a project has a lot of assets, including</p>

<ul>
    <li>extensive <a target="_blank" href="https://drive.google.com/open?id=1wWpF1HU-YFKFJoZmqlvNx9xDnRHer12XoGS0QR6W198">repositories</a> of notes and code</li>
    <li>an ever growing set of datasets</li>
    <li>this website</li>
    <li>a collection of social media assets</li>
    <li>a very cool network of friends</li>
</ul>

<p>We learned some basic lessons:</p>

<ul>
    <li>for the core data, we're in the world of <a target="_blank" href="https://en.wikipedia.org/wiki/Analytics">analytics</a></li>
    <li>people want granular data details - geolocated City 'cost centre' data</li>
    <li>The data has to be there, but the narrative is more important than the data</li>
</ul>

<p>Lots of people have an interest in city budgets, including</p>

<ul>
    <li>Curious citizens</li>
    <li>Civil society organizations</li>
    <li>Concerned citizens</li>
    <li>City councillors</li>
    <li>Neighbourhood groups</li>
    <li>Councillor staff</li>
    <li><strong><em>Motivated activists</em></strong></li>
    <li>City staff</li>
    <li>Students</li>
    <li>Businesses</li>
    <li>Educators</li>
    <li>Journalists</li>
</ul>

<p>The <em>motivated activist</em> is our iconic target audience</p>

<p>We all share in these goals:</p>

<ul>
    <li>Confidence in government</li>
    <li>Trust in government</li>
    <li><strong><em>Engagement</em></strong></li>
    <li>Insight</li>
    <li>Information</li>
    <li>Prepare for impending disruptions</li>
    <li>Democracy!</li>
    <li>We want to avoid dogmatic distrust of government</li>
    <li><strong><em>Better outcomes</em></strong></li>
    <li>Open government</li>
    <li>Open data</li>
</ul>

</CardText>

    </Card>
    <Card>

<CardTitle 
    title = "3. Community"
    actAsExpander={true}
    showExpandableButton={true}
/>

<CardText expandable>

<p>The first version of the website (v 0.1) was released November 29, 2016. This represents a new phase.</p>

<p>Now, in a sense the project belongs to everyone who uses it, or who gets involved. It's still a classic <a target="_blank" href="https://en.wikipedia.org/wiki/Open-source_software_development">open source</a> project, but is heading toward a <a target="_blank" href="https://en.wikipedia.org/wiki/Civil_society">civil society</a> organization. We're in transition.</p>

<p>We have a basic platform, some basic analytics, and a scaffold for adding services that users want. More collaboration, and easier access to more detailed, contextual information around specific issues is in our future. In short greater usability for activists is our goal, based on user research, user stories, use cases, and a focus on usefulness. We'll get better the more the project is used.</p>

<p>There are several things we can do to make these improvements:</p>

<ul>
    <li>attract volunteers: writers, researchers, developers, communicators, organizers</li>
    <li>collaborate with governments (coproduction)</li>
    <li>get staff (developers, researchers, communications, government relations, managers)</li>
    <li>get money (grants or service, to pay for the staff)</li>
    <li>get more data! at a highly granular level (local, geocoded, cost-centre level, staffing with classifications - union affiliations, work classifications, permanent/temp)</li>
    <li>expand into providing information on capital budgets (!)</li>
    <li>expand our scope (more governments)</li>
</ul>

<p>We might even try to morph into something like the <em>Canadian Centre for Open Budgets</em>, with four teams and an advisory board:</p>

<ul>
    <li>Research Team:
    <ul>
        <li>Research plan</li>
        <li>Data acquisition and processing</li>
        <li>Data QA</li>
    </ul>
    </li>
    <li>Communications Team:
    <ul>
        <li>Communications plan</li>
        <li>Budget literacy programs</li>
        <li>Collaboration support</li>
    </ul>
    </li>
    <li>Software Development Team:
    <ul>
        <li>Software development plan</li>
        <li>Backend migration to database</li>
        <li>Frontend enhancements</li>
    </ul>
    </li>
    <li>Management Team:
    <ul>
        <li>Organizational development</li>
        <li>Funding</li>
        <li>Government relations</li>
    </ul>
    </li>
    <li>Advisory Board
    <ul>
        <li>people who can offer guidance, and attract interest in the project</li>
    </ul>
    </li>
</ul>

<p>As a final word, we're expanding our mandate to promote the practice of open data with governments.</p>

<p>Share  your thoughts with us! <a target="_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a></p>
</CardText>

    </Card>

    </div>
}}

export default About