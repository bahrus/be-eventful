import { findRealm } from 'trans-render/lib/findRealm.js';
import { getQuery } from 'trans-render/lib/specialKeys.js';
export async function handleEvent(e, pp, subscription, realm) {
    const { target } = e;
    if (!(target instanceof Element))
        return;
    const { self, canonicalConfig } = pp;
    const { affect, targetPath, eventListeningScope } = canonicalConfig;
    let affected = affect === eventListeningScope ? realm : await findRealm(self, affect);
    if (targetPath !== undefined) {
        const { homeInOn } = await import('trans-render/lib/homeInOn.js');
        const { targetResolvedEventName } = canonicalConfig;
        affected = await homeInOn(affected, targetPath, targetResolvedEventName);
    }
    if (affected === null)
        throw 'bE.404';
    const { ofDoQueryInfos } = subscription;
    for (const ofDoQueryInfo of ofDoQueryInfos) {
        let { of, queryInfo } = ofDoQueryInfo;
        if (queryInfo === undefined) {
            queryInfo = getQuery(of);
            ofDoQueryInfo.queryInfo = queryInfo;
        }
        if (!target.matches(queryInfo.query))
            continue;
        const { do: doeth } = ofDoQueryInfo;
        for (const act of doeth) {
            for (const key in act) {
                switch (key) {
                    case 'increment': {
                        const { increment } = act;
                        switch (typeof increment) {
                            case 'string':
                                if (affected[increment] === undefined) {
                                    affected[increment] = 1;
                                }
                                else {
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
