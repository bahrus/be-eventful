import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {AffectOptions, JSONObject} from '../trans-render/lib/types';

export interface EndUserProps{
    camelConfig: any;//tbd
}

export interface VirtualProps extends EndUserProps{
    canonicalConfig: CanonicalConfig,
}

export interface CanonicalConfig {
    subscriptions: CanonicalEventSubscription[],
    handlers: {[key: string]: (affect: any, e: Event) => void;}
}

export interface CanonicalEventSubscription {
    affect: string,
    on: string,
    of: string,
    do: HydrateAction[]
}

export interface HydrateAction {
    affect?: AffectOptions,
    set?: SetTransform,
    inc?: string | IncTransform,
    toggle: string | ToggleTransform,
    /**
     * method on affected entity
     * pass in affected entity, event object
     */
    invoke: string,
    /**
     * export function defined from script tag
     * pass in affected entity, event object
     */
    handler: string,
}

export interface SetTransform {
    eq: [lhs: string, rhs: string | string [] | JSONObject],
    affect?: AffectOptions,
}

export interface IncTransform {
    inc: [lhs: string, rhs: string | number],
    affect?: AffectOptions,
}

export interface ToggleTransform {
    prop: string,
    affect?: AffectOptions,
}

export type Proxy = HTMLScriptElement & VirtualProps;

export interface PP extends VirtualProps{
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
}