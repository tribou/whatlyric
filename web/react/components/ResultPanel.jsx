import React from 'react';

export default class SearchList extends React.Component {

  render() {
    return (
      <div className="lyrics panel panel-default">
        <div className="panel-body">
          {this.props.snippet}
        </div>
      </div>
    );
  }
}

SearchList.propTypes = {
  snippet: React.PropTypes.string,
};

