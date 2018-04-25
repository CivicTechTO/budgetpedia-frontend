// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// navtile.tsx
'use strict';
// required by bundler
import * as React from 'react';
import { GridTile } from 'material-ui/GridList';
let TileView = props => {
    let pushHistory = (e) => {
        if (props.content.disabled) {
            return;
        }
        e.stopPropagation();
        props.onSelect(props.route);
    };
    let wrapperstyle = null;
    if (props.content.disabled) {
        wrapperstyle = {
            position: 'relative',
            opacity: 0.3,
            filter: "alpha(opacity = 30)",
            backgroundColor: "#000",
            display: 'inline-block',
        };
    }
    else {
        wrapperstyle = {
            position: 'relative',
            pointerEvens: "none",
            display: 'inline-block',
        };
    }
    return (React.createElement("div", { style: wrapperstyle, onClick: pushHistory },
        React.createElement("div", { style: { position: "absolute", top: 3, left: 3, color: "silver", fontStyle: "italic", fontSize: "smaller", zIndex: 5 } }, props.content.category),
        React.createElement(GridTile, { style: {
                display: 'inline-block',
                textAlign: "center",
                backgroundColor: 'white',
                border: '2px solid silver',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '180px',
                height: '180px',
                marginRight: '16px',
            }, title: props.content.title, subtitle: props.content.subtitle, cols: props.content.cols || 1 },
            React.createElement("img", { src: props.content.image }))));
};
export default TileView;
