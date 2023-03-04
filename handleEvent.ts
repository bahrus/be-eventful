import {findRealm} from 'trans-render/lib/findRealm.js';
import {CanonicalConfig, PP, CanonicalEventSubscription} from './types';

export async function handleEvent(e: Event, pp: PP, subscription: CanonicalEventSubscription,realm: EventTarget){
    const {target} = e;
    if(!(target instanceof Element)) return;
    const {self, canonicalConfig} = pp;
    const {affect,  targetPath, eventListeningScope} = canonicalConfig!;
    
    let affected = affect === eventListeningScope ? realm : await findRealm(self, affect) as any;
    if(targetPath !== undefined){
        const {homeInOn} = await import('trans-render/lib/homeInOn.js');
        const {targetResolvedEventName} = canonicalConfig!;
        affected = await homeInOn(affected as any as Element, targetPath, targetResolvedEventName);
    }
    if(affected === null) throw 'bE.404';
    const {ofDoQueryInfos} = subscription;
    for(const ofDoQueryInfo of ofDoQueryInfos){
        const {of} = ofDoQueryInfo;
        if(!target.matches(of)) continue;
        const {do: doeth} = ofDoQueryInfo;
        for(const act of doeth){
            for(const key in act){
                switch(key){
                    case 'increment':{
                        const {increment} = act;
                        switch(typeof increment){
                            case 'string':
                                if(affected[increment] === undefined){
                                    affected[increment] = 1;
                                }else{
                                    affected[increment]++;
                                }
                                break;
                            case 'object':
                                throw 'NI';
                        }
                    }
                }
            }
            
        }                    
    }
}