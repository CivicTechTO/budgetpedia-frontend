'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
let SectionView = (props) => (React.createElement("div", null,
    props.title ? React.createElement("div", { style: { backgroundColor: "#d9d9d9", padding: "8px", borderTop: "4px solid silver" } },
        props.title ? React.createElement("h1", null, props.title) : null,
        props.description ? React.createElement("p", null, props.description) : null) : null,
    props.children));
exports.default = SectionView;
