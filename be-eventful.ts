import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig, CanonicalConfig, 
    CanonicalEventSubscription, HydrateAction, KeyOfHASVK} from './types';
import {camelQry, Scope} from 'trans-render/lib/types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig, self} = pp;
        if(self.noModule){
            const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
            import('be-exportable/be-exportable.js');
            await doBeHavings(self, [{
                be: 'exportable',
                waitForResolved: true,
            }]);
        }
        let {affect, target, capture, on, On} = camelConfig!;
        affect = affect || 'parent';
        let eventListeningScope: Scope | undefined;
        if(capture !== undefined){
            const parsed = reScopeEvents.exec(capture);
            if(parsed !== null){
                eventListeningScope = (parsed.groups as any as ParsedScopeEvents).scope as Scope;
            }else{
                throw 'Capture ?? events';
            }
            
        }else{
            eventListeningScope = 'parent'
        }
        let targetResolvedEventName: string | undefined = undefined;
        let targetPath: string | undefined = undefined;
        if(target !== undefined){
            const {beSplit} = await import('be-decorated/cpu.js');
            const split = await beSplit(target);
            if(split !== undefined){
                targetResolvedEventName = split.eventName;
                targetPath = split.path;
            }
        }
        const mergedOn = on || {};
        if(On !== undefined){
            const {tryParse} = await import('be-decorated/cpu.js');
            for(const onStatement of On){
                const parsedLongDoKey = tryParse(onStatement, reLongDoKey) as ParsedLongDoKey;
                if(parsedLongDoKey !== null){
                    const {eventName, action, arg, camelQry} = parsedLongDoKey;
                    let ofDos = mergedOn[eventName];
                    if(ofDos === undefined){
                        ofDos = [];
                        mergedOn[eventName] = ofDos;
                    }
                    ofDos.push({
                        of: camelQry,
                        do: [{
                            [action]: arg
                        }]
                    })
                }
            }
        }
        const subscriptions = Object.keys(mergedOn).map(onKey => ({
            on: onKey,
            ofDoQueryInfos: mergedOn[onKey]
        }) as CanonicalEventSubscription);
        const canonicalConfig: CanonicalConfig = {
            affect,
            eventListeningScope,
            targetResolvedEventName,
            targetPath,
            subscriptions
        };

        return {
            canonicalConfig
        } as PPP;
    }

    #abortControllers: AbortController[] = [];

    async onCanonical(pp: PP, mold: PPP) {
        const {canonicalConfig, self} = pp;
        const {eventListeningScope, subscriptions} = canonicalConfig!;
        const {findRealm} = await import('trans-render/lib/findRealm.js');
        const realm = await findRealm(self, eventListeningScope);
        if(realm === null) throw 'bE.404'; 
        for(const subscription of subscriptions){
            const {on, ofDoQueryInfos} = subscription;
            const abortController = new AbortController();
            this.#abortControllers.push(abortController);
            realm.addEventListener(on, async e => {
                const {handleEvent} = await import('./handleEvent.js');
                await handleEvent(e, pp, subscription, realm);
            }, {capture: true, signal: abortController.signal});
        }       
        return mold;
    }

    finale(): void {
        for(const ac of this.#abortControllers){
            ac.abort();
        }
        this.#abortControllers = [];
    }
}

const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';

type scope = string;
interface ParsedScopeEvents {
    scope: string;
}
const reScopeEvents = /^(?<scope>[\w\\]+)(?<!\\)Events/;

interface ParsedLongDoKey {
    eventName: string,
    camelQry: camelQry,
    action: KeyOfHASVK,
    arg: string,
}
const reLongDoKey = /^(?<eventName>[\w\\]+)(?<!\\)Of(?<camelQry>[\w\\]+)(?<!\\)Do(?<action>(?<!\\)Increment|(?<!\\)Toggle|(?<!\\)Invoke|(?<!\\)Trigger)(?<arg>[\w\\]+)/;

define<Proxy & BeDecoratedProps<Proxy, Actions, CamelConfig>, Actions>({
    config:{
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