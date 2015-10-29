import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions } from '../utils/AppConstants.js';

export function receiveSearchByArtistOrTitle(searchResults) {
  AppDispatcher.handleServerAction({
    type: Actions.RECEIVE_SEARCH_QUERY,
    searchResults: searchResults,
  });
}

