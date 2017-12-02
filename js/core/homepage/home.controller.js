'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const Card_1 = require("material-ui/Card");
const react_twitter_widgets_1 = require("react-twitter-widgets");
const nuggetlist_controller_1 = require("../common/nuggetlist.controller");
const html_view_1 = require("../common/html.view");
const linklist_view_1 = require("../common/linklist.view");
const home_model_1 = require("./home.model");
let headerimages = require('./html/headerimages.html');
let headertitle = require('./html/headertitle.html');
let Home = class extends React.Component {
    render() {
        let { pagetargets, theme, colors } = this.props;
        let { headercardstyle, nuggetliststyle, footercardstyle, toplinklistheader, toplinklistitems, secondlinklistheader, secondlinklistitems, thirdlinklistheader, thirdlinklistitems, } = home_model_1.default;
        nuggetliststyle = Object.assign({}, nuggetliststyle);
        return (React.createElement("div", null,
            React.createElement("div", { style: { backgroundColor: "#404244", padding: "8px", } },
                React.createElement(Card_1.Card, { style: headercardstyle },
                    React.createElement(html_view_1.default, { html: headerimages }),
                    React.createElement(Card_1.CardTitle, { style: { padding: "16px 16px 0 16px" } },
                        React.createElement(html_view_1.default, { html: headertitle })),
                    React.createElement(Card_1.CardText, null,
                        React.createElement(linklist_view_1.default, { upperDivider: true, header: toplinklistheader, items: toplinklistitems }),
                        React.createElement(linklist_view_1.default, { upperDivider: true, header: secondlinklistheader, items: secondlinklistitems }),
                        React.createElement("div", { style: { clear: "both" } })))),
            React.createElement(nuggetlist_controller_1.default, { style: nuggetliststyle, tiles: pagetargets, onSelect: this.props.push, cellHeight: 180 }),
            React.createElement("div", { style: { padding: '32px', backgroundColor: 'silver' } },
                React.createElement("div", { style: { maxWidth: '600px', margin: '0 auto' } },
                    React.createElement(react_twitter_widgets_1.Timeline, { dataSource: {
                            sourceType: 'url',
                            url: 'https://twitter.com/budgetpedia'
                        }, options: {
                            username: 'Budgetpedia',
                            height: '400'
                        } }))),
            React.createElement("div", { style: { backgroundColor: "#404244", padding: "8px", } },
                React.createElement(Card_1.Card, { style: footercardstyle },
                    React.createElement(Card_1.CardText, null,
                        React.createElement(linklist_view_1.default, { header: thirdlinklistheader, items: thirdlinklistitems }))))));
    }
};
const mapStateToProps = ({ pages, resources }) => ({
    pagetargets: pages.pagetargets,
    theme: resources.theme,
    colors: resources.colors,
});
Home = react_redux_1.connect(mapStateToProps, {
    push: react_router_redux_1.push,
})(Home);
exports.default = Home;
