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
            const outerLongTest = (reLongKey.exec(key)) as Match | null;
            console.log({key, test: outerLongTest});
            if(outerLongTest !== null){
                const {outerLong} = await import('./outerLong.js');
                outerLong(outerLongTest, cc, rhs, rootAffect);
            }else{
                const outerMediumTest = reMediumKey.exec(key);
                if(outerMediumTest !== null){
                    throw 'NI';
                }else{
                    const outerShortTest = reShortKey.exec(key);
                    if(outerShortTest !== null){
                        const {outerShort} = await import('./outerShort.js');
                        outerShort(outerShortTest, cc, rhs, rootAffect);

                    }
                }
            }


        }
        if(camelConfig!.on !== undefined){
            const {doOn} = await import('./doOn.js');
            doOn(camelConfig!);
        }
        console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }

    onCanonical(pp: PP): void {
        
    }

}
const reShortKey = /^on(?<eventName>\w+)\$/;
const reMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Inc|Toggle|Invoke|Handler)/;





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