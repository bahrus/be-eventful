import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, CamelConfig, CanonicalConfig, HydrateAction} from './types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        return {}
    }

    async onCanonical(pp: PP, mold: PPP) {
        return mold;
    }
}

const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';

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