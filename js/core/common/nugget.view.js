'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class Nugget extends React.Component {
    render() {
        let { image, style, kickerStyle, contrast, prefix, infix, suffix } = this.props;
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
            marginTop: '16px',
            overflow: 'clip',
            position: 'relative',
            fontWeight: '300',
        };
        let defaultkickerstyle = {
            fontSize: '2.5em',
            color: '#f1c40f'
        };
        return React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
            React.createElement("div", { style: { marginTop: '40px', minWidth: '20px' } }, prefix),
            React.createElement("div", { style: Object.assign({}, defaultkickerstyle, kickerStyle) }, infix),
            React.createElement("div", null, suffix));
    }
}
exports.default = Nugget;
