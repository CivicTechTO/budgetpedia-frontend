// index.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
/// <reference path="../typings/browser.d.ts" />
// <reference path="../typings/index.d.ts" />
/// <reference path="../typings-custom/react-flipcard.d.ts" />
/// <reference path="../typings-custom/material-ui.extended1.d.ts" />
// <reference path="../typings-custom/material-ui.modified.d.ts" />
/// <reference path="../typings-custom/redux-thunk.modified.d.ts" />
// <reference path="../typings-custom/format-number.d.ts" />
/// <reference path="../typings-custom/react-router.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import Main from './core/containers/main'
// install fetch as global function for browsers (eg Safari) that don't have it
// require('isomorphic-fetch')

let globalmessage = null
//  (
//     <div>THIS IS THE SOFTWARE DEVELOPER'S COPY OF BUDGETPEDIA.
//     </div>
// )
try {
render(
	<Main globalmessage = {globalmessage} version={"DEVELOPMENT"}/>,
	document.getElementById('main')
)
} catch (e) {
    <div>
        This application requires a modern browser, like Chrome, Firefox, Safari or MS Edge.
    </div>
}
