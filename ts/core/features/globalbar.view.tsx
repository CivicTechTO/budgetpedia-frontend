// copyright (c) 2017 Henrik Bechmann, Toronto, MIT Licence
// globalbar.view.tsx

'use strict'

import * as React from 'react' // required by bundler

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import Divider from 'material-ui/Divider'

import { StyleRoot } from 'radium'

import { MenuRow } from '../components/menurow'

interface GlobalBarViewProps {
    toolkit: Object,
    data: Object,
    styles: Object,
}

class GlobalBarView extends React.Component<GlobalBarViewProps, any> {


}

export default GlobalBarView