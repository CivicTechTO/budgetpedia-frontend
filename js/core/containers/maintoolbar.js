"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const Actions = require('../actions/actions');
const IconButton_1 = require('material-ui/IconButton');
const FontIcon_1 = require('material-ui/FontIcon');
const toolbar_1 = require('material-ui/lib/toolbar/toolbar');
const toolbar_group_1 = require('material-ui/lib/toolbar/toolbar-group');
function mapStateToProps(state) {
    let { toolsnavbar, resources } = state;
    return {
        toolsnavbar,
        theme: resources.theme,
    };
}
let MainToolbar = class extends React.Component {
    constructor() {
        super(...arguments);
        this.transitionToHome = () => {
            this.props.transitionTo('/');
        };
    }
    render() {
        let { appnavbar, theme } = this.props;
        return (React.createElement(toolbar_1.default, {style: {
            position: "fixed",
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            borderTop: "2px solid silver"
        }}, 
            React.createElement(toolbar_group_1.default, {style: {
                float: "none",
                width: "70%",
                display: "flex",
                justifyContent: "space-around"
            }}, 
                React.createElement(IconButton_1.default, {disabled: true}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "arrow_back")
                ), 
                React.createElement(IconButton_1.default, {onTouchTap: this.transitionToHome}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "radio_button_unchecked")
                ), 
                React.createElement(IconButton_1.default, {disabled: true}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "check_box_outline_blank")
                ), 
                React.createElement(IconButton_1.default, {disabled: true}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "help_outline")
                ), 
                React.createElement(IconButton_1.default, {disabled: true}, 
                    React.createElement(FontIcon_1.default, {className: "material-icons"}, "arrow_forward")
                ))
        ));
    }
}
;
MainToolbar = react_redux_1.connect(mapStateToProps, {
    transitionTo: Actions.transitionTo
})(MainToolbar);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainToolbar;
