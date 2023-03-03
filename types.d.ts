import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {QueryInfo, Scope, camelQry, JSONObject} from 'trans-render/lib/types';

export interface EndUserProps {
    camelConfig?: CamelConfig;
}

export type ScopeString = string;

export type KeyOfHASVK = keyof HydrateActionSingleValueKeys & string;

export type CaptureStatement = 
    | `${ScopeString}Events`;


export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLScriptElement>{
    canonicalConfig?: CanonicalConfig;
}

export interface IncrementTransform {
    increment?: [lhs: string, rhs: string | number],
}

export interface ToggleTransform {
    prop: string,
}

export type eventName = string;

export interface CamelConfig{
    Capture?: [CaptureStatement];
    capture?: CaptureStatement;
    Affect?: [Scope];
    affect?: Scope;
    Target?: [string];
    target?: string;
    [key: `on${eventName}Of${camelQry}Do${KeyOfHASVK}`]: string | IncrementTransform | ToggleTransform,
}

export interface CanonicalConfig{
    capture?: Scope;
}

export interface HydrateActionSingleValueKeys{
    increment?: string | IncrementTransform,
    toggle?: string | ToggleTransform,
        /**
     * method on affected entity
     * pass in affected entity, event object
     */
    invoke?: string,
    /**
     * export function defined from script tag
     * pass in affected entity, event object
     */
    handler?: string,
}

export interface HydrateAction extends HydrateActionSingleValueKeys {
    set?: SetTransform,
}

export interface SetTransform {
    eq: [lhs: string, rhs: string | string [] | JSONObject],
}

export interface CanonicalEventSubscription{
    on: string,
    of: string,
    do: HydrateAction[],
    queryInfo?: QueryInfo,
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    camelToCanonical(pp: PP): Promise<PPP>;
    onCanonical(pp: PP, mold: PPP): Promise<PPP>;
}

