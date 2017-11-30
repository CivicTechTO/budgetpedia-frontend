'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
var { Component } = React;
const nugget_view_1 = require("./nugget.view");
class NuggetPack extends Component {
    render() {
        let { tiles, tilecols, padding, tilecolors, style, system, route, pushHistory, cellHeight } = this.props;
        let primarytiledata = [];
        let secondarytiledata = [];
        for (let tiledata of tiles) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata);
            }
            else {
                secondarytiledata.push(tiledata);
            }
        }
        let primarytiles = primarytiledata.map(function (data) {
            return (React.createElement(nugget_view_1.NuggetView, { key: data.id, content: data.content, tilecolors: tilecolors, system: system, route: data.route, pushHistory: pushHistory }));
        });
        let secondarytiles = secondarytiledata.map(function (data) {
            return (React.createElement(nugget_view_1.NuggetView, { key: data.id, content: data.content, tilecolors: tilecolors, system: system, route: data.route, pushHistory: pushHistory }));
        });
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    fontSize: '12px',
                    padding: '0 3px',
                    fontFamily: style['fontFamily'],
                    color: 'white',
                } }, "Main website pages (scroll <-->)"),
            React.createElement("div", { style: style },
                React.createElement("div", { style: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                    } },
                    primarytiles,
                    secondarytiles))));
    }
}
exports.NuggetPack = NuggetPack;
