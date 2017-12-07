// about.tsx
// required by bundler
import * as React from 'react'
import {Card, CardTitle, CardText} from 'material-ui/Card'
var { Component } = React

class Demos extends Component<any, any> {
    render() { return <div>

    <Card>
    <CardTitle title = "Get a Demo" />

    <CardText>
        <ul style={{marginTop:"0", marginBottom:"0"}} >
            <li>Interested in learning more about Budgetpedia?</li>
            <li>Want to get a better understanding of how the budget process
                works in Toronto?</li>
            <li>Have a group that would like a hands-on demonstration of how you can
                use budgetpedia to better understand Toronto's city finances?</li>
        </ul>
    </CardText>

    <CardText>
        Get Henrik Bechmann (the project lead) to demo the site for you.
    </CardText>
     <CardText>
   If you've got a group of 10 or more people anywhere in the City of Toronto,
        we're happy to come out and provide a brief overview of what Budgetpedia
        is and how you can use it to better understand the city budget and budget-
        making process.
    </CardText>
     <CardText>
    We can provide a brief (10-30 minute) overview of the website and tools,
        as well as a chance for your group to explore the tools available on the
        site
     </CardText>
     <CardText>
         Note from Henrik: <span style = {{fontStyle:"italic"}}>My preference is to bicylce
         to my destination, anywhere in downtown Toronto from, say, Dundas West to Logan, not very far
         north of Bloor to the waterfront. Otherwise, please make it close to the subway.</span>
     </CardText>
     <CardText>
    <strong>PLUS!</strong> Learn how you can get involved in making Budgetpedia even
        better.  Give us your input on what tools you'd like and how the site
        coulcd better help your organization.  We're still in the early stages and
        are actively looking for input.
    </CardText>

    <CardText>
<h4><strong>Contact</strong></h4>
<ul>
    <li><strong>Email:</strong> <a href="mailto:mail@budgetpeida.ca">mail@budgetpedia.ca</a></li>
</ul>
    </CardText>


</Card>
    </div>
    }
}
export default Demos

