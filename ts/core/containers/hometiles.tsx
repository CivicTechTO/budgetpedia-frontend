// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// maintiles.tsx

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Actions from '../actions/actions'
import { Link } from 'react-router-dom'

import { AppTiles } from "../components/apptiles"
import {Card, CardTitle, CardText, CardActions} from 'material-ui/Card'

const mapStateToProps = ( { homegrid, resources } ) => 
({ 
    hometiles:homegrid.hometiles,
    homecols:homegrid.homecols,
    homepadding:homegrid.homepadding,
    theme:resources.theme,
    colors:resources.colors,
    system:resources.system,
})


class HomeTilesClass extends React.Component<any, any> {

    handleHomeResize = () => { 

        this.props.setHomeTileCols()

    }

    componentWillMount() {

        // initialize
        this.props.setHomeTileCols()

    }

    componentDidMount() {

        window.addEventListener ( 'resize', this.handleHomeResize )

    }

    componentWillUnmount() {

        window.removeEventListener ( 'resize', this.handleHomeResize )

    }

    pushHistory = (e, target) => {

        e.stopPropagation()
        e.preventDefault()
        this.props.history.push(target)

    }

    render() {

        let { hometiles, homecols, homepadding, theme, colors, system } = this.props

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
                    backgroundImage:"url(./public/icons/WebsiteBanner.png)",
                    backgroundSize:"cover",
                    margin:"8px",
                    border:"2px solid silver",
                    borderRadius:"8px",
                    fontSize:"18px"
                }
            }>
                <div style = {{float:"right",margin:"9px 3px 3px 3px",borderRadius:"8px"}}>
                    <img style={{width:"100px"}} src= "./public/icons/budgetpedia-logo.png" />
                </div>
                <div style = {{clear:'right',float:"right",margin:"0px 3px 3px 3px",borderRadius:"8px",lineHeight:'9px'}}>
                    <span style={{fontStyle:'italic',fontSize:'9px'}} >fostered by:</span><br />
                    <a target = "_blank" href="http://civictech.ca">
                    <img style={{width:"100px"}} src= "./public/icons/CTTO-logo-sm.png" /></a>
                </div>
                <div style = {{clear:'right',float:"right",margin:"0px 3px 3px 3px",borderRadius:"8px",lineHeight:'9px'}}>
                    <span style={{fontStyle:'italic',fontSize:'9px'}} >in collaboration with:</span><br />
                    <a target = "_blank" href="http://betterbudget.ca">
                    <img style={{width:"100px"}} src= "./public/icons/bbtoLogo_04.jpg" /></a>
                </div>
                <CardTitle style = {{padding:"16px 16px 0 16px"}} >
                Welcome to Budgetpedia.
                </CardTitle>
                <CardText>
                <hr />
                <p style={{margin:0,padding:0}}>Browse our site:</p>
                <ul> <li>Explore the Toronto budget with our <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_explore_48px.svg'}
                    />
                    <Link to='/explorer'>Budget Explorer</Link></span></li>

                <li>See information about Toronto's budget decision schedule at our <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_map_48px.svg'}/>
                    <Link to='/roadmap'>Budget Roadmap</Link></span></li>
                    <li>Find related <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_library_books_48px.svg'}/>
                    <Link to='/resources'>Resources</Link></span></li></ul>
                    <hr />
                <p>Follow us on:</p>
                <ul>
                <li><a 
                    href="http://twitter.com/budgetpedia" 
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/twitter.png"/></a> <a 
                    href="http://twitter.com/budgetpedia" 
                    target="_blank">Twitter</a></li>
                <li><a href="http://medium.com/budgetpedia"
                    target = "_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/medium.png"/></a> For 
                    in-depth articles: <a href="http://medium.com/budgetpedia"
                    target = "_blank">Medium</a></li>
                </ul>
                <div style = {{clear:"both"}}></div>
                </CardText>
            </Card>
            </div>
            <AppTiles 

                style = {
                    {
                        margin:"16px",
                        fontFamily:theme.fontFamily,
                    }
                }
                tiles =     { hometiles } 
                tilecols =  { homecols }
                padding =   { homepadding }
                tilecolors = {
                    { 
                        front: colors.blue50,
                        back: colors.amber50,
                        helpbutton: theme.palette.primary3Color,
                    }
                }
                system = { system }
                pushHistory = { this.props.pushHistory }
                cellHeight = { 180 }
            />
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
                    backgroundImage:"url(./public/icons/WebsiteBanner.png)",
                    backgroundSize:"cover",
                    margin:"8px",
                    border:"2px solid silver",
                    borderRadius:"8px",
                    fontSize:"18px"
                }
            }>
                <CardText>
                <p>More media (experimental):</p>
                <ul>
                <li><a 
                    href="http://facebook.com/budgetpedia" 
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/facebook.png"/></a> <a 
                    href="http://facebook.com/budgetpedia" 
                    target="_blank">our Facebook page</a></li>
                <li><a 
                    href="http://facebook.com/groups/budgetpedia" 
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/facebook.png"/></a> <a 
                    href="http://facebook.com/groups/budgetpedia" 
                    target="_blank">
                    our Facebook group</a></li>
                <li><a href="http://groups.google.com/d/forum/budgetpedia"
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/g-logo.png"/></a> For 
                    technical discussions: <a href="http://groups.google.com/d/forum/budgetpedia"
                    target="_blank">our Google forum</a></li>
                <li><a href="https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig"
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/YouTube-icon-full_color.png"/></a> Videos: <a
                     href="https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig"
                    target="_blank">YouTube</a></li>
                <li><a href="http://budgetpedia.blogspot.ca/"
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/blogspot.jpeg"/></a> Blog: <a
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

// dependency injection
var HomeTiles = connect ( mapStateToProps,
    {
        pushHistory:Actions.pushHistory,
        setHomeTileCols:Actions.setHomeTileCols,
    } 
) ( HomeTilesClass )

export default HomeTiles
