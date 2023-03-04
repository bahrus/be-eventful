import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig, CanonicalConfig, HydrateAction} from './types';
import {Scope} from 'trans-render/lib/types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        let {affect, target, capture} = camelConfig!;
        affect = affect || 'parent';
        let eventListeningScope: Scope | undefined;
        if(capture !== undefined){
            const parsed = reScopeEvents.exec(capture);
            if(parsed !== null){
                eventListeningScope = (parsed.groups as any as parsedScopeEvents).scope as Scope;
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
        const canonicalConfig: CanonicalConfig = {
            eventListeningScope,
            targetResolvedEventName,
            targetPath,
            subscriptions: []
        };
        return {
            canonicalConfig
        } as PPP;
    }

    async onCanonical(pp: PP, mold: PPP) {
        return mold;
    }
}

const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';

type scope = string;
interface parsedScopeEvents {
    scope: string;
}
const reScopeEvents = /^(?<scope>[\w\\]+)(?<!\\)Events/;

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