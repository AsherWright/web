/* global API_HOST */
import querystring from 'querystring';
import fetch from 'isomorphic-fetch';
import renderMatch from 'components/Match/renderMatch';

function createAction(type, host, path, params = {}, transform) {
  return (dispatch) => {
    const url = `${host}/${path}?${querystring.stringify(params)}`;
    const getDataStart = () => ({
      type: `REQUEST/${type}`,
    });
    const getDataOk = payload => ({
      type: `OK/${type}`,
      payload,
    });
    dispatch(getDataStart());
    return fetch(url, { credentials: 'include' })
  .then(response => response.json())
  .then(transform || (json => json))
  .then(json => dispatch(getDataOk(json)))
  .catch((error) => {
    console.error(error);
    // TODO transparently retry with backoff
  });
  };
}

export const getMetadata = () => createAction('metadata', API_HOST, 'api/metadata');
export const getMatch = matchId => createAction('match', API_HOST, `api/matches/${matchId}`, {}, renderMatch);
export const getRanking = (heroId) => createAction('heroRanking', API_HOST, 'api/rankings', { hero_id: heroId });

export * from './benchmarkActions';
export * from './searchActions';
export * from './requestActions';
export * from './distributionsActions';
export * from './proPlayersActions';
export * from './proMatchesActions';
export * from './localizationActions';
export * from './pvgnaActions';
export * from './heroStatsActions';
export * from './publicMatchesActions';
export * from './leaguesActions';
export * from './teamsActions';
export * from './recordsActions';
export * from './player/playerActions';
export * from './player/playerMatchesActions';
export * from './player/playerPeersActions';
export * from './player/playerHeroesActions';
export * from './player/playerProsActions';
export * from './player/playerRankingsActions';
export * from './player/playerHistogramActions';
export * from './player/playerRecordsActions';
export * from './player/playerCountsActions';
export * from './player/playerMMRActions';
export * from './player/playerItemsActions';
export * from './player/playerWinLossActions';
export * from './player/playerWardmapActions';
export * from './player/playerWordcloudActions';
export * from './player/playerTrendsActions';
export * from './player/playerRecentMatchesActions';
export * from './player/playerTotalsActions';

export * from './tableActions';
export * from './formActions';