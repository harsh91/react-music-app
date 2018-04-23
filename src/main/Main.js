import React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";
import Musica from '../musica/Musica';
import Header from '../header/Header';
import SearchTrack from '../searchtrack/SearchTrack';
import SearchUserTrack from '../searchuser/SearchUserTracks';
// import Footer from '../footer/Footer';

class Main extends React.Component {

  render() {
    return (
      <Router>

        <div className="application">
          <Header/>

          <div className="content">
            <Route exact path="/" component={Musica}/>
            <Route exact path="/search" component={SearchTrack}/>
            <Route path="/users/:userID/:resource(tracks|likes)" component={SearchUserTrack}/>
          </div>

          {/*<Footer/>*/}
        </div>

      </Router>
    );
  }

}

export default Main
