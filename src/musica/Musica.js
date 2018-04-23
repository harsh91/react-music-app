import React from 'react'
import './Musica.css'

import SongList from '../songlist/SongList'

class Musica extends React.Component {

  render() {
    return (
      <div className="homepage_main">
        <SongList />
      </div>
    );
  }

}

export default Musica
