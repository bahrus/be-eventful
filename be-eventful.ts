import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP} from './types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        for(const key in camelConfig!){
            const test = reCamelConfigLongKey.exec(key);
            console.log({key, test});
        }
        return {};
    }

    onCanonical(pp: PP): void {
        
    }
}
//const isoDateExpression = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const reCamelConfigShortKey = /^on(?<eventName>[A-Z][a-z]+)$/;
const reCamelConfigMediumKey = /^on(?<eventName>[A-Z][a-z]+)Of(?<camelQry>[A-Z][a-z]+)Do/;
const reCamelConfigLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;

const reCamelConfigEventSubscriptShortKey = /^(?<eventName>[A-Z][a-z]+)$/;
const reCamelConfigEventSubscriptMediumKey = /^(?<eventName>[A-Z][a-z]+)Of(?<camelQry>[A-Z][a-z]+)Do/;
const reCamelConfigEventSubscriptLongKey = /^(?<eventName>[A-Z][a-z]+)Of(?<camelQry>[A-Z][a-z]+)Do(?<action>[A-Z][a-z]+)/;

const tagName = 'be-eventful';
const ifWantsToBe = 'eventful';
const upgrade = 'script';

define<Proxy & BeDecoratedProps<Proxy, Actions>, Actions>({
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