export async function doOn(camelConfig, cc, affect) {
    const { on } = camelConfig;
    for (const key in on) {
        const rhs = on[key];
        const longTest = reLongKey.exec(key);
        if (longTest !== null) {
            const { long } = await import('./long.js');
            long(longTest, cc, rhs, affect);
        }
    }
}
const reShortKey = /^(?<eventName>\w+)$/;
const reMediumKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do/;
const reLongKey = /^(?<eventName>\w+)Of(?<camelQry>\w+)Do(?<action>\w+)/;
