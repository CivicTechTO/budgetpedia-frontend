'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tile_view_1 = require("./tile.view");
class TileList extends React.Component {
    render() {
        let { tiles, style, route, onSelect, cellHeight, title } = this.props;
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
        let nuggetsdata = [...primarytiledata, ...secondarytiledata];
        let nuggets = nuggetsdata.map(function (data) {
            return (React.createElement(tile_view_1.default, { key: data.id, content: data.content, route: data.route, imageStyle: data.imageStyle, onSelect: onSelect }));
        });
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    fontSize: '12px',
                    padding: '0 3px',
                    color: 'white',
                } }, title),
            React.createElement("div", { style: style },
                React.createElement("div", { style: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                    } }, nuggets))));
    }
}
exports.default = TileList;
