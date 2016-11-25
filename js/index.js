"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const main_1 = require('./core/containers/main');
let globalmessage = null;
try {
    react_dom_1.render(React.createElement(main_1.default, {globalmessage: globalmessage, version: "DEVELOPMENT"}), document.getElementById('main'));
}
catch (e) {
    React.createElement("div", null, "This application requires a modern browser, like Chrome, Firefox, Safari or MS Edge.");
}
