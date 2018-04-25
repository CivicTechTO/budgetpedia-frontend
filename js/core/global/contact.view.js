// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// contact.view.tsx
'use strict';
import * as React from 'react'; // required by bundler
// TODO: replace radium with css classes
import * as Radium from 'radium';
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
export default ContactView;
