import {lc} from './lc.js';
import {toHAArr} from './toHAArr.js';
import {HydrateAction, Match, CanonicalConfig, CamelConfigEventSubscriptionOn} from './types';
import {AffectOptions} from 'trans-render/lib/types';
import {arr} from './lc.js';

export function short(shortTest: any, cc: CanonicalConfig, rhs: any, rootAffects: AffectOptions[]){
    const on = lc(shortTest.groups.eventName);
    switch(typeof rhs){
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsCCESOnArr = arr(rhs) as CamelConfigEventSubscriptionOn[];
            for(const rhsAsCCESOn of rhsAsCCESOnArr){
                const {of, do: doeth, affect} = rhsAsCCESOn;
                cc.subscriptions.push({
                    affect: arr(affect) || rootAffects,
                    on,
                    of: of!,
                    do: toHAArr(doeth!),
                });
            }
            break;

    }
}