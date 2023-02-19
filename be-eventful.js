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
            const test = reCamelConfigLongKey.exec(key);
            if (test !== null) {
                const { action, camelQry, eventName } = test.groups;
                debugger;
                let act = {};
                switch (action) {
                    case 'inc':
                        act.inc = camelConfig[key];
                        break;
                }
                cc.subscriptions.push({
                    affect: rootAffect,
                    on: eventName,
                    of: camelQry,
                    do: [act]
                });
            }
            console.log({ key, test });
        }
        console.log({ cc });
        return {
            canonicalConfig: cc,
        };
    }
    onCanonical(pp) {
    }
}
//const isoDateExpression = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const reCamelConfigShortKey = /^on(?<eventName>\w+)$/;
const reCamelConfigMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;
const reCamelConfigEventSubscriptShortKey = /^(?<eventName>\w+)$/;
const reCamelConfigEventSubscriptMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigEventSubscriptLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;
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
            camelToCanonical: 'camelConfig'
        }
    },
    complexPropDefaults: {
        controller: BeEventful,
    }
});
register(ifWantsToBe, upgrade, tagName);
