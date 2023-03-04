import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeEventful extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig, self } = pp;
        if (self.noModule) {
            const { doBeHavings } = await import('trans-render/lib/doBeHavings.js');
            import('be-exportable/be-exportable.js');
            await doBeHavings(self, [{
                    be: 'exportable',
                    waitForResolved: true,
                }]);
        }
        let { affect, target, capture, on, On } = camelConfig;
        affect = affect || 'parent';
        let eventListeningScope;
        if (capture !== undefined) {
            const parsed = reScopeEvents.exec(capture);
            if (parsed !== null) {
                eventListeningScope = parsed.groups.scope;
            }
            else {
                throw 'Capture ?? events';
            }
        }
        else {
            eventListeningScope = 'parent';
        }
        let targetResolvedEventName = undefined;
        let targetPath = undefined;
        if (target !== undefined) {
            const { beSplit } = await import('be-decorated/cpu.js');
            const split = await beSplit(target);
            if (split !== undefined) {
                targetResolvedEventName = split.eventName;
                targetPath = split.path;
            }
        }
        const mergedOn = on || {};
        if (On !== undefined) {
            const { tryParse } = await import('be-decorated/cpu.js');
            for (const onStatement of On) {
                const parsedLongDoKey = tryParse(onStatement, reLongDoKey);
                //TODO:  look into sharing common code between clauses
                if (parsedLongDoKey !== null) {
                    const { eventName, action, arg, camelQry } = parsedLongDoKey;
                    let ofDos = mergedOn[eventName];
                    if (ofDos === undefined) {
                        ofDos = [];
                        mergedOn[eventName] = ofDos;
                    }
                    ofDos.push({
                        of: camelQry,
                        do: [{
                                [action]: arg
                            }]
                    });
                }
                else {
                    const parsedLongShareKey = tryParse(onStatement, reLongShareKey);
                    if (parsedLongShareKey !== null) {
                        const { eventName, asType, camelQry, destPropName, srcPropName } = parsedLongShareKey;
                        let ofDos = mergedOn[eventName];
                        if (ofDos === undefined) {
                            ofDos = [];
                            mergedOn[eventName] = ofDos;
                        }
                        ofDos.push({
                            of: camelQry,
                            do: [
                                {
                                    set: {
                                        eq: {
                                            lhs: srcPropName,
                                            rhs: destPropName,
                                            as: asType,
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        }
        const subscriptions = Object.keys(mergedOn).map(onKey => ({
            on: onKey,
            ofDoQueryInfos: mergedOn[onKey]
        }));
        const canonicalConfig = {
            affect,
            eventListeningScope,
            targetResolvedEventName,
            targetPath,
            subscriptions
        };
        return {
            canonicalConfig
        };
    }
    #abortControllers = [];
    async onCanonical(pp, mold) {
        const { canonicalConfig, self } = pp;
        const { eventListeningScope, subscriptions } = canonicalConfig;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realm = await findRealm(self, eventListeningScope);
        if (realm === null)
            throw 'bE.404';
        for (const subscription of subscriptions) {
            const { on, ofDoQueryInfos } = subscription;
            const abortController = new AbortController();
            this.#abortControllers.push(abortController);
            realm.addEventListener(on, async (e) => {
                const { handleEvent } = await import('./handleEvent.js');
                await handleEvent(e, pp, subscription, realm);
            }, { capture: true, signal: abortController.signal });
        }
        return mold;
    }
    finale() {
        for (const ac of this.#abortControllers) {
            ac.abort();
        }
        this.#abortControllers = [];
    }
}
const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';
const reScopeEvents = /^(?<scope>[\w\\]+)(?<!\\)Events/;
const reLongDoKey = /^(?<eventName>[\w\\]+)(?<!\\)Of(?<camelQry>[\w\\]+)(?<!\\)Do(?<action>(?<!\\)Increment|(?<!\\)Toggle|(?<!\\)Invoke|(?<!\\)Trigger)(?<arg>[\w\\]+)/;
const reLongShareKey = /^(?<eventName>[\w\\]+)(?<!\\)Of(?<camelQry>[\w\\]+)(?<!\\)Share(?<srcPropName>[\w\\\:]+)As(?<asType>(?<!\\)Number|(?<!\\)Date)(?<!\\)To(?<destPropName>[\w\\\:]+)/;
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
            finale: 'finale',
            camelizeOptions: {
                simpleSets: ['Capture', 'Affect', 'Target']
            },
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
