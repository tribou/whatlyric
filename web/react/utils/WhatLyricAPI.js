import { receiveSearchByArtistOrTitle } from '../actions/SearchServerActions.js';
import request from 'superagent';

export function searchByArtistOrTitle(query) {
  request.get(`/search?q=${query}`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) return console.error(err);

      receiveSearchByArtistOrTitle(response.body.data);
    });
}

