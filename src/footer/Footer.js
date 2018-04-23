import React from 'react'
import './Footer.css'
import * as Constants from '../constants'

class Footer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isPlaying: false,
      streamUrl: "",
      volume: 5,
      title: "Arctic Monkeys Ru Mine KYB Cover",
      songDuration: 204,
      playedSongDuration: 35
    };
    this.playPauseSong = this.playPauseSong.bind(this);
  }

  playPauseSong() {
    this.setState(prevState => ({
      isPlaying: !prevState.isPlaying
    }));
  }

  render() {
    const songMinutes = this.state.songDuration / 60 < 10 ? "0"+this.state.songDuration / 60 : this.state.songDuration / 60;
    const songSeconds = this.state.songDuration % 60 < 10 ? "0"+this.state.songDuration % 60 : this.state.songDuration % 60;
    const playedSongMinutes = this.state.playedSongDuration / 60 < 10 ? "0"+this.state.playedSongDuration / 60 : this.state.playedSongDuration / 60;
    const playedSongSeconds = this.state.playedSongDuration % 60 < 10 ? "0"+this.state.playedSongDuration % 60 : this.state.playedSongDuration % 60;

    const songDuration = songMinutes+":"+songSeconds+" / "+playedSongMinutes+":"+playedSongSeconds;

    const playPauseClasses = this.state.isPlaying ? "play_pause_button glyphicon glyphicon-pause" : "play_pause_button glyphicon glyphicon-play"

    return (
      <footer className="footer">
        <span className={playPauseClasses} onClick={this.playPauseSong}></span>
        <span className="song_duration">{this.state.songDuration}</span>
        <span className="song_title">{this.state.title}</span>
      </footer>
    );
  }

}

export default Footer
