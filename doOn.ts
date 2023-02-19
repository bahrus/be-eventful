import { CamelConfig } from "./types";

export function doOn(camelConfig: CamelConfig){
    const {on} = camelConfig;

}

const reShortKey = /^(?<eventName>\w+)$/;
const reMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;