import {HAPipeHAs, HydrateAction} from './types';
export function toHAArr(doeth: HAPipeHAs): HydrateAction[] {
    switch(typeof doeth){
        case 'string':
            return [{handler: doeth}];
        case 'object':
            return Array.isArray(doeth) ? doeth : [doeth];
    }
    
}