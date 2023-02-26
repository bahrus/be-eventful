import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeEventful extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
        const { On, on, Affect, affect, Set } = camelConfig;
        const { arr, append } = await import('be-decorated/cpu.js');
        const rootAffects = arr(affect);
        if (Set !== undefined) {
            const setRules = [];
            append(setRules, Set, reSet);
            for (const rule of setRules) {
                camelConfig[rule.lhs] = rule.rhs;
            }
        }
        if (Affect !== undefined) {
            append(rootAffects, Affect);
        }
        const cc = {
            subscriptions: [],
            handlers: {},
        };
        for (const key in camelConfig) {
            const rhs = camelConfig[key];
            const outerLongTest = (reLongKey.exec(key));
            //console.log({key, test: outerLongTest});
            if (outerLongTest !== null) {
                const { long } = await import('./long.js');
                long(outerLongTest, cc, rhs, rootAffects);
            }
            else {
                const outerMediumTest = reMediumKey.exec(key);
                if (outerMediumTest !== null) {
                    throw 'NI';
                }
                else {
                    const outerShortTest = reShortKey.exec(key);
                    if (outerShortTest !== null) {
                        const { short } = await import('./short.js');
                        short(outerShortTest, cc, rhs, rootAffects);
                    }
                }
            }
        }
        if (On !== undefined) {
            const { doOnOn } = await import('./doOnOn.js');
            doOnOn(camelConfig, cc, rootAffects);
        }
        if (on !== undefined) {
            const { doOn } = await import('./doOn.js');
            await doOn(camelConfig, cc, rootAffects);
        }
        //console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }
    async onCanonical(pp, mold) {
        const { canonicalConfig, self, camelConfig } = pp;
        const { subscriptions } = canonicalConfig;
        const { eventListeningScope: eventfulScope } = camelConfig;
        const sc = eventfulScope || 'porn';
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const target = await findRealm(self, sc);
        if (target === null)
            throw '404';
        const eventNamesArr = subscriptions.map(s => s.on);
        const uniq = new Set(eventNamesArr);
        for (const key of uniq.keys()) {
            target.addEventListener(key, e => {
                this.handler(pp, e);
            });
        }
        return mold;
    }
    async handler(pp, e) {
        const { handler } = await import('./handler.js');
        handler(pp, e);
    }
}
const reSet = /^(?<lhs>\w+)To(?<rhs>\w+)/;
const reShortKey = /^on(?<eventName>\w+)\$/;
const reMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Increment|Toggle|Invoke|Handler)/;
const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';
define({
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
