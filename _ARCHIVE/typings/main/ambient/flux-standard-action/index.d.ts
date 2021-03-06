// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/86dbea8fc37d9473fee465da4f0a21bea4f8cbd9/flux-standard-action/flux-standard-action.d.ts
// Type definitions for flux-standard-action 0.5.0
// Project: https://github.com/acdlite/flux-standard-action
// Definitions by: Qubo <https://github.com/tkqubo>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "flux-standard-action" {
    export interface ErrorAction extends Action<Error> {
        error: boolean;
    }

    export interface Action<T> {
        type: string;
        payload?: T;
        error?: boolean;
    }

    // Usage: var action: Action<sring> & AnyMeta;
    export interface AnyMeta {
        meta: any
    }

    // Usage: var action: Action<sring> & TypedMeta<string>;
    export interface TypedMeta<T> {
        meta: T
    }

    export function isFSA(action: any): boolean;

    export function isError(action: any): boolean;
}