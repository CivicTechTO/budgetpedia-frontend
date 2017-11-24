'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const GridList_1 = require("material-ui/GridList");
class AppTile extends React.Component {
    constructor(props) {
        super(props);
        this.pushHistory = (e) => {
            if (this.props.content.disabled) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            var self = this;
            self.props.pushHistory(self.props.route);
        };
    }
    render() {
        let tile = this;
        let wrapperstyle = null;
        if (this.props.content.disabled) {
            wrapperstyle = {
                opacity: 0.3,
                filter: "alpha(opacity = 30)",
                backgroundColor: "#000",
            };
        }
        else {
            wrapperstyle = {
                pointerEvens: "none"
            };
        }
        return (React.createElement(GridList_1.GridTile, { style: {
                textAlign: "center",
                backgroundColor: 'white',
                border: '2px solid silver',
                borderRadius: '8px',
                cursor: 'pointer',
            }, title: this.props.content.title, subtitle: this.props.content.subtitle, cols: this.props.content.cols || 1 },
            React.createElement("div", { style: wrapperstyle, onClick: tile.pushHistory },
                React.createElement("div", { style: { position: "absolute", top: 3, left: 3, color: "silver", fontStyle: "italic", fontSize: "smaller" } }, this.props.content.category),
                React.createElement("img", { src: this.props.content.image, style: { height: "120px" } }),
                React.createElement("div", { style: { position: "absolute", height: "30px", bottom: 0, width: "100%" } }))));
    }
}
exports.AppTile = AppTile;
