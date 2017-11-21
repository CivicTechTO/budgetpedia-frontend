// index.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence

/// <reference path="../typings-custom/general.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import Main from './core/containers/main'
// install fetch as global function for browsers (eg Safari) that don't have it
// require('isomorphic-fetch')

// declare module 'react' {
//     interface HTMLProps<T> {
//         onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
//     }
// }

// TODO concept of globalmessage needs to be fleshed out; source behind api
let globalmessage = null
// TODO the following is redundant
//  (
//     <div>THIS IS THE SOFTWARE DEVELOPER'S COPY OF BUDGETPEDIA.
//     </div>
// )
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
