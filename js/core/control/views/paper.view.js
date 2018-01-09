"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
let PaperView = ({ children }) => {
    let styles = {
        outderdiv: { backgroundColor: '#d9d9d9', padding: '0 16px 16px 16px' },
        innerdiv: { padding: '16px', position: "relative" },
    };
    return (React.createElement("div", { style: styles.outderdiv },
        React.createElement(Paper_1.default, { zDepth: 3, style: {
                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.4) 0px 6px 10px',
                borderRadius: '8px',
            } },
            React.createElement("div", { style: styles.innerdiv },
                children,
                React.createElement("div", { style: { clear: 'both' } })))));
};
exports.default = PaperView;
