'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const Card_1 = require("material-ui/Card");
const react_twitter_widgets_1 = require("react-twitter-widgets");
const tilelist_view_1 = require("../common/tilelist.view");
const html_view_1 = require("../common/html.view");
const linklist_view_1 = require("../common/linklist.view");
const nuggetlist_view_1 = require("../common/nuggetlist.view");
const home_model_1 = require("./home.model");
let headerimages = require('./html/headerimages.html');
let Home = class extends React.Component {
    render() {
        let { pagetargets, theme, colors } = this.props;
        let torontonuggetlist = [
            {
                prefix: 'something',
                infix: '1000',
                suffix: 'else',
                contrast: true,
            }
        ];
        let financenuggetlist = [
            {
                prefix: 'money that goes<br>to the boss and comes back',
                infix: `$200B<span 
    class="material-icons" 
    style="color:green;font-size:1.1em;vertical-align:top">
        arrow_upward
</span>`,
                suffix: '(2016 [audit](http://toronto.ca){style=color:white target=_blank})',
                contrast: true,
            }
        ];
        let { headercardstyle, headertitle, headersubtitle, tileliststyle, tilelisttitle, footercardstyle, toplinklistheader, toplinklistitems, secondlinklistheader, secondlinklistitems, thirdlinklistheader, thirdlinklistitems, } = home_model_1.default;
        return (React.createElement("div", null,
            React.createElement("div", { style: { backgroundColor: "#404244", padding: "8px", } },
                React.createElement(Card_1.Card, { style: headercardstyle },
                    React.createElement(html_view_1.default, { html: headerimages }),
                    React.createElement(Card_1.CardTitle, { style: {
                            padding: "16px 16px 0 16px",
                        }, title: headertitle, titleStyle: {
                            fontSize: '20px',
                            fontWeight: 'bold'
                        }, subtitle: headersubtitle }),
                    React.createElement(Card_1.CardText, { style: { fontSize: '16px' } },
                        React.createElement(linklist_view_1.default, { upperDivider: true, header: toplinklistheader, items: toplinklistitems }),
                        React.createElement(linklist_view_1.default, { upperDivider: true, header: secondlinklistheader, items: secondlinklistitems }),
                        React.createElement("div", { style: { clear: "both" } })))),
            React.createElement(nuggetlist_view_1.default, { title: 'About Toronto', nuggets: torontonuggetlist, image: '/public/images/city-people-faded2.jpg' }),
            React.createElement(nuggetlist_view_1.default, { title: 'About Toronto Finances', nuggets: financenuggetlist, image: '/public/images/cityscape-night.jpg' }),
            React.createElement(nuggetlist_view_1.default, { title: 'About Toronto Finance *Changes*', nuggets: financenuggetlist, image: '/public/images/ttc-faded.jpg' }),
            React.createElement("div", { style: { padding: '32px', backgroundColor: 'silver', marginBottom: '30px' } },
                React.createElement("div", { style: { maxWidth: '600px', margin: '0 auto' } },
                    React.createElement(react_twitter_widgets_1.Timeline, { dataSource: {
                            sourceType: 'url',
                            url: 'https://twitter.com/budgetpedia'
                        }, options: {
                            username: 'Budgetpedia',
                            height: '400'
                        } }))),
            React.createElement(tilelist_view_1.default, { style: tileliststyle, tiles: pagetargets, onSelect: this.props.push, title: tilelisttitle }),
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
