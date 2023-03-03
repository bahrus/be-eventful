import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {AffectOptions, JSONObject, camelQry, Scope, QueryInfo} from 'trans-render/lib/types';


export interface EndUserProps{
    camelConfig?: CamelConfig;
}

export type HAPipeHAs = string | HydrateAction | HydrateAction[];

export type AOOrAOs = AffectOptions | AffectOptions[];

export type lhs = string;
export type rhs = string;
export type reference = string;
export type eventName = string;

export interface CamelConfig extends CamelConfigEventSubscription {
    affect?: AOOrAOs,
    referTo?: AOOrAOs, //TODO
    eventListeningScope?: Scope,
    [key: `on${eventName}Of${camelQry}Do`]: HAPipeHAs,
    [key: `on${eventName}Of${camelQry}Do${KeyOfHASVK}`]: string | IncrementTransform | ToggleTransform,
    [key: `on${eventName}$`]: CamelConfigEventSubscriptionOn,
    On: `on${eventName}Of${camelQry}Do${KeyOfHASVK}${string}`[],
    Affect: string[],
    Refer: `to${reference}`[],
    Set: `${lhs}to${rhs}`[],
}

export interface CamelConfigEventSubscription {
    affect?: AOOrAOs,
    on?: {
        [key: `${string}$`]: string | CamelConfigEventSubscriptionOn,
        [key: `${string}Of${camelQry}Do`]: HAPipeHAs,
        [key: `${string}Of${camelQry}Do${KeyOfHASVK}`]: string | IncrementTransform | ToggleTransform,
    }
}

export interface CamelConfigEventSubscriptionOn {
    affect?: AOOrAOs,
    of?: string,
    do?: HAPipeHAs
}

export interface Match{
    eventName?: string,
    camelQry?: string,
    action?: string,
}

export interface LongMatch{
    eventName?: string,
    camelQry?: string,
    action?: string,
    to?: string,
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLScriptElement>{
    canonicalConfig: CanonicalConfig,
}

export interface CanonicalConfig {
    subscriptions: CanonicalEventSubscription[],
    handlers: {[key: string]: (affect: any, e: Event) => void;}
}

export interface CanonicalEventSubscription {
    affect: string[],
    on: string,
    of: string,
    do: HydrateAction[],
    queryInfo?: QueryInfo,
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
    affect?: AOOrAOs,
    set?: SetTransform,


}

export type KeyOfHASVK = keyof HydrateActionSingleValueKeys & string;

export interface SetTransform {
    eq: [lhs: string, rhs: string | string [] | JSONObject],
    affect?: AffectOptions,
}

export interface IncrementTransform {
    increment?: [lhs: string, rhs: string | number],
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
    camelToCanonical(pp: PP): Promise<PPP>;
    onCanonical(pp: PP, mold: PPP): Promise<PPP>;
}