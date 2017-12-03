'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const nugget_view_1 = require("./nugget.view");
class NuggetList extends React.Component {
    render() {
        let { nuggets: nuggetdata, image, title, style, contrast } = this.props;
        let defaultstyle = {
            position: 'relative',
            backgroundColor: image ? 'none' : 'green',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: image ? 'cover' : 'auto',
        };
        let defaultScrollBlockstyle = {
            padding: "16px",
            display: 'block',
            overflowX: 'scroll',
        };
        let nuggets = nuggetdata.map(function (data, index) {
            return (React.createElement(nugget_view_1.default, { key: index, image: data.image, style: data.style, kickerStyle: data.kickerStyle, prefix: data.prefix, infix: data.infix, suffix: data.suffix, contrast: data.contrast }));
        });
        return (React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
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
                    } },
                    React.createElement("span", null, title)),
                React.createElement("div", { style: {
                        display: 'inline-block',
                        color: 'silver',
                        marginLeft: '32px',
                        verticalAlign: 'top',
                    } },
                    React.createElement("span", { className: 'material-icons' }, "chevron_left"),
                    React.createElement("span", { className: 'material-icons' }, "chevron_right"))),
            React.createElement("div", { style: defaultScrollBlockstyle },
                React.createElement("div", { style: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                    } }, nuggets))));
    }
}
exports.default = NuggetList;
