// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// maintiles.tsx

'use strict'

import * as React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Actions from '../actions/actions'

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

    componentWillMount = () => {

        // initialize
        this.props.setHomeTileCols()

    }

    componentDidMount = () => {

        window.addEventListener ( 'resize', this.handleHomeResize )

    }

    componentWillUnmount = () => {

        window.removeEventListener ( 'resize', this.handleHomeResize )

    }

    transitionTo = (e, target) => {

        e.stopPropagation()
        e.preventDefault()
        var _this = this;
        _this.props.transitionTo(target)

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
                <CardTitle>
                Welcome to Budgetpedia.
                </CardTitle>
                <CardText>
                <p style={{margin:0, padding:0}}>Explore the Toronto budget with our <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_explore_48px.svg'}/><a 
                    href="javascript:void(0);"
                    onTouchTap={ e => {this.transitionTo(e,'explorer')}}>Budget Explorer</a></span>, 
                see information about Toronto's budget decision schedule at our <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_map_48px.svg'}/><a 
                    href="javascript:void(0);"
                    onTouchTap={ e => {this.transitionTo(e,'roadmap')}}>Budget Roadmap</a></span>, and find related <span
                    style = {{whiteSpace:'pre'}} ><img 
                    style = {{height:'18px',verticalAlign:'middle'}}
                    src={'./public/icons/ic_library_books_48px.svg'}/><a
                    href="javascript:void(0);"
                    onTouchTap={ e => {this.transitionTo(e,'resources')}}>Resources</a></span>.</p>
                    <hr style={{clear:"right"}} />
                <p>We also welcome you to join us (and contribute!) on any of our digital platforms:</p>
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
                <li><a href="http://groups.google.com/d/forum/budgetpedia"
                    target="_blank">
                    <img style={{height:"16px",verticalAlign:"middle"}} src="./public/icons/g-logo.png"/></a> For 
                    technical discussions: <a href="http://groups.google.com/d/forum/budgetpedia"
                    target="_blank">our Google forum</a></li>
                </ul>
                <hr />
                <p>Below are tiles leading to more information about the Budgetpedia Project.</p>
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
                transitionTo = { this.props.transitionTo }
                cellHeight = { 180 }
            />
            </div>
        )
    }
}

// dependency injection
var HomeTiles = connect ( mapStateToProps, 
    {
        transitionTo:Actions.transitionTo,
        setHomeTileCols:Actions.setHomeTileCols,
    } ) ( HomeTilesClass )

export default HomeTiles
