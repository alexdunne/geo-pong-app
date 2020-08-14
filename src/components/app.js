import { h } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Spectate from "../routes/spectate";
import Player from "../routes/player";
import JoinGame from "../routes/join-game";

const App = () => {
  return (
    <div id="app">
      <Router>
        <Home path="/" />
        <JoinGame path="/join/:gameId?" />
        <Player path="/game/:gameId/player/:playerToken" />
        <Spectate path="/game/:gameId/spectate" />
      </Router>
    </div>
  );
};

export default App;
