"use strict";
const React = require('react');
const react_dom_1 = require('react-dom');
const main_1 = require('./controllers/main');
require('isomorphic-fetch');
react_dom_1.render(React.createElement(main_1.Main, null), document.getElementById('main'));
