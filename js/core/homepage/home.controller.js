'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_router_redux_1 = require("react-router-redux");
const Card_1 = require("material-ui/Card");
const react_twitter_widgets_1 = require("react-twitter-widgets");
const nuggetlist_controller_1 = require("./nuggetlist.controller");
const html_view_1 = require("../common/html.view");
let headerimages = require('./html/headerimages.html');
let headertitle = require('./html/headertitle.html');
let headercontent = require('./html/headercontent.html');
let footercontent = require('./html/footercontent.html');
let Home = class extends React.Component {
    constructor() {
        super(...arguments);
        this.pushHistory = (e, target) => {
            e.stopPropagation();
            this.props.push(target);
        };
    }
    render() {
        let { pagetargets, theme, colors } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { style: {
                    backgroundColor: "#404244",
                    padding: "8px",
                } },
                React.createElement(Card_1.Card, { style: {
                        backgroundImage: "url(/public/icons/WebsiteBanner.png)",
                        backgroundSize: "cover",
                        margin: "8px",
                        border: "2px solid silver",
                        borderRadius: "8px",
                        fontSize: "18px"
                    } },
                    React.createElement(html_view_1.default, { html: headerimages }),
                    React.createElement(Card_1.CardTitle, { style: { padding: "16px 16px 0 16px" } },
                        React.createElement(html_view_1.default, { html: headertitle })),
                    React.createElement(Card_1.CardText, null,
                        React.createElement(html_view_1.default, { html: headercontent })))),
            React.createElement(nuggetlist_controller_1.default, { style: {
                    padding: "16px",
                    fontFamily: theme.fontFamily,
                    display: 'block',
                    backgroundColor: '#749261',
                    overflowX: 'scroll',
                }, tiles: pagetargets, onSelect: this.props.push, cellHeight: 180 }),
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
                React.createElement(Card_1.Card, { style: {
                        backgroundImage: "url(/public/icons/WebsiteBanner.png)",
                        backgroundSize: "cover",
                        margin: "8px",
                        border: "2px solid silver",
                        borderRadius: "8px",
                        fontSize: "18px"
                    } },
                    React.createElement(Card_1.CardText, null,
                        React.createElement(html_view_1.default, { html: footercontent }),
                        React.createElement("p", null, "More media (experimental):"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://facebook.com/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "/public/icons/facebook.png" })),
                                " ",
                                React.createElement("a", { href: "http://facebook.com/budgetpedia", target: "_blank" }, "our Facebook page")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://facebook.com/groups/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "/public/icons/facebook.png" })),
                                " ",
                                React.createElement("a", { href: "http://facebook.com/groups/budgetpedia", target: "_blank" }, "our Facebook group")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://groups.google.com/d/forum/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "/public/icons/g-logo.png" })),
                                " For technical discussions: ",
                                React.createElement("a", { href: "http://groups.google.com/d/forum/budgetpedia", target: "_blank" }, "our Google forum")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "/public/icons/YouTube-icon-full_color.png" })),
                                " Videos: ",
                                React.createElement("a", { href: "https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig", target: "_blank" }, "YouTube")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://budgetpedia.blogspot.ca/", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "/public/icons/blogspot.jpeg" })),
                                " Blog: ",
                                React.createElement("a", { href: "http://budgetpedia.blogspot.ca/", target: "_blank" }, "Blogspot"))))))));
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
