import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, Match, CanonicalConfig, HydrateAction, CamelConfigEventSubscriptionOn, lhs, rhs} from './types';
import {AffectOptions, Scope} from 'trans-render/lib/types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        const {On, on, Affect, affect, Set} = camelConfig!;
        const {arr, append} = await import('./cpu.js');
        const rootAffects = arr(affect);
        if(Set !== undefined){
            const setRules: {lhs: lhs, rhs: rhs}[] = [];
            append(setRules, Set, reSet);
            console.log({setRules});
            for(const rule of setRules){
                (<any>camelConfig)[rule.lhs] = rule.rhs;
            }
        }
        if(Affect !== undefined){
            append(rootAffects, Affect);
        }
        
        const cc: CanonicalConfig = {
            subscriptions: [],
            handlers: {},
        };

        for(const key in camelConfig!){
            const rhs = (<any>camelConfig)[key];
            const outerLongTest = (reLongKey.exec(key)) as Match | null;
            //console.log({key, test: outerLongTest});
            if(outerLongTest !== null){
                const {long} = await import('./long.js');
                long(outerLongTest, cc, rhs, rootAffects);
            }else{
                const outerMediumTest = reMediumKey.exec(key);
                if(outerMediumTest !== null){
                    throw 'NI';
                }else{
                    const outerShortTest = reShortKey.exec(key);
                    if(outerShortTest !== null){
                        const {short} = await import('./short.js');
                        short(outerShortTest, cc, rhs, rootAffects);

                    }
                }
            }


        }

        if(On !== undefined){
            const {doOnOn} = await import('./doOnOn.js');
            doOnOn(camelConfig!, cc, rootAffects);
        }

        if(on !== undefined){
            const {doOn} = await import('./doOn.js');
            await doOn(camelConfig!, cc, rootAffects);
        }
        //console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }

    async onCanonical(pp: PP, mold: PPP) {
        const {canonicalConfig, self, camelConfig} = pp;
        const {subscriptions} = canonicalConfig!;
        const {eventListeningScope: eventfulScope} = camelConfig!;
        
        const sc: Scope = eventfulScope || 'porn';
        const {findRealm} = await import('trans-render/lib/findRealm.js');
        const target = await findRealm(self, sc);
        if(target === null) throw '404';
        const eventNamesArr = subscriptions.map(s => s.on);
        const uniq = new Set<string>(eventNamesArr);
        for(const key of uniq.keys()){
            target.addEventListener(key, e => {
                this.handler(pp, e);
            })
        }
        return mold;
    }

    async handler(pp: PP, e: Event){
        const {handler} = await import('./handler.js');
        handler(pp, e);
    }

}
const reSet = /^(?<lhs>\w+)To(?<rhs>\w+)/;
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
            parseAndCamelize: true,
        },
        actions: {
            camelToCanonical: 'camelConfig',
            onCanonical: {
                ifAllOf: ['canonicalConfig', 'camelConfig'],
                returnObjMold: {
                    resolved: true,
                }
            }
        }
    },
    complexPropDefaults: {
        controller: BeEventful,
    }
});

register(ifWantsToBe, upgrade, tagName);