// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menurow.tsx
'use strict';
import * as React from 'react';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
export class MenuRowView extends React.Component {
    constructor() {
        super(...arguments);
        this.pushHistory = (e) => {
            e.stopPropagation();
            this.props.onSelect(this.props.route);
        };
    }
    render() {
        return ([
            this.props.isDivider ? React.createElement(Divider, { key: "divider" }) : null,
            React.createElement(MenuItem, { onClick: this.pushHistory, primaryText: this.props.primaryText, leftIcon: React.createElement("img", { src: this.props.image }), disabled: this.props.disabled ? true : false }),
        ]);
    }
}
