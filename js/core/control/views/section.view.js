// section.view.tsx
// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
/*
    TODO: upgrade to component; use markdown for title/description
*/
'use strict';
import * as React from 'react';
import MarkupBlock from './markupblock.view';
import HashAnchorHeader from './hashanchorheader.view';
let SectionView = props => {
    let { title, description, children, style, id } = props;
    let defaultstyle = {
        maxWidth: '800px',
        paddingBottom: '8px',
        margin: '0 auto 12px auto',
        paddingBotton: '1px',
        backgroundColor: '#d9d9d9',
    };
    return React.createElement("section", { id: id, style: Object.assign({}, defaultstyle, style) },
        title ?
            React.createElement("header", { style: { backgroundColor: "#d9d9d9", padding: "0px 16px 1px", borderTop: "4px solid silver" } },
                React.createElement(HashAnchorHeader, { tag: 'h1', title: title }),
                description ? React.createElement(MarkupBlock, { markup: description }) : null) : null,
        React.createElement("main", null, children));
};
export default SectionView;
