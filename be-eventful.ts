import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {register} from "be-hive/register.js";
import {Actions, PP, Proxy, PPP, Match, CanonicalConfig, HydrateAction} from './types';
import {AffectOptions} from 'trans-render/lib/types';

export class BeEventful extends EventTarget implements Actions {
    async camelToCanonical(pp: PP): Promise<PPP> {
        const {camelConfig} = pp;
        const {affect} = camelConfig!;
        const rootAffect : AffectOptions = affect === undefined ? 'host' : affect;
        const cc: CanonicalConfig = {
            subscriptions: [],
            handlers: {},
        };
        for(const key in camelConfig!){
            const test = reCamelConfigLongKey.exec(key) as Match | null;
            if(test !== null){
                const {groups} = <any>test;
                const lcGroup = {} as any;
                for(const k in groups){
                    lcGroup[k] = lc(groups[k]);
                }
                console.log({lcGroup});
                const {action, camelQry, eventName} = lcGroup as Match;
                
                let act: HydrateAction = {};
                switch(action){
                    case 'inc':
                        act.inc = (<any>camelConfig)[key] as any as string
                        break;
                }
                cc.subscriptions.push({
                    affect: rootAffect,
                    on: eventName!,
                    of: camelQry!,
                    do: [act]
                });
            }
            console.log({key, test});
        }
        console.log({cc});
        return {
            canonicalConfig: cc,
        };
    }

    onCanonical(pp: PP): void {
        
    }

}
//const isoDateExpression = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
const reCamelConfigShortKey = /^on(?<eventName>\w+)$/;
const reCamelConfigMediumKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigLongKey = /^on(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;

const reCamelConfigEventSubscriptShortKey = /^(?<eventName>\w+)$/;
const reCamelConfigEventSubscriptMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reCamelConfigEventSubscriptLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;

function lc(s: string){
    return s[0].toLowerCase() + s.substring(1);
}

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