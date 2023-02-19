import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, Match, CanonicalConfig, HydrateAction, CamelConfigEventSubscriptionOn} from './types';
import {AffectOptions} from 'trans-render/lib/types';
import {lc} from './lc.js';
export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        const {affect} = camelConfig!;
        const rootAffect : AffectOptions = affect === undefined ? 'host' : affect;
        const cc: CanonicalConfig = {
            subscriptions: [],
            handlers: {},
        };
        for(const key in camelConfig!){
            const rhs = (<any>camelConfig)[key];
            const outerLongTest = (reCamelConfigLongKey.exec(key)) as Match | null;
            console.log({key, test: outerLongTest});
            if(outerLongTest !== null){
                const {outerLong} = await import('./outerLong.js');
                outerLong(outerLongTest, cc, rhs, rootAffect);
            }else{
                const outerMediumTest = reCamelConfigMediumKey.exec(key);
                if(outerMediumTest !== null){
                    throw 'NI';
                }else{
                    const outerShortTest = reCamelConfigShortKey.exec(key);
                    if(outerShortTest !== null){
                        const {outerShort} = await import('./outerShort.js');
                        outerShort(outerShortTest, cc, rhs, rootAffect);

                    }
                }
                
            }


        }
        const {on} = camelConfig!;
        if(on !== undefined){

        }
        console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }

    onCanonical(pp: PP): void {
        
    }

}
//const isoDateExpression = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const reCamelConfigShortKey = /^on(?<eventName>\w+)\$/;
const reCamelConfigMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Inc|Toggle|Invoke|Handler)/;

const reCamelConfigEventSubscriptShortKey = /^(?<eventName>\w+)$/;
const reCamelConfigEventSubscriptMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigEventSubscriptLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;



const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: [upgrade],
            virtualProps: ['camelConfig', 'canonicalConfig'],
            primaryProp: 'camelConfig',
            primaryPropReq: true,
        },
        actions: {
            camelToCanonical: 'camelConfig'
        }
    },
    complexPropDefaults: {
        controller: BeEventful,
    }
});

register(ifWantsToBe, upgrade, tagName);