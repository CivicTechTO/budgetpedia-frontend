// index.tsx
// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
/// <reference path="../typings/browser.d.ts" />
/// <reference path="../typings-custom/react-flipcard.d.ts" />
/// <reference path="../typings-custom/material-ui.extended.d.ts" />
/// <reference path="../typings-custom/material-ui.modified.d.ts" />
/// <reference path="../typings-custom/redux-thunk.modified.d.ts" />
// <reference path="../typings-custom/format-number.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import { Main } from './controllers/main'
// install fetch as global function for browsers (eg Safari) that don't have it
require('isomorphic-fetch')

render(
	<Main />,
	document.getElementById('main')
)
