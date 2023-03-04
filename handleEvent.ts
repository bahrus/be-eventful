import {findRealm} from 'trans-render/lib/findRealm.js';
import {CanonicalConfig, PP, CanonicalEventSubscription, KeyOfHASVK} from './types';
import {getQuery} from 'trans-render/lib/specialKeys.js';

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
        let {of, queryInfo} = ofDoQueryInfo;
        if(queryInfo === undefined){
            queryInfo = getQuery(of);
            ofDoQueryInfo.queryInfo = queryInfo;
        }
        if(!target.matches(queryInfo.query)) continue;
        const {do: doeth} = ofDoQueryInfo;
        for(const act of doeth){
            for(const key in act){
                switch(key as KeyOfHASVK){
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
                        continue;
                    }
                    case 'trigger':{
                        const {trigger} = act;
                        const fn = (<any>self)._modExport[trigger as string];
                        fn({target: affected, event: e});
                        continue;
                    }
                    case 'invoke':{
                        const {invoke} = act;
                        (<any>affected)[invoke!](affected, e);
                        continue;
                    }
                    case 'toggle':{
                        const {toggle} = act;
                        switch(typeof toggle){
                            case 'string': {
                                (<any>affected)[toggle] = !(<any>affected)[toggle];
                                break;
                            }
                        }
                        continue;
                    }
                }
                switch(key){
                    case 'set':
                        const {set} = act;
                        const {eq} = set!;
                        const {lhs, rhs, as} = eq;
                        console.log({as});
                        const lhsProp = '.' + lhs.replaceAll(':', '.');
                        const {getVal} = await import('trans-render/lib/getVal.js');
                        
                        let valToShare = await getVal({host: target}, lhsProp);
                        switch(as){
                            case 'number':
                                valToShare = Number(valToShare);
                                break;
                        }
                        console.log({valToShare});
                        switch(typeof rhs){
                            case 'string':
                                const {setProp} = await import('trans-render/lib/setProp.js');
                                await setProp(affected,  rhs as string, valToShare);
                                break;
                        }
                        
                        continue;
                }
                //console.log({key});
            }
            
        }                    
    }
}