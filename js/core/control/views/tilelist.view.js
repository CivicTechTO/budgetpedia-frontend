'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const scrollcontrols_view_1 = require("./scrollcontrols.view");
const tile_view_1 = require("./tile.view");
const hashanchorwrapper_view_1 = require("./hashanchorwrapper.view");
class TileListController extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            scroller: null,
        };
        this.scroller = null;
    }
    componentDidMount() {
        this.setState({
            scroller: this.scroller
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
        return (React.createElement("div", { style: {
                position: 'relative',
                margin: '0 16px',
                borderRadius: '8px',
                backgroundColor: "#749261",
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
            } },
            React.createElement("div", { style: {
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    padding: '8px 16px',
                    zIndex: 2,
                } },
                React.createElement(hashanchorwrapper_view_1.default, { tag: 'h2', title: title, style: {
                        display: 'inline-block',
                        color: 'white',
                        verticalAlign: 'bottom',
                        marginRight: '8px'
                    } })),
            React.createElement(scrollcontrols_view_1.default, { scroller: this.state.scroller },
                React.createElement("div", { style: style, ref: el => { this.scroller = el; } },
                    React.createElement("div", { style: {
                            display: 'block',
                            whiteSpace: 'nowrap',
                            position: 'relative',
                        } }, tiles)))));
    }
}
exports.default = TileListController;
