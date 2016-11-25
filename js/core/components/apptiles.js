'use strict';
const React = require('react');
var { Component } = React;
const GridList_1 = require('material-ui/GridList');
const apptile_1 = require("./apptile");
class AppTiles extends Component {
    render() {
        let { tiles, tilecols, padding, tilecolors, style, system, route, transitionTo, cellHeight } = this.props;
        let primarytiledata = [];
        let secondarytiledata = [];
        style['width'] = '100%';
        for (let tiledata of tiles) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata);
            }
            else {
                secondarytiledata.push(tiledata);
            }
        }
        let primarytiles = primarytiledata.map(function (data) {
            return (React.createElement(apptile_1.AppTile, {key: data.id, content: data.content, tilecolors: tilecolors, system: system, route: data.route, transitionTo: transitionTo}));
        });
        let secondarytiles = secondarytiledata.map(function (data) {
            return (React.createElement(apptile_1.AppTile, {key: data.id, content: data.content, tilecolors: tilecolors, system: system, route: data.route, transitionTo: transitionTo}));
        });
        return (React.createElement("div", null, 
            React.createElement("div", {style: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                backgroundColor: '#749261',
            }}, 
                React.createElement(GridList_1.GridList, {style: style, children: primarytiles, cols: tilecols, padding: padding, cellHeight: cellHeight})
            ), 
            React.createElement("div", {style: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                backgroundColor: '#986667 ',
            }}, 
                React.createElement(GridList_1.GridList, {style: style, children: secondarytiles, cols: tilecols, padding: padding, cellHeight: cellHeight})
            )));
    }
}
exports.AppTiles = AppTiles;
