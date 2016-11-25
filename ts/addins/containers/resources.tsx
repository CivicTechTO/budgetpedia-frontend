// resources.tsx
// required by bundler
import * as React from 'react'
var { Component } = React
import {Card, CardTitle, CardText} from 'material-ui/Card'
let moment = require('moment')
let validurl = require('valid-url')

class Resources extends Component<any, any> {
    state = {
        resources:null
    }

    componentDidMount() {

        fetch('./db/repositories/toronto/resources/resources.json').then( response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log('response error',response)
            }
        }).then( json => {
            console.log('json',json)
            this.setState({
                resources:json
            })
        }).catch( error => {
            console.log('error',error)
        })

    }

    resourcesintro = <div>
        <Card> 
            <CardTitle 
                title = {"Budget Resources"}
                subtitle = {"A starter kit of external links"}
            /> 
            <CardText>
            We've assembled some web links to get you started. Click on a class of links below, to see details. 
            If you find something that should be added to this list, let us know at <a 
            target="_blank" href="mailto:mail@budgetpedia.ca">mail@budgetpedia.ca</a>.
            </CardText>
        </Card>
        </div>

    lists = null

    prepareLists = () => {

        if (!this.state.resources) return
        if (this.lists) return
        let resources = this.state.resources
        let sections = resources.Sections
        let rawlinks = resources.Data as Object[]
        let rawlink:any

        for (rawlink of rawlinks) {
            sections[rawlink.section].links.push(rawlink)
        }

        let sectionlist = []
        for (let sectionname in sections) {
            sectionlist.push(sections[sectionname])
        }

        sectionlist = sectionlist.sort((a,b) => {
            return a.index - b.index
        })

        this.lists = sectionlist

    }

    getSectionContent = (links) => {

        let linkslist = links.map((linkdata, index) => {
            let { title, description, link } = linkdata
            let displaylink
            if (!validurl.isUri(link)) {
                displaylink = null
                console.log('invalid resource link', linkdata)
            } else {
                displaylink = link
            }
            return <div
                key = {index}
                style = {{
                    border:"1px dashed silver",
                    margin:"0 3px 8px 3px",
                    padding:"3px",
                    borderRadius:"8px",
                }}
            >
            <div><em>Title:</em> {title}</div>
            {description?<div><em>Description:</em> {description} </div>:null}
            <div>
                { displaylink?
                    <span><em>See</em> <a target="_blank" href={displaylink}>web page</a></span>:
                    <em>Link not available</em>
                }
            </div>

            </div>
        } )

        return linkslist
    }

    getSections = () => {

        let lists = this.lists

        let sections = lists.map( (section, index) => {
            let content = this.getSectionContent(section.links)
            let intro = null
            if (section.link || section.note) {
                let link = null
                let note = null
                if (section.link) {
                    let isvalidurl = validurl.isUri(section.link)
                    if (!isvalidurl) {
                        console.log('invalidurl for section',section)
                    }
                    link = <span>See <a target="_blank" href={section.link}>website</a></span>

                }
                if (section.note) {
                    note = section.note + '. '
                }
                intro = <CardText expandable><p>{note}{link}</p></CardText>
            }
            return <Card
                key = {index}
                >
                <CardTitle
                    actAsExpander={true}
                    showExpandableButton={true}
                    title = { section.title }
                    subtitle = {section.description || null}
                />

                { intro }

                <CardText expandable>

                    { content }

                </CardText>

            </Card>
        })

        return sections
    }

    getResources = () => {
        let resources = null
        if (!this.lists) return resources

        resources = this.getSections()

        return resources
    }

    render() {

        this.prepareLists()
        let resources = this.getResources()
        console.log('lists',this.lists)

        return <div>
            {this.resourcesintro}

            { resources }

        </div>
    }
}

export default Resources