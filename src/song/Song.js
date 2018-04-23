import React from 'react'
import './Song.css'
import * as Constants from '../constants'
import { Link } from 'react-router-dom'

class Song extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false
    };
    this.playPauseSong = this.playPauseSong.bind(this);
  }

  playPauseSong() {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }));
    if(this.state.isPlaying) {
      this.audioElement.pause();
    } else {
      this.audioElement.play();
    }
  }

  render() {
    // Stream URL will go to top Main.js
    const streamUrl = `${this.props.song.stream_url}?${Constants.CLIENT_ID_PARAM}`;
    const seconds = Math.ceil(this.props.song.duration / 1000);
    const minutes = parseInt((seconds / 60), 0) < 10 ? `0${parseInt((seconds / 60), 0)}` : parseInt((seconds / 60), 0);
    const leftOverSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    const songDuration = `${minutes}:${leftOverSeconds}`;
    const artworkUrl = this.props.song.artwork_url !== null ? this.props.song.artwork_url : this.props.song.user.avatar_url;
    const playPauseClasses = this.state.isPlaying ? "play_pause_button glyphicon glyphicon-pause" : "play_pause_button glyphicon glyphicon-play"
    const userUrl = `/users/${this.props.song.user.id}/tracks`

    return (
      <div className="card">
        <img src={artworkUrl} alt={this.props.song.title} className="card-image"/>
        <div className="song_detail">
          <h4>
            <Link className="p_inline" to={userUrl}>{this.props.song.user.username}</Link>
            <p className="p_inline">{this.props.song.title}</p>
          </h4>
          <div className="play_strip">
            <span className={playPauseClasses} onClick={this.playPauseSong}></span>

            <audio ref={(input) => {this.audioElement = input}}>

              <source src={streamUrl} type="audio/mpeg"/>
              Your browser does not support audio tag.
            </audio>
            <span className="song_duration">{songDuration}</span>
          </div>
        </div>
      </div>
    );
  }

}

export default Song
