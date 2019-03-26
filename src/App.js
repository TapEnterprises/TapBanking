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
import { ToastContainer } from "react-toastify";
import Notification from "./components/Notification";

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
            <Route
              path="/settings"
              component={() => <Settings user={props.user} />}
            />
            <Route
              path="/account"
              component={() => <Account user={props.user} />}
            />
            <Route
              path="/transaction"
              component={() => <Transaction user={props.user} />}
            />
            <Route
              path="/budgets"
              component={() => <Budgets user={props.user} />}
            />
            <Route
              path="/savings"
              component={() => <Savings user={props.user} />}
            />
            <Route path="/plaidlink" component={PlaidLink} />
            <Route
              path="/notification"
              component={() => <Notification user={props.user} />}
            />
          </Switch>
        </Back>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
