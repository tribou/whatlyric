// Testing the WhatLyric API
import Lab from 'lab';
import Code from 'code';
import Sinon from 'sinon';

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;
const after = lab.after;
const before = lab.before;

describe('WhatLyric API', () => {
  let Request;
  let ServerActions;
  let searchByArtistOrTitle;
  let stubRequest;
  let stubServerActions;

  const response = {
    body: {
      data: 'test',
    },
  };

  before(done => {
    // stub the superagent response
    Request = require('superagent');
    stubRequest = Sinon.stub(Request.Request.prototype, 'end', callback => {
      return callback(null, response);
    });
    // stub the server action method
    ServerActions = require('../actions/SearchServerActions.js');
    stubServerActions = Sinon.stub(ServerActions, 'receiveSearchByArtistOrTitle');
    searchByArtistOrTitle = require('./WhatLyricAPI.js').searchByArtistOrTitle;
    done();
  });

  it('searchByArtistOrTitle calls the server action with the response body data', { skip: true }, done => {
    searchByArtistOrTitle();
    expect(stubServerActions.getCall(0).args[0]).to.equal(response.body.data);
    done();
  });
  
  after(done => {
    // restore all sinon objects
    Request.Request.prototype.end.restore();
    ServerActions.receiveSearchByArtistOrTitle.restore();
    done();
  });
});

