'use strict';
const React = require('react');
const MenuItem_1 = require('material-ui/MenuItem');
class MenuTile extends React.Component {
    constructor(props) {
        super(props);
        this.transitionTo = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.transitionTo(this.props.route);
        };
    }
    render() {
        let tile = this;
        return (React.createElement(MenuItem_1.default, {onTouchTap: tile.transitionTo, primaryText: this.props.primaryText, leftIcon: React.createElement("img", {src: this.props.image}), disabled: this.props.disabled ? true : false}));
    }
}
exports.MenuTile = MenuTile;
