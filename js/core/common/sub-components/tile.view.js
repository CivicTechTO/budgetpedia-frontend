'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const GridList_1 = require("material-ui/GridList");
class TileView extends React.Component {
    constructor() {
        super(...arguments);
        this.pushHistory = (e) => {
            if (this.props.content.disabled) {
                return;
            }
            e.stopPropagation();
            this.props.onSelect(this.props.route);
        };
    }
    render() {
        let tile = this;
        let wrapperstyle = null;
        if (this.props.content.disabled) {
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
        return (React.createElement("div", { style: wrapperstyle, onClick: tile.pushHistory },
            React.createElement("div", { style: { position: "absolute", top: 3, left: 3, color: "silver", fontStyle: "italic", fontSize: "smaller", zIndex: 5 } }, this.props.content.category),
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
                }, title: this.props.content.title, subtitle: this.props.content.subtitle, cols: this.props.content.cols || 1 },
                React.createElement("img", { src: this.props.content.image }))));
    }
}
exports.default = TileView;
