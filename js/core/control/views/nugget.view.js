// nugget.view.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
'use strict';
import * as React from 'react';
import MarkupLine from './markupline.view';
let Nugget = (props) => {
    let { image, style, contrast, prefix, infix, suffix } = props;
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
        fontWeight: '300',
        whiteSpace: 'normal',
        verticalAlign: 'top',
    };
    let defaultinfixstyle = {
        fontSize: '2.5em',
        color: '#f1c40f'
    };
    return React.createElement("div", { style: Object.assign({}, defaultstyle, style) },
        React.createElement("div", { style: { marginTop: '30px', minWidth: '20px' } }, React.createElement(MarkupLine, { markup: prefix })),
        React.createElement("div", { style: defaultinfixstyle }, React.createElement(MarkupLine, { markup: infix })),
        React.createElement("div", null, React.createElement(MarkupLine, { markup: suffix })));
};
export default Nugget;
