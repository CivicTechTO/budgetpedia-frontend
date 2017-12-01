// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// maintiles.tsx

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
// import { compose } from 'redux'
// import * as Actions from '../actions/actions'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'

import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'

import { Timeline } from 'react-twitter-widgets'

import NuggetList from "./nuggetlist.controller"

import HtmlView from '../common/html.view'

let headerimages = require('./html/headerimages.html')
let headertitle = require('./html/headertitle.html')
let headercontent = require('./html/headercontent.html')
let footercontent = require('./html/footercontent.html')

let Home = class extends React.Component<any, any> {

    pushHistory = (e, target) => {

        e.stopPropagation()
        this.props.push(target)

    }

    render() {

        let { pagetargets, theme, colors } = this.props

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
                    <Card style={
                        {
                            backgroundImage:"url(/public/icons/WebsiteBanner.png)",
                            backgroundSize:"cover",
                            margin:"8px",
                            border:"2px solid silver",
                            borderRadius:"8px",
                            fontSize:"18px"
                        }
                    }>
                        <HtmlView html={ headerimages }/>
                        <CardTitle style = {{padding:"16px 16px 0 16px"}} >
                            <HtmlView html={ headertitle }/>
                        </CardTitle>
                        <CardText>
                            <HtmlView html = { headercontent } />
                        </CardText>
                    </Card>
                </div>
                <NuggetList

                    style = {
                        {
                            padding:"16px",
                            fontFamily:theme.fontFamily,
                            display: 'block',
                            backgroundColor: '#749261',               
                            overflowX: 'scroll', 
                        }
                    }
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
                    <Card style={
                        {
                            backgroundImage:"url(/public/icons/WebsiteBanner.png)",
                            backgroundSize:"cover",
                            margin:"8px",
                            border:"2px solid silver",
                            borderRadius:"8px",
                            fontSize:"18px"
                        }
                    }>
                        <CardText>
                            <HtmlView html={ footercontent }/>
                            <p>More media (experimental):</p>
                            <ul>
                            <li><a 
                                href="http://facebook.com/budgetpedia" 
                                target="_blank">
                                <img style={{height:"16px",verticalAlign:"middle"}} src="/public/icons/facebook.png"/></a> <a 
                                href="http://facebook.com/budgetpedia" 
                                target="_blank">our Facebook page</a></li>
                            <li><a 
                                href="http://facebook.com/groups/budgetpedia" 
                                target="_blank">
                                <img style={{height:"16px",verticalAlign:"middle"}} src="/public/icons/facebook.png"/></a> <a 
                                href="http://facebook.com/groups/budgetpedia" 
                                target="_blank">
                                our Facebook group</a></li>
                            <li><a href="http://groups.google.com/d/forum/budgetpedia"
                                target="_blank">
                                <img style={{height:"16px",verticalAlign:"middle"}} src="/public/icons/g-logo.png"/></a> For 
                                technical discussions: <a href="http://groups.google.com/d/forum/budgetpedia"
                                target="_blank">our Google forum</a></li>
                            <li><a href="https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig"
                                target="_blank">
                                <img style={{height:"16px",verticalAlign:"middle"}} src="/public/icons/YouTube-icon-full_color.png"/></a> Videos: <a
                                 href="https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig"
                                target="_blank">YouTube</a></li>
                            <li><a href="http://budgetpedia.blogspot.ca/"
                                target="_blank">
                                <img style={{height:"16px",verticalAlign:"middle"}} src="/public/icons/blogspot.jpeg"/></a> Blog: <a
                                 href="http://budgetpedia.blogspot.ca/"
                                target="_blank">Blogspot</a></li>
                            </ul>
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
