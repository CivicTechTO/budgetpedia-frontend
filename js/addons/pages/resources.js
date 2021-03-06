// resources.tsx
// required by bundler
import * as React from 'react';
var { Component } = React;
import { Card, CardTitle, CardText } from 'material-ui/Card';
let moment = require('moment');
let validurl = require('valid-url');
class Resources extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            resources: null
        };
        this.resourcesintro = React.createElement("div", null,
            React.createElement(Card, null,
                React.createElement(CardTitle, { title: "Budget Resources", subtitle: "A starter kit of external links" }),
                React.createElement(CardText, null,
                    "We've assembled some web links to get you started. Click on a class of links below, to see details. If you find something that should be added to this list, let us know at ",
                    React.createElement("a", { target: "_blank", href: "mailto:mail@budgetpedia.ca" }, "mail@budgetpedia.ca"),
                    ".")));
        this.lists = null;
        this.prepareLists = () => {
            if (!this.state.resources)
                return;
            if (this.lists)
                return;
            let resources = this.state.resources;
            let sections = resources.Sections;
            let rawlinks = resources.Data;
            let rawlink;
            for (rawlink of rawlinks) {
                sections[rawlink.section].links.push(rawlink);
            }
            let sectionlist = [];
            for (let sectionname in sections) {
                sectionlist.push(sections[sectionname]);
            }
            sectionlist = sectionlist.sort((a, b) => {
                return a.index - b.index;
            });
            this.lists = sectionlist;
        };
        this.getSectionContent = (links) => {
            let linkslist = links.map((linkdata, index) => {
                let { title, description, link } = linkdata;
                let displaylink;
                if (!validurl.isUri(link)) {
                    displaylink = null;
                    console.log('invalid resource link', linkdata);
                }
                else {
                    displaylink = link;
                }
                return React.createElement("div", { key: index, style: {
                        border: "1px dashed silver",
                        margin: "0 3px 8px 3px",
                        padding: "3px",
                        borderRadius: "8px",
                    } },
                    React.createElement("div", null,
                        React.createElement("em", null, "Title:"),
                        " ",
                        title),
                    description ? React.createElement("div", null,
                        React.createElement("em", null, "Description:"),
                        " ",
                        description,
                        " ") : null,
                    React.createElement("div", null, displaylink ?
                        React.createElement("span", null,
                            React.createElement("em", null, "See"),
                            " ",
                            React.createElement("a", { target: "_blank", href: displaylink }, "web page")) :
                        React.createElement("em", null, "Link not available")));
            });
            return linkslist;
        };
        this.getSections = () => {
            let lists = this.lists;
            let sections = lists.map((section, index) => {
                let content = this.getSectionContent(section.links);
                let intro = null;
                if (section.link || section.note) {
                    let link = null;
                    let note = null;
                    if (section.link) {
                        let isvalidurl = validurl.isUri(section.link);
                        if (!isvalidurl) {
                            console.log('invalidurl for section', section);
                        }
                        link = React.createElement("span", null,
                            "See ",
                            React.createElement("a", { target: "_blank", href: section.link }, "website"));
                    }
                    if (section.note) {
                        note = section.note + '. ';
                    }
                    intro = React.createElement(CardText, { expandable: true },
                        React.createElement("p", null,
                            note,
                            link));
                }
                return React.createElement(Card, { key: index },
                    React.createElement(CardTitle, { actAsExpander: true, showExpandableButton: true, title: section.title, subtitle: section.description || null }),
                    intro,
                    React.createElement(CardText, { expandable: true }, content));
            });
            return sections;
        };
        this.getResources = () => {
            let resources = null;
            if (!this.lists)
                return resources;
            resources = this.getSections();
            return resources;
        };
    }
    componentDidMount() {
        fetch('./db/repositories/toronto/resources/resources.json').then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log('response error', response);
            }
        }).then(json => {
            this.setState({
                resources: json
            });
        }).catch(error => {
            console.log('error', error);
        });
    }
    render() {
        this.prepareLists();
        let resources = this.getResources();
        return React.createElement("div", null,
            this.resourcesintro,
            resources);
    }
}
export default Resources;
