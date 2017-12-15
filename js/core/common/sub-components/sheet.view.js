'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Paper_1 = require("material-ui/Paper");
let SheetView = props => (React.createElement("div", { style: { backgroundColor: '#d9d9d9', padding: '16px' } },
    React.createElement(Paper_1.default, { zDepth: 3 },
        React.createElement("div", { style: { padding: '16px' } }, "Sheet View"))));
exports.default = SheetView;
