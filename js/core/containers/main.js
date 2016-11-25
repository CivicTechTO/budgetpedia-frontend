'use strict';
const React = require('react');
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();
require('isomorphic-fetch');
const configurestore_1 = require('../common/configurestore');
const root_1 = require('../common/root');
const actions_1 = require('../actions/actions');
const store = configurestore_1.default();
let { auth } = store.getState().login;
if (!auth.isAuthenticated) {
    let token = localStorage.getItem('jsonwebtoken');
    if (token) {
        store.dispatch(actions_1.autoLoginUser(token));
    }
}
const Main = ({ globalmessage, version }) => (React.createElement(root_1.default, {store: store, globalmessage: globalmessage}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
