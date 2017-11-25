'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const configurestore_1 = require("./configurestore");
const app_1 = require("./app");
const store = configurestore_1.configureStore();
const Main = ({ globalmessage, version }) => (React.createElement(app_1.default, { store: store, history: configurestore_1.history, globalmessage: globalmessage }));
exports.default = Main;
