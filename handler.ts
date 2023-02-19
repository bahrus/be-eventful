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
                const cn = new CtxNav(self);
                const path = affect[0] === '.' ? affect : '.' + affect;
                const affectObj = await cn.nav(path);
                console.log({affectObj});
                for(const act of doeth){
                    for(const key in act){
                        switch(key){
                            case 'inc':{
                                const {inc} = act;
                                switch(typeof inc){
                                    case 'string':
                                        if(affectObj[inc] === undefined){
                                            affectObj[inc] = 1;
                                        }else{
                                            affectObj[inc]++;
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