import { define } from 'be-decorated/DE.js';
import { register } from "be-hive/register.js";
export class BeEventful extends EventTarget {
    async camelToCanonical(pp) {
        const { camelConfig } = pp;
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
    async onCanonical(pp, mold) {
        const { canonicalConfig, self } = pp;
        const { eventListeningScope, subscriptions } = canonicalConfig;
        const { findRealm } = await import('trans-render/lib/findRealm.js');
        const realm = await findRealm(self, eventListeningScope);
        if (realm === null)
            throw 'bE.404';
        for (const subscription of subscriptions) {
            const { on, ofDoQueryInfos } = subscription;
            realm.addEventListener(on, async (e) => {
                const { target } = e;
                if (!(target instanceof Element))
                    return;
                const { affect, targetPath } = canonicalConfig;
                let affected = affect === eventListeningScope ? realm : await findRealm(self, affect);
                if (targetPath !== undefined) {
                    const { homeInOn } = await import('trans-render/lib/homeInOn.js');
                    const { targetResolvedEventName } = canonicalConfig;
                    affected = await homeInOn(affected, targetPath, targetResolvedEventName);
                }
                if (affected === null)
                    throw 'bE.404';
                for (const ofDoQueryInfo of ofDoQueryInfos) {
                    const { of } = ofDoQueryInfo;
                    if (!target.matches(of))
                        continue;
                    const { do: doeth } = ofDoQueryInfo;
                    for (const act of doeth) {
                        for (const key in act) {
                            switch (key) {
                                case 'increment': {
                                    const { increment } = act;
                                    switch (typeof increment) {
                                        case 'string':
                                            if (affected[increment] === undefined) {
                                                affected[increment] = 1;
                                            }
                                            else {
                                                affected[increment]++;
                                            }
                                            break;
                                        case 'object':
                                            throw 'NI';
                                    }
                                }
                            }
                        }
                    }
                }
            }, { capture: true });
        }
        return mold;
    }
}
const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';
const reScopeEvents = /^(?<scope>[\w\\]+)(?<!\\)Events/;
const reLongDoKey = /^(?<eventName>[\w\\]+)(?<!\\)Of(?<camelQry>[\w\\]+)(?<!\\)Do(?<action>(?<!\\)Increment|(?<!\\)Toggle|(?<!\\)Invoke|(?<!\\)Handler)(?<arg>[\w\\]+)/;
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
