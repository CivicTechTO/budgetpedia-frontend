'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Nugget extends React.Component {
    render() {
        let { image, style, kickerStyle, contrast, prefix, kicker, suffix } = this.props;
        let defaultstyle = {
            display: 'inline-block',
            textAlign: 'center',
            borderRadius: '50%',
            backgroundColor: 'rgba(77,77,77,0.6)',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: image ? 'cover' : 'auto',
            color: contrast ? 'white' : null,
            width: '180px',
            height: '180px',
            marginRight: '16px',
            overflow: 'clip',
            position: 'relative',
        };
        let defaultkickerstyle = {
            fontSize: '2.5em',
            color: '#f1c40f'
        };
        return React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
            React.createElement("div", null, prefix),
            React.createElement("div", { style: Object.assign({}, defaultkickerstyle, kickerStyle) }, kicker),
            React.createElement("div", null, suffix));
    }
}
exports.default = Nugget;
