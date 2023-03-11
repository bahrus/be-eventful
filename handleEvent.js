import { findRealm } from 'trans-render/lib/findRealm.js';
import { getQuery } from 'trans-render/lib/specialKeys.js';
export async function handleEvent(e, pp, subscription, realm) {
    const { target } = e;
    if (!(target instanceof Element))
        return;
    const { self, canonicalConfig } = pp;
    const { affect, targetPath, eventListeningScope } = canonicalConfig;
    let affected = (affect instanceof Element) ? affect : affect === eventListeningScope ? realm : await findRealm(self, affect);
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
                        continue;
                    }
                    case 'trigger': {
                        if (!(self instanceof HTMLScriptElement))
                            throw 'bE.hE.NI';
                        const { trigger } = act;
                        const fn = self._modExport[trigger];
                        fn({ target: affected, event: e });
                        continue;
                    }
                    case 'invoke': {
                        const { invoke } = act;
                        affected[invoke](affected, e);
                        continue;
                    }
                    case 'toggle': {
                        const { toggle } = act;
                        switch (typeof toggle) {
                            case 'string': {
                                affected[toggle] = !affected[toggle];
                                break;
                            }
                        }
                        continue;
                    }
                }
                switch (key) {
                    case 'set':
                        const { set } = act;
                        const { eq } = set;
                        const { lhs, rhs, as } = eq;
                        const lhsProp = '.' + lhs.replaceAll(':', '.');
                        const { getVal } = await import('trans-render/lib/getVal.js');
                        let valToShare = await getVal({ host: target }, lhsProp);
                        switch (as) {
                            case 'number':
                                valToShare = Number(valToShare);
                                break;
                        }
                        switch (typeof rhs) {
                            case 'string':
                                const { setProp } = await import('trans-render/lib/setProp.js');
                                await setProp(affected, rhs, valToShare);
                                break;
                        }
                        continue;
                }
            }
        }
    }
}
