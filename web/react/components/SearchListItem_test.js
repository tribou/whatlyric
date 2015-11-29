// Testing the SearchListItem component
import Lab from 'lab';
import Code from 'code';
import React from 'react';
import { createRenderer } from 'react-addons-test-utils';

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

import SearchListItem from './SearchListItem.jsx';

describe('SearchListItem Component', () => {
  let returnedIndex;
  const handleClick = index => returnedIndex = index;
  const index = 25;
  const text = 'success!';
  const renderer = createRenderer();
  renderer.render(
    <SearchListItem
      handleClick={handleClick}
      index={index}
      text={text}
    />
  );
  const actualElement = renderer.getRenderOutput();

  it('renders as li', done => {
    expect(actualElement.type).to.equal('li');
    done();
  });

  it('renders the text component as direct child', done => {
    expect(actualElement.props.children).to.equal(text);
    done();
  });

  it('calls handleClick with the clicked index', done => {
    actualElement.props.onClick(index);
    expect(returnedIndex).to.equal(index);
    done();
  });
});

