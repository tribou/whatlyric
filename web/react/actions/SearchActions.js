import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions } from '../utils/AppConstants.js';
import * as API from '../utils/WhatLyricAPI.js';

export function searchByArtistOrTitle(query) {
  AppDispatcher.handleViewAction({
    type: Actions.SEARCH_QUERY,
    query: query,
  });

  API.searchByArtistOrTitle(query);
}

export function selectResult(index) {
  AppDispatcher.handleViewAction({
    type: Actions.SELECT_RESULT,
    index: index,
  });
}

export function searchAgain() {
  AppDispatcher.handleViewAction({
    type: Actions.SELECT_SEARCH_AGAIN,
  });
}

