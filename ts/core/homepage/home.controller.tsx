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
                            <hr />
                            <p style={{margin:0,padding:0}}>Browse our site:</p>
                            <ul> 
                                <li>Explore the Toronto budget with our <span
                                    style = {{whiteSpace:'pre'}} ><img 
                                    style = {{height:'18px',verticalAlign:'middle'}}
                                    src={'/public/icons/ic_explore_48px.svg'}
                                />
                                    <Link to='/explorer'>Budget Explorer</Link></span>
                                </li>

                                <li>See information about Toronto's budget decision schedule at our <span
                                    style = {{whiteSpace:'pre'}} ><img 
                                    style = {{height:'18px',verticalAlign:'middle'}}
                                    src={'/public/icons/ic_map_48px.svg'}/>
                                    <Link to='/roadmap'>Budget Roadmap</Link></span>
                                </li>
                                <li>Find related <span
                                    style = {{whiteSpace:'pre'}} ><img 
                                    style = {{height:'18px',verticalAlign:'middle'}}
                                    src={'/public/icons/ic_library_books_48px.svg'}/>
                                    <Link to='/resources'>Resources</Link></span>
                                </li>
                            </ul>
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
