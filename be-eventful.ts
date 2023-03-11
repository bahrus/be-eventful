import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig, CanonicalConfig, 
    CanonicalEventSubscription, HydrateAction, KeyOfHASVK} from './types';
import {camelQry, Scope} from 'trans-render/lib/types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig, self} = pp;
        if(self instanceof HTMLScriptElement && self.noModule){
            const {doBeHavings} = await import('trans-render/lib/doBeHavings.js');
            import('be-exportable/be-exportable.js');
            await doBeHavings(self, [{
                be: 'exportable',
                waitForResolved: true,
            }]);
        }
        let {affect, target, capture, on, On} = camelConfig!;
        affect = affect || 'previousElementSibling';
        let eventListeningScope: Element | Scope | undefined;
        if(capture  instanceof Element){
            eventListeningScope = capture;
        }else{
            if(capture !== undefined){
                const parsed = reScopeEvents.exec(capture);
                if(parsed !== null){
                    eventListeningScope = (parsed.groups as any as ParsedScopeEvents).scope as Scope;
                }else{
                    throw 'Capture ?? events';
                }
                
            }else{
                eventListeningScope = 'previousElementSibling';
            }
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
                //TODO:  look into sharing common code between clauses
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
                    });
                }else{
                    const parsedLongShareKey = tryParse(onStatement, reLongShareKey) as ParsedLongShareKey;
                    if(parsedLongShareKey !== null){
                        const {eventName, asType, camelQry, destPropName, srcPropName} = parsedLongShareKey;
                        let ofDos = mergedOn[eventName];
                        if(ofDos === undefined){
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
        let realm: EventTarget | null = null;
        if(eventListeningScope instanceof Element){
            realm = eventListeningScope;
        }else{
            const {findRealm} = await import('trans-render/lib/findRealm.js');
            realm = await findRealm(self, eventListeningScope);
        }
        
        if(realm === null) throw 'bE.404'; 
        for(const subscription of subscriptions){
            const {on, ofDoQueryInfos} = subscription;
            const abortController = new AbortController();
            this.#abortControllers.push(abortController);
            realm.addEventListener(on, async e => {
                const {handleEvent} = await import('./handleEvent.js');
                await handleEvent(e, pp, subscription, realm!);
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
const upgrade = 'script,template';

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

interface ParsedLongShareKey {
    eventName: string,
    camelQry: camelQry,
    srcPropName: string,
    asType: 'number' | 'date',
    destPropName: string,
}

const reLongShareKey = /^(?<eventName>[\w\\]+)(?<!\\)Of(?<camelQry>[\w\\]+)(?<!\\)Share(?<srcPropName>[\w\\\:]+)As(?<asType>(?<!\\)Number|(?<!\\)Date)(?<!\\)To(?<destPropName>[\w\\\:]+)/;

define<Proxy & BeDecoratedProps<Proxy, Actions, CamelConfig>, Actions>({
    config:{
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            forceVisible: ['script', 'template'],
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