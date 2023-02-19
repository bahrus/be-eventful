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
            const rhsAsCCESOn = rhs as CamelConfigEventSubscriptionOn;
            const {of, do: doeth} = rhsAsCCESOn;
            cc.subscriptions.push({
                affect: rootAffect,
                on,
                of: of!,
                do: toHAArr(doeth!),
            });
    }
}