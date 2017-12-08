// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// app.tsx

// display the app

import * as React from 'react'

import ReduxToastr from 'react-redux-toastr'

import GlobalBarController from '../global/globalbar.controller'

import { RoutesController } from './routes.controller'

const MainView = ({globalmessage, history, style}) => (
    <div style = {style}>
        <GlobalBarController />
        <div style={{ height: "64px" }} > {/* space for top fixed appbar */}
        </div>

        {globalmessage}

        <RoutesController history={history}/>
        
        <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              position="top-left"/>
    </div>
)

export default MainView
