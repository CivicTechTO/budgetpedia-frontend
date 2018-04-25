// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// app.tsx
// display the app
import * as React from 'react';
import ReduxToastr from 'react-redux-toastr';
import GlobalBarController from '../global/globalbar.controller';
import { RoutesController } from './routes.controller';
const MainView = ({ globalmessage, history, style }) => (React.createElement("div", { style: style },
    React.createElement(GlobalBarController, null),
    React.createElement("div", { style: { height: "64px" } }, " "),
    globalmessage,
    React.createElement(RoutesController, { history: history }),
    React.createElement(ReduxToastr, { timeOut: 4000, newestOnTop: false, position: "top-left" })));
export default MainView;
