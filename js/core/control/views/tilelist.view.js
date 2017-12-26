'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const scrollcontrols_view_1 = require("./scrollcontrols.view");
const tile_view_1 = require("./tile.view");
const markupline_view_1 = require("./markupline.view");
class TileListController extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            scroller: null,
        };
    }
    componentDidMount() {
        this.setState({
            scroller: this.refs.scroller
        });
    }
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
                    zIndex: 2,
                } },
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'white',
                        verticalAlign: 'top',
                    } }, React.createElement(markupline_view_1.default, { markup: title }))),
            React.createElement(scrollcontrols_view_1.default, { scroller: this.state.scroller },
                React.createElement("div", { style: style, ref: "scroller" },
                    React.createElement("div", { style: {
                            display: 'block',
                            whiteSpace: 'nowrap',
                            position: 'relative',
                        } }, tiles)))));
    }
}
exports.default = TileListController;
