import React from 'react'
import './Header.css'
import { BrowserRouter } from 'react-router-dom';
import { Link, withRouter } from 'react-router-dom';


class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchToggle: false,
      searchQuery: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchQueryOnChange = this.handleSearchQueryOnChange.bind(this);
    this.handleSearchGo = this.handleSearchGo.bind(this);
  }

  handleSearch(event) {
    if(this.state.searchToggle) {
      this.setState({
        searchToggle: false
      });
    } else {
      this.setState({
        searchToggle: true
      });
    }
    this.searchButton.blur();
  }

  handleSearchQueryOnChange(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      if(this.searchElement.props.to !== '') {
        window.location.href = this.searchElement.props.to;
      }
    }
  }

  handleSearchGo(event) {
    if(this.searchElement.props.to === '') {
      event.preventDefault();
    }
  }

  render() {
    let searchURL = `/search?q=${this.state.searchQuery}`;
    if(this.state.searchQuery.trim() === '') {
      searchURL = '';
    }
    const searchTrackInput = this.state.searchToggle ?
      <div className="input-group">
        <input type="text"
          className="form-control"
          placeholder="Search Tracks"
          onChange={ event => { this.setState({ searchQuery: event.target.value }) } }
          onKeyPress={ this.handleSearchQueryOnChange }/>
        <Link to={searchURL}
          className="input-group-addon search_song_button"
          ref={(input) => { this.searchElement = input; }}
          onClick={this.handleSearchGo}><span>Go</span></Link>
      </div> : null;
    const searchButtonIcon = this.state.searchToggle ? <span className="glyphicon glyphicon-remove"></span> : <span className="glyphicon glyphicon-search"></span>
    const faviconURL = `${window.location.origin}/favicon.png`;
    return (
      <div className="header">
        <nav className="navbar-default">
          <div className="container-fluid container header_container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">
                <img alt="Music App" src={faviconURL} className="img_brand"/>
              </Link>
            </div>

            <ul className="nav navbar-nav navbar-right">
              <li>
                <form className="navbar-form navbar-left">

                { searchTrackInput }

                  <button type="button" className="btn search_button" onClick={this.handleSearch} ref={(input) => { this.searchButton = input; }}>
                    { searchButtonIcon }
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }

}

export default withRouter(Header)
