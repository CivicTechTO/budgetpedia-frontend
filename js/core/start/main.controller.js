'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const globaldataconfig_utility_1 = require("./globaldataconfig.utility");
const react_redux_1 = require("react-redux");
const MuiThemeProvider_1 = require("material-ui/styles/MuiThemeProvider");
const getMuiTheme_1 = require("material-ui/styles/getMuiTheme");
const main_view_1 = require("./main.view");
const Main = ({ globalmessage, version }) => (React.createElement(react_redux_1.Provider, { store: globaldataconfig_utility_1.store },
    React.createElement(MuiThemeProvider_1.default, { muiTheme: getMuiTheme_1.default() },
        React.createElement(main_view_1.default, { history: globaldataconfig_utility_1.history, globalmessage: globalmessage }))));
exports.default = Main;
