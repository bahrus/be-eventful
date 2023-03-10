import { toLcGrp } from 'be-decorated/cpu.js';
export function doOnOn(camelConfig, cc, affect) {
    const { On } = camelConfig;
    for (const onExp of On) {
        const test = reLongKey.exec(onExp);
        if (test === null)
            throw 'NI';
        const lcGroup = toLcGrp(test.groups);
        const { action, camelQry, eventName, to } = lcGroup;
        let act = {};
        switch (action) {
            case 'inc':
                act.increment = to;
                break;
        }
        cc.subscriptions.push({
            affect,
            on: eventName,
            of: camelQry,
            do: [act]
        });
    }
}
const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Increment|Toggle|Invoke|Handler)(?<to>\w+)/;
