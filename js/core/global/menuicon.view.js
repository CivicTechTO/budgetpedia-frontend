// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// menuicon.view.tsx
/*
    Note: FontIcon style seems to be ignored when nested in IconButton

*/
'use strict';
import * as React from 'react'; // required by bundler
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
class MenuIconView extends React.Component {
    render() {
        return (React.createElement(IconButton, { onClick: this.props.onSelect, style: this.props.style },
            React.createElement(FontIcon, { className: "material-icons", color: this.props.color }, "menu")));
    }
}
export default MenuIconView;
