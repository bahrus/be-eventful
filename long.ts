import {toLcGrp} from './lc.js';
import {HydrateAction, Match, CanonicalConfig} from './types';
import {AffectOptions} from '../trans-render/lib/types';

export function long(longTest: any, cc: CanonicalConfig, rhs: any, rootAffect: AffectOptions){
    const {groups} = longTest;
    const lcGroup = toLcGrp(groups);
    const {action, camelQry, eventName} = lcGroup as Match;
    let act: HydrateAction = {};
    switch(action){
        case 'inc':
            act.inc = rhs as string
            break;
    }
    cc.subscriptions.push({
        affect: rootAffect,
        on: eventName!,
        of: camelQry!,
        do: [act]
    });
}