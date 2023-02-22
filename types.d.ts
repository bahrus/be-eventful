import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';
import {AffectOptions, JSONObject, camelQry, Scope, QueryInfo} from 'trans-render/lib/types';

export interface EndUserProps{
    camelConfig?: CamelConfig;
}

export type HAPipeHAs = string | HydrateAction | HydrateAction[];

export type AOOrAOs = AffectOptions | AffectOptions[];

export interface CamelConfig extends CamelConfigEventSubscription {
    affect?: AOOrAOs,
    referTo?: AOOrAOs, //TODO
    eventfulScope?: Scope,
    [key: `on${string}Of${camelQry}Do`]: HAPipeHAs,
    [key: `on${string}Of${camelQry}Do${KeyOfHASVK}`]: string | IncTransform | ToggleTransform,
    [key: `on${string}$`]: CamelConfigEventSubscriptionOn,
    On: `on${string}Of${camelQry}Do${KeyOfHASVK}${string}`[],
    Affect: string[],
    Refer: `to${string}`[]
}

export interface CamelConfigEventSubscription {
    affect?: AOOrAOs,
    on?: {
        [key: `${string}$`]: string | CamelConfigEventSubscriptionOn,
        [key: `${string}Of${camelQry}Do`]: HAPipeHAs,
        [key: `${string}Of${camelQry}Do${KeyOfHASVK}`]: string | IncTransform | ToggleTransform,
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
    inc?: string | IncTransform,
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

export interface IncTransform {
    inc?: [lhs: string, rhs: string | number],
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