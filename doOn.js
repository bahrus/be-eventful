export function doOn(camelConfig) {
    const { on } = camelConfig;
}
const reShortKey = /^(?<eventName>\w+)$/;
const reMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;
