import { lc, arr } from 'be-decorated/cpu.js';
import { toHAArr } from './toHAArr.js';
export function short(shortTest, cc, rhs, rootAffects) {
    const on = lc(shortTest.groups.eventName);
    switch (typeof rhs) {
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsCCESOnArr = arr(rhs);
            for (const rhsAsCCESOn of rhsAsCCESOnArr) {
                const { of, do: doeth, affect } = rhsAsCCESOn;
                cc.subscriptions.push({
                    affect: arr(affect) || rootAffects,
                    on,
                    of: of,
                    do: toHAArr(doeth),
                });
            }
            break;
    }
}
