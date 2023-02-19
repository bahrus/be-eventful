import { toLcGrp } from './lc.js';
export function medium(mediumTest, cc, rhs, rootAffect) {
    const { groups } = mediumTest;
    const lcGroup = toLcGrp(groups);
    const { eventName, camelQry } = lcGroup;
    switch (typeof rhs) {
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsHydrateActionARR = (Array.isArray(rhs) ? rhs : [rhs]);
            cc.subscriptions.push({
                affect: rootAffect,
                on: eventName,
                of: camelQry,
                do: rhsAsHydrateActionARR
            });
            break;
    }
}
