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
export function arr(inp) {
    return inp === undefined ? []
        : Array.isArray(inp) ? inp : [inp];
}
export function append(inp, camelStrings, regExp) {
    const regExps = arr(regExp);
    for (const camelString of camelStrings) {
        const toDot = camelString.replaceAll(':', '.');
        //TODO:  regexps
        inp.push(toDot);
    }
}
