import {toLcGrp} from './cpu.js';
import {HydrateAction, Match, CanonicalConfig} from './types';
import {AffectOptions} from '../trans-render/lib/types';

export function medium(mediumTest: any, cc: CanonicalConfig, rhs: any, rootAffect: AffectOptions[]){
    const {groups} = mediumTest;
    const lcGroup = toLcGrp(groups);
    const {eventName, camelQry} = lcGroup;
    switch(typeof rhs){
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsHydrateActionARR = (Array.isArray(rhs) ? rhs : [rhs]) as HydrateAction[];
            cc.subscriptions.push({
                affect: rootAffect,
                on: eventName,
                of: camelQry,
                do: rhsAsHydrateActionARR
            });
            break;

    }

}