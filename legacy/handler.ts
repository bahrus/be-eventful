import {PP} from './types';
export async function handler(pp: PP, e: Event){
    const {canonicalConfig} = pp;
    const {subscriptions} = canonicalConfig;
    const {target}  = e;
    if(target instanceof Element){
        for(const subscription of subscriptions){
            const {of} = subscription;
            let {queryInfo} = subscription;
            if(queryInfo === undefined){
                const {getQuery} = await import('trans-render/lib/specialKeys.js');
                queryInfo = getQuery(of);
                subscription.queryInfo = queryInfo;
            }
            const {query} = queryInfo;
            if(target.matches(query)){
                const {do: doeth, affect} = subscription;
                const {self} = pp;
                const {CtxNav} = await import('trans-render/lib/CtxNav.js');
                for(const singleAffect of affect){
                    const cn = new CtxNav(self);
                    const path = singleAffect[0] === '.' ? singleAffect : '.' + singleAffect;
                    const affectObj = await cn.nav(path);
                    for(const act of doeth){
                        for(const key in act){
                            switch(key){
                                case 'increment':{
                                    const {increment} = act;
                                    switch(typeof increment){
                                        case 'string':
                                            if(affectObj[increment] === undefined){
                                                affectObj[increment] = 1;
                                            }else{
                                                affectObj[increment]++;
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

        }
        
    }
}