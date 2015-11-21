// Load modules
import Lab from 'lab';
import Code from 'code';
import Sinon from 'sinon';
import { Actions, ViewFilters } from '../utils/AppConstants.js';

// Load fixtures
import { searchByArtistOrTitle } from '../utils/WhatLyricAPI_fixtures.js';

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const before = lab.before;

describe('SearchStore', () => {
  let AppDispatcher;
  let SearchStore;
  let spy;
  let callback;
  const selectThisResult = 3;

  // Mock actions
  const actionReceiveSearchQuery = {
    action: {
      type: Actions.RECEIVE_SEARCH_QUERY,
      searchResults: searchByArtistOrTitle,
    },
  };

  const actionSelectResult = {
    action: {
      type: Actions.SELECT_RESULT,
      index: selectThisResult,
    },
  };

  const actionSelectSearchAgain = {
    action: {
      type: Actions.SELECT_SEARCH_AGAIN,
    },
  };

  before(done => {
    // We're going to spy on the Dispatcher.register() and capture the callback
    // that the SearchStore registers
    AppDispatcher = require('../utils/AppDispatcher.js');
    spy = Sinon.spy(AppDispatcher, 'register');
    SearchStore = require('./SearchStore.js');
    callback = spy.getCall(0).args[0];
    done();
  });

  it('registers a callback with the dispatcher', done => {
    expect(spy.callCount).to.equal(1);
    done();
  });

  it('initializes with no searchResults', done => {
    const searchResults = SearchStore.getAllSearchResults();
    expect(searchResults).to.be.an.array().and.have.length(0);
    done();
  });

  it('initializes with the default view settings', done => {
    const view = SearchStore.getView();
    expect(view.filter).to.equal(ViewFilters.SEARCHING);
    expect(view.selectedResult).to.equal(null);
    done();
  });

  it('populates searchResults upon RECEIVE_SEARCH_QUERY', done => {
    callback(actionReceiveSearchQuery);
    const searchResults = SearchStore.getAllSearchResults();
    expect(searchResults).to.be.an.array().and.have
      .length(searchByArtistOrTitle.length);
    done();
  });

  it('populates selectedResult and changes the view to RESULTS upon SELECT_RESULT', done => {
    callback(actionSelectResult);
    const view = SearchStore.getView();
    expect(view.selectedResult).to.equal(selectThisResult);
    expect(view.filter).to.equal(ViewFilters.RESULTS);
    done();
  });

  it('resets selectedResult, changes the view to SEARCHING, and clears results upon SELECT_SEARCH_AGAIN', done => {
    callback(actionSelectSearchAgain);
    const searchResults = SearchStore.getAllSearchResults();
    const view = SearchStore.getView();
    expect(view.selectedResult).to.be.null();
    expect(searchResults).to.be.an.array().and.have.length(0);
    done();
  });
});

