'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const GridList_1 = require("material-ui/GridList");
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
        React.createElement(GridList_1.GridTile, { style: {
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
exports.default = TileView;
