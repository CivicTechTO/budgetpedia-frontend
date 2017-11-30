'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const nugget_view_1 = require("./nugget.view");
class NuggetList extends React.Component {
    render() {
        let { tiles, tilecolors, style, route, pushHistory, cellHeight } = this.props;
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
            return (React.createElement(nugget_view_1.NuggetView, { key: data.id, content: data.content, tilecolors: tilecolors, route: data.route, pushHistory: pushHistory }));
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
                    } }, nuggets))));
    }
}
exports.default = NuggetList;
