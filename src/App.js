import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import home from "./components/Home/home";
import account from "./components/Account/account";
import settings from "./components/Settings/settings";
import transaction from "./components/Transaction/transaction";
import budgets from "./components/Budget/budgets";
import savings from "./components/Savings/savings";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" exact component={home} />
            <Route path="/settings" component={settings} />
            <Route path="/account" component={account} />
            <Route path="/transaction" component={transaction} />
            <Route path="/budgets" component={budgets} />
            <Route path="/savings" component={savings} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
