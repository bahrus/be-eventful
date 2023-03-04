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
export type propName = string;

export type longEventStatement = `${eventName}Of${camelQry}Do${KeyOfHASVK}${propName}`;

export interface CamelConfig{
    Capture?: [CaptureStatement];
    capture?: CaptureStatement;
    Affect?: [Scope];
    affect?: Scope;
    Target?: [string];
    target?: string;
    On?: longEventStatement[];
    on?: {[key: string] : OfDo[]}
}

export interface CanonicalConfig{
    eventListeningScope: Scope;
    targetResolvedEventName?: string;
    subscriptions: CanonicalEventSubscription[];
    targetPath?: string;
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

export interface OfDo {
    of: string,
    do: HydrateAction[],
}

export interface OfDoQueryInfo extends OfDo{
    queryInfo?: QueryInfo,
}

export interface CanonicalEventSubscription{
    on: string,
    ofDoQueryInfos: OfDoQueryInfo[];
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

