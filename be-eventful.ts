import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, Match, CanonicalConfig, HydrateAction, CamelConfigEventSubscriptionOn} from './types';
import {AffectOptions, Scope} from 'trans-render/lib/types';

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
            //console.log({key, test: outerLongTest});
            if(outerLongTest !== null){
                const {long} = await import('./long.js');
                long(outerLongTest, cc, rhs, rootAffect);
            }else{
                const outerMediumTest = reMediumKey.exec(key);
                if(outerMediumTest !== null){
                    throw 'NI';
                }else{
                    const outerShortTest = reShortKey.exec(key);
                    if(outerShortTest !== null){
                        const {short} = await import('./short.js');
                        short(outerShortTest, cc, rhs, rootAffect);

                    }
                }
            }


        }
        if(camelConfig!.on !== undefined){
            const {doOn} = await import('./doOn.js');
            await doOn(camelConfig!, cc, rootAffect);
        }
        //console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }

    async onCanonical(pp: PP, mold: PPP) {
        console.log('onCanonical');
        const {canonicalConfig, self, camelConfig} = pp;
        const {subscriptions} = canonicalConfig!;
        const {eventfulScope} = camelConfig!;
        
        const sc: Scope = eventfulScope || 'p';
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
        const {canonicalConfig} = pp;
        const {subscriptions} = canonicalConfig;
        const {target}  = e;
        if(target instanceof Element){
            for(const subscription of subscriptions){
                const {of} = subscription;
                let {queryInfo} = subscription;
                if(queryInfo === undefined){
                    const {getQuery} = await import('trans-render/lib/specialKeys.js');
                    queryInfo = getQuery(of);
                    subscription.queryInfo = queryInfo;
                }
                const {query} = queryInfo;
                if(target.matches(query)){
                    console.log('match!')
                }
    
            }
            //const {CtxNav} = await import('trans-render/lib/CtxNav.js');
        }

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