export function toHAArr(doeth) {
    switch (typeof doeth) {
        case 'string':
            return [{ handler: doeth }];
        case 'object':
            return Array.isArray(doeth) ? doeth : [doeth];
    }
}
