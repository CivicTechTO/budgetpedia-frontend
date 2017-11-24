'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
require('isomorphic-fetch');
const configurestore_1 = require("../common/configurestore");
const root_1 = require("../common/root");
const store = configurestore_1.configureStore();
const Main = ({ globalmessage, version }) => (React.createElement(root_1.default, { store: store, globalmessage: globalmessage, history: configurestore_1.history }));
exports.default = Main;
