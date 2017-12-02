'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const Card_1 = require("material-ui/Card");
const react_twitter_widgets_1 = require("react-twitter-widgets");
const nuggetlist_controller_1 = require("./nuggetlist.controller");
const html_view_1 = require("../common/html.view");
const linklist_view_1 = require("./linklist.view");
let headerimages = require('./html/headerimages.html');
let headertitle = require('./html/headertitle.html');
let Home = class extends React.Component {
    render() {
        let { pagetargets, theme, colors } = this.props;
        let headercardstyle = {
            backgroundImage: "url(/public/icons/WebsiteBanner.png)",
            backgroundSize: "cover",
            margin: "8px",
            border: "2px solid silver",
            borderRadius: "8px",
            fontSize: "18px"
        };
        let nuggetliststyle = {
            padding: "16px",
            fontFamily: theme.fontFamily,
            display: 'block',
            backgroundColor: '#749261',
            overflowX: 'scroll',
        };
        let footercardstyle = {
            backgroundImage: "url(/public/icons/WebsiteBanner.png)",
            backgroundSize: "cover",
            margin: "8px",
            border: "2px solid silver",
            borderRadius: "8px",
            fontSize: "18px"
        };
        let toplinklistheader = 'Browse our site:';
        let toplinklistitems = [
            {
                prompt: 'Explore the Toronto budget with our',
                icon: '/public/icons/ic_explore_48px.svg',
                target: '/explorer',
                targetText: 'Budget Explorer',
            },
            {
                prompt: "See information about Toronto's budget decision schedule at our",
                icon: '/public/icons/ic_map_48px.svg',
                target: '/roadmap',
                targetText: 'Budget Roadmap',
            },
            {
                prompt: 'Find related',
                icon: '/public/icons/ic_library_books_48px.svg',
                target: '/resources',
                targetText: 'Resources',
            },
        ];
        let secondlinklistheader = 'Follow us:';
        let secondlinklistitems = [
            {
                external: true,
                prompt: 'For news check out',
                icon: '/public/icons/twitter.png',
                target: 'http://twitter.com/budgetpedia',
                targetText: 'Twitter',
                description: '... and see the twitter feed below'
            },
            {
                external: true,
                prompt: 'For in-depth articles see',
                icon: '/public/icons/medium.png',
                target: 'http://medium.com/budgetpedia',
                targetText: 'Medium',
            },
        ];
        let thirdlinklistheader = 'More media (experimental):';
        let thirdlinklistitems = [
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/budgetpedia',
                targetText: 'our Facebook page',
            },
            {
                external: true,
                icon: '/public/icons/facebook.png',
                target: 'http://facebook.com/groups/budgetpedia',
                targetText: 'our Facebook group',
            },
            {
                external: true,
                prompt: 'For technical discussions:',
                icon: '/public/icons/g-logo.png',
                target: 'http://groups.google.com/d/forum/budgetpedia',
                targetText: 'our Google forum',
            },
            {
                external: true,
                prompt: 'Videos:',
                icon: '/public/icons/YouTube-icon-full_color.png',
                target: 'https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig',
                targetText: 'YouTube',
            },
            {
                external: true,
                prompt: 'Blog:',
                icon: '/public/icons/blogspot.jpeg',
                target: 'http://budgetpedia.blogspot.ca/',
                targetText: 'Blogspot',
            },
        ];
        return (React.createElement("div", null,
            React.createElement("div", { style: {
                    backgroundColor: "#404244",
                    padding: "8px",
                } },
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
            React.createElement("div", { style: {
                    backgroundColor: "#404244",
                    padding: "8px",
                } },
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
