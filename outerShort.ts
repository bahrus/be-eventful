import {lc} from './lc.js';
import {toHAArr} from './toHAArr.js';
import {HydrateAction, Match, CanonicalConfig, CamelConfigEventSubscriptionOn} from './types';
import {AffectOptions} from '../trans-render/lib/types';

export function outerShort(outerShortTest: any, cc: CanonicalConfig, rhs: any, rootAffect: AffectOptions){
    const on = lc(outerShortTest.groups.eventName);
    switch(typeof rhs){
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsCCESOnArr = (Array.isArray(rhs) ? rhs : [rhs]) as CamelConfigEventSubscriptionOn[];
            for(const rhsAsCCESOn of rhsAsCCESOnArr){
                const {of, do: doeth, affect} = rhsAsCCESOn;
                cc.subscriptions.push({
                    affect: affect || rootAffect,
                    on,
                    of: of!,
                    do: toHAArr(doeth!),
                });
            }

    }
}