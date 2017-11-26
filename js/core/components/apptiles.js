'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const apptile_1 = require("./apptile");
class AppTiles extends Component {
    render() {
        let { tiles, tilecols, padding, tilecolors, style, system, route, pushHistory, cellHeight } = this.props;
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
            return (React.createElement(apptile_1.AppTile, { key: data.id, content: data.content, tilecolors: tilecolors, system: system, route: data.route, pushHistory: pushHistory }));
        });
        let secondarytiles = secondarytiledata.map(function (data) {
            return (React.createElement(apptile_1.AppTile, { key: data.id, style: { width: '80px' }, content: data.content, tilecolors: tilecolors, system: system, route: data.route, pushHistory: pushHistory }));
        });
        return (React.createElement("div", null,
            React.createElement("div", { style: {
                    display: 'block',
                    backgroundColor: '#749261',
                    overflowX: 'auto',
                    width: '100%',
                } },
                React.createElement("div", { style: {
                        display: 'block',
                    } },
                    primarytiles,
                    secondarytiles))));
    }
}
exports.AppTiles = AppTiles;
