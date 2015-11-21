import AppDispatcher from '../utils/AppDispatcher.js';
import { Actions, ViewFilters } from '../utils/AppConstants.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Could be replaced with ImmutableJS or Immutability helpers:
// https://facebook.github.io/react/docs/update.html
let _store = {
  searchResults: [],
  view: {
    filter: ViewFilters.SEARCHING,
    selectedResult: null,
  },
};

class SearchStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAllSearchResults() {
    return _store.searchResults;
  }

  getView() {
    return _store.view;
  }
}

const SearchStore = new SearchStoreClass();

AppDispatcher.register(payload => {
  switch (payload.action.type) {

  case Actions.RECEIVE_SEARCH_QUERY:
    // populate searchResults with API results
    _store.searchResults = payload.action.searchResults;
    SearchStore.emit(CHANGE_EVENT);
    break;

  case Actions.SELECT_RESULT:
    // populate searchResults with API results
    _store.view.selectedResult = payload.action.index;
    _store.view.filter = ViewFilters.RESULTS;
    SearchStore.emit(CHANGE_EVENT);
    break;

  case Actions.SELECT_SEARCH_AGAIN:
    // populate searchResults with API results
    _store.view.selectedResult = null;
    _store.view.filter = ViewFilters.SEARCHING;
    _store.searchResults = [];
    SearchStore.emit(CHANGE_EVENT);
    break;

  default:
  }
});

export default SearchStore;

