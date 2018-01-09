'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const nugget_view_1 = require("./nugget.view");
const scrollcontrols_view_1 = require("./scrollcontrols.view");
const markupline_view_1 = require("./markupline.view");
const hashanchorwrapper_view_1 = require("./hashanchorwrapper.view");
class NuggetList extends React.Component {
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
        let { nuggets: nuggetdata, image, title, subtitle, style, contrast } = this.props;
        let defaultstyle = {
            position: 'relative',
            backgroundColor: image ? 'none' : 'green',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: image ? 'cover' : 'auto',
            margin: '0 16px 24px 16px',
            borderRadius: '8px',
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
        };
        let defaultScrollBlockstyle = {
            padding: "16px",
            display: 'block',
            overflowX: 'scroll',
        };
        let nuggets = nuggetdata.map(function (data, index) {
            return (React.createElement(nugget_view_1.default, { key: index, image: data.image, style: data.style, prefix: data.prefix, infix: data.infix, suffix: data.suffix, contrast: data.contrast }));
        });
        return (React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
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
                    } }),
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'white',
                        verticalAlign: 'bottom',
                        fontSize: 'smaller',
                    } },
                    React.createElement(markupline_view_1.default, { markup: subtitle }))),
            React.createElement(scrollcontrols_view_1.default, { scroller: this.state.scroller },
                React.createElement("div", { style: defaultScrollBlockstyle, ref: el => { this.scroller = el; } },
                    React.createElement("div", { style: {
                            display: 'block',
                            whiteSpace: 'nowrap',
                            position: 'relative',
                            marginTop: '20px',
                        } }, nuggets)))));
    }
}
exports.default = NuggetList;
