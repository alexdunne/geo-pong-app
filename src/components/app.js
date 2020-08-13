import { h, Component } from "preact";
import { Router } from "preact-router";

import Home from "../routes/home";
import Spectate from "../routes/spectate";

export default class App extends Component {
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Home path="/" />
          <Spectate path="/spectate/:id" />
        </Router>
      </div>
    );
  }
}
