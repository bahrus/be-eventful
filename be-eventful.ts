import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP} from './types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        return {};
    }

    onCanonical(pp: PP): void {
        
    }
}
//const isoDateExpression = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const reCamelConfigShortKey = /on(?<eventName>[A-Z][a-z]+)$/;
const reCamelConfigMediumKey = /on(?<eventName>[A-Z][a-z]+)Of(?<camelQry>[A-Z][a-z]+)Do/;
const reCamelConfigLargeKey = /on(?<eventName>[A-Z][a-z]+)Of(?<camelQry>[A-Z][a-z]+)Do(?<action>[A-Z][a-z]+)/;

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