export function lc(s: string){
    return s[0].toLowerCase() + s.substring(1);
}

export function toLcGrp(groups: any){
    const lcGroup = {} as any;
    for(const k in groups){
        lcGroup[k] = lc(groups[k]);
    }
    return lcGroup;
}
