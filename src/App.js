import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import account from "./components/Account";
import settings from "./components/Settings";
import transaction from "./components/Transaction";
import budgets from "./components/Budget";
import savings from "./components/Savings";
import Back from "./components/Navigation";
import PlaidLink from "./components/PlaidLink";

const App = props => {
  return (
    <div className="App">
      <Router>
        <Back>
          <Switch>
            <Route
              path="/"
              exact
              component={() => <Home user={props.user} />}
            />
            <Route path="/settings" component={settings} />
            <Route path="/account" component={account} />
            <Route path="/transaction" component={transaction} />
            <Route path="/budgets" component={budgets} />
            <Route path="/savings" component={savings} />
            <Route path="/plaidlink" component={PlaidLink} />
          </Switch>
        </Back>
      </Router>
    </div>
  );
};

export default App;
