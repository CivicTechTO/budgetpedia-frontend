// maintiles.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'

import { Timeline } from 'react-twitter-widgets'

import TileList from "../../core/common/components/tilelist.view"
import HtmlView from '../../core/common/components/html.view'
import LinkList from '../../core/common/components/linklist.view'
import NuggetList from '../../core/common/components/nuggetlist.view'

import model from './home.model'
import styles from '../../styles/core.styles'

let headerimages = require('./html/headerimages.html')

let Home = class extends React.Component<any, any> {

    render() {

        let { pagetargets, theme, colors } = this.props

        let { 
            headercardstyle,
            footercardstyle,
            tileliststyle,
        } = styles

        let {

            torontonuggettitle, torontonuggetlist,

            financenuggettitle, financenuggetlist,

            financechangestitle, financechangeslist,

            headertitle, headersubtitle,      

            tilelisttitle,

            toplinklistheader, toplinklistitems,

            secondlinklistheader, secondlinklistitems,

            thirdlinklistheader, thirdlinklistitems,
            
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
                    title = { torontonuggettitle }
                    nuggets = {torontonuggetlist}
                    image = '/public/images/city-people-faded2.jpg'
                />

                <NuggetList
                    title = { financenuggettitle }
                    nuggets = { financenuggetlist }
                    image = '/public/images/cityscape-night.jpg'
                />

                <NuggetList
                    title = { financechangestitle }
                    nuggets = {financechangeslist}
                    image = '/public/images/ttc-faded.jpg'
                />

                {/* twitter */}
                <div style = {{padding:'32px',backgroundColor:'silver',marginBottom:'30px'}} >
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
