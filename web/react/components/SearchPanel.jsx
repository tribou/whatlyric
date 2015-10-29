import React from 'react';
import SearchStore from '../stores/SearchStore.js';
import { ViewFilters } from '../utils/AppConstants.js';
import { searchByArtistOrTitle, searchAgain } from '../actions/SearchActions.js';
import ResultPanel from './ResultPanel.jsx';
import SearchListItem from './SearchListItem.jsx';

// enforce minimum characters to search for better relevance
const minChars = 3;

export default class SearchPanel extends React.Component {

  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onKeyChange = this._onKeyChange.bind(this);
    this._searchAgain = this._searchAgain.bind(this);
    this._getListItemText = this._getListItemText.bind(this);
    this._getResultView = this._getResultView.bind(this);
    this._getSearchView = this._getSearchView.bind(this);
    this.state = {
      text: '',
      results: SearchStore.getAllSearchResults(),
      view: SearchStore.getView(),
    };
  }

  componentDidMount() {
    SearchStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      text: this.state.text,
      results: SearchStore.getAllSearchResults(),
      view: SearchStore.getView(),
    });
  }

  _onKeyChange(event) {
    if (event.target.value.length >= minChars) {
      this.setState({
        text: event.target.value,
        results: this.state.results,
        view: this.state.view,
      });
      searchByArtistOrTitle(event.target.value);
    } else {
      this.setState({
        text: event.target.value,
        results: [],
        view: this.state.view,
      });
    }
  }

  _searchAgain() {
    searchAgain();
    this.setState({
      text: '',
      results: [],
      view: this.state.view,
    });
  }

  _getListItemText(result) {
    return `${result.title} - ${result.artist.name}`;
  }

  _getResultView() {
    const result = this.state.results[this.state.view.selectedResult];
    const text = this._getListItemText(result);
    return (

      <div className="search">
        <input
          type="text"
          value={text}
        />
        <button
          onClick={this._searchAgain}
          className="btn btn-default pull-right search-again">
          Search again?
        </button>
        <ResultPanel
          snippet={result.snippet}
        />
      </div>

    );
  }

  _getSearchView() {
    // Only populate ul if there are items
    let items;
    let list;
    if (this.state.results.length > 0) {
      // Map result entries to list items
      items = this.state.results.map((result, index) => {
        const text = this._getListItemText(result);
        return (

          <SearchListItem
            key={index}
            index={index}
            text={text}
          />

        );
      });

      list = <ul>{items}</ul>;
    }

    return (

      <div className="search">
        <input
          autoFocus="true"
          onChange={this._onKeyChange}
          placeholder="Find lyrics..."
          type="text"
          value={this.state.searchText}
        />
        {list}
      </div>

    );
  }

  render() {
    let currentView = this._getSearchView();
    if ( this.state.view.filter === ViewFilters.RESULTS ) {
      currentView = this._getResultView();
    }
    return currentView;
  }
}

