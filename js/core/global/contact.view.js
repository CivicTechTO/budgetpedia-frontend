'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Radium = require("radium");
let { StyleRoot } = Radium;
class ContactView extends React.Component {
    render() {
        let defaultStyle = {
            fontSize: "12px",
            color: "white",
            padding: "3px",
        };
        return (React.createElement(StyleRoot, null,
            React.createElement("div", { style: [defaultStyle, this.props.style] },
                "contact: ",
                React.createElement("a", { style: [{
                            color: 'white',
                            ':hover': {
                                color: 'white',
                                background: 'black',
                            },
                            ':visited': { color: 'gold' },
                        }, this.props.contactStyle], target: "_blank", href: this.props.contactAddress }, this.props.contactPrompt))));
    }
}
exports.default = ContactView;
