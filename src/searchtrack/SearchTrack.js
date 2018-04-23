import React from 'react'
import './SearchTrack.css'
import SearchSongItem from './SearchSongItem'
import * as Constants from '../constants'
import { withRouter } from 'react-router-dom'

class SearchTrack extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      nextUrl: ""
    };
    this.fetchTracks = this.fetchTracks.bind(this);
  }

  componentDidMount() {
    const query = this.props.location.search.replace("?q=", "");
    if(query.trim() !== "") {
      let thisRef = this
      let url = `${Constants.API_TRACKS_URL}/?${Constants.CLIENT_ID_PARAM}&${Constants.PAGINATION_PARAMS}&q=${query}`
      console.log("URL: " + url);
      this.fetchTracks(url, thisRef);
    } else {
      window.location.href="/";
    }
  }

  fetchTracks(url, thisRef) {
    fetch(url)
    .then(response => response.json())
    .then(function(json) {
      thisRef.setState({
        songs: json.collection,
        nextUrl: json.next_href
      });
    });
  }

  render() {
    return (
      <div className="search_track_main">
        {this.state.songs.map(song => {
          return <SearchSongItem key={song.id} song={song}/>
        })}
      </div>
    );
  }

}

export default withRouter(SearchTrack)
