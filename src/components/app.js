import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Spectate from "../routes/spectate";
import Player from "../routes/player";
import JoinGame from "../routes/join-game";

export default class App extends Component {
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <JoinGame path="/join/:gameId?" />
          <Player path="game/:gameId/player/:playerToken" />
          <Spectate path="game/:gameId/spectate" />
        </Router>
      </div>
    );
  }
}
