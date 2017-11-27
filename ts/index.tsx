// index.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

// configure the system environment

import * as React from 'react'
import { render } from 'react-dom'
// TODO move inject.. and isomorphic.. to index.tsx
// required by material-ui
import injectTapEventPlugin = require( 'react-tap-event-plugin' )
injectTapEventPlugin()
require('isomorphic-fetch')

import Main from './core/start/main.controller'

// TODO concept of globalmessage needs to be fleshed out; source behind api
let globalmessage = null
try {
    // TODO implement {version} as controlling variable, for example for google analytics
    // TODO refine error handling here
    render(
    	<Main globalmessage = {globalmessage} version={"DEVELOPMENT"}/>,
    	document.getElementById('main')
    )
} catch (e) {
    <div>
        This application requires a modern browser, like Chrome, Firefox, Safari or MS Edge.
    </div>
}
