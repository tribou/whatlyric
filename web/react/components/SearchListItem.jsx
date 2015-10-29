import React from 'react';
import { selectResult } from '../actions/SearchActions.js';

export default class SearchList extends React.Component {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    selectResult(this.props.index);
  }

  render() {
    return (
      <li
        onClick={this._onClick}
        className="list">
        {this.props.text}
      </li>
    );
  }
}

SearchList.propTypes = {
  index: React.PropTypes.number,
  text: React.PropTypes.string,
};

