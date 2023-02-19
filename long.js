import { toLcGrp } from './lc.js';
export function long(outerLongTest, cc, rhs, rootAffect) {
    const { groups } = outerLongTest;
    const lcGroup = toLcGrp(groups);
    const { action, camelQry, eventName } = lcGroup;
    let act = {};
    switch (action) {
        case 'inc':
            act.inc = rhs;
            break;
    }
    cc.subscriptions.push({
        affect: rootAffect,
        on: eventName,
        of: camelQry,
        do: [act]
    });
}
