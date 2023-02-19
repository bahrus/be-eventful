import { lc } from './lc.js';
import { toHAArr } from './toHAArr.js';
export function outerShort(outerShortTest, cc, rhs, rootAffect) {
    const on = lc(outerShortTest.groups.eventName);
    switch (typeof rhs) {
        case 'string':
            throw 'NI';
        case 'object':
            const rhsAsCCESOn = rhs;
            const { of, do: doeth } = rhsAsCCESOn;
            cc.subscriptions.push({
                affect: rootAffect,
                on,
                of: of,
                do: toHAArr(doeth),
            });
    }
}
