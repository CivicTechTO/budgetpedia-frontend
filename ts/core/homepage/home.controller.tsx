// maintiles.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import { Timeline } from 'react-twitter-widgets'

import TileList from "../common/tilelist.view"
import HtmlView from '../common/html.view'
import LinkList from '../common/linklist.view'
import NuggetList from '../common/nuggetlist.view'

import model from './home.model'

let headerimages = require('./html/headerimages.html')

let Home = class extends React.Component<any, any> {

    render() {

        let { pagetargets, theme, colors } = this.props

        let torontonuggetlist = [
            {
                prefix: 'something',
                infix: '1000',
                suffix: 'else',
                contrast: true,
            }
        ]

        let financenuggetlist = [
            {
                prefix: 'money that goes<br>to the boss and comes back',
                infix: 
`$200B<span 
    class="material-icons" 
    style="color:green;font-size:1.1em;vertical-align:top">
        arrow_upward
</span>`,
                suffix: '(2016 [audit](http://toronto.ca){style=color:white target=_blank})',
                contrast: true,
            }
        ]

        let {
            headercardstyle,
            headertitle,
            headersubtitle,
            tileliststyle,
            tilelisttitle,
            footercardstyle,
            toplinklistheader,
            toplinklistitems,
            secondlinklistheader,
            secondlinklistitems,
            thirdlinklistheader,
            thirdlinklistitems,
        } = model

        return (
            <div>

                {/* welcome section */}
                <div style = {{ backgroundColor:"#404244", padding:"8px", }} >
                    <Card style={ headercardstyle }>
                        <HtmlView html={ headerimages }/>
                        <CardTitle 
                            style = {
                                {
                                    padding:"16px 16px 0 16px",
                                }
                            }
                            title = { headertitle }
                            titleStyle = {
                                {
                                    fontSize:'20px',
                                    fontWeight:'bold'
                                }
                            } 
                            subtitle = { headersubtitle }
                        />
                            
                        <CardText style = {{fontSize:'16px'}}>
                            <LinkList
                                upperDivider
                                header = { toplinklistheader }
                                items = { toplinklistitems }
                            />
                            <LinkList
                                upperDivider
                                header = { secondlinklistheader }
                                items = { secondlinklistitems }
                            />
                            <div style = {{clear:"both"}}></div>
                        </CardText>
                    </Card>
                </div>

                {/* quick stats */}
                <NuggetList
                    title = 'About _**Toronto**_'
                    nuggets = {torontonuggetlist}
                    image = '/public/images/city-people-faded2.jpg'
                />

                <NuggetList
                    title = 'About Toronto Finances'
                    nuggets = {financenuggetlist}
                    image = '/public/images/cityscape-night.jpg'
                />

                {/* twitter */}
                <div style = {{padding:'32px',backgroundColor:'silver'}} >
                    <div    style = {{maxWidth:'600px',margin:'0 auto'}}>
                    <Timeline
                        dataSource={{
                          sourceType: 'url',
                          url: 'https://twitter.com/budgetpedia'
                        }}
                        options={{
                          username: 'Budgetpedia',
                          height: '400'
                        }}
                      />
                   </div>
                </div>

                {/* main pages tiles */}
                <TileList
                    style = { tileliststyle }
                    tiles =     { pagetargets } 
                    onSelect = { this.props.push }
                    title = { tilelisttitle }
                />

                {/* footer */}
                <div style = {{ backgroundColor:"#404244", padding:"8px", }} >
                    <Card style={ footercardstyle }>
                        <CardText>
                            <LinkList
                                header = { thirdlinklistheader }
                                items = { thirdlinklistitems }
                            />
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( { pages, resources } ) => 
({ 
    pagetargets:pages.pagetargets,
    theme:resources.theme,
    colors:resources.colors,
})

Home = connect ( 
    mapStateToProps,
    {
        push,
    } 
) ( Home )

export default Home
