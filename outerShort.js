import { lc } from './lc.js';
import { toHAArr } from './toHAArr.js';
export function outerShort(outerShortTest, cc, rhs, rootAffect) {
    const on = lc(outerShortTest.groups.eventName);
    switch (typeof rhs) {
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsCCESOnArr = (Array.isArray(rhs) ? rhs : [rhs]);
            for (const rhsAsCCESOn of rhsAsCCESOnArr) {
                const { of, do: doeth, affect } = rhsAsCCESOn;
                cc.subscriptions.push({
                    affect: affect || rootAffect,
                    on,
                    of: of,
                    do: toHAArr(doeth),
                });
            }
    }
}
