'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const tile_view_1 = require("./tile.view");
const markupline_view_1 = require("./markupline.view");
class TileList extends React.Component {
    render() {
        let { tiles: tilelist, style, onSelect, title } = this.props;
        let primarytiledata = [];
        let secondarytiledata = [];
        for (let tiledata of tilelist) {
            if (tiledata.tier == 'primary') {
                primarytiledata.push(tiledata);
            }
            else {
                secondarytiledata.push(tiledata);
            }
        }
        let tiledata = [...primarytiledata, ...secondarytiledata];
        let tiles = tiledata.map(function (data) {
            return (React.createElement(tile_view_1.default, { key: data.id, content: data.content, route: data.route, imageStyle: data.imageStyle, onSelect: onSelect }));
        });
        return (React.createElement("div", { style: { position: 'relative' } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    padding: '8px 3px',
                } },
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'white',
                        verticalAlign: 'top',
                    } }, React.createElement(markupline_view_1.default, { markup: title })),
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'silver',
                        marginLeft: '32px',
                        verticalAlign: 'top',
                    } },
                    React.createElement("span", { className: 'material-icons' }, "arrow_back"),
                    React.createElement("span", { className: 'material-icons' }, "arrow_forward"))),
            React.createElement("div", { style: style },
                React.createElement("div", { style: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                    } }, tiles))));
    }
}
exports.default = TileList;
