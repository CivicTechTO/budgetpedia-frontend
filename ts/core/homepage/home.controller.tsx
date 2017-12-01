// maintiles.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'

import { Timeline } from 'react-twitter-widgets'

import NuggetList from "./nuggetlist.controller"

import HtmlView from '../common/html.view'
import LinkList from './linklist.view'

let headerimages = require('./html/headerimages.html')
let headertitle = require('./html/headertitle.html')
let headercontent = require('./html/headercontent.html')
let footercontent = require('./html/footercontent.html')

let Home = class extends React.Component<any, any> {

    render() {

        let { pagetargets, theme, colors } = this.props

        let headercardstyle = 
            {
                backgroundImage:"url(/public/icons/WebsiteBanner.png)",
                backgroundSize:"cover",
                margin:"8px",
                border:"2px solid silver",
                borderRadius:"8px",
                fontSize:"18px"
            }

        let nuggetliststyle = 
            {
                padding:"16px",
                fontFamily:theme.fontFamily,
                display: 'block',
                backgroundColor: '#749261',               
                overflowX: 'scroll', 
            }

        let footercardstyle =
            {
                backgroundImage:"url(/public/icons/WebsiteBanner.png)",
                backgroundSize:"cover",
                margin:"8px",
                border:"2px solid silver",
                borderRadius:"8px",
                fontSize:"18px"
            }

        let toplinklistheader = 'Browse our site:'

        let toplinklistitems = [
            {
                prompt:'Explore the Toronto budget with our ',
                icon:'/public/icons/ic_explore_48px.svg',
                target:'/explorer',
                targetText:'Budget Explorer',
            },
            {
                prompt:"See information about Toronto's budget decision schedule at our ",
                icon:'/public/icons/ic_map_48px.svg',
                target:'/roadmap',
                targetText:'Budget Roadmap',
            },
            {
                prompt:'Find related',
                icon:'/public/icons/ic_library_books_48px.svg',
                target:'/resources',
                targetText:'Resources',
            },
        ]

        return (
            <div>
                <div 
                    style = {
                        {
                            backgroundColor:"#404244",
                            padding:"8px",
                        }
                    }
                >
                    <Card style={ headercardstyle }>
                        <HtmlView html={ headerimages }/>
                        <CardTitle style = {{padding:"16px 16px 0 16px"}} >
                            <HtmlView html={ headertitle }/>
                        </CardTitle>
                        <CardText>
                            <LinkList
                                upperDivider
                                header = { toplinklistheader }
                                items = { toplinklistitems }
                            />
                            <hr />
                            <HtmlView html={ headercontent }/>
                            <div style = {{clear:"both"}}></div>
                        </CardText>
                    </Card>
                </div>
                <NuggetList

                    style = { nuggetliststyle }
                    tiles =     { pagetargets } 
                    onSelect = { this.props.push }
                    cellHeight = { 180 }
                />
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
               <div 
                    style = {
                        {
                            backgroundColor:"#404244",
                            padding:"8px",
                        }
                    }
                >
                    <Card style={ footercardstyle }>
                        <CardText>
                            <HtmlView html={ footercontent }/>
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
