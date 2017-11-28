// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// app.tsx

// display the app

import * as React from 'react'

import ReduxToastr from 'react-redux-toastr'

import GlobalBar from '../features/globalbar.controller'

import { Routes } from './routes.controller'

const MainView = ({globalmessage, history}) => (
    <div >
        <GlobalBar />
        <div style={{ height: "64px" }} > {/* space for top fixed appbar */}
        </div>

        {globalmessage}

        <Routes history={history}/>
        
        <ReduxToastr
              timeOut={4000}
              newestOnTop={false}
              position="top-left"/>
    </div>
)

export default MainView
