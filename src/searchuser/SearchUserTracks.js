import React from 'react'
import '../searchtrack/SearchTrack.css'
import SearchSongItem from '../searchtrack/SearchSongItem'
import * as Constants from '../constants'
import { withRouter } from 'react-router-dom'

class SearchUserTracks extends React.Component {

  constructor(props) {
    super(props);
    console.log("coming this page 1");
    this.state = {
      songs: [],
      nextUrl: ""
    };
    this.fetchTracks = this.fetchTracks.bind(this);

  }
  componentDidMount() {
    console.log("coming this page 2");
    const url = `${Constants.API_USERS_URL}/${this.props.match.params.userID}/${this.props.match.params.resource}?${Constants.CLIENT_ID_PARAM}&${Constants.PAGINATION_PARAMS}`

    let thisRef = this
    console.log("URL: " + url);
    this.fetchTracks(url, thisRef);

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

export default withRouter(SearchUserTracks)
