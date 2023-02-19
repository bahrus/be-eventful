import { CamelConfig, CanonicalConfig } from "./types";
import { AffectOptions } from "../trans-render/lib/types";

export async function doOn(camelConfig: CamelConfig, cc: CanonicalConfig, affect: AffectOptions){
    const {on} = camelConfig;
    for(const key in on){
        const rhs = (<any>on)[key];
        const longTest = reLongKey.exec(key);
        if(longTest !== null){
            const {long} = await import('./long.js');
            long(longTest, cc, rhs, affect);
        }
    }
}

const reShortKey = /^(?<eventName>\w+)$/;
const reMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;