import { toLcGrp } from 'be-decorated/cpu.js';
export function long(longTest, cc, rhs, rootAffects) {
    const { groups } = longTest;
    const lcGroup = toLcGrp(groups);
    const { action, camelQry, eventName } = lcGroup;
    let act = {};
    switch (action) {
        case 'increment':
            act.increment = rhs;
            break;
    }
    cc.subscriptions.push({
        affect: rootAffects,
        on: eventName,
        of: camelQry,
        do: [act]
    });
}
