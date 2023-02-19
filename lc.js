export function lc(s) {
    return s[0].toLowerCase() + s.substring(1);
}
export function toLcGrp(groups) {
    const lcGroup = {};
    for (const k in groups) {
        lcGroup[k] = lc(groups[k]);
    }
    return lcGroup;
}
