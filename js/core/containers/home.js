'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Actions = require("../actions/actions");
const react_router_dom_1 = require("react-router-dom");
const Card_1 = require("material-ui/Card");
const apptiles_1 = require("../components/apptiles");
const mapStateToProps = ({ homegrid, resources }) => ({
    hometiles: homegrid.hometiles,
    homecols: homegrid.homecols,
    homepadding: homegrid.homepadding,
    theme: resources.theme,
    colors: resources.colors,
    system: resources.system,
});
let Home = class extends React.Component {
    constructor() {
        super(...arguments);
        this.handleHomeResize = () => {
            this.props.setHomeTileCols();
        };
        this.pushHistory = (e, target) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.history.push(target);
        };
    }
    componentWillMount() {
        this.props.setHomeTileCols();
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleHomeResize);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleHomeResize);
    }
    render() {
        let { hometiles, homecols, homepadding, theme, colors, system } = this.props;
        return (React.createElement("div", null,
            React.createElement("div", { style: {
                    backgroundColor: "#404244",
                    padding: "8px",
                } },
                React.createElement(Card_1.Card, { style: {
                        backgroundImage: "url(./public/icons/WebsiteBanner.png)",
                        backgroundSize: "cover",
                        margin: "8px",
                        border: "2px solid silver",
                        borderRadius: "8px",
                        fontSize: "18px"
                    } },
                    React.createElement("div", { style: { float: "right", margin: "9px 3px 3px 3px", borderRadius: "8px" } },
                        React.createElement("img", { style: { width: "100px" }, src: "./public/icons/budgetpedia-logo.png" })),
                    React.createElement("div", { style: { clear: 'right', float: "right", margin: "0px 3px 3px 3px", borderRadius: "8px", lineHeight: '9px' } },
                        React.createElement("span", { style: { fontStyle: 'italic', fontSize: '9px' } }, "fostered by:"),
                        React.createElement("br", null),
                        React.createElement("a", { target: "_blank", href: "http://civictech.ca" },
                            React.createElement("img", { style: { width: "100px" }, src: "./public/icons/CTTO-logo-sm.png" }))),
                    React.createElement("div", { style: { clear: 'right', float: "right", margin: "0px 3px 3px 3px", borderRadius: "8px", lineHeight: '9px' } },
                        React.createElement("span", { style: { fontStyle: 'italic', fontSize: '9px' } }, "in collaboration with:"),
                        React.createElement("br", null),
                        React.createElement("a", { target: "_blank", href: "http://betterbudget.ca" },
                            React.createElement("img", { style: { width: "100px" }, src: "./public/icons/bbtoLogo_04.jpg" }))),
                    React.createElement(Card_1.CardTitle, { style: { padding: "16px 16px 0 16px" } }, "Welcome to Budgetpedia."),
                    React.createElement(Card_1.CardText, null,
                        React.createElement("hr", null),
                        React.createElement("p", { style: { margin: 0, padding: 0 } }, "Browse our site:"),
                        React.createElement("ul", null,
                            " ",
                            React.createElement("li", null,
                                "Explore the Toronto budget with our ",
                                React.createElement("span", { style: { whiteSpace: 'pre' } },
                                    React.createElement("img", { style: { height: '18px', verticalAlign: 'middle' }, src: './public/icons/ic_explore_48px.svg' }),
                                    React.createElement(react_router_dom_1.Link, { to: '/explorer' }, "Budget Explorer"))),
                            React.createElement("li", null,
                                "See information about Toronto's budget decision schedule at our ",
                                React.createElement("span", { style: { whiteSpace: 'pre' } },
                                    React.createElement("img", { style: { height: '18px', verticalAlign: 'middle' }, src: './public/icons/ic_map_48px.svg' }),
                                    React.createElement(react_router_dom_1.Link, { to: '/roadmap' }, "Budget Roadmap"))),
                            React.createElement("li", null,
                                "Find related ",
                                React.createElement("span", { style: { whiteSpace: 'pre' } },
                                    React.createElement("img", { style: { height: '18px', verticalAlign: 'middle' }, src: './public/icons/ic_library_books_48px.svg' }),
                                    React.createElement(react_router_dom_1.Link, { to: '/resources' }, "Resources")))),
                        React.createElement("hr", null),
                        React.createElement("p", null, "Follow us on:"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://twitter.com/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/twitter.png" })),
                                " ",
                                React.createElement("a", { href: "http://twitter.com/budgetpedia", target: "_blank" }, "Twitter")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://medium.com/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/medium.png" })),
                                " For in-depth articles: ",
                                React.createElement("a", { href: "http://medium.com/budgetpedia", target: "_blank" }, "Medium"))),
                        React.createElement("div", { style: { clear: "both" } })))),
            React.createElement(apptiles_1.AppTiles, { style: {
                    margin: "16px",
                    fontFamily: theme.fontFamily,
                    width: '100%'
                }, tiles: hometiles, padding: homepadding, tilecolors: {
                    front: colors.blue50,
                    back: colors.amber50,
                    helpbutton: theme.palette.primary3Color,
                }, system: system, pushHistory: this.props.pushHistory, cellHeight: 180 }),
            React.createElement("div", { style: {
                    backgroundColor: "#404244",
                    padding: "8px",
                } },
                React.createElement(Card_1.Card, { style: {
                        backgroundImage: "url(./public/icons/WebsiteBanner.png)",
                        backgroundSize: "cover",
                        margin: "8px",
                        border: "2px solid silver",
                        borderRadius: "8px",
                        fontSize: "18px"
                    } },
                    React.createElement(Card_1.CardText, null,
                        React.createElement("p", null, "More media (experimental):"),
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://facebook.com/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/facebook.png" })),
                                " ",
                                React.createElement("a", { href: "http://facebook.com/budgetpedia", target: "_blank" }, "our Facebook page")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://facebook.com/groups/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/facebook.png" })),
                                " ",
                                React.createElement("a", { href: "http://facebook.com/groups/budgetpedia", target: "_blank" }, "our Facebook group")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://groups.google.com/d/forum/budgetpedia", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/g-logo.png" })),
                                " For technical discussions: ",
                                React.createElement("a", { href: "http://groups.google.com/d/forum/budgetpedia", target: "_blank" }, "our Google forum")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/YouTube-icon-full_color.png" })),
                                " Videos: ",
                                React.createElement("a", { href: "https://www.youtube.com/channel/UCatXKvLCA5qGkzj3jw8AQig", target: "_blank" }, "YouTube")),
                            React.createElement("li", null,
                                React.createElement("a", { href: "http://budgetpedia.blogspot.ca/", target: "_blank" },
                                    React.createElement("img", { style: { height: "16px", verticalAlign: "middle" }, src: "./public/icons/blogspot.jpeg" })),
                                " Blog: ",
                                React.createElement("a", { href: "http://budgetpedia.blogspot.ca/", target: "_blank" }, "Blogspot"))))))));
    }
};
Home = react_redux_1.connect(mapStateToProps, {
    pushHistory: Actions.pushHistory,
    setHomeTileCols: Actions.setHomeTileCols,
})(Home);
exports.default = Home;
