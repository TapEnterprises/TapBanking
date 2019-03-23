import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import Settings from "./components/Settings";
import Transaction from "./components/Transaction";
import Budgets from "./components/Budget";
import Savings from "./components/Savings";
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
            <Route path="/settings" component={Settings} />
            <Route path="/account" component={Account} />
            <Route path="/transaction" component={Transaction} />
            <Route path="/budgets" component={Budgets} />
            <Route path="/savings" component={Savings} />
            <Route path="/plaidlink" component={PlaidLink} />
          </Switch>
        </Back>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
