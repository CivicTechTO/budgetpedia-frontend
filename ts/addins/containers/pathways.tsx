// pathways.tsx
// required by bundler
import * as React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
var { Component } = React

class Pathways extends Component<any, any> {
    render() {
        return <div>
            <Card>
            <CardTitle
                title="Activist Pathways"
                subtitle = "How to make change"
            />
            <CardText>
            <p>Making change is hard. Making change in government is harder. Here we want to collect stories 
            of what's worked.</p>

            <p>... because the purpose of this section of the Budgetpedia website is to direct you, dear
            social activist, to places where you can learn what others before you, or around you,
            did to make positive changes in their communities, or within their governments. If you've
            succeeded in making some changes, perhaps you could see your way to letting us link to
            your story so that others can learn from it.</p>

            <p>We love a celebration story, and we love when Toronto is the grounds for this 
            celebration. We are inspired by those who want to see change, and by those who make 
            the moves to see that through. No matter how big, or how small, dedication to a cause 
            is motivating - and who can't use a push every now and then?
            </p>

            <p>If you're looking for a home for your story, consider <a
            target = "_blank"
            href="http://medium.com/budgetpedia"
            >Budgetpedia's Medium publication</a>. 
            You can publish your story there, and we can link it here. The only editorial criteria we
            have is that it be accurate, respectful, and constructive. Or if you know of a story
            that you think is worth sharing, then please let us know at <a
            target="_blank"
            href="mailto:mail@budgetpedia.ca"
            >mail@budgetpedia.ca</a>
            </p>
            <hr />
            <div style={
                {
                    textAlign:"center"
                }
            } >
                "Alone we can do so little; together we can do so much" <br />
                - Helen Keller
            </div>
            <hr />
            <p>
                For example (click to expand):
            </p>
            </CardText>
            </Card>
            <Card>
            <CardTitle 
                title="Neighbourhood parks"
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable>
<h3>Jutta Mason - Community Activist at Dufferin Park</h3>


<p>Who comes to mind when you think of parks and recreation? Perhap it's <a
target="_blank"
href="https://en.wikipedia.org/wiki/Leslie_Knope"
>Leslie Knope</a> - 
the plucky and endearing Deputy Director of the Pawnee City Department. Or perhaps, if you 
live in Toronto, this figure is Jutta Mason, the "urban dynamo" behind the Dufferin Grove 
Park revitalization project. </p>


<p> In her new booklet project, <a
target="_blank"
href="http://www.celos.ca/wiki/uploads/CELOSBooklets/dgpcommons.pdf"
>"Dufferin Grove Park as a neighborhood commons, 1993 to 2015"</a>, 
Mason reflects on the Dufferin Park - the faces behind the project and it's trials, successes, 
and ways to move forward. This booklet is a realists musings on a commons project. An attempt 
to wrangle public space away from corporate control -  to see it shine as a space inherited 
and created jointly, that will (hopefully) last for generations to come 
(<a
    traget="_blank"
    href="http://www.onthecommons.org/about-commons">www.onthecommons.org/about-commons</a>).</p>


<p> From the onset of the project, Mason sets the tone for a cooperative commons, asking 
friends and neighbours - "<em>what would you like to see in Dufferin Grove Park</em>" (Mason 2016, 1). 
It's a question that seems quite simple, but it is the simplicity, clarity and inclusive 
nature of this question that speak to Mason's broader philosophy. It asks people what they 
want in the effort to give it back to them.</p>


<p>To make change in a bureaucracy, Mason, building on Mario Zanetti - the Director of 
Recreation - articulates two main principles: (1) <em>start small</em> and (2) <em>use the rules against 
themselves</em> (Mason 2016, 9). Its with these guiding principles that inspiration struck, guiding 
the "park kids" through varying manifestations of Dufferin Grove.</p>


<p>This project was (and continues to be) backed by a selection of grants and gifts - 
large and small, from individuals to groups. Mason writes, "<em>such gifts, when put to use by 
people who had ideas and wanted to test them, built sociability and surprise into the park. 
Money when used that way, brought freedom, including the freedom to make mistakes, 
confess them, and learn from them</em>" (Mason 2016, 48). The final line of this quote holds 
particularly poignant insight. Mistake are not failure - they are an opportunity to learn and 
grow, and are truly an inevitable part of a collaborative long term project. 
The Dufferin Gove Park project led by Mason is a case study in non linear growth - 
there are times when there was no clear solution, or a stationary status, but somehow, 
with the community coming together, new ways forward were achieved.</p>


<p>For more information please see:</p>
<ul>
<li><a
target="_blank"
href="http://www.celos.ca/wiki/uploads/CELOSBooklets/dgpcommons.pdf"
>http://www.celos.ca/wiki/uploads/CELOSBooklets/dgpcommons.pdf</a></li>
<li><a
target="_blank"
href="https://parkpeople.ca/archives/2073"
>https://parkpeople.ca/archives/2073</a></li>
<li><a
target="_blank"
href="http://www.ideasthatmatter.com/people/2001jutta"
>http://www.ideasthatmatter.com/people/2001jutta</a></li>
</ul>
            </CardText>
            </Card>
            <Card>
            <CardTitle 
                title="Citywide causes"
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText expandable>

<p>Here are some causes that have budget components to them. Hopefully we can collectively
help to support projects like this over time.</p>

<ul>
<li>CASE ONE: <a
    target="_blank"
    href="http://www.theglobeandmail.com/news/toronto/toronto-comes-to-grips-with-a-growing-all-season-pastime-cycling/article28466089/"
>Cycling in Toronto</a></li>



<li>CASE TWO: <a 
    target="_blank"
    href="http://www.thespec.com/opinion-story/6919686-time-to-put-basic-income-guarantee-to-work-in-ontario/"
>Case for Basic Income</a></li>



<li>CASE THREE: <a
    target="_blank"
    href="https://www.thestar.com/news/gta/2016/02/08/toronto-budget-falls-short-of-anti-poverty-pledge-activists-say.html"
>Anti-Poverty Pledge</a>, and see <a
    target="_blank"
    href="https://nowtoronto.com/news/think-free-blog/ocap-descends-on-city-hall-again/"
>here</a> as well</li>

</ul>
            </CardText>
            </Card>
        </div>
    }
}

export default Pathways