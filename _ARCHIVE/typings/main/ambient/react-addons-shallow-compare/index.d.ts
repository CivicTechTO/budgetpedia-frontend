// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/1da639a106527e0c4010b354a1efe52a3059a291/react/react-addons-shallow-compare.d.ts
// Type definitions for React v0.14 (react-addons-css-transition-group)
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>, AssureSign <http://www.assuresign.com>, Microsoft <https://microsoft.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare namespace __React {
    namespace __Addons {
        export function shallowCompare<P, S>(
            component: __React.Component<P, S>,
            nextProps: P,
            nextState: S): boolean;
    }
}

declare module "react-addons-shallow-compare" {
    export = __React.__Addons.shallowCompare;
}