// typings-custom/material-ui.d.ts
// follows pattern established in ../typings/material-ui/material-us.d.ts

//<reference path='../typings/react/react.d.ts' />

// the following not needed here, apparently repetative
// declare module "material-ui" {
// }

declare namespace __MaterialUI {
    import React = __React
    export namespace Icons {
        export import NavigationClose = __MaterialUI.NavigationClose
        export import MoreVertIcon = __MaterialUI.MoreVertIcon
    }
    interface NavigationCloseProps extends React.Props<NavigationClose> {
    }
    export class NavigationClose extends React.Component<NavigationCloseProps, {}> {
    }
    interface MoreVertIconProps extends React.Props<MoreVertIcon> {
    }
    export class MoreVertIcon extends React.Component<MoreVertIconProps, {}> {
    }
    namespace Menus {
        interface IconMenuProps extends React.Props<IconMenu> {
            targetOrigin?: Object,
            anchorOrigin?: Object,
        }
    }
    namespace Toolbar {
        interface ToolbarGroupProps extends React.Props<ToolbarGroup> {
            firstChild?: boolean;
        }
    }
    interface AppBarProps extends React.Props<AppBar> {
        onTitleTouchTap: Function,
        titleStyle: Object,
    }
    interface TextFieldProps extends React.Props<TextField> {
        minLength?: number,
        maxLength?: number,
        required?: boolean,
    }
    interface LeftNavProps extends React.Props<LeftNav> {
        width?:number,
        open:boolean,
        onRequestChange?:Function,
    }
    export class Divider extends React.Component<any, {}> {
    }
}
declare module 'material-ui/lib/svg-icons/navigation/close' {
    import NavigationClose = __MaterialUI.NavigationClose;
    export = NavigationClose;
}
declare module 'material-ui/lib/svg-icons/navigation/more-vert' {
    import MoreVertIcon = __MaterialUI.MoreVertIcon;
    export = MoreVertIcon;
}

declare module 'material-ui/lib/divider' {
    import Divider = __MaterialUI.Divider;
    export = Divider;
}
// for react-tap-event-plugin, allow div to hold onTouchTap
declare module __React {
    interface DOMAttributes {
        onTouchTap?: Function,
    }
}

