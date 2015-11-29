import React from 'react';

export default class SearchList extends React.Component {

  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.handleClick(this.props.index);
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
  handleClick: React.PropTypes.func,
  index: React.PropTypes.number,
  text: React.PropTypes.string,
};

