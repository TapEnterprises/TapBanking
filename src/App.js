import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import home from "./components/Home/home";
import about from "./components/About/about";
import settings from "./components/Settings/settings";
import transaction from "./components/Transaction/transaction";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={home} />
            <Route path="/settings" component={settings} />
            <Route path="/about" component={about} />
            <Route path="/transaction" component={transaction} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
