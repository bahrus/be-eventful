import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP} from './types';

export class BeEventFul extends EventTarget implements Actions {

}

const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = '*';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
    config: {
        tagName,
        propDefaults: {
            upgrade,
            ifWantsToBe,
            virtualProps: ['camelConfig', 'canonicalConfig'],
            primaryProp: 'camelConfig',
            primaryPropReq: true,
        }
    },
    complexPropDefaults: {
        controller: BeEventFul,
    }
});

register(ifWantsToBe, upgrade, tagName);