import React from 'react'
import './SongList.css'

import Song from '../song/Song'
import * as Constants from '../constants'

class SongList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      songs: []
    }
    console.log(Constants.CLIENT_ID);
  }

  componentDidMount() {
    const userId = 185676792
    let thisRef = this
    let url = `${Constants.API_USERS_URL}/${userId}/favorites?${Constants.CLIENT_ID_PARAM}`

    fetch(url)
    .then(response => response.json())
    .then(function(json) {
      thisRef.setState({
        songs: json
      })
    })
  }

  render() {
    console.log(this.state.songs);
    return (
      <div className="songlist container">
        {this.state.songs.map((song, index) => (
          <Song song={song} key={song.id}/>
        ))}
      </div>
    );
  }

}

export default SongList
