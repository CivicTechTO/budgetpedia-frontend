// tribes.tsx
// required by bundler
import * as React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
var { Component } = React
import FontIcon from 'material-ui/FontIcon'

class Teams extends Component<any, any> {
    render() {
        return <div>
        <Card>
<CardTitle title="Our Teams. Join Us! Help us Make Budgetpedia Better." />

<CardText>
    Budgetpedia is a volunteer-driven project.  We've gotten where we are thanks
    to people with a wide variety of backgrounds and expertise.  If you're
    interested in democratizing information on municipal budgets in Ontario,
    we'd love to have you join us.
</CardText>

<CardTitle title="Getting Involved"/>

<CardText>
<h3>Where and when</h3>
We have regular meetings at Civic Tech Toronto Hacknights. We'll be there the first 
Tuesday of the month (and possibly other Tuesdays as well). Never hurts to check at <a
 target= "_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a> though
just to make sure. Check with Civic Tech TO <a target="_blank" href="http://www.meetup.com/Civic-Tech-Toronto/">meetup</a> for locations. 
Or just email us your interests and we'll take it from there.
</CardText>
<CardText>
<h3>Our Teams</h3>
<p>
    These are the main working groups we've set up. Feel free to get involved
    with one of them.  Or suggest something else you'd like to do.  We're
    pretty flexible.
</p>

<ul>
    <li><strong>Research</strong><br />
      <p>
        Like data?  Interested in sifting through municipal budgets and
        open data sets?  This is a key area we can use help. </p>
      <p>Specific things we could use help with:
      </p>
        <ul style={{marginBottom:"16px"}} >
            <li>Research planning</li>
            <li>Identifying, sifting through, and preparing muncipal data sets</li>
            <li>Validating and verifying the data (QA); eventually arranging for an audit</li>
            <li>Helping explain municipal budget data</li>
            <li>Visualization</li>
        </ul>
    </li>
    <li><strong>Web Development</strong>
        <p>
          Budgetpedia is an open source project, and we welcome contributions.
          The codebase is on <a 
              href="https://github.com/CivicTechTO/budgetpedia-dev-frontend">Github</a>.
              The main areas of work are:</p>
        <ul style={{marginBottom:"16px"}} >
            <li>Developing and maintaining a software development plan.</li>
            <li>Enhancing the front-end (it really needs an admin interface for example)</li>
            <li>Enhancing the backend, starting with migrating the data from source files to databases;
            supporting login, logout, and content management</li>
        </ul>
        <p>
          Technical details are as follows:
        </p>
        <ul style={{marginBottom:"16px"}} >
            <li>Main frontend components:
                <ul style={{marginBottom:"8px"}} >
                    <li>typescript (language - es6 superset, strongly typed)</li>
                    <li>reactjs (rendering)</li>
                    <li>redux (model/state manager)</li>
                    <li>fetch (ajax)</li>
                    <li>material-ui for widgets, a Google Material Design implementation</li>
                </ul>
            </li>
            <li>Main backend components (for next phase):
                <ul style={{marginBottom:"8px"}} >
                    <li>nodejs environment on server</li>
                    <li>nginx for web server</li>
                    <li>hapijs for api handler</li>
                    <li>available databases: mariadb (relational), mongodb (aggregates), neo4j (graphs)</li>
                </ul>
            </li>
        </ul>
    </li>
    <li><strong>Communications</strong><br/>
        <p>
          Numbers are nice but it's the stories that matter to most people.
        </p>
        <p>
          Help us explain what's going on in the budget;
          Help spread the word about budgetpedia;
          Help us build partnerships with other people and organizations who care
          about municipal budgets.
        </p>
        <p>Some of the specific things we're working on include:</p>
        <ul style={{marginBottom:"16px"}}>
            <li>Social media communication and outreach</li>
            <li>Developing budget literacy programs</li>
            <li>Supporting collaboartion among users</li>
            <li>Content generation: blogs, long-form prose, etc.  Pull apart
                the budget and show us the stories that are there.  Let your
                inner Nate Silver shine!</li>
        </ul>
    </li>
    <li><strong>Management</strong><br/>
        <p>This is the group tasked with looking after Budgetpedia's future.</p>
        <ul style={{marginBottom:"16px"}} >
            <li>Developing a management plan</li>
            <li>Organizational development</li>
            <li>Government relations</li>
            <li>Funding, including grants and possibly a service-for-fee plan</li>
        </ul>
    </li>
    <li><strong>Advisory Board</strong><br/>
        <p>We're working on organizing an advisory board to help guide the project, and develop connections among user groups.</p>
    </li>
</ul>
</CardText>
<CardText>
<h3>People</h3>
<p>
    These are just a few of the people involved in Budgetpedia (alphabetical).  If you've got
    questions, or want to know more, please reach out to one of us at <a target="_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a> .
</p>
<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/donaltman.jpg" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Don Altman is with our advisory board, and has just retired from being the Manager of Corporate Financial Strategies at the City of Toronto.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/HenrikHeadshotSquare.jpg" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Henrik Bechmann is the project lead and lead developer.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/kejobuchanan.png" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Kejo Buchanan is with our advisory board, and an expert at resource and information structures and access.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/lindadow.png" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Lindamarleny Dow is the project's communications lead.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/chrisgraham.png" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Christopher Graham is involved with research and project development.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <FontIcon className = "material-icons" style = {{borderRadius:"50%",float:"left",height:"40px",fontSize:'40px',margin:"6px",color:'rgba(0,0,0,0.4)'}}>person</FontIcon>
    <p>Arthur Gron is a writer and one of our Medium publication editors.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/kiramccutcheon.png" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Kira McCutcheon is involved with content development, communications, and project development.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <FontIcon className = "material-icons" style = {{borderRadius:"50%",float:"left",height:"40px",fontSize:'40px',margin:"6px",color:'rgba(0,0,0,0.4)'}}>person</FontIcon>
    <p>Jim Rootham is a computer scientist, and has taken on the challenge of reviewing the current codebase to prepare for the next development phase.</p>
    <div style={{clear:"left"}} ></div>
</div>

<div style={{border:"1px solid silver",margin:"6px 3px",padding:"3px",borderRadius:"8px"}} >
    <img src="./public/avatars/asherzafar.jpg" style = {{borderRadius:"50%",float:"left",height:"40px",margin:"6px"}} />
    <p>Asher Zafar is an economist, strategy and analytics professional, currently helping us with data analysis.</p>
    <div style={{clear:"left"}} ></div>
</div>

</CardText>
</Card>
</div>
    }
}

export default Teams

