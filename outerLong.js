import { lc } from './lc.js';
export function outerLong(outerLongTest, cc, rhs, rootAffect) {
    const { groups } = outerLongTest;
    const lcGroup = {};
    for (const k in groups) {
        lcGroup[k] = lc(groups[k]);
    }
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
