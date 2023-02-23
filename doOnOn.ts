import { CamelConfig, CanonicalConfig, LongMatch, HydrateAction } from "./types";
import { AffectOptions } from "trans-render/lib/types";
import {toLcGrp} from './cpu.js';

export function doOnOn(camelConfig: CamelConfig, cc: CanonicalConfig, affect: AffectOptions[]){
    const {On} = camelConfig;
    for(const onExp of On!){
        const test = reLongKey.exec(onExp);
        if(test === null) throw 'NI';
        const lcGroup = toLcGrp(test.groups) as LongMatch;
        const {action, camelQry, eventName, to} = lcGroup;
        let act: HydrateAction = {};
        switch(action){
            case 'inc':
                act.inc = to;
                break;
        }
        cc.subscriptions.push({
            affect,
            on: eventName!,
            of: camelQry!,
            do: [act]
        });
    }
}

const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>Inc|Toggle|Invoke|Handler)(?<to>\w+)/;