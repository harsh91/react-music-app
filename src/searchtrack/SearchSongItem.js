import React from 'react'
import './SearchSongItem.css'
import { Link } from 'react-router-dom'
import * as Constants from '../constants'

class SearchSongItem extends React.Component {

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
    const seconds = Math.ceil(this.props.song.duration / 1000);
    const minutes = parseInt((seconds / 60), 0) < 10 ? `0${parseInt((seconds / 60), 0)}` : parseInt((seconds / 60), 0);
    const leftOverSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    const songDuration = `${minutes}:${leftOverSeconds}`;
    const artworkUrl = this.props.song.artwork_url !== null ? this.props.song.artwork_url : this.props.song.user.avatar_url;
    const userUrl = `/users/${this.props.song.user.id}/tracks`
    const playPauseClasses = this.state.isPlaying ? "play_pause_button glyphicon glyphicon-pause" : "play_pause_button glyphicon glyphicon-play"
    const streamUrl = `${this.props.song.stream_url}?${Constants.CLIENT_ID_PARAM}`;

    return (
      <article className="search_song_item container"
        style={window.innerWidth > 500 ? {} : {paddingRight: 0}}>
        <div className="media">
          <div className={window.innerWidth > 500 ? "media-left media-middle song_artWork_div" : "col-xs-12"}>
            <img className="media-object song_artWork img img-responsive" src={artworkUrl} alt=""/>
          </div>
          <div className="media_body col-lg-9 col-md-9 col-xs-12">
            <Link className="song_username" to={userUrl}>{this.props.song.user.username}</Link>
            <p className="media-heading song_title">{this.props.song.title}</p>

            <img src={this.props.song.waveform_url} className="img img-responsive visualizer" alt=""/>

            <span className={playPauseClasses} onClick={this.playPauseSong}></span>

            <audio ref={(input) => {this.audioElement = input}}>

              <source src={streamUrl} type="audio/mpeg"/>
              Your browser does not support audio tag.
            </audio>

            <span className="song_duration">{songDuration}</span>

            <span className="like_icon glyphicon glyphicon-heart-empty"
              style={ window.innerWidth > 500 ? {marginLeft: 100} : {marginLeft: 20}}></span>
            <span className="like_count">{this.props.song.likes_count}</span>

            <span className="comment_icon glyphicon glyphicon-comment"
              style={ window.innerWidth > 500 ? {marginLeft: 100} : {marginLeft: 20}}></span>
            <span className="comment_count">{this.props.song.comment_count}</span>
          </div>
        </div>
      </article>
    );
  }

}

export default SearchSongItem
