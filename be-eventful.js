import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeEventful extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
        const { affect } = camelConfig;
        const rootAffect = affect === undefined ? 'host' : affect;
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
                long(outerLongTest, cc, rhs, rootAffect);
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
                        short(outerShortTest, cc, rhs, rootAffect);
                    }
                }
            }
        }
        if (camelConfig.on !== undefined) {
            const { doOn } = await import('./doOn.js');
            await doOn(camelConfig, cc, rootAffect);
        }
        //console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }
    async onCanonical(pp, mold) {
        const { canonicalConfig, self, camelConfig } = pp;
        const { subscriptions } = canonicalConfig;
        const { eventfulScope } = camelConfig;
        const sc = eventfulScope || 'p';
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
        const { canonicalConfig } = pp;
        const { subscriptions } = canonicalConfig;
        const { target } = e;
        if (target instanceof Element) {
            for (const subscription of subscriptions) {
                const { of } = subscription;
                let { queryInfo } = subscription;
                if (queryInfo === undefined) {
                    const { getQuery } = await import('trans-render/lib/specialKeys.js');
                    queryInfo = getQuery(of);
                    subscription.queryInfo = queryInfo;
                }
                const { query } = queryInfo;
                if (target.matches(query)) {
                    const { do: doeth, affect } = subscription;
                    const { self } = pp;
                    //console.log({doeth, affect, self});
                    //debugger;
                    const { CtxNav } = await import('trans-render/lib/CtxNav.js');
                    const cn = new CtxNav(self);
                    const path = affect[0] === '.' ? affect : '.' + affect;
                    const affectObj = await cn.nav(path);
                    console.log({ affectObj });
                    for (const act of doeth) {
                        const { inc } = act;
                        if (inc !== undefined) {
                            switch (typeof inc) {
                                case 'string':
                                    if (affectObj[inc] === undefined) {
                                        affectObj[inc] = 1;
                                    }
                                    else {
                                        affectObj[inc]++;
                                    }
                                    console.log({ affectObj });
                                    //affectObj[inc] = affectObj[inc] === undefined ? 1 : affectObj[inc]++;
                                    break;
                                case 'object':
                                    throw 'NI';
                            }
                        }
                    }
                }
            }
        }
    }
}
const reShortKey = /^on(?<eventName>\w+)\$/;
const reMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Inc|Toggle|Invoke|Handler)/;
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
